// Compatibility for links to the original static portfolio pages.
const portfolioUrl = new URL(window.location.href);
const portfolioFilename = portfolioUrl.pathname.split("/").pop();
if (portfolioFilename?.endsWith(".html")) {
  const project = portfolioFilename.slice(0, -5);
  portfolioUrl.pathname = portfolioUrl.pathname.slice(0, -portfolioFilename.length);
  if (project === "resume") {
    portfolioUrl.pathname += "assets/resume/ResumeSHANI.pdf";
    portfolioUrl.hash = "";
    portfolioUrl.search = "";
  } else {
    portfolioUrl.hash = `/${project}${portfolioUrl.hash}`;
  }
  window.location.replace(portfolioUrl.href);
}
