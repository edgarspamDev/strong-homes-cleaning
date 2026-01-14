import { Shield, CheckCircle, Zap, FileText } from 'lucide-react';

export default function TrustBar() {
  const features = [
    {
      icon: Shield,
      title: 'Background Checked',
      description: 'Rigorously trained teams with thorough background checks.',
    },
    {
      icon: CheckCircle,
      title: 'Satisfaction Guaranteed',
      description: 'If we miss it, we make it right fast.',
    },
    {
      icon: Zap,
      title: 'Same-Week Service',
      description: 'Book your cleaning within days, not weeks.',
    },
    {
      icon: FileText,
      title: 'No Contracts',
      description: 'Switch frequency anytime or cancel with no penalties.',
    },
  ];

  return (
    <div className="bg-white py-14 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-[#C5A065]/15 text-[#C5A065] mb-3">
                  <IconComponent size={24} />
                </div>
                <h3 className="font-semibold text-[#0B1120] text-sm">{feature.title}</h3>
                <p className="text-slate-600 text-xs mt-1 leading-tight">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
