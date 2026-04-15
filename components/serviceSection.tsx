import {Heart, ShieldCheck, Car, CheckCircle2} from "lucide-react";

const services = [
    {
        title: "Health Insurance",
        icon: <Heart className="text-emerald-600"/>,
        color: "bg-emerald-50",
        borderColor: "hover:border-emerald-200",
        points: ["Critical Illness Coverage", "Cashless Hospitalization", "Tax Benefits (Sec 80D)"],
        description: "Secure your family's health with comprehensive medical coverage."
    },
    {
        title: "Term Life Insurance",
        icon: <ShieldCheck className="text-rose-600"/>,
        color: "bg-rose-50",
        borderColor: "hover:border-rose-200",
        points: ["Family Financial Security", "High Sum Assured", "Loan & Debt Protection"],
        description: "Ensure a stable financial future for your loved ones in your absence."
    },
    {
        title: "Motor Insurance",
        icon: <Car className="text-indigo-600"/>,
        color: "bg-indigo-50",
        borderColor: "hover:border-indigo-200",
        points: ["Third-Party Liability", "Own Damage Protection", "No Claim Bonus (NCB)"],
        description: "Stay compliant and protected against accidents and theft."
    }
];

export default function ServicesSection() {
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-10">

                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Coverage We Provide
                    </h2>
                    <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                        Tailored insurance consultation to protect what matters most to you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`group p-8 bg-white border-2 border-transparent ${service.borderColor} rounded-3xl transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl`}
                        >
                            <div>
                                <div
                                    className={`w-14 h-14 ${service.color} rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:rotate-6`}>
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                            </div>
                            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="space-y-3">
                                {service.points.map((point, pIdx) => (
                                    <li key={pIdx} className="flex items-center text-gray-600 text-sm">
                                        <CheckCircle2 size={16} className="mr-3 text-blue-500 opacity-70"/>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className="mt-8 w-full py-3 rounded-xl border border-gray-100 text-blue-600 font-semibold text-sm transition-colors hover:bg-blue-50">
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}