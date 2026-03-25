import type { CollectionConfig } from "payload"
import { isAdminAccess } from "../lib/access"

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Usuário",
    plural: "Usuários",
  },
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role"],
  },
  access: {
    // Only admin can list/read other users
    read: isAdminAccess,
    // Only admin can create new users (after first user)
    create: isAdminAccess,
    // Only admin can update users
    update: isAdminAccess,
    // Only admin can delete users
    delete: isAdminAccess,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nome",
      required: true,
    },
    {
      name: "role",
      type: "select",
      label: "Nível de Acesso",
      required: true,
      defaultValue: "author",
      options: [
        { label: "Admin — Acesso total", value: "admin" },
        { label: "Editor — Publica artigos e gerencia mídia", value: "editor" },
        { label: "Autor — Cria rascunhos, não publica", value: "author" },
      ],
      admin: {
        position: "sidebar",
        description: "Define o que este usuário pode fazer no painel.",
      },
    },
  ],
}
