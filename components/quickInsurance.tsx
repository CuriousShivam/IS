'use client'
import {Card, CardBody, Tabs, Tab, Form} from "@heroui/react";
import Image from "next/image";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import { useState, useEffect } from 'react'

// Custom hook for responsive detection
function useIsSmallDevice() {
    const [isSmallDevice, setIsSmallDevice] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallDevice(window.innerWidth < 580) // md breakpoint
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])
    console.log(isSmallDevice)
    return isSmallDevice
}

const Title = ({path, title}) => {
    return (
        <div className="flex items-center">
            <div className="relative w-8 h-8">
                <Image
                    src={`/${path}.svg`} // ✅ fixed: must use absolute path from /public
                    alt={title}
                    fill
                    className="object-contain"
                />
            </div>
            &nbsp;{title}
        </div>
    );
};

const InputMobileNumber = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    return (
        <Input
            isRequired
            label="Mobile Number"
            name="mobileNumber"
            type="text" // use text, not number (to avoid leading 0 issues)
            errorMessage="Enter a valid 10-digit Mobile Number"
            placeholder="e.g. 9301231230"
            inputMode="numeric"
            maxLength={10} // Prevent typing more than 10 digits
            validate={(value: string) => {
                if (!value) return false;
                const cleaned = value.replace(/[\s-]/g, "");
                const re = /^[6-9]\d{9}$/;
                // console.log(re.test(cleaned));
                return re.test(cleaned) ? null : "Enter a valid 10-digit Mobile Number";
            }}
            onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, "");
                setMobileNumber(digitsOnly);
            }}
            value={mobileNumber}
            onBlur={(e) => e.target.reportValidity?.()}
        />
    );
}

const InputName = () => {
    return (<Input
        isRequired
        label="Name"
        name="username"
        type="text"
        placeholder="e.g. Shubham Jaiswal"
    />);
}

const InputAge = () => {
    return (
        <Input
            isRequired
            label="Age"
            name="age"
            placeholder="e.g. 22"
            type="number"
            min={1}
            max={120}
        />
    )
}

const InputProfession = () => {
    return (<Input
        isRequired
        label="Work Profession"
        placeholder="e.g. Doctor, Engineer"
        name="profession"
        type="text"
    />)
}

const VehicleForm = () => {
    const [action, setAction] = useState<string | null>(null);
    const [vehicleNumber, setVehicleNumber] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setAction(`submit ${JSON.stringify(data)}`);
    };

    const formatVehicleNumber = (value: string) => {
        const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

        // Auto-format: MH12AB1234 → MH 12 AB 1234
        if (cleaned.length <= 2) return cleaned;
        if (cleaned.length <= 4) return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
        if (cleaned.length <= 6) return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4)}`;
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6)}`;
    };


    return (<Form
        className="w-full max-w-xs flex flex-col gap-4"
        onReset={() => setAction("reset")}
        onSubmit={handleSubmit}
    >
        <InputName/>

        <InputMobileNumber/>

        <Input
            isRequired
            label="Vehicle Number"
            name="vehicleNumber"
            type="text"
            errorMessage="Enter a valid Vehicle Number"
            placeholder="e.g. MH12AB1234"
            value={formatVehicleNumber(vehicleNumber)}
            validate={(value: string) => {
                if (!value) return "Vehicle number is required";

                const cleaned = value.replace(/[\s-]/g, "");
                const re = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{1,4}$/;

                return re.test(cleaned) ? null : "Enter a valid Vehicle Number";
            }}
            onChange={(e) => {
                const cleaned = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 10);
                setVehicleNumber(cleaned);
            }}
        />
        <div className="flex gap-2">
            <Button color="primary" type="submit">Submit</Button>
            <Button type="reset" variant="flat">Reset</Button>
        </div>
    </Form>);
}

const HealthForm = () => {
    const [action, setAction] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setAction(`submit ${JSON.stringify(data)}`);
    };
    return (

        <Form
            className="w-full max-w-xs flex flex-col gap-4"
            onReset={() => setAction("reset")}
            onSubmit={handleSubmit}
        >
            <InputName/>
            <InputAge/>
            <InputProfession/>
            <Input label="Pre-Disease" name="preDisease" type="text"/>
            <InputMobileNumber/>
            <div className="flex gap-2">
                <Button color="primary" type="submit">Submit</Button>
                <Button type="reset" variant="flat">Reset</Button>
            </div>
        </Form>
    );
}

