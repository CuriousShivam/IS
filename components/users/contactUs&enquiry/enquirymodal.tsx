'use client';
import React from "react";
import { useForm } from 'react-hook-form';
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Button, Input, Select, SelectItem, Textarea
} from "@heroui/react";
import { useDisclosure } from "@heroui/modal";
import toast from "react-hot-toast";

interface EnquiryModalProps {
    submitAction: (data: any) => Promise<{ success: boolean; message?: string }>;
}

export default function EnquiryModal({ submitAction }: EnquiryModalProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            insuranceType: '',
            preferredContactTime: '',
            requirements: ''
        }
    });

    const insuranceTypes = [
        { label: "Health Insurance", value: "HEALTH" },
        { label: "Life Insurance", value: "LIFE" },
        { label: "Vehicle Insurance", value: "VEHICLE" },
        { label: "Term Insurance", value: "TERM" }
    ];

    const onSubmit = async (data: any) => {
        const result = await submitAction(data);
        if (result.success) {
            toast.success("Enquiry sent successfully!");
            reset();
            onOpenChange();
        } else {
            toast.error(result.message || "Failed to send enquiry");
        }
    };

    return (
        <>
            <Button onPress={onOpen} color="primary" variant="shadow" className="font-bold">
                Contact Us
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="center" className="max-w-md">
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalHeader className="flex flex-col gap-1 text-2xl text-blue-900">
                                Consultation Enquiry
                            </ModalHeader>

                            <ModalBody className="gap-4">
                                {/* Name Validation */}
                                <Input
                                    {...register("fullName", {
                                        required: "Name is required",
                                        minLength: { value: 3, message: "Minimum 3 characters required" }
                                    })}
                                    label="Full Name"
                                    variant="bordered"
                                    isInvalid={!!errors.fullName}
                                    errorMessage={errors.fullName?.message as string}
                                />

                                <div className="flex flex-col sm:flex-row gap-3">
                                    {/* Email Validation */}
                                    <Input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        type="email"
                                        label="Email"
                                        variant="bordered"
                                        isInvalid={!!errors.email}
                                        errorMessage={errors.email?.message as string}
                                    />
                                    {/* Phone Validation (10 Digits) */}
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
                                        label="Phone" placeholder="eg. 9876543210" variant="bordered"  type="tel"
                                        isInvalid={!!errors.phone} errorMessage={errors.phone?.message as string}
                                    />
                                </div>

                                {/* Select Validation */}
                                <Select
                                    {...register("insuranceType", { required: "Please select a category" })}
                                    label="Insurance Category"
                                    variant="bordered"
                                    isInvalid={!!errors.insuranceType}
                                    errorMessage={errors.insuranceType?.message as string}
                                >
                                    {insuranceTypes.map((type) => (
                                        <SelectItem key={type.value} >
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Input
                                    {...register("preferredContactTime", {
                                        maxLength: { value: 30, message: "Too long (Max 30 chars)" }
                                    })}
                                    label="Best Time to Call"
                                    placeholder="e.g. Evenings"
                                    variant="bordered"
                                    isInvalid={!!errors.preferredContactTime}
                                    errorMessage={errors.preferredContactTime?.message as string}
                                />

                                {/* Textarea Validation */}
                                <Textarea
                                    {...register("requirements", {
                                        required: "Please describe your needs",
                                        minLength: { value: 10, message: "Minimum 10 characters required" },
                                        maxLength: { value: 500, message: "Keep it under 500 characters" }
                                    })}
                                    label="How can we help?"
                                    variant="bordered"
                                    isInvalid={!!errors.requirements}
                                    errorMessage={errors.requirements?.message as string}
                                />
                            </ModalBody>

                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    type="submit"
                                    isLoading={isSubmitting}
                                    className="font-bold"
                                >
                                    Submit Request
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}