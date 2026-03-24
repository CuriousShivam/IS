"use client"
import React, { useState } from "react";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    User, Chip, Switch, Tooltip
} from "@heroui/react";
import toast from "react-hot-toast";

export default function ReviewTable({ initialReviews, updateAction }: any) {
    const [reviews, setReviews] = useState(initialReviews);

    const handleToggle = async (id: string, field: string, currentValue: any) => {
        const newValue = field === 'approvalStatus'
            ? (currentValue === 'approved' ? 'pending' : 'approved')
            : !currentValue;

        const res = await updateAction(id, { [field]: newValue });

        if (res.success) {
            setReviews(reviews.map((r: any) => r.id === id ? { ...r, [field]: newValue } : r));
            toast.success("Updated successfully");
        } else {
            toast.error("Update failed");
        }
    };

    return (
        <Table
            aria-label="Reviews management table"
            isHeaderSticky
            classNames={{
                base: "max-h-[calc(100vh-200px)] overflow-scroll", // Makes header stick to top of this container
                table: "min-w-[1000px]",
            }}
        >
            <TableHeader>
                <TableColumn>CUSTOMER</TableColumn>
                <TableColumn>SERVICE</TableColumn>
                <TableColumn>REVIEW DETAILS</TableColumn>
                <TableColumn>SUBMITTED</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>FEATURED</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No reviews to display."}>
                {reviews.map((rev: any) => (
                    <TableRow key={rev.id}>
                        {/* Customer Info */}
                        <TableCell>
                            <User
                                name={rev.customerName}
                                description={rev.customerEmail}
                                avatarProps={{ size: "sm", src: `https://ui-avatars.com/api/?name=${rev.customerName}` }}
                            />
                            <p className="text-[10px] text-gray-400 mt-1">{rev.phone}</p>
                        </TableCell>

                        {/* Service Type */}
                        <TableCell>
                            <Chip size="sm" variant="flat" color="primary">{rev.serviceType}</Chip>
                        </TableCell>

                        {/* Review Content */}
                        <TableCell>
                            <div className="max-w-[200px]">
                                <p className="font-bold text-tiny truncate">{rev.reviewTitle}</p>
                                <Tooltip content={rev.reviewText}>
                                    <p className="text-tiny text-gray-500 line-clamp-1 cursor-help">{rev.reviewText}</p>
                                </Tooltip>
                            </div>
                        </TableCell>

                        {/* Submission Date */}
                        <TableCell className="text-tiny text-gray-500">
                            {new Date(rev.createdAt).toLocaleDateString('en-IN')}
                        </TableCell>

                        {/* Approval Toggle */}
                        <TableCell>
                            <Switch
                                size="sm"
                                color="success"
                                isSelected={rev.approvalStatus === 'approved'}
                                onValueChange={() => handleToggle(rev.id, 'approvalStatus', rev.approvalStatus)}
                            />
                        </TableCell>

                        {/* Featured Toggle */}
                        <TableCell>
                            <Switch
                                size="sm"
                                color="warning"
                                isSelected={rev.isFeatured}
                                onValueChange={() => handleToggle(rev.id, 'isFeatured', rev.isFeatured)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}