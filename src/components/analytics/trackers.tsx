"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/lib/analytics/consent-store";
import { track, type AnalyticsEventName, type AnalyticsEventProps } from "@/lib/analytics/track";

/**
 * Sends a view event (e.g. `service_view`, `landing_page_view`) once per
 * page visit. If consent is given later during the visit, it is sent then.
 */
export function TrackOnView({ event, props }: { event: AnalyticsEventName; props: AnalyticsEventProps }) {
  const { choice } = useConsent();
  const sent = useRef(false);
  const key = JSON.stringify(props);

  useEffect(() => {
    if (sent.current || choice === undefined) return;
    sent.current = track(event, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- props are compared via `key`
  }, [choice, event, key]);

  return null;
}

/** Sends an event when the wrapped section first scrolls into view (e.g. `pricing_view`). */
export function TrackWhenVisible({
  event,
  props,
  children,
  className,
}: {
  event: AnalyticsEventName;
  props: AnalyticsEventProps;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const sent = useRef(false);
  const { choice } = useConsent();
  const key = JSON.stringify(props);

  useEffect(() => {
    const el = ref.current;
    if (!el || sent.current || choice === undefined) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sent.current) {
          sent.current = track(event, props);
          if (sent.current) observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- props are compared via `key`
  }, [choice, event, key]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
