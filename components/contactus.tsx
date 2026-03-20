// components/EnquiryModal.tsx
'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // [cite: 156]
import {useState} from "react";
import clsx from "clsx";
// components/EnquiryModal.tsx
import React from "react";
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Button, Input, Select, SelectItem, Textarea
} from "@heroui/react";
import {useDisclosure} from "@heroui/modal";


export default function ContactUsPage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
return (<><Button
    onPress={onOpen}
    className={clsx(
        " px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary" )}
>
    Contact Us
</Button>
    <EnquiryModal isOpen={isOpen} onOpenChange={onOpenChange}  />
</>);

}


  function EnquiryModal({ isOpen, onOpenChange }) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const insuranceTypes = [
        { label: "Health Insurance", value: "Health" },
        { label: "Life Insurance", value: "Life" },
        { label: "Term Insurance", value: "Term" },
        { label: "Vehicle Insurance", value: "Vehicle" }
    ];

    const onSubmit = async (data) => {
        try {
            // Endpoint for public consultation requests [cite: 213, 650]
            await axios.post("http://localhost:8080/api/public/enquiries", data);
            alert("Enquiry submitted! The advisor will contact you soon.");
            reset();
            onOpenChange(false);
        } catch (error) {
            console.error("Submission error", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="center">
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1">Consultation Enquiry</ModalHeader>
                        <ModalBody>
                            <Input
                                {...register("fullName", { required: "Full name is required" })}
                                label="Full Name"
                                placeholder="Enter your name"
                                variant="bordered"
                                isInvalid={!!errors.fullName}
                                errorMessage={errors.fullName?.message as string}
                            />
                            <div className="flex gap-4">
                                <Input
                                    {...register("email", { required: "Email is required" })}
                                    type="email"
                                    label="Email"
                                    placeholder="name@example.com"
                                    variant="bordered"
                                />
                                <Input
                                    {...register("phone", { required: "Phone is required" })}
                                    label="Phone"
                                    placeholder="Your mobile number"
                                    variant="bordered"
                                />
                            </div>
                            <Select
                                {...register("insuranceType")}
                                label="Insurance Category"
                                placeholder="Select insurance type"
                                variant="bordered"
                            >
                                {insuranceTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Textarea
                                {...register("requirements", { required: "Please enter your requirements" })}
                                label="Requirements"
                                placeholder="Briefly describe your insurance needs"
                                variant="bordered"
                            />
                            <Input
                                {...register("preferredContactTime")}
                                label="Preferred Contact Time"
                                placeholder="e.g., Weekdays after 5 PM"
                                variant="bordered"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" type="submit" isLoading={isSubmitting}>
                                Submit Request
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}