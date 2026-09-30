import { c } from "./styles";
import { PortfolioLink } from "./PortfolioLink";

export function ResumeContent() {
  return (<>

<div className={c("container utility-page")}>
<header className={c("page-hero")}><PortfolioLink className={c("back-link")} href="index.html">← Home</PortfolioLink><h1>Resume</h1><p className={c("page-intro")}>Shani Shlomov · Game &amp; UI Designer</p></header>
<div className={c("resume-layout")}>
<div><div className={c("placeholder")}>
<span className={c("placeholder-name")}>Resume PDF</span>
<span className={c("placeholder-kind")}>Document placeholder</span>
</div><p className={c("caption")}>The resume file has not been supplied yet. A download link will appear here once it is added.</p></div>
<div className={c("resume-sections")}>
<section aria-labelledby="experience-title"><h2 id="experience-title">Experience</h2><div className={c("text-placeholder")}><span>TEXT PLACEHOLDER</span><p>Roles, organizations, dates and a short description of each experience.</p></div></section>
<section aria-labelledby="education-title"><h2 id="education-title">Education</h2><div className={c("text-placeholder")}><span>TEXT PLACEHOLDER</span><p>Program, institution and dates.</p></div></section>
<section aria-labelledby="skills-title"><h2 id="skills-title">Skills &amp; Tools</h2><p>Game Design · Game UI · Visual Design · Unity</p><p className={c("caption")}>Additional skills and tools to be supplied.</p></section>
<PortfolioLink className={c("text-link")} href="contact.html">Contact →</PortfolioLink>
</div>
</div>
</div>

  </>);
}
