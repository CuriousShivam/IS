

'use client'
import {Card, CardBody} from "@heroui/react";

import {Form, Input, Button} from "@heroui/react";
import React from "react";



export default function App() {
    const [action, setAction] = React.useState(null);
    return (
        <Card>
            <CardBody>
                <Form
                    className="w-full max-w-xs flex flex-col gap-4"
                    onReset={() => setAction("reset")}
                    onSubmit={(e) => {
                        e.preventDefault();

                        let data = Object.fromEntries(new FormData(e.currentTarget));
                        console.log(data)
                        setAction(`submit ${JSON.stringify(data)}`);
                    }}
                >
                    <Input
                        isRequired
                        errorMessage="Please enter a valid email"
                        label="Email"
                        labelPlacement="outside"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                    />
                    <Input
                        isRequired
                        // errorMessage="Please enter a valid username"
                        label="Password"
                        labelPlacement="outside"
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                    />


                    <div className="flex gap-2">
                        <Button color="primary" type="submit">
                            Submit
                        </Button>
                        <Button type="reset" variant="flat">
                            Reset
                        </Button>
                    </div>
                </Form>
            </CardBody>
        </Card>
    );
}









// 'use client';
//
// import { lusitana } from '@/config/fonts';
// import {
//     AtSymbolIcon,
//     KeyIcon,
//     ExclamationCircleIcon,
// } from '@heroicons/react/24/outline';
// import { ArrowRightIcon } from '@heroicons/react/20/solid';
// // import { Button } from '@/app/ui/button';
// import React, { useActionState } from 'react';
// // import { authenticate } from '@/app/lib/actions';
// import { useSearchParams } from 'next/navigation';
//
// import clsx from 'clsx';
//
// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//     children: React.ReactNode;
// }
//
// export function Button({ children, className, ...rest }: ButtonProps) {
//     return (
//         <button
//             {...rest}
//             className={clsx(
//                 'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
//                 className,
//             )}
//         >
//             {children}
//         </button>
//     );
// }
//
//
// export default function LoginForm() {
//     const authenticate = () => console.log("submit clicked")
//     const searchParams = useSearchParams();
//     const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
//     console.log('callbackUrl', callbackUrl);
//     const [errorMessage, formAction, isPending] = useActionState(
//         authenticate,
//         undefined,
//     );
//
//     return (
//         <form action={formAction} className="space-y-3">
//             <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//                 <h1 className={`${lusitana.className} mb-3 text-2xl`}>
//                     Please log in to continue.
//                 </h1>
//                 <div className="w-full">
//                     <div>
//                         <label
//                             className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//                             htmlFor="email"
//                         >
//                             Email
//                         </label>
//                         <div className="relative">
//                             <input
//                                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                                 id="email"
//                                 type="email"
//                                 name="email"
//                                 placeholder="Enter your email address"
//                                 required
//                             />
//                             <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//                         </div>
//                     </div>
//                     <div className="mt-4">
//                         <label
//                             className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//                             htmlFor="password"
//                         >
//                             Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                                 id="password"
//                                 type="password"
//                                 name="password"
//                                 placeholder="Enter password"
//                                 required
//                                 minLength={6}
//                             />
//                             <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//                         </div>
//                     </div>
//                 </div>
//                 <input type="hidden" name="redirectTo" value={callbackUrl} />
//                 <Button className="mt-4 w-full" aria-disabled={isPending}>
//                     Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//                 </Button>
//                 <div
//                     className="flex h-8 items-end space-x-1"
//                     aria-live="polite"
//                     aria-atomic="true"
//                 >
//                     {errorMessage && (
//                         <>
//                             <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
//                             <p className="text-sm text-red-500">{errorMessage}</p>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </form>
//     );
// }