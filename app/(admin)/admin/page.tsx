'use client';
import React from "react";
import { Card, CardHeader, CardBody, Button, Divider } from "@heroui/react";
import Link from "next/link";
import {
    PlusIcon,
    EditIcon,
    MessageSquare,
    Star,
    LogOut,
    LayoutDashboard
} from "lucide-react"; // Install lucide-react or use HeroIcons

export default function AdminDashboard({ signOutAction }: { signOutAction: any }) {

    const adminTools = [
        {
            title: "Create New Blog",
            desc: "Write and publish a new insurance guide.",
            href: "/admin/new-blog",
            icon: <PlusIcon className="text-green-600" />,
            color: "bg-green-50"
        },
        {
            title: "Edit Old Blogs",
            desc: "Update or remove existing blog posts.",
            href: "/admin/edit-blog",
            icon: <EditIcon className="text-blue-600" />,
            color: "bg-blue-50"
        },
        {
            title: "Customer Enquiries",
            desc: "View and manage new leads from 'Contact Us'.",
            href: "/admin/enquiry",
            icon: <MessageSquare className="text-purple-600" />,
            color: "bg-purple-50"
        },
        {
            title: "Client Reviews",
            desc: "Approve or feature testimonials for the site.",
            href: "/admin/reviews",
            icon: <Star className="text-warning-600" />,
            color: "bg-amber-50"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
            <header className="max-w-7xl mx-auto flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <LayoutDashboard className="text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Admin Control Center
                    </h1>
                </div>

                <form action={signOutAction}>
                    <Button
                        type="submit"
                        color="danger"
                        variant="flat"
                        startContent={<LogOut size={18} />}
                        className="font-bold"
                    >
                        Sign Out
                    </Button>
                </form>
            </header>

            <main className="max-w-7xl mx-auto">
                {/* 1. Quick Stats Section (Visual Placeholder for BCA Project) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <Card className="border-none shadow-sm bg-white">
                        <CardBody className="p-6">
                            <p className="text-sm font-medium text-gray-500 uppercase">Total Enquiries</p>
                            <h2 className="text-3xl font-bold text-gray-800">24</h2>
                        </CardBody>
                    </Card>
                    <Card className="border-none shadow-sm bg-white">
                        <CardBody className="p-6">
                            <p className="text-sm font-medium text-gray-500 uppercase">Pending Reviews</p>
                            <h2 className="text-3xl font-bold text-amber-600">08</h2>
                        </CardBody>
                    </Card>
                    <Card className="border-none shadow-sm bg-white text-blue-600">
                        <CardBody className="p-6">
                            <p className="text-sm font-medium text-gray-400 uppercase">Active Blogs</p>
                            <h2 className="text-3xl font-bold">12</h2>
                        </CardBody>
                    </Card>
                </div>

                <Divider className="my-8 opacity-50" />

                {/* 2. Management Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {adminTools.map((tool, index) => (
                        <Link href={tool.href} key={index}>
                            <Card
                                isPressable
                                className="h-full border-none shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                            >
                                <CardHeader className={`${tool.color} p-4 flex gap-3 items-center`}>
                                    <div className="p-2 bg-white rounded-md shadow-sm">
                                        {tool.icon}
                                    </div>
                                    <h4 className="font-bold text-gray-800">{tool.title}</h4>
                                </CardHeader>
                                <CardBody className="p-4">
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {tool.desc}
                                    </p>
                                </CardBody>
                            </Card>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}