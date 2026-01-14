import { Clock, Shield, DollarSign } from 'lucide-react';

const benefits = [
    {
        icon: Clock,
        stat: '2-3 hrs',
        title: 'Done in Hours, Not Days',
        text: 'We bring a team with professional equipment. Most homes done by afternoon. You do not schedule weeks out.',
    },
    {
        icon: Shield,
        stat: '2x Check',
        title: 'Inspected Twice. Free Redo if We Miss Anything',
        text: 'We do not trust one pass. Second inspection checks baseboards, corners, under furniture. Not satisfied? Text us. We redo free.',
    },
    {
        icon: DollarSign,
        stat: 'Fixed Price',
        title: 'No Surprise Costs. Flat Rate. Done.',
        text: 'Tell us your home size once. We quote a flat rate. No hidden fees, no upsells. Price is locked.',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-16 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1120] mb-3">
                        Why People Book With Us
                    </h2>
                    <p className="text-lg text-slate-600">
                        Speed, quality, and no surprises.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={benefit.title}
                                className="bg-white p-8 rounded-xl shadow-sm border border-slate-200"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-12 w-12 rounded-lg bg-[#C5A065]/15 text-[#C5A065] flex items-center justify-center">
                                        <Icon size={24} />
                                    </div>
                                    <div className="text-3xl font-bold text-[#C5A065]">
                                        {benefit.stat}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-[#0B1120] mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {benefit.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
