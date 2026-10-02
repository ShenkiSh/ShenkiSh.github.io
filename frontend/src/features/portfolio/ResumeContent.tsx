import { asset } from "@/shared/utils/asset";
import { PortfolioLink } from "./PortfolioLink";
import { contactDetails } from "./contactDetails";
import actions from "./CaseActions.module.scss";
import styles from "./ResumeContent.module.scss";

const resumePdf = asset("assets/resume/ResumeSHANI.pdf");
const system811Prototype = "https://www.figma.com/proto/4yllIn9ZGP96dNZAp0AV43/%D7%9E%D7%98%D7%94-%D7%94%D7%97%D7%9C%D7%9E%D7%99%D7%B4%D7%9D-%D7%94%D7%90%D7%A8%D7%A6%D7%99?node-id=152-6018&viewport=-2829%2C987%2C0.49&t=kGKWF7v7eFzQY8sw-1&scaling=scale-down-width&content-scaling=fixed&page-id=134%3A3784";

export function ResumeContent() {
  return <article className={styles.page} aria-labelledby="resume-title">
    <header className={styles.header}>
      <div className={styles.heading}>
        <h1 id="resume-title">Resume</h1>
        <p>Shani Shlomov · Game &amp; UX/UI Designer</p>
      </div>
      <div className={styles.actions}>
        <a className={actions.primary} href={resumePdf} download="ResumeSHANI.pdf">Download PDF</a>
        <a className={actions.secondary} href={resumePdf} target="_blank" rel="noopener noreferrer">Open PDF</a>
      </div>
    </header>
    <div className={styles.introduction}>
      <p>Game &amp; UX/UI Designer working across game systems, interfaces and interactive experiences, from concept and visual design to playable implementation in Unity.</p>
      <ul className={styles.contacts} aria-label="Resume contact details">
        <li><a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></li>
        <li><a href="tel:+972586276297">058-627-6297</a></li>
        <li><a href={contactDetails.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><PortfolioLink href="index.html#work">View portfolio</PortfolioLink></li>
      </ul>
    </div>
    <div className={styles.layout}>
      <div className={styles.mainColumn}>
        <section className={styles.section} aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          <div className={styles.entry}>
            <div className={styles.entryHeading}>
              <h3>System 811 <span className={styles.organization} lang="he" dir="rtl">מטה החמ״לים הארצי</span></h3>
              <p>Volunteer Product &amp; UX/UI Designer</p>
              <p className={styles.meta}>2025–Present · Volunteer</p>
            </div>
            <ul className={styles.description}>
              <li>Designing end-to-end UX/UI for System 811, a logistics coordination platform for routine and emergency operations.</li>
              <li>Creating user flows, interface screens and operational dashboards for managing requests, suppliers, volunteers, shortages and assignments.</li>
              <li>Working directly with developers to define requirements, system behavior and implementation needs.</li>
              <li>Translating real operational workflows into clear product and interaction solutions.</li>
              <li>Designed the organization’s website, including information architecture, user flow, page layouts, visual design and image editing.</li>
            </ul>
            <a className={styles.textLink} href={system811Prototype} target="_blank" rel="noopener noreferrer">View website prototype</a>
          </div>
        </section>
        <section className={styles.section} aria-labelledby="resume-projects-title">
          <h2 id="resume-projects-title">Selected Projects</h2>
          <div className={styles.entry}>
            <div className={styles.entryHeading}>
              <h3>NUMI</h3>
              <p>2D Narrative Puzzle-Platformer · Unity</p>
              <p className={styles.meta}>Game Design · Level Design · Game UX/UI</p>
            </div>
            <ul className={styles.description}>
              <li>Designed and developed a narrative puzzle-platformer built around five playable memories, including gameplay systems, level design, player feedback and visual direction.</li>
              <li>Implemented the experience in Unity and refined the gameplay through player testing and iteration.</li>
              <li>Selected for upcoming commercial distribution through the Israeli Library subscription platform.</li>
            </ul>
            <PortfolioLink className={styles.textLink} href="numi.html" aria-label="View NUMI case study">View case study</PortfolioLink>
          </div>
          <div className={styles.entry}>
            <div className={styles.entryHeading}>
              <h3>We Live Happily Here</h3>
              <p>Cooperative Mobile Game System</p>
              <p className={styles.meta}>Game Design · UX/UI · Interaction Design</p>
            </div>
            <ul className={styles.description}>
              <li>Designed a cooperative game system that turns everyday sibling conflicts into short shared challenges played across two phones.</li>
              <li>Created the parent and player flows, game logic, visual language, feedback system and interactive Unity prototype.</li>
            </ul>
            <PortfolioLink className={styles.textLink} href="we-live-happily-here.html" aria-label="View We Live Happily Here case study">View case study</PortfolioLink>
          </div>
        </section>
      </div>
      <div className={styles.sideColumn}>
        <section className={styles.section} aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          <div className={styles.entryHeading}>
            <h3>B.Des. Visual Communication Design</h3>
            <p>HIT — Holon Institute of Technology</p>
            <p className={styles.meta}>2022–2026</p>
          </div>
        </section>
        <section className={styles.section} aria-labelledby="skills-title">
          <h2 id="skills-title">Skills</h2>
          <div className={styles.skill}>
            <h3>Game Design &amp; Unity</h3>
            <p>Game Design · Level Design · Interaction Design · Narrative Design · Game Prototyping · Unity · AI-assisted prototyping &amp; development</p>
          </div>
          <div className={styles.skill}>
            <h3>UX/UI</h3>
            <p>Figma · User Flows · Wireframing · Interaction Design · Prototyping · Player/User Feedback</p>
          </div>
          <div className={styles.skill}>
            <h3>Visual Design</h3>
            <p>Illustrator · Photoshop · After Effects · InDesign · Visual Development · Illustration</p>
          </div>
        </section>
        <section className={styles.section} aria-labelledby="languages-title">
          <h2 id="languages-title">Languages</h2>
          <dl className={styles.languages}>
            <div><dt>Hebrew</dt><dd>Native</dd></div>
            <div><dt>English</dt><dd>Professional Working Proficiency</dd></div>
          </dl>
        </section>
      </div>
    </div>
  </article>;
}
