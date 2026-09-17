import InfoPage from "../components/InfoPage";

export const metadata = {
  title: "About us | Answer Right Now",
  description: "Learn how Answer Right Now connects people with expert guidance.",
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About Answer Right Now"
      title="Good advice should be easier to reach."
      intro="We built Answer Right Now to make useful guidance feel immediate, human, and available when people need it."
    >
      <h2>Help for moments that do not wait</h2>
      <p>Everyday decisions can become complicated quickly. Whether you are comparing options, fixing a problem, or trying to understand what comes next, a clear perspective can help you move forward.</p>
      <p>Answer Right Now connects people with professionals through live chat across business, legal, home, technology, finance, and other practical areas.</p>
      <h2>Our approach</h2>
      <p>We focus on clarity over jargon, practical next steps over endless searching, and conversations that respect your time.</p>
    </InfoPage>
  );
}
