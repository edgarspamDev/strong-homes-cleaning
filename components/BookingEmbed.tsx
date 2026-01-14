import { useEffect, useRef } from 'react';

type BookingEmbedProps = {
  url?: string;
  height?: number;
};

const SCRIPT_ID = 'calendly-inline-widget-script';

export function BookingEmbed({ url, height = 640 }: BookingEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!url) return;

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const widget = document.createElement('div');
    widget.className = 'calendly-inline-widget';
    widget.setAttribute('data-url', url);
    widget.style.minWidth = '320px';
    widget.style.height = `${height}px`;

    container.appendChild(widget);

    return () => {
      container.innerHTML = '';
    };
  }, [url, height]);

  if (!url) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Set VITE_CALENDLY_URL to enable instant booking.
      </div>
    );
  }

  return <div ref={containerRef} className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm" />;
}
