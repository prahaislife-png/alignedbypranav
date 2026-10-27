import { LandingFooter, LandingHeader } from "@/components/landing/landing-chrome";

/** Minimal chrome for advertising landing pages. */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <LandingFooter />
    </>
  );
}
