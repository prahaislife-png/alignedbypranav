"use client";

/**
 * Script loaders for optional integrations. These are only called after
 * consent (see components/analytics/analytics-manager.tsx).
 */

function injectScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/** GA4 honours `window["ga-disable-<id>"] = true` as an opt-out switch. */
function setGaDisabled(measurementId: string, disabled: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = disabled;
}

export function loadGa4(measurementId: string) {
  setGaDisabled(measurementId, false);
  if (!window.gtag) {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // gtag.js expects the `arguments` object itself.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    // Page views are sent manually on every route change.
    window.gtag("config", measurementId, { send_page_view: false });
  }
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`, "abp-ga4");
}

export function loadMetaPixel(pixelId: string) {
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      const self = fbq as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
      if (self.callMethod) self.callMethod(...args);
      else self.queue.push(args);
    } as Window["fbq"] & Record<string, unknown>;
    Object.assign(fbq, { push: fbq, loaded: true, version: "2.0", queue: [] });
    window.fbq = fbq;
    window._fbq = fbq;
    window.fbq!("consent", "grant");
    window.fbq!("init", pixelId);
  } else {
    window.fbq("consent", "grant");
  }
  injectScript("https://connect.facebook.net/en_US/fbevents.js", "abp-meta-pixel");
}

function deleteCookies(match: (name: string) => boolean) {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !match(name)) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    });
  });
}

/** Stops GA4 sending further data and removes its cookies. */
export function revokeGa4(measurementId: string) {
  setGaDisabled(measurementId, true);
  deleteCookies((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid");
}

/** Tells the Meta Pixel to stop sending data and removes its first-party cookies. */
export function revokeMetaPixel() {
  window.fbq?.("consent", "revoke");
  deleteCookies((name) => name === "_fbp" || name === "_fbc");
}
