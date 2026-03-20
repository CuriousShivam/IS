// import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/components/ui/login-form';
import { Suspense } from 'react';
import LoginFormClient from "@/components/ui/login-form";
import { loginAction } from "./actions";

export default function LoginPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
            {/* The Server Action is passed to the Client Component */}
            <LoginFormClient action={loginAction} />
        </div>
    );
}
