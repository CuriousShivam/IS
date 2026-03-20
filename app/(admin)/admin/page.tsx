 import {Button} from "@heroui/button";
import RTE from '@/components/rte'
import Link from "next/link";
 import {cookies} from "next/headers";
 import {redirect} from "next/navigation";

export default () => {
    return (<>
        <div className={`text-center `}>
            <p className={`bg-green-300 m-1 p-1 rounded-lg underline`}><Link href='/admin/new-blog' className={`text-xl text-green-700`}>Create New Blog</Link></p>
        <p className={`bg-green-300 m-1 p-1 rounded-lg underline`}><Link href='/admin/edit-blog' className={`text-xl text-green-700`}>Edit Old Blog</Link></p>
        </div>
        <form className={`absolute bottom-[20px] right-[20px]`} action={async () => {
            'use server';
            const cookieStore = await cookies();
            const sessionId = cookieStore.get("JSESSIONID")?.value;
            //Delete the cookie locally
            cookieStore.delete("JSESSIONID");

            // 3. Redirect to login page
            redirect("/login");
        }}><Button type={'submit'}>SignOut</Button></form>


    </>)
}