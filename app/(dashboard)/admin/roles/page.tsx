"use client"

import * as React from "react"
import { Plus, MoreHorizontal, Shield, Users, Check, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const permissions = [
  { id: "users.view", name: "View Users", category: "Users" },
  { id: "users.create", name: "Create Users", category: "Users" },
  { id: "users.edit", name: "Edit Users", category: "Users" },
  { id: "users.delete", name: "Delete Users", category: "Users" },
  { id: "tasks.view", name: "View Tasks", category: "Tasks" },
  { id: "tasks.create", name: "Create Tasks", category: "Tasks" },
  { id: "tasks.edit", name: "Edit Tasks", category: "Tasks" },
  { id: "tasks.delete", name: "Delete Tasks", category: "Tasks" },
  { id: "workflows.view", name: "View Workflows", category: "Workflows" },
  { id: "workflows.create", name: "Create Workflows", category: "Workflows" },
  { id: "workflows.edit", name: "Edit Workflows", category: "Workflows" },
  { id: "workflows.delete", name: "Delete Workflows", category: "Workflows" },
  { id: "admin.access", name: "Access Admin Panel", category: "Admin" },
  { id: "admin.settings", name: "Manage Settings", category: "Admin" },
  { id: "admin.billing", name: "Manage Billing", category: "Admin" },
]

const defaultRoles = [
  {
    id: "admin",
    name: "Admin",
    description: "Full access to all features and settings",
    color: "bg-purple-100 text-purple-700",
    userCount: 3,
    permissions: permissions.map((p) => p.id),
    isSystem: true,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Can manage team members and workflows",
    color: "bg-blue-100 text-blue-700",
    userCount: 8,
    permissions: permissions.filter((p) => !p.id.startsWith("admin")).map((p) => p.id),
    isSystem: true,
  },
  {
    id: "member",
    name: "Member",
    description: "Basic access to tasks and workflows",
    color: "bg-gray-100 text-gray-700",
    userCount: 45,
    permissions: permissions.filter((p) => p.id.includes(".view") || p.id === "tasks.create").map((p) => p.id),
    isSystem: true,
  },
]

export default function AdminRolesPage() {
  const [roles, setRoles] = React.useState(defaultRoles)
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
  const [editingRole, setEditingRole] = React.useState<typeof defaultRoles[0] | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [roleToDelete, setRoleToDelete] = React.useState<string | null>(null)
  const [newRoleName, setNewRoleName] = React.useState("")
  const [newRoleDescription, setNewRoleDescription] = React.useState("")
  const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>([])

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, typeof permissions>)

  const handleCreateRole = () => {
    const newRole = {
      id: newRoleName.toLowerCase().replace(/\s+/g, "-"),
      name: newRoleName,
      description: newRoleDescription,
      color: "bg-gray-100 text-gray-700",
      userCount: 0,
      permissions: selectedPermissions,
      isSystem: false,
    }
    setRoles([...roles, newRole])
    setCreateDialogOpen(false)
    setNewRoleName("")
    setNewRoleDescription("")
    setSelectedPermissions([])
    toast.success("Role created successfully")
  }

  const handleEditRole = () => {
    if (!editingRole) return
    setRoles(
      roles.map((r) =>
        r.id === editingRole.id
          ? { ...r, name: newRoleName, description: newRoleDescription, permissions: selectedPermissions }
          : r
      )
    )
    setEditingRole(null)
    setNewRoleName("")
    setNewRoleDescription("")
    setSelectedPermissions([])
    toast.success("Role updated successfully")
  }

  const handleDeleteRole = () => {
    if (!roleToDelete) return
    setRoles(roles.filter((r) => r.id !== roleToDelete))
    setDeleteDialogOpen(false)
    setRoleToDelete(null)
    toast.success("Role deleted successfully")
  }

  const openEditDialog = (role: typeof defaultRoles[0]) => {
    setEditingRole(role)
    setNewRoleName(role.name)
    setNewRoleDescription(role.description)
    setSelectedPermissions(role.permissions)
  }

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((p) => p !== permissionId)
        : [...prev, permissionId]
    )
  }

  const toggleCategoryPermissions = (category: string) => {
    const categoryPermissionIds = groupedPermissions[category].map((p) => p.id)
    const allSelected = categoryPermissionIds.every((id) => selectedPermissions.includes(id))

    if (allSelected) {
      setSelectedPermissions((prev) => prev.filter((p) => !categoryPermissionIds.includes(p)))
    } else {
      setSelectedPermissions((prev) => [...new Set([...prev, ...categoryPermissionIds])])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Roles & Permissions</h2>
          <p className="text-sm text-muted-foreground">
            Manage roles and their associated permissions
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                Define a new role with specific permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Role Name</Label>
                  <Input
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="e.g. Editor"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newRoleDescription}
                    onChange={(e) => setNewRoleDescription(e.target.value)}
                    placeholder="Describe what this role can do..."
                    rows={2}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Permissions</Label>
                {Object.entries(groupedPermissions).map(([category, perms]) => {
                  const allSelected = perms.every((p) => selectedPermissions.includes(p.id))
                  const someSelected = perms.some((p) => selectedPermissions.includes(p.id))

                  return (
                    <div key={category} className="space-y-2">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => toggleCategoryPermissions(category)}
                      >
                        <Checkbox
                          checked={allSelected}
                          className={cn(someSelected && !allSelected && "opacity-50")}
                        />
                        <span className="font-medium">{category}</span>
                      </div>
                      <div className="ml-6 grid gap-2 sm:grid-cols-2">
                        {perms.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => togglePermission(permission.id)}
                          >
                            <Checkbox checked={selectedPermissions.includes(permission.id)} />
                            <span className="text-sm">{permission.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRole} disabled={!newRoleName.trim()}>
                Create Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {role.name}
                      {role.isSystem && (
                        <Badge variant="outline" className="text-xs">
                          System
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Users className="h-3 w-3" />
                      {role.userCount} users
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(role)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Role
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      View Users
                    </DropdownMenuItem>
                    {!role.isSystem && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setRoleToDelete(role.id)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Role
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 5).map((permId) => {
                  const perm = permissions.find((p) => p.id === permId)
                  return (
                    <Badge key={permId} variant="secondary" className="text-xs">
                      {perm?.name}
                    </Badge>
                  )
                })}
                {role.permissions.length > 5 && (
                  <Badge variant="secondary" className="text-xs">
                    +{role.permissions.length - 5} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingRole} onOpenChange={(open) => !open && setEditingRole(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update role details and permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Role Name</Label>
                <Input
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  disabled={editingRole?.isSystem}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Permissions</Label>
              {Object.entries(groupedPermissions).map(([category, perms]) => {
                const allSelected = perms.every((p) => selectedPermissions.includes(p.id))
                const someSelected = perms.some((p) => selectedPermissions.includes(p.id))

                return (
                  <div key={category} className="space-y-2">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => toggleCategoryPermissions(category)}
                    >
                      <Checkbox
                        checked={allSelected}
                        className={cn(someSelected && !allSelected && "opacity-50")}
                      />
                      <span className="font-medium">{category}</span>
                    </div>
                    <div className="ml-6 grid gap-2 sm:grid-cols-2">
                      {perms.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => togglePermission(permission.id)}
                        >
                          <Checkbox checked={selectedPermissions.includes(permission.id)} />
                          <span className="text-sm">{permission.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingRole(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditRole}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this role? Users with this role will be reassigned to the default member role.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole} className="bg-destructive text-destructive-foreground">
              Delete Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
