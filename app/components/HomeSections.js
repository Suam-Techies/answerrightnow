import styles from "../page.module.css";
import Image from "next/image";
import BrandMark from "./BrandMark";

const categories = [
  ["doctor", "Business advisors", "Strategy, growth planning, and expert decisions for your next move.", "https://images.unsplash.com/photo-1758691461932-d0aa0ebf6b31?fm=jpg&q=70&w=800&auto=format&fit=crop", "Business advisor meeting with a client"],
  ["lawyer", "Legal experts", "Contracts, policies, disputes, and practical advice before you sign.", "https://images.unsplash.com/photo-1551836022-aadb801c60ae?fm=jpg&q=70&w=800&auto=format&fit=crop", "Legal expert speaking with a client"],
  ["mechanic", "Auto specialists", "Warning lights, repair quotes, and quick troubleshooting for your vehicle.", "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?fm=jpg&q=70&w=800&auto=format&fit=crop", "Auto specialist inspecting a vehicle"],
  ["vet", "Property support", "Home issues, maintenance planning, and practical guidance for your space.", "https://images.unsplash.com/photo-1644675272883-0c4d582528d8?fm=jpg&q=70&w=800&auto=format&fit=crop", "Property consultant reviewing a home project"],
  ["therapist", "Wellness coaches", "Stress support, routines, and small shifts that make life feel steadier.", "https://images.unsplash.com/photo-1758273241086-f3585ef8c2f8?fm=jpg&q=70&w=800&auto=format&fit=crop", "Wellness coach guiding a client"],
  ["electrician", "Home specialists", "Repairs, installations, and practical guidance before a job turns expensive.", "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?fm=jpg&q=70&w=800&auto=format&fit=crop", "Home specialist working on a repair"],
  ["tax", "Finance guides", "Budgeting, filing, and money decisions explained without the confusion.", "https://images.unsplash.com/photo-1772588627527-db42040f3a8b?fm=jpg&q=70&w=800&auto=format&fit=crop", "Finance guide reviewing documents"],
  ["tech", "Tech support", "Frozen screens, setup help, and digital headaches solved in minutes.", "https://images.unsplash.com/photo-1721333089073-215a56fd710c?fm=jpg&q=70&w=800&auto=format&fit=crop", "Technology support fixing a device"],
];

const categoryIcons = {
  doctor: <><path d="M6 3v7a4 4 0 0 0 8 0V3" /><circle cx="18" cy="15" r="3" /><path d="M6 10a4 4 0 0 0 4 4" /></>,
  lawyer: <><path d="M12 3v18M4 8l4-5 4 5M16 8l4-5 4 5" transform="translate(-2,0)" /><path d="M4 8h6M14 8h6" /><path d="M4 8l-2 5a3 3 0 0 0 6 0zM18 8l-2 5a3 3 0 0 0 6 0z" /></>,
  mechanic: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2-.5-.5-2z" />,
  vet: <><path d="M12 20c-4-3-8-6-8-10a4 4 0 0 1 8-2 4 4 0 0 1 8 2c0 4-4 7-8 10z" /><circle cx="7" cy="6" r="1.5" /><circle cx="17" cy="6" r="1.5" /></>,
  therapist: <><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4A8.5 8.5 0 1 1 20 7.6a8.4 8.4 0 0 1 1 3.9z" /><path d="M8 12h6M8 9h4" /></>,
  electrician: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  tax: <><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M8 6h8M8 10h8M8 14h4" /><circle cx="16" cy="17" r="1" /></>,
  tech: <><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M2 20h20M9 20l1-4h4l1 4" /></>,
};

const steps = [
  ["Describe it", "Tell us what’s going on in a few sentences — we’ll route it to the right kind of expert."],
  ["Get matched", "We connect you with a professional in the relevant field."],
  ["Chat it through", "Go back and forth over live chat. Share photos or documents if it helps them help you."],
  ["Walk away sorted", "Leave with a clear next step, an answer, or peace of mind — whichever you came for."],
];

const testimonials = [
  ["I needed a second opinion on a business decision and the expert I reached was calm, practical, and incredibly helpful — exactly what I needed.", "EJ", "Emily Johnson", "New York, NY"],
  ["It’s a relief knowing this exists. I had a strange legal letter show up and got a straight answer in ten minutes instead of stewing over it for a week.", "GP", "G. Patel", "Austin, TX"],
  ["Fast, precise, and exactly what I needed. I got a clear recommendation for my vehicle issue before I wasted time or money on the wrong repair.", "MC", "Mary Collins", "Denver, CO"],
  ["Everything was handled smoothly — clear guidance, no hassle, and I got exactly the help I needed.", "RS", "Raj Singh", "Chicago, IL"],
];

