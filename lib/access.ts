import type { Access, FieldAccess } from "payload"

// Helper to check user role
export const getUserRole = (user: any): string => {
  return user?.role || "author"
}

export const isAdmin = (user: any): boolean => {
  return getUserRole(user) === "admin"
}

export const isEditorOrAbove = (user: any): boolean => {
  const role = getUserRole(user)
  return role === "admin" || role === "editor"
}

// --- Collection-level access ---

// Anyone logged in can read
export const isLoggedIn: Access = ({ req: { user } }) => {
  return !!user
}

// Only admin can manage users
export const isAdminAccess: Access = ({ req: { user } }) => {
  return isAdmin(user)
}

// Admin and editor can do everything; author can only edit own docs
export const isEditorOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isEditorOrAbove(user)) return true
  // Author can only see/edit their own articles
  return {
    createdBy: {
      equals: user.id,
    },
  }
}

// Anyone logged in can create
export const canCreate: Access = ({ req: { user } }) => {
  return !!user
}

// Only admin can delete
export const isAdminDelete: Access = ({ req: { user } }) => {
  return isAdmin(user)
}

// --- Field-level access ---

// Only editor+ can change the status field (author stays in draft)
export const canPublish: FieldAccess = ({ req: { user } }) => {
  return isEditorOrAbove(user)
}
