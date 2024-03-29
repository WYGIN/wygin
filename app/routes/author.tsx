// app/root.tsx
import { PrismicProvider } from "@prismicio/react";
import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import AnimationRevealPage from "~/helpers/AnimationRevealPage.js";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <PrismicProvider>
          <AnimationRevealPage>
            <Outlet />
          </AnimationRevealPage>
        </PrismicProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
