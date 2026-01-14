import { CheckCircle } from 'lucide-react';

const inspectionChecklist = [
    'All baseboards and corners - dust collects here first',
    'Under furniture and couches - the forgotten areas',
    'Light switches and doors - touched every day',
    'Grout and tile edges - gets dirty fastest',
    'Hard-to-reach spots - where most cleaners skip',
];

export default function ProofSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-[#0B1120] mb-8 text-center">
                    Why Your Home Gets Inspected Twice
                </h2>

                <div className="bg-[#0B1120] text-white p-8 sm:p-12 rounded-2xl">
                    <p className="text-lg text-slate-200 mb-8">
                        You have had "clean" before. Your standard tells us it was not. That is why we check twice.
                    </p>

                    <div className="space-y-6 mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-[#C5A065] mb-2">
                                First Pass: We Clean Everything
                            </h3>
                            <p className="text-slate-300">
                                Dust, vacuum, scrub, mop. Every surface, every room.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-[#C5A065] mb-2">
                                Second Pass: We Specifically Check
                            </h3>
                            <ul className="space-y-2">
                                {inspectionChecklist.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-slate-300">
                                        <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/20 pt-6">
                        <p className="text-lg font-bold text-[#C5A065]">
                            Not satisfied? Text us within 24 hours. We redo free. That is it.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
