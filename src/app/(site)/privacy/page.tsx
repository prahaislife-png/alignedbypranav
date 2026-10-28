import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument, TBC } from "@/components/legal/legal-document";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Aligned by Pranav handles personal data, cookies and WhatsApp enquiries, for visitors in India and Europe.",
  path: "/privacy",
});

/*
 * DRAFT TEMPLATE – to be reviewed by the owners and a qualified legal adviser
 * before launch (India: Digital Personal Data Protection Act 2023; EU/EEA:
 * GDPR; UK: UK GDPR). Keep the cookie table in sync with the integrations
 * actually enabled in the environment variables.
 */
export default function PrivacyPage() {
  const privacyEmail = site.legal.privacyEmail ?? site.contact.email;
  return (
    <LegalDocument
      title="Privacy Policy"
      path="/privacy"
      intro="This policy explains what personal data this website and our enquiry process handle, why, and the choices and rights you have."
    >
      <h2>1. Who we are</h2>
      <p>
        This website is operated by <TBC value={site.legal.entityName} label="legal name of the business" /> (“Aligned by
        Pranav”, “we”, “us”). Consultations are provided by Pranav Vibhute. For data protection purposes we are the data
        fiduciary (India) and data controller (EU/UK) for the personal data described here.
      </p>
      <p>
        Contact for privacy matters: <TBC value={privacyEmail} label="privacy contact email" />. Postal address:{" "}
        <TBC value={site.legal.postalAddress} label="postal address for notices" />.
      </p>

      <h2>2. What this website collects</h2>
      <p>
        This website has no contact forms, accounts or uploads. You can read every page without giving us any personal
        information.
      </p>
      <ul>
        <li>
          <strong>Technical data.</strong> Our hosting provider (Vercel) processes technical information such as IP address,
          browser type and the pages requested, in order to deliver the website securely and protect it from abuse.
        </li>
        <li>
          <strong>Your privacy choice.</strong> If you make a cookie choice, it is stored in your own browser so we can respect
          it on later visits.
        </li>
        <li>
          <strong>Optional analytics and advertising measurement</strong> – only if you accept them. See{" "}
          <a href="#cookies">Cookies and similar technologies</a>.
        </li>
      </ul>

      <h2>3. WhatsApp enquiries</h2>
      <p>
        When you tap a WhatsApp button, the website opens WhatsApp with a suggested message. You decide whether to send it.
        WhatsApp is operated by WhatsApp LLC / WhatsApp Ireland Limited (Meta), whose own privacy policy applies to your use of
        WhatsApp. The website does not see or store the content of your WhatsApp conversation. If you allow analytics, we may
        record only that a WhatsApp button was tapped, which button and on which page.
      </p>
      <p>
        If you contact us, we use your name, phone number, messages and any material you choose to share (for example a
        signature, handwriting sample, logo, phone numbers, photographs of drawings or a vision board) only to reply to you and
        to provide the consultation you request. We do not use this material for advertising and never share it with
        advertising or analytics platforms.
      </p>
      <p>
        Please do not send signed documents, identity or bank details. Material shared during consultations is kept for{" "}
        <TBC value={null} label="retention period for enquiry messages and consultation material" /> and then deleted, unless
        you ask us to delete it sooner or the law requires us to keep it.
      </p>

      <h2 id="free-tools">4. The free tools (signature and watch checks)</h2>
      <p>
        The <Link href="/tools/signature-check">Signature Specimen Check</Link> and the{" "}
        <Link href="/tools/watch-check">Watch Specimen Check</Link> work entirely in your browser. The signature you draw or
        photograph, and the photo of your watch, are processed on your own device and are never uploaded to, or stored by,
        this website or any other service. The measurements and answers you record exist only on your screen and in the
        images you create; they are discarded when you leave or reload the page.
      </p>
      <p>
        A signature is personal. Keep the full specimen sheet and the practice sheet private, and share only the
        share-safe version, in which the signature is hidden. The checks are not forensic or authenticity checks.
      </p>
      <p>
        If you save or share a sheet, or send it to Pranav on WhatsApp, you decide where it goes, and section 3 applies to
        anything you send. If you allow analytics, we may record only that a check was started, completed or saved, and
        how (drawn or photographed, downloaded, shared or printed), never the image, the measurements or your answers.
      </p>

      <h2>5. Children</h2>
      <p>
        This website is intended for adults. Drawing analysis may involve a child’s drawing shared by a parent or legal
        guardian. We will only consider a child’s drawing with the consent of the parent or guardian, and we ask that you remove
        the child’s full name, school, photographs and other identifying details. We do not knowingly process a child’s
        personal data for tracking, profiling or advertising.
      </p>

      <h2>6. Why we use personal data (legal bases)</h2>
      <ul>
        <li>To respond to your enquiry and provide a consultation – your request and our agreement with you (GDPR Art. 6(1)(b)); your consent where required under the DPDP Act.</li>
        <li>To run and secure the website – our legitimate interests (GDPR Art. 6(1)(f)) and legitimate uses under the DPDP Act.</li>
        <li>Optional analytics and advertising measurement – your consent (GDPR Art. 6(1)(a); DPDP Act s.6), which you can withdraw at any time.</li>
        <li>To meet legal, tax and accounting obligations – legal obligation.</li>
      </ul>

      <h2 id="cookies">7. Cookies and similar technologies</h2>
      <p>
        We only use storage that is strictly necessary unless you choose otherwise. Optional tools load only after you accept
        them, and only if they are enabled for this website. You can change your choice at any time using{" "}
        <strong>Cookie preferences</strong> in the footer.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Provider</th>
              <th scope="col">Purpose</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>abp-consent</td>
              <td>This website (browser storage)</td>
              <td>Remembers your privacy choice.</td>
              <td>Strictly necessary</td>
            </tr>
            <tr>
              <td>abp-attribution</td>
              <td>This website (session storage)</td>
              <td>Remembers the ad campaign label (UTM parameters) of your visit for this browser session.</td>
              <td>Optional – only with consent</td>
            </tr>
            <tr>
              <td>_ga, _ga_*</td>
              <td>Google Analytics 4 (Google)</td>
              <td>Aggregated statistics about visits and page use. Up to 2 years.</td>
              <td>Optional – analytics</td>
            </tr>
            <tr>
              <td>Vercel Web Analytics</td>
              <td>Vercel</td>
              <td>Aggregated, cookieless page-view statistics.</td>
              <td>Optional – analytics</td>
            </tr>
            <tr>
              <td>_fbp, _fbc</td>
              <td>Meta Pixel (Meta Platforms)</td>
              <td>Measures whether Instagram and Facebook ads lead people to this website. Up to 90 days.</td>
              <td>Optional – advertising measurement</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Analytics events never include your name, phone number, message content, signatures, drawings or other consultation
        material.
      </p>

      <h2>8. Who we share data with</h2>
      <p>
        Service providers who help us run the website and communicate with you: Vercel (hosting), WhatsApp/Meta (messaging),
        and, only with your consent, Google (analytics) and Meta (advertising measurement). Some of these providers process
        data outside India and the European Economic Area, including in the United States. Where required, transfers rely on
        appropriate safeguards such as the European Commission’s standard contractual clauses or adequacy decisions. We do not
        sell personal data.
      </p>

      <h2>9. Your rights</h2>
      <p>Depending on where you live, you may have the right to:</p>
      <ul>
        <li>access the personal data we hold about you and receive a summary of how it is used;</li>
        <li>correct, complete or update it;</li>
        <li>ask us to delete it;</li>
        <li>withdraw consent at any time (this does not affect processing before withdrawal);</li>
        <li>object to or restrict certain processing, and request data portability (EU/UK);</li>
        <li>nominate another person to exercise your rights in the event of death or incapacity (India);</li>
        <li>
          raise a grievance with us, and complain to the Data Protection Board of India or to your local data protection
          supervisory authority in the EU/UK.
        </li>
      </ul>
      <p>
        To exercise a right, contact <TBC value={privacyEmail} label="privacy contact email" />. Grievance officer:{" "}
        <TBC value={null} label="name or role of the grievance contact" />. We will respond within the time required by law.
      </p>

      <h2>10. Security</h2>
      <p>
        The website is served over HTTPS with security headers. Because enquiries take place on WhatsApp, please keep your
        device secure and avoid sharing more personal information than needed.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy. The “Last updated” date at the top shows when it last changed. Significant changes will be
        highlighted on this page.
      </p>

      <p className="mt-12 text-[0.875rem] text-muted">
        See also our <Link href="/terms">Terms &amp; Conditions</Link> and <Link href="/disclaimer">Consultation Disclaimer</Link>.
      </p>
    </LegalDocument>
  );
}
