import { AnimatedCharacter } from "./AnimatedCharacter";
import { PortfolioLink } from "./PortfolioLink";
import { contactDetails } from "./contactDetails";
import styles from "./ContactContent.module.scss";

type ContactRowProps = { id: string; label: string; text: string; href?: string; external?: boolean };

function ContactRow({ id, label, text, href, external = false }: ContactRowProps) {
  const content = <>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{text}</span>
  </>;
  return <li id={id} className={styles.row}>
    {href ? <PortfolioLink className={styles.contactLink} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {content}
    </PortfolioLink> : <span className={styles.contactLink} aria-disabled="true">{content}</span>}
  </li>;
}

export function ContactContent() {
  return <article className={styles.page} aria-labelledby="contact-heading">
    <PortfolioLink className={styles.back} href="index.html#work"><span aria-hidden="true">←</span> Back to Work</PortfolioLink>
    <header className={styles.heading}>
      <h1 id="contact-heading">LET’S WORK TOGETHER.</h1>
    </header>
    <div className={styles.content}>
      <div className={styles.portrait}>
        <AnimatedCharacter videoPath="assets/contact/shani-calling.webm" posterPath="assets/contact/shani-calling-poster.png" />
      </div>
      <div className={styles.details}>
        <div className={styles.description}>
          <p>I’m currently open to opportunities in Game Design, Game UX/UI and Visual Design.</p>
          <p>Feel free to reach out about roles, collaborations or projects.</p>
        </div>
        <ul className={styles.links} aria-label="Get in touch">
          <li id="email" className={`${styles.row} ${styles.emailRow}`}>
            <div className={styles.emailBlock}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{contactDetails.email}</span>
              <div className={styles.emailOptions}>
                <PortfolioLink className={styles.emailOption} href={`mailto:${contactDetails.email}`}>Mail app</PortfolioLink>
                <PortfolioLink className={styles.emailOption} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactDetails.email)}`} target="_blank" rel="noopener noreferrer">Gmail in browser</PortfolioLink>
              </div>
            </div>
          </li>
          <ContactRow id="linkedin" label="LinkedIn" text="Connect with me" href={contactDetails.linkedIn} external />
          <ContactRow id="contact-resume" label="Resume" text="View Resume" href="resume.html" />
        </ul>
      </div>
    </div>
  </article>;
}
