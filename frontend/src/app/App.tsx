import { Outlet } from "react-router-dom";

import { PortfolioShell } from "@/features/portfolio/PortfolioShell";

export function App() {
  return (
    <PortfolioShell>
      <Outlet />
    </PortfolioShell>
  );
}
