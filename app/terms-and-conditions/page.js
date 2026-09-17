import InfoPage from "../components/InfoPage";

export const metadata = {
  title: "Terms and conditions | Answer Right Now",
  description: "The terms and conditions for using Answer Right Now.",
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Using Answer Right Now"
      title="Simple terms for a straightforward service."
      intro="These terms describe the expectations that help keep conversations useful, respectful, and secure."
    >
      <h2>Using the service</h2>
      <p>You may use Answer Right Now for lawful personal or business purposes. You are responsible for providing accurate information and keeping your account details secure.</p>
      <h2>Expert conversations</h2>
      <p>Our service connects you with independent professionals for information and guidance. Conversations are not a substitute for an emergency service, formal representation, or a professional relationship that requires an in-person assessment.</p>
      <h2>Respectful conduct</h2>
      <p>Do not use the service to harass, threaten, impersonate, abuse, or distribute unlawful content. We may restrict access when activity puts users, experts, or the platform at risk.</p>
      <h2>Service availability</h2>
      <p>We work to keep the service available around the clock, but access may occasionally be interrupted for maintenance, updates, or circumstances outside our control.</p>
      <h2>Questions</h2>
      <p>Questions about these terms can be sent to <a href="mailto:legal@answerrightnow.com">legal@answerrightnow.com</a>.</p>
    </InfoPage>
  );
}