export function Hero() {
  return (
    <header className={styles.hero}>
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1552664730-d307ca884978?fm=jpg&q=70&w=1600&auto=format&fit=crop"
        aria-hidden="true"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-a-woman-working-on-a-laptop-1573/1080p.mp4"
          type="video/mp4"
        />
      </video>
      <div className={styles.wrap}>
        <div className={styles.heroText}>
          <p className={styles.heroEyebrow}>Live chat · available when you need it</p>
          <h1>Real experts. Real answers. Right now.</h1>
          <p className={styles.heroSub}>Describe what&apos;s going on and we&apos;ll connect you by live chat with a professional in the relevant field, from business and legal guidance to home, tech, and everyday decisions.</p>
          <div className={styles.heroActions}>
            <a href="#chatbot" className={`${styles.btn} ${styles.btnGold}`}>Start a chat</a>
            <a href="/contact-us" className={`${styles.btn} ${styles.btnLineLight}`}>Contact us</a>
          </div>
        </div>
        <div className={styles.heroMedia}>

          <div className={styles.heroImageCard}>
            <video
              className={styles.heroCardVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Expert advisor helping a client online"
            >
              <source src="/videos/88139-602895197_small.mp4" type="video/mp4" />
            </video>
            <div className={styles.mediaBadgeTop}>Live expert help</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Showcase() {
  return <section className={styles.showcase}><div className={styles.wrap}><div className={styles.showcaseGrid}><div className={styles.showcaseContent}><p className={styles.heroEyebrow}>Faster answers. Better decisions.</p><h2>See real people getting real help in the moments that matter.</h2><p>From quick clarifications to high-stakes decisions, our network helps people move forward faster with the confidence of the right expert on their side.</p></div><div className={styles.showcaseVisuals}><div className={styles.showcaseCardLarge}><Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fm=jpg&q=70&w=1200&auto=format&fit=crop" alt="Professionals collaborating around a table" fill sizes="(max-width: 680px) 100vw, 55vw" /></div><div className={styles.showcaseCardSmall}><Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?fm=jpg&q=70&w=900&auto=format&fit=crop" alt="Person speaking with a client over a laptop" fill sizes="(max-width: 680px) 50vw, 30vw" /></div></div></div></div></section>;
}

export function PhotoBand() {
  return <section className={styles.photoBand}><Image src="https://images.unsplash.com/photo-1758876023053-3aa541a0935b?fm=jpg&q=70&w=2000&auto=format&fit=crop" alt="Person relaxing at home, chatting on their phone" fill sizes="100vw" /><div className={styles.wrap}><div className={styles.photoBandInner}><h2>Wherever you are, help is a message away</h2><p>From the couch, the garage, or a waiting room — every conversation starts the same simple way: tell us what&apos;s going on.</p></div></div></section>;
}

export function HowItWorks() {
  return <section className={`${styles.section} ${styles.steps}`} id="how"><div className={styles.wrap}><div className={styles.sectionHead}><h2>The best way to get help fast</h2><p>No searching, no waiting rooms. Just tell us what&apos;s wrong and we&apos;ll bring the right person to you.</p></div><div className={styles.stepGrid}>{steps.map(([title, text]) => <div className={styles.step} key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>;
}

export function Experts() {
  return <section className={styles.section} id="experts"><div className={styles.wrap}><div className={styles.sectionHead}><h2>Guidance for everyday decisions</h2><p>Explore practical categories and connect with a professional who can help you think through your next step.</p></div><div className={styles.catGrid}>{categories.map(([icon, title, text, image, alt]) => <article className={styles.cat} key={title}><div className={styles.catPhoto}><Image src={image} alt={alt} fill sizes="(max-width: 680px) 100vw, (max-width: 960px) 50vw, 25vw" /><div className={styles.catBadge}><svg viewBox="0 0 24 24" aria-hidden="true">{categoryIcons[icon]}</svg></div></div><div className={styles.catBody}><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>;
}

export function Testimonials() {
  return <section className={styles.section} style={{ paddingTop: 0 }}><div className={styles.wrap}><div className={styles.sectionHead}><h2>What people are saying</h2><p>A few notes from people who&apos;ve talked to an expert here.</p></div><div className={styles.testiStrip}>{testimonials.map(([quote, initials, name, location]) => <article className={styles.testi} key={name}><p>{quote}</p><div className={styles.testiWho}><div className={styles.testiAvatar}>{initials}</div><div><strong>{name}</strong><span>{location}</span></div></div></article>)}</div></div></section>;
}

export function SiteFooter() {
  return <footer className={styles.footer}><div className={styles.wrap}><div className={styles.footTop}><div><div className={styles.footMark}><BrandMark /></div><p style={{ fontSize: "0.9rem", maxWidth: "32ch" }}>Practical guidance from professionals, available by live chat.</p></div><div><h5>Company</h5><ul><li><a href="/about-us">About us</a></li><li><a href="/contact-us">Contact us</a></li></ul></div><div><h5>Legal</h5><ul><li><a href="/privacy-policy">Privacy policy</a></li><li><a href="/terms-and-conditions">Terms &amp; conditions</a></li></ul></div></div><div className={styles.footBottom}><span>© answerrightnow.com. All rights reserved.</span></div></div></footer>;
}
