import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument, TBC } from "@/components/legal/legal-document";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Terms for using the Aligned by Pranav website and for consultations arranged through WhatsApp enquiries.",
  path: "/terms",
});

/* DRAFT TEMPLATE – to be reviewed by the owners and a qualified legal adviser before launch. */
export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms & Conditions"
      path="/terms"
      intro="These terms apply to your use of this website and to consultations arranged with Aligned by Pranav."
    >
      <h2>1. About these terms</h2>
      <p>
        This website is operated by <TBC value={site.legal.entityName} label="legal name of the business" />. By using the
        website or arranging a consultation, you agree to these terms. If you do not agree, please do not use the website.
      </p>

      <h2>2. Nature of the services</h2>
      <p>
        Aligned by Pranav offers personalised consultations led by Pranav Vibhute, including signature and handwriting
        analysis, business logo analysis and design, wristwatch and clock alignment, business and office clock alignment, phone
        number selection and alignment, drawing analysis and vision board alignment.
      </p>
      <p>
        Consultations are interpretive and reflective. They are not scientific tests, medical or psychological assessments,
        diagnoses, predictions, or legal, financial or other professional advice. No particular personal, financial,
        business, relationship or health outcome is promised or guaranteed. Please read the{" "}
        <Link href="/disclaimer">Consultation Disclaimer</Link>.
      </p>

      <h2>3. Enquiries and bookings</h2>
      <p>
        Enquiries are made through WhatsApp. Information on this website is an invitation to enquire, not a binding offer. A
        consultation is confirmed only when its scope, format, price and timing have been agreed with you directly.
      </p>

      <h2>4. Prices and payment</h2>
      <p>
        Where a starting price is shown, it is the lowest price for that consultation and the final price is confirmed before
        booking. Prices in Indian Rupees and Euro are set separately and are not currency conversions. Payment terms:{" "}
        <TBC value={null} label="payment methods, timing and applicable taxes" />.
      </p>

      <h2>5. Rescheduling, cancellations and refunds</h2>
      <p>
        <TBC value={null} label="rescheduling, cancellation and refund policy" />
      </p>

      <h2>6. Your responsibilities</h2>
      <ul>
        <li>Share only material you have the right to share. For a child’s drawing, you must be the child’s parent or legal guardian.</li>
        <li>Do not share signed documents, identity documents or financial details.</li>
        <li>Make your own decisions. Any action you take after a consultation is your own choice and responsibility.</li>
      </ul>

      <h2>7. Intellectual property</h2>
      <p>
        The website’s text, illustrations, wordmark and design belong to Aligned by Pranav and may not be copied without
        permission. Material you share with us remains yours. Ownership and permitted use of any corrective or refined logo or
        signature design is: <TBC value={null} label="ownership and licence terms for design deliverables" />.
      </p>

      <h2>8. Website use</h2>
      <p>
        We aim to keep the website accurate and available but do not guarantee it will be error-free or uninterrupted. Links to
        third-party services such as WhatsApp and Instagram are provided for convenience; their own terms apply.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the extent permitted by law, we are not liable for decisions you make or outcomes that follow from them, or for
        indirect or consequential loss. Nothing in these terms limits liability that cannot be limited by law, or your
        statutory rights as a consumer in India, the EU or the UK.{" "}
        <TBC value={null} label="liability cap reviewed by legal adviser" />
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by <TBC value={site.legal.governingLaw} label="governing law and courts" />. If you are a
        consumer resident in the EU or UK, you also keep the protection of the mandatory laws of your country of residence.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these terms: <TBC value={site.legal.privacyEmail ?? site.contact.email} label="contact email" />.
      </p>
    </LegalDocument>
  );
}
