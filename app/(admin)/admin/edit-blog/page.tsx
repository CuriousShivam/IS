// app/admin/blogs/page.tsx (example path)

import {headers} from "next/headers";
import Link from "next/link";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from "@heroui/react";
import {getBlogsAction} from "@/app/(admin)/admin/actions";

export default async function EditBlog() {
    // Fetch directly on the server
      const res = await getBlogsAction();

    const blogs = await res.data;
    return (
        <>
            <h1>Edit Blog</h1>
            {blogs.length === 0 ? (
                <p>No blogs found</p>
            ) : (
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Updated At
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {blogs.map((blog: any, i: number) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={blog.id || i}>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {blog.title}
                            </th>
                            <td className="px-6 py-4"  >
                                <Link href={`/admin/edit-blog/${blog.id}`}>
                                    <button className="px-4 py-2 bg-green-500 text-white rounded">
                                        {blog.id}
                                    </button>
                                </Link>

                            </td>
                            <td className="px-6 py-4">
                                {blog.status}
                            </td>
                            <td className="px-6 py-4">
                                {new Date(blog.createdAt).toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                                {new Date(blog.updatedAt).toLocaleString()}
                            </td>
                        </tr>))}
                        </tbody>
                    </table>
                    </div>
                        )}
                        </>
                        );
                        }
