import { useEffect, useRef, useState } from 'react';
import { Loader2, AlertCircle, ExternalLink } from 'lucide-react';

type BookingEmbedProps = {
  url?: string;
  height?: number;
};

const SCRIPT_ID = 'calendly-inline-widget-script';

export function BookingEmbed({ url, height = 640 }: BookingEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!url) return;

    // Reset states on URL change
    setIsLoading(true);
    setHasError(false);

    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const widget = document.createElement('div');
    widget.className = 'calendly-inline-widget';
    widget.setAttribute('data-url', url);
    widget.style.minWidth = '320px';
    widget.style.width = '100%';
    widget.style.height = `${height}px`;
    widget.style.overflow = 'auto';
    widget.style.webkitOverflowScrolling = 'touch';

    container.appendChild(widget);

    // Poll for Calendly widget to initialize
    let pollCount = 0;
    const maxPolls = 30; // 3 seconds max (30 * 100ms)
    
    const pollInterval = setInterval(() => {
      pollCount++;

      // Check if Calendly script loaded and widget initialized
      if ((window as any).Calendly && (window as any).Calendly.initInlineWidget) {
        try {
          (window as any).Calendly.initInlineWidget({
            url: url,
            parentElement: widget,
          });
          setIsLoading(false);
          clearInterval(pollInterval);
        } catch (err) {
          console.error('Calendly init error:', err);
        }
      }

      // Timeout after 3 seconds
      if (pollCount >= maxPolls) {
        clearInterval(pollInterval);
        setIsLoading(false);
        
        // Check if iframe was created
        const iframe = container.querySelector('iframe');
        if (!iframe) {
          setHasError(true);
        }
      }
    }, 100);

    return () => {
      clearInterval(pollInterval);
    };
  }, [url, height]);

  if (!url) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="text-amber-900 font-semibold mb-4">Booking calendar not configured.</p>
        <a
          href="tel:2196159477"
          className="text-[#C5A065] font-semibold hover:underline"
        >
          Call (219) 615-9477 to schedule
        </a>
      </div>
    );
  }

  // Error state - show prominent fallback
  if (hasError) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-8 text-center">
        <AlertCircle size={32} className="text-amber-600 mx-auto mb-4" />
        <p className="text-amber-900 font-semibold mb-4">
          Calendar could not load on this browser.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#C5A065] text-[#0B1120] px-6 py-3 rounded-lg font-semibold hover:bg-[#947638] transition-colors"
        >
          Open Calendar in New Tab
          <ExternalLink size={18} />
        </a>
        <p className="text-sm text-amber-700 mt-4">
          Or call <a href="tel:2196159477" className="font-semibold underline">(219) 615-9477</a>
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="flex flex-col items-center gap-3 text-slate-500">
            <Loader2 size={32} className="animate-spin text-[#C5A065]" />
            <span className="text-sm">Loading calendar...</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#C5A065] hover:underline"
            >
              Not loading? Open in new tab
            </a>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full overflow-hidden rounded-xl"
        // Prevent iOS Safari issues
        style={{ WebkitTransform: 'translateZ(0)' }}
      />
    </div>
  );
}
