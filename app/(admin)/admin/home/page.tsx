import {signOut} from "@/auth";
import {Button} from "@heroui/button";
export default () => {
    return (<>
        <form action={async ()=>{
            'use server';
            await signOut();
        }}><Button>SignOut</Button></form>
    </>)
}