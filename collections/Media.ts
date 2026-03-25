import type { CollectionConfig } from "payload"
import { isLoggedIn, isAdminDelete } from "../lib/access"

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Mídia",
    plural: "Mídias",
  },
  access: {
    // Público pode ver mídias (imagens nos artigos)
    read: () => true,
    // Qualquer usuário logado pode fazer upload
    create: isLoggedIn,
    // Qualquer usuário logado pode atualizar (alt text, etc.)
    update: isLoggedIn,
    // Só admin pode deletar mídias
    delete: isAdminDelete,
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
