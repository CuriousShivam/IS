'use client';

import { Card, CardHeader, CardBody, Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function LoginFormClient({ action }: { action: any }) {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleForm = async (data: any) => {

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        const result = await action(formData);
        console.log( "Success: ", result.success);
        if (result?.success) {
            router.push("/admin");
        } else {
            alert(result?.message);
        }
    };

    return (
        <Card className="w-full max-w-[400px] shadow-xl">
            <CardHeader className="flex flex-col gap-1 items-center pt-8">
                <h1 className="text-2xl font-bold text-blue-800">Admin Login</h1>
            </CardHeader>
            <CardBody className="pb-8">
                <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
                    <Input
                        {...register("email", { required: true })}
                        label="Email"
                        variant="bordered"
                    />
                    <Input
                        {...register("password", { required: true, minLength: 7 })}
                        type="password"
                        label="Password"
                        variant="bordered"
                        errorMessage={errors.password && "Minimum 12 characters required [cite: 74]"}
                    />
                    <Button type="submit" color="primary">Secure Login</Button>
                </form>
            </CardBody>
        </Card>
    );
}