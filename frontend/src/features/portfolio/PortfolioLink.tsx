import { scrollToSection } from "./scrollToSection";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { asset } from "@/shared/utils/asset";

interface PortfolioLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}


export function PortfolioLink({ href = "", onClick, children, ...props }: PortfolioLinkProps) {
  const location = useLocation();
  if (href.startsWith("assets/")) return <a {...props} href={asset(href)}>{children}</a>;
  if (/^(https?:|mailto:|tel:)/.test(href)) return <a {...props} href={href} onClick={onClick}>{children}</a>;
  const [page = "", anchor] = href.split("#");
  const pathname = page ? (page === "index.html" ? "/" : `/${page.replace(/\.html$/, "")}`) : location.pathname;
  const hash = anchor ? `#${anchor}` : "";
  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (pathname === location.pathname && hash === location.hash) {
      if (hash) scrollToSection(hash);
      else window.scrollTo({ top: 0, behavior: "instant" });
    }
  }
  return <Link {...props} to={{ pathname, hash }} onClick={handleClick}>{children}</Link>;
}
