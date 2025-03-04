"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table-functions/DataTableColumnHeader";
import EditDialog from "@/Components/common/EditDialog";
import EditAccountForm from "./EditAccountForm";
// import EditUserForm from "./EditUserForm";

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Full Name" />
        ),
        cell: ({ row }) => {
            const { lastname, firstname, middlename, extension } = row.original;
            return `${lastname}, ${firstname} ${
                middlename ? middlename.charAt(0) + "." : ""
            } ${extension ?? ""}`.trim();
        },
    },
    {
        accessorKey: "username",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Username" />
        ),
    },
    {
        accessorKey: "group1Name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Access" />
        ),
    },

    {
        accessorKey: "is_active",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Is Active" />
        ),
        cell: ({ row }) =>
            row.original.is_active ? (
                <span className="text-green-500 font-bold">Yes</span>
            ) : (
                <span className="text-gray-500">No</span>
            ),
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => {
            const account = row.original;
            const { delete: destroy } = useForm();
            const [open, setOpen] = useState(false);
            const [editOpen, setEditOpen] = useState(false);

            const ConfirmDelete = () => {
                destroy(
                    route("accounts.destroy", {
                        account: account.useraccountid,
                    }),
                    {
                        onSuccess: () => setOpen(false),
                    }
                );
            };

            return (
                <>
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setEditOpen(true)}>
                                Edit
                            </DropdownMenuItem>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete this entry.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={ConfirmDelete}
                                            className="bg-red-500"
                                        >
                                            Confirm
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Edit Dialog outside DropdownMenu */}
                    <EditDialog
                        title="Account"
                        open={editOpen}
                        onOpenChange={setEditOpen}
                    >
                        <EditAccountForm account={account} />
                    </EditDialog>
                </>
            );
        },
    },
];
