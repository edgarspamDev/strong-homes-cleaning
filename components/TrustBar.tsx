import { Shield, Heart, MapPin } from 'lucide-react';

export default function TrustBar() {
  const features = [
    {
      icon: Shield,
      title: 'Vetted Local Crews',
      description: 'Rigorously trained teams with background checks and full insurance coverage.',
    },
    {
      icon: Heart,
      title: 'Satisfaction Commitment',
      description: 'If we miss it, we make it right fast.',
    },
    {
      icon: MapPin,
      title: 'Locally Owned',
      description: 'Lake & Porter County neighbors, not a franchise.',
    },
  ];

  return (
    <div className="bg-white py-14 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition duration-150"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#C5A065]/15 text-[#C5A065]">
                  <IconComponent size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1120]">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
