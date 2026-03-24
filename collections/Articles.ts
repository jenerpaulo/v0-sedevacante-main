import type { CollectionConfig } from "payload"

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
    read: () => true,
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
      admin: {
        position: "sidebar",
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
  ],
}
