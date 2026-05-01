import Link from "next/link";
import { getBlogsAction } from "@/app/(admin)/admin/actions";

export const dynamic = 'force-dynamic';

export default async function EditBlogPage() {
    // 1. Fetch data directly on the server
    const res = await getBlogsAction();

    // 2. Extract the data (Server Actions usually return an object like { success, data })
    const blogs = res?.data || [];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Edit Blogs</h1>

            {blogs.length === 0 ? (
                <div className="p-4 bg-gray-100 rounded">
                    <p>No blogs found</p>
                </div>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Edit Link (ID)</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Created At</th>
                            <th scope="col" className="px-6 py-3">Updated At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {blogs.map((blog: any) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={blog.id}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {blog.title}
                                </th>
                                <td className="px-6 py-4">
                                    <Link href={`/admin/edit-blog/${blog.id}`}>
                                            <span className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs cursor-pointer inline-block">
                                                Edit {blog.id.substring(0, 8)}...
                                            </span>
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs ${blog.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {blog.status}
                                        </span>
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(blog.updatedAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}