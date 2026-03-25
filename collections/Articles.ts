import type { CollectionConfig } from "payload"
import { canCreate, isEditorOrSelf, isAdminDelete, canPublish } from "../lib/access"

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: {
    singular: "Artigo",
    plural: "Artigos",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "language", "author", "status", "publishedAt"],
  },
  access: {
    // Público pode ler artigos publicados; logado vê tudo conforme role
    read: ({ req: { user } }) => {
      if (!user) return { status: { equals: "published" } }
      const role = user?.role || "author"
      if (role === "admin" || role === "editor") return true
      // Author só vê os próprios
      return { createdBy: { equals: user.id } }
    },
    create: canCreate,
    update: isEditorOrSelf,
    delete: isAdminDelete,
  },
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        // Registrar quem criou o artigo
        if (operation === "create" && req.user) {
          data.createdBy = req.user.id
        }
        // Author não pode publicar — forçar draft
        if (req.user) {
          const role = req.user.role || "author"
          if (role === "author" && data.status === "published") {
            data.status = "draft"
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Título",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug (URL)",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "language",
      type: "select",
      required: true,
      label: "Idioma",
      defaultValue: "pt",
      options: [
        { label: "Português", value: "pt" },
        { label: "English", value: "en" },
        { label: "Français", value: "fr" },
        { label: "Español", value: "es" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "author",
      type: "text",
      label: "Autor",
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Resumo",
      maxLength: 300,
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Imagem de Capa",
    },
    {
      name: "content",
      type: "richText",
      required: true,
      label: "Conteúdo",
    },
    {
      name: "tags",
      type: "array",
      label: "Tags",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      label: "Status",
      options: [
        { label: "Rascunho", value: "draft" },
        { label: "Publicado", value: "published" },
      ],
      access: {
        // Author vê o campo mas não pode alterar
        update: canPublish,
      },
      admin: {
        position: "sidebar",
        description: "Apenas Editors e Admins podem publicar.",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Data de Publicação",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      label: "Criado por",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
  ],
}
