'use client'
import { useState } from "react";
import { Button, Input, Textarea, Card, CardHeader, CardBody, Select, SelectItem } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

const serviceOptions = [
    { label: "Life Insurance", value: "Life" },
    { label: "Health Insurance", value: "Health" },
    { label: "Motor Insurance", value: "Motor" },
    { label: "Travel Insurance", value: "Travel" },
];

export default function ReviewForm({ submitAction }: { submitAction: any }) {
    const [hover, setHover] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { rating: 5, customerName: '', customerEmail: '', phone: '', reviewTitle: '', reviewText: '', serviceType: '' }
    });

    const onSubmit = async (data: any) => {
        const res = await submitAction(data);
        if (res.success) {
            setSubmitted(true);
            reset();
        } else {
            toast.error(res.msg || "Submission failed");
        }
    };

    return (
        <>
            {/* --- SUCCESS OVERLAY --- */}
            {submitted && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
                    <Card className="max-w-md w-full p-8 border-none shadow-2xl bg-white text-center relative overflow-visible">
                        {/* Close Button */}
                        <button
                            onClick={() => setSubmitted(false)}
                            className="absolute -top-3 -right-3 bg-white hover:bg-gray-100 text-gray-500 rounded-full p-2 shadow-lg border border-gray-100 transition-all z-[110]"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <CardBody className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-2 animate-bounce">
                                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-extrabold text-blue-900">Successfully Received!</h3>
                            <p className="text-gray-600 font-medium">
                                Review submitted! It will appear on the site once verified by our team.
                            </p>
                            <Button
                                color="primary"
                                variant="shadow"
                                className="mt-4 font-bold px-8"
                                onClick={() => setSubmitted(false)}
                            >
                                Back to Page
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            )}

            {/* --- MAIN FORM WITH VALIDATIONS --- */}
            <Card className="p-2 border border-blue-100 shadow-lg">
                <CardHeader className="flex flex-col items-start gap-1 pb-0">
                    <h4 className="text-xl font-bold text-blue-900">Share Your Feedback</h4>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        {/* 1. Rating Validation */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-600">Overall Rating</label>
                            <Controller
                                name="rating"
                                control={control}
                                rules={{ required: "Please select a rating" }}
                                render={({ field }) => (
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} type="button" onClick={() => field.onChange(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}>
                                                <svg viewBox="0 0 24 24" fill={(hover || field.value) >= star ? "#EAB308" : "#E5E7EB"} className="w-8 h-8 transition-colors">
                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            />
                        </div>

                        {/* 2. Name & Email Validations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                {...register("customerName", { required: "Name is required", minLength: { value: 3, message: "Min 3 characters" } })}
                                label="Name" variant="bordered" size="sm"
                                isInvalid={!!errors.customerName} errorMessage={errors.customerName?.message as string}
                            />
                            <Input
                                {...register("customerEmail", {
                                    required: "Email is required",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                                })}
                                label="Email" variant="bordered" size="sm"
                                isInvalid={!!errors.customerEmail} errorMessage={errors.customerEmail?.message as string}
                            />
                        </div>

                        {/* 3. Phone & Service Validations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                {...register("phone", {
                                    required: "Mobile number is required",
                                    pattern: {
                                        // Pattern: Starts with 6, 7, 8, or 9 and followed by 9 more digits
                                        value: /^[6-9]\d{9}$/,
                                        message: "Enter a valid 10-digit Indian phone number (e.g., 9876543210)"
                                    },
                                    minLength: { value: 10, message: "Number must be exactly 10 digits" },
                                    maxLength: { value: 10, message: "Number cannot exceed 10 digits" }
                                })}
                                label="Phone" placeholder="eg. 9876543210" variant="bordered" size="sm" type="tel"
                                isInvalid={!!errors.phone} errorMessage={errors.phone?.message as string}
                            />
                            <Controller
                                name="serviceType"
                                control={control}
                                rules={{ required: "Please select an insurance category" }}
                                render={({ field }) => (
                                    <Select
                                        label="Insurance Type"
                                        placeholder="Select Service"
                                        variant="bordered"
                                        size="sm"
                                        isInvalid={!!errors.serviceType}
                                        errorMessage={errors.serviceType?.message as string}
                                        selectedKeys={field.value ? [field.value] : []}
                                        onSelectionChange={(keys) => {
                                            // Extract the string value from the Selection Set
                                            const value = Array.from(keys).join("");
                                            field.onChange(value);
                                        }}
                                    >
                                        {serviceOptions.map((opt) => (
                                            <SelectItem key={opt.value} textValue={opt.label}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </div>

                        {/* 4. Review Content Validations */}
                        <Input
                            {...register("reviewTitle", { required: "Title is required", maxLength: { value: 50, message: "Max 50 chars" } })}
                            label="Review Title" variant="bordered" size="sm"
                            isInvalid={!!errors.reviewTitle} errorMessage={errors.reviewTitle?.message as string}
                        />

                        <Textarea
                            {...register("reviewText", {
                                required: "Experience text is required",
                                minLength: { value: 10, message: "Please write at least 10 characters" }
                            })}
                            label="Your Experience" variant="bordered" minRows={3}
                            isInvalid={!!errors.reviewText} errorMessage={errors.reviewText?.message as string}
                        />

                        <Button type="submit" color="primary" size="lg" isLoading={isSubmitting} className="font-bold shadow-md bg-blue-600">
                            Submit Review
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </>
    );
}