import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/legal/legal-document";

export const metadata: Metadata = pageMetadata({
  title: "Consultation Disclaimer",
  description:
    "The nature of consultations with Aligned by Pranav: interpretive and reflective, not scientific, medical, psychological or financial advice.",
  path: "/disclaimer",
});

/* DRAFT TEMPLATE – to be reviewed by the owners and a qualified legal adviser before launch. */
export default function DisclaimerPage() {
  return (
    <LegalDocument
      title="Consultation Disclaimer"
      path="/disclaimer"
      intro="Please read this before booking a consultation. It explains what Pranav’s consultations are, and what they are not."
    >
      <h2>Interpretive and reflective</h2>
      <p>
        Consultations with Aligned by Pranav draw on graphology (the interpretation of handwriting and signatures) and on
        symbolic interpretation of logos, numbers, clocks, watches, drawings and vision boards. These are interpretive
        practices. Pranav’s observations are offered as perspectives for reflection and personal choice.
      </p>

      <h2>Not a scientific or psychological assessment</h2>
      <p>
        Graphology and the symbolic practices used in these consultations are not scientifically established methods of
        measuring personality, ability, honesty, health or future behaviour. A consultation is not a psychometric test and
        should not be used for decisions about employment, education, credit, legal matters or relationships.
      </p>

      <h2>Not medical, psychological or other professional advice</h2>
      <p>
        Nothing in a consultation is a medical or psychological diagnosis, treatment or therapy, and nothing replaces advice
        from a qualified doctor, psychologist, counsellor, lawyer, accountant or financial adviser. If you have concerns about
        your health or wellbeing, or that of someone else, please consult a qualified professional.
      </p>

      <h2>Children’s drawings</h2>
      <p>
        Drawing analysis is reflective. It cannot diagnose, assess or rule out any developmental, emotional or mental-health
        condition in a child or adult. If you are concerned about a child, please speak with a paediatrician, child
        psychologist, counsellor or the child’s school.
      </p>

      <h2>No guaranteed outcomes</h2>
      <p>
        No signature, handwriting change, logo, colour, symbol, phone number, wristwatch, clock or clock position is claimed to
        cause or guarantee success, wealth, luck, health, healing, relationships or any other measurable result. Outcomes in
        life and business depend on many factors outside any consultation.
      </p>

      <h2>Your decisions</h2>
      <p>
        Any decision you make after a consultation, such as changing a signature, redesigning a logo, choosing a number or
        buying a watch, is your own. Please consider it carefully.
      </p>

      <h2>Testimonials and examples</h2>
      <p>
        Any testimonials or examples shown on this website are real, published with permission, and describe individual
        experiences. They are not a promise that your experience will be the same.
      </p>

      <p className="mt-12 text-[0.875rem] text-muted">
        See also our <Link href="/terms">Terms &amp; Conditions</Link> and <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalDocument>
  );
}
