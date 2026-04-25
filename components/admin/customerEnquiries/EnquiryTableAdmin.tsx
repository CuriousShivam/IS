'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@heroui/react";
// import { DeleteIcon } from "@/components/icons/DeleteIcon"; // Use a simple trash icon
import { deleteEnquiryAction } from "@/app/(admin)/admin/actions";
import toast from "react-hot-toast";

export default function EnquiryTableClient({ initialData }: { initialData: any[] }) {

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this enquiry?")) {
            const success = await deleteEnquiryAction(id);
            if (success) toast.success("Enquiry deleted");
            else toast.error("Failed to delete");
        }
    };

    return (
        <Table aria-label="Enquiry Management Table" shadow="sm">
            <TableHeader>
                <TableColumn>CLIENT</TableColumn>
                <TableColumn>INSURANCE TYPE</TableColumn>
                <TableColumn>PHONE</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No enquiries found."}>
                {initialData.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <User
                                description={item.email}
                                name={item.fullName}
                            />
                        </TableCell>
                        <TableCell>
                            <Chip color="primary" variant="flat" size="sm" className="capitalize">
                                {item.insuranceType}
                            </Chip>
                        </TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>
                            {new Date(item.createdAt).toLocaleDateString('en-IN')}
                        </TableCell>
                        <TableCell>
                            <div className="relative flex items-center gap-2">
                                <Tooltip content="View Requirements">
                                    <button onClick={() => alert(item.requirements)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        👁️
                                    </button>
                                </Tooltip>
                                <Tooltip color="danger" content="Delete Enquiry">
                                    <span
                                        onClick={() => handleDelete(item.id)}
                                        className="text-lg text-danger cursor-pointer active:opacity-50"
                                    >
                                        🗑️
                                    </span>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}