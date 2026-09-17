import InfoPage from "../components/InfoPage";
import styles from "../info.module.css";

export const metadata = {
  title: "Contact us | Answer Right Now",
  description: "Get in touch with the Answer Right Now team.",
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="We are here to help"
      title="Let us get you to the right place."
      intro="Questions about a conversation, expert applications, or partnerships? Reach out and our team will point you in the right direction."
    >
      <h2>Contact our team</h2>
      <p>For support with an active conversation, use the chat experience on the home page. For everything else, contact us through one of the channels below.</p>
      <div className={styles.contactGrid}>
        <div className={styles.contactCard}>
          <h3>General questions</h3>
          <p>Questions about accounts, expert matching, or using the service.</p>
          <a href="mailto:hello@answerrightnow.com">hello@answerrightnow.com</a>
        </div>
        <div className={styles.contactCard}>
          <h3>Expert applications</h3>
          <p>Interested in joining the network of professionals?</p>
          <a href="mailto:experts@answerrightnow.com">experts@answerrightnow.com</a>
        </div>
        <div className={styles.contactCard}>
          <h3>Partnerships</h3>
          <p>Tell us how your organization could help people get better answers.</p>
          <a href="mailto:partners@answerrightnow.com">partners@answerrightnow.com</a>
        </div>
      </div>
    </InfoPage>
  );
}
