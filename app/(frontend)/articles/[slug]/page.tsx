import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPayload } from "payload"
import config from "@payload-config"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: "articles",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
    })
    const article = result.docs[0]
    if (!article) return { title: "Artigo não encontrado" }
    return {
      title: `${article.title} | Sedevacante`,
      description: article.excerpt || "",
    }
  } catch {
    return { title: "Artigo | Sedevacante" }
  }
}

// Render Lexical rich text to HTML
function renderRichText(content: any): string {
  if (!content?.root?.children) return ""
  return renderNodes(content.root.children)
}

function renderNodes(nodes: any[]): string {
  if (!nodes) return ""
  return nodes.map(renderNode).join("")
}

function renderNode(node: any): string {
  if (!node) return ""

  // Text node
  if (node.type === "text") {
    let text = escapeHtml(node.text || "")
    if (node.format & 1) text = `<strong>${text}</strong>`  // bold
    if (node.format & 2) text = `<em>${text}</em>`          // italic
    if (node.format & 4) text = `<s>${text}</s>`            // strikethrough
    if (node.format & 8) text = `<u>${text}</u>`            // underline
    if (node.format & 16) text = `<code>${text}</code>`     // code
    return text
  }

  // Line break
  if (node.type === "linebreak") return "<br/>"

  const children = renderNodes(node.children || [])

  switch (node.type) {
    case "paragraph":
      return `<p>${children}</p>`
    case "heading":
      const tag = node.tag || "h2"
      return `<${tag}>${children}</${tag}>`
    case "list":
      const listTag = node.listType === "number" ? "ol" : "ul"
      return `<${listTag}>${children}</${listTag}>`
    case "listitem":
      return `<li>${children}</li>`
    case "quote":
      return `<blockquote>${children}</blockquote>`
    case "link":
    case "autolink":
      const href = node.fields?.url || node.url || "#"
      return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${children}</a>`
    case "upload":
      const url = node.value?.url || ""
      const alt = node.value?.alt || ""
      if (url) return `<figure><img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" class="rounded-lg max-w-full" />${alt ? `<figcaption>${escapeHtml(alt)}</figcaption>` : ""}</figure>`
      return ""
    case "horizontalrule":
      return "<hr/>"
    default:
      return children
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params

  let article: any = null
  let prevArticle: any = null
  let nextArticle: any = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: "articles",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
      depth: 1,
    })
    article = result.docs[0]

    if (article?.publishedAt) {
      // Artigo mais recente (próximo)
      const newerResult = await payload.find({
        collection: "articles",
        where: {
          status: { equals: "published" },
          publishedAt: { greater_than: article.publishedAt },
          slug: { not_equals: slug },
        },
        sort: "publishedAt",
        limit: 1,
        depth: 0,
      })
      nextArticle = newerResult.docs[0] || null

      // Artigo mais antigo (anterior)
      const olderResult = await payload.find({
        collection: "articles",
        where: {
          status: { equals: "published" },
          publishedAt: { less_than: article.publishedAt },
          slug: { not_equals: slug },
        },
        sort: "-publishedAt",
        limit: 1,
        depth: 0,
      })
      prevArticle = olderResult.docs[0] || null
    }
  } catch (e) {
    console.error("Error fetching article:", e)
  }

  if (!article) notFound()

  const contentHtml = renderRichText(article.content)

  return (
    <div className="min-h-screen bg-background pt-20">
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4 text-balance">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="text-lg text-muted-foreground font-serif leading-relaxed mb-6">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground font-serif border-b border-border pb-6">
            {article.author && <span>Por {article.author}</span>}
            {article.publishedAt && (
              <span>
                {new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {article.featuredImage?.url && (
          <div className="relative aspect-video overflow-hidden rounded-lg mb-10">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt || article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none font-serif
            prose-headings:font-sans prose-headings:font-semibold
            prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-primary prose-a:underline
            prose-blockquote:border-l-primary prose-blockquote:italic
            prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((t: any, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-secondary text-secondary-foreground font-serif text-sm rounded-full"
                >
                  {t.tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Navigation footer */}
        <nav className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            {/* Previous article */}
            <div className="text-left">
              {prevArticle ? (
                <Link
                  href={`/articles/${prevArticle.slug}`}
                  className="group inline-flex flex-col gap-1"
                >
                  <span className="text-xs text-muted-foreground font-serif uppercase tracking-wider">
                    ← Anterior
                  </span>
                  <span className="text-sm font-sans font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {prevArticle.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </div>

            {/* All articles */}
            <div className="text-center">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-serif text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg hover:bg-secondary/50"
              >
                Todos os Artigos
              </Link>
            </div>

            {/* Next article */}
            <div className="text-right">
              {nextArticle ? (
                <Link
                  href={`/articles/${nextArticle.slug}`}
                  className="group inline-flex flex-col gap-1 items-end"
                >
                  <span className="text-xs text-muted-foreground font-serif uppercase tracking-wider">
                    Próximo →
                  </span>
                  <span className="text-sm font-sans font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 text-right">
                    {nextArticle.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </nav>
      </article>
    </div>
  )
}