const TermForm = () => {
    const [action, setAction] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        setAction(`submit ${JSON.stringify(data)}`);
    };
    return (
        <Form
            className="w-full max-w-xs flex flex-col gap-4"
            onReset={() => setAction("reset")}
            onSubmit={handleSubmit}
        >
            <InputName/>
            <InputAge/>
            <InputProfession/>

            <InputMobileNumber/>

            <div className="flex gap-2">
                <Button color="primary" type="submit">Submit</Button>
                <Button type="reset" variant="flat">Reset</Button>
            </div>
        </Form>
    )
}

export default function QuickInsurance() {
    const isVertical = useIsSmallDevice()

    return (
        <Tabs
            aria-label="Options"
            className={'flex justify-center flex-wrap'}
            isVertical={isVertical}
        >
            {/* Your existing tabs content remains the same */}
            <Tab key="bike" className={` ${isVertical ? 'h-max': 'm-1'}`} title={
                <>
                    <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'}`}>
                        <Title path="motorcycle" title="Bike"/>
                        <div className={'border-l-2 border-  mx-2'}></div>
                        <Title path="car-profile" title="Car"/>
                        <div className={'border-l-2 border-red-500 mx-2'}></div>
                        <Title path="truck" title="Com."/>
                    </div>
                </>
            }>
                <Card>
                    <CardBody className={'flex items-center'}>
                        <VehicleForm/>
                    </CardBody>
                </Card>
            </Tab>

            <Tab key="health" className={isVertical ? "" : 'm-1'} title={<Title path="stethoscope" title="Health"/>}>
                <Card >
                    <CardBody className={'flex items-center'}>
                        <HealthForm/>
                    </CardBody>
                </Card>
            </Tab>

            <Tab key="termLife" className={isVertical ? "" : 'm-1'} title={<Title path="heartbeat" title="Life"/>}>
                <Card>
                    <CardBody className={'flex items-center'}>
                        <TermForm/>
                    </CardBody>
                </Card>
            </Tab>
        </Tabs>
    );
}

// export default function QuickInsurance() {
//
//
//     return (
//
//         <Tabs aria-label="Options" className={'flex justify-center flex-wrap'} isVertical={true}>
//             {/* Bike */}
//             <Tab key="bike" className={'m-1'} title={
//                 <>
//                     <div className={'flex'}>
//                         <Title path="motorcycle" title="Bike"/>
//                         <div className={'border-l-2 border-red-500 mx-2'}></div>
//                         <Title path="car-profile" title="Car"/>
//                         <div className={'border-l-2 border-red-500 mx-2'}></div>
//                         <Title path="truck" title="Commercial"/>
//                     </div>
//                 </>
//             }>
//                 <Card>
//                     <CardBody>
//                         <VehicalForm/>
//                     </CardBody>
//                 </Card>
//             </Tab>
//
//             {/* Health */}
//             <Tab key="health" className={'m-1'} title={<Title path="stethoscope" title="Health"/>}>
//                 <Card>
//                     <CardBody>
//                         <HealthForm/>
//                     </CardBody>
//                 </Card>
//             </Tab>
//
//             {/* Term Life */}
//             <Tab key="termLife" className={'m-1'} title={<Title path="heartbeat" title="Term Life"/>}>
//                 <Card>
//                     <CardBody>
//                         <TermForm/>
//                     </CardBody>
//                 </Card>
//             </Tab>
//         </Tabs>
//
//     );
// }
{/* Car */}
{/*<Tab key="car" title={<Title path="car-profile" title="Car"/>}>*/}
{/*    <Card>*/}
{/*        <CardBody>*/}
{/*            /!* Reuse same form as Bike *!/*/}
{/*            <VehicalForm/>*/}
{/*        </CardBody>*/}
{/*    </Card>*/}
{/*</Tab>*/}


{/* Commercial */}
{/*<Tab key="commercial" title={<Title path="truck" title="Commercial"/>}>*/}
{/*    <Card>*/}
{/*        <CardBody>*/}
{/*            /!* Reuse same form *!/*/}
{/*            <VehicalForm/>*/}
{/*        </CardBody>*/}
{/*    </Card>*/}
{/*</Tab>*/}