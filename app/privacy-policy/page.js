import InfoPage from "../components/InfoPage";

export const metadata = {
  title: "Privacy policy | Answer Right Now",
  description: "The Answer Right Now privacy policy.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Your privacy matters"
      title="A clear policy for a trusted service."
      intro="This overview explains the information we collect, why we use it, and the choices available to you."
    >
      <h2>Information we collect</h2>
      <p>We may collect information you provide directly, such as your name, contact details, account information, and the details you choose to share during a support conversation.</p>
      <p>We also collect limited technical information needed to operate and secure the service, including device, browser, and usage information.</p>
      <h2>How we use information</h2>
      <ul>
        <li>To provide, personalize, and improve our services.</li>
        <li>To connect you with relevant professionals.</li>
        <li>To communicate about your account, support, and service updates.</li>
        <li>To detect abuse, protect users, and keep the platform secure.</li>
      </ul>
      <h2>Your choices</h2>
      <p>You may request access to, correction of, or deletion of personal information associated with your account. Contact <a href="mailto:privacy@answerrightnow.com">privacy@answerrightnow.com</a> for privacy requests.</p>
      <h2>Service providers</h2>
      <p>Chat messages may be processed by service providers that help us operate the assistant and deliver the service. We share information only as needed for those purposes and expect providers to protect it appropriately.</p>
      <h2>Updates</h2>
      <p>We may update this policy as the service evolves. The latest version will always be published on this page with its effective date.</p>
    </InfoPage>
  );
}
