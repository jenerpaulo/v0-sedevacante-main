import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Mídia",
    plural: "Mídias",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/gif", "application/pdf"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Texto Alternativo",
    },
  ],
}
