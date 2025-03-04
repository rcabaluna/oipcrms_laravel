import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/Components/ui/dialog";
import AddDialogFormField from "@/Components/common/AddDialogFormField";
import { useForm } from "@inertiajs/react";

const AddAccountForm = ({ onSuccess }) => {
    const [users, setUsers] = useState([]); // Store available users
    const [loading, setLoading] = useState(true); // Loading state

    const { data, setData, post, processing, errors } = useForm({
        userid: "",
        username: "",
        password: "",
        useraccess: "",
        is_active: true,
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/available-users");
                const result = await response.json();
                setUsers(result); // Store users in state
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("accounts.store"), {
            data,
            preserveScroll: true,
            onSuccess: () => {
                if (onSuccess) {
                    onSuccess(); // Close dialog if provided
                }
            },
            onError: (errors) => {
                console.error("Submission failed:", errors);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <AddDialogFormField
                    id="userid"
                    label="User"
                    type="select"
                    value={data.userid}
                    onValueChange={(value) => setData("userid", Number(value))}
                    options={users.map((user) => ({
                        value: user.userid,
                        label: `${user.firstname} ${user.lastname}`,
                    }))}
                    error={errors.userid}
                    disabled={loading} // Disable if still loading
                />
                <AddDialogFormField
                    id="username"
                    label="Username"
                    type="text"
                    value={data.username}
                    onChange={(e) => setData("username", e.target.value)}
                    error={errors.username}
                />
                <AddDialogFormField
                    id="password"
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    error={errors.password}
                />
            </div>
            <AddDialogFormField
                id="is_active"
                label="Is Active"
                type="checkbox"
                checked={data.is_active}
                onCheckedChange={(value) => setData("is_active", value)}
            />
            <DialogFooter>
                <Button disabled={processing || loading} type="submit">
                    {processing ? "Submitting..." : "Submit"}
                </Button>
            </DialogFooter>
        </form>
    );
};

export default AddAccountForm;
