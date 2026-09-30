import { createHashRouter } from "react-router-dom";
import { LoadingPage } from "@/pages/loading/LoadingPage";
import { App } from "@/app/App";
import { HomePage } from "@/pages/home/HomePage";
import { AppErrorPage } from "@/pages/error/AppErrorPage";
import { restoreLegacyUrl } from "@/shared/utils/restoreLegacyUrl";

restoreLegacyUrl();

export const router = createHashRouter([{
  path: "/", Component: App, ErrorBoundary: AppErrorPage, HydrateFallback: LoadingPage,
  children: [
    { index: true, Component: HomePage },
    { path: "numi", lazy: async () => ({ Component: (await import("@/pages/numi/NumiPage")).NumiPage }) },
    { path: "we-live-happily-here", lazy: async () => ({ Component: (await import("@/pages/we-live-happily-here/WeLiveHappilyHerePage")).WeLiveHappilyHerePage }) },
    { path: "ikko", lazy: async () => ({ Component: (await import("@/pages/ikko/IkkoPage")).IkkoPage }) },
    { path: "tenki", lazy: async () => ({ Component: (await import("@/pages/ikko/IkkoPage")).IkkoPage }) },
    { path: "le-frogette", lazy: async () => ({ Component: (await import("@/pages/le-frogette/LeFrogettePage")).LeFrogettePage }) },
    { path: "my-bunny", lazy: async () => ({ Component: (await import("@/pages/my-bunny/MyBunnyPage")).MyBunnyPage }) },
    { path: "headease", lazy: async () => ({ Component: (await import("@/pages/headease/HeadeasePage")).HeadeasePage }) },
    { path: "redream", lazy: async () => ({ Component: (await import("@/pages/redream/RedreamPage")).RedreamPage }) },
    { path: "lollipop", lazy: async () => ({ Component: (await import("@/pages/lollipop/LollipopPage")).LollipopPage }) },
    { path: "about", lazy: async () => ({ Component: (await import("@/pages/about/AboutPage")).AboutPage }) },
    { path: "resume", lazy: async () => ({ Component: (await import("@/pages/resume/ResumePage")).ResumePage }) },
    { path: "contact", lazy: async () => ({ Component: (await import("@/pages/contact/ContactPage")).ContactPage }) },
    { path: "health", lazy: async () => ({ Component: (await import("@/pages/health/HealthPage")).HealthPage }) },
    { path: "*", lazy: async () => ({ Component: (await import("@/pages/not-found/NotFoundPage")).NotFoundPage }) },
  ],
}]);
