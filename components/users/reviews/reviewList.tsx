"use client"

import { Card, CardBody, CardHeader, CardFooter, User, Chip, Divider } from "@heroui/react";

export default function ReviewList({ reviews }: { reviews: any[] }) {
    return (
        <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            {reviews.length > 0 ? (
                reviews.map((rev) => (
                    <Card key={rev.id} className="border-none shadow-sm bg-white hover:shadow-md transition-all">
                        <CardHeader className="flex justify-between items-start px-6 pt-6 z-auto">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-bold text-gray-900b ">{rev.reviewTitle}</h1>
                                    <Chip
                                        size="sm"
                                        variant="flat"
                                        color={rev.serviceType === 'Life' ? 'success' : 'primary'}
                                        className="capitalize font-semibold text-[10px]"
                                    >
                                        {rev.serviceType}
                                    </Chip>
                                </div>
                                {/* Star Rating Display */}
                                <div className="flex text-yellow-500 text-lg">
                                    {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                                </div>
                            </div>
                            <time className="text-gray-400 text-xs font-medium">
                                {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </time>
                        </CardHeader>

                        <CardBody className="px-6 py-2">
                            <p className="text-gray-700 leading-relaxed italic">
                                "{rev.reviewText}"
                            </p>
                        </CardBody>

                        <Divider className="my-2 mx-6 opacity-50" />

                        <CardFooter className="px-6 pb-6 pt-2">
                            <User
                                name={rev.customerName}
                                description="Verified Client"
                                avatarProps={{
                                    size: "sm",
                                    src: `https://ui-avatars.com/api/?name=${rev.customerName}&background=random`
                                }}
                            />
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-xl border-gray-100">
                    <p className="text-gray-400">No approved reviews yet. Be the first to share your experience!</p>
                </div>
            )}
        </div>
    );
}