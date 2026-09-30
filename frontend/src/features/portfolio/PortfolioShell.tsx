import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { PortfolioLink } from "./PortfolioLink";
import { scrollToSection } from "./scrollToSection";
import { HomeFooter } from "./HomeFooter";
import { CaseFooter } from "./CaseFooter";
import { ContactFooter } from "./ContactFooter";
import { ProjectFooter, type ProjectDestination } from "./ProjectFooter";
import { c } from "./styles";
import numiStyles from "./numi/NumiShell.module.scss";

interface PortfolioShellProps { children: ReactNode }
const navigation = [ ["Work", "index.html#work"], ["About", "about.html"], ["Resume", "resume.html"], ["Contact", "contact.html"] ] as const;
const nextProjects: Partial<Record<string, ProjectDestination>> = {
  "/numi": { title: "We Live Happily Here", href: "we-live-happily-here.html" },
  "/we-live-happily-here": { title: "TENKI", href: "tenki" },
  "/tenki": { title: "Hop! It’s the Chef!", href: "le-frogette.html" },
  "/ikko": { title: "Hop! It’s the Chef!", href: "le-frogette.html" },
  "/le-frogette": { title: "ReDream Labs", href: "redream" },
  "/my-bunny": { title: "HeadEase", href: "headease.html" },
  "/headease": { title: "My Bunny", href: "my-bunny.html" },
  "/redream": { title: "NUMI", href: "numi.html" },
  "/lollipop": { title: "ReDream Lab", href: "redream" },
};

function SiteHeader({ numi = false }: { numi?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", update, { passive: true });
    const element = header.current;
    const shell = element?.closest<HTMLElement>("[data-portfolio-shell]");
    const observer = new ResizeObserver(() => {
      if (element && shell) shell.style.setProperty("--home-header-height", `${Math.ceil(element.getBoundingClientRect().height)}px`);
    });
    if (element) observer.observe(element);
    const close = () => setOpen(false);
    const compact = matchMedia("(max-width: 600px)");
    compact.addEventListener("change", close);
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); compact.removeEventListener("change", close); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus({ preventScroll: true }); } };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return <header ref={header} data-site-header className={`${c(`site-header ${scrolled ? "is-scrolled" : ""}`)} ${numi ? numiStyles.header : ""}`}>
    <div className={`${c("container header-inner")} ${numi ? numiStyles.headerInner : ""}`}>
      <PortfolioLink className={`${c("brand")} ${numi ? numiStyles.brand : ""}`} href="index.html" onClick={() => setOpen(false)}>SHANI SHLOMOV</PortfolioLink>
      <button ref={toggle} className={`${c("menu-toggle")} ${numi ? numiStyles.menu : ""}`} type="button" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(value => !value)}>{open ? "Close" : "Menu"}</button>
      <nav className={`${c(`site-nav ${open ? "is-open" : ""}`)} ${numi ? numiStyles.navigation : ""}`} id="site-navigation" aria-label="Main navigation">
        {navigation.map(([label, href]) => <PortfolioLink key={label} href={href} onClick={() => setOpen(false)}
          aria-current={location.pathname === `/${label.toLowerCase()}` || (label === "Work" && (location.pathname === "/" || nextProjects[location.pathname])) ? "page" : undefined}>{label}</PortfolioLink>)}
      </nav>
    </div>
  </header>;
}

export function PortfolioShell({ children }: PortfolioShellProps) {
  const location = useLocation();
  const home = location.pathname === "/";
  const nextProject = nextProjects[location.pathname];
  const numi = location.pathname === "/numi";
  const designedPage = numi || ["/tenki", "/ikko", "/my-bunny", "/we-live-happily-here", "/redream", "/lollipop", "/headease", "/le-frogette", "/about", "/contact"].includes(location.pathname);
  useEffect(() => {
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        // Font loading can move the target after the first layout, especially on mobile.
        void document.fonts.ready.then(() => { if (!cancelled) scrollToSection(location.hash); });
      }
      else window.scrollTo({ top: 0, behavior: "instant" });
      const title = document.querySelector("main h1")?.textContent?.trim();
      document.title = home ? "Game & UI Designer | Shani Shlomov" : `${title ?? "Portfolio"} | Shani Shlomov`;
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [location.pathname, location.hash, home]);
  return <div data-portfolio-shell className={`${c(`portfolio ${home ? "home-page" : ""} ${numi ? "numi-case" : ""} ${["/my-bunny", "/headease"].includes(location.pathname) ? "short-case" : ""}`)} ${designedPage ? numiStyles.shell : ""}`}>
    <a className={c("skip-link")} href="#main" onClick={event => { event.preventDefault(); document.getElementById("main")?.focus({ preventScroll: true }); }}>Skip to main content</a>
    <SiteHeader key={location.pathname} numi={!home} />
    <main id="main" tabIndex={-1}>{children}</main>
    {home ? <HomeFooter /> : location.pathname === "/contact" ? <ContactFooter /> : nextProject ? <ProjectFooter next={nextProject} minimal={location.pathname === "/headease"} /> : <CaseFooter compact={location.pathname === "/about"} />}
  </div>;
}
