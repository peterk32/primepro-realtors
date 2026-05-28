import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-gold">404</h1>
        <h2 className="font-serif mt-4 text-2xl text-stone-100">Page not found</h2>
        <p className="mt-2 text-sm text-stone-400">
          The address you're searching for is no longer on the market.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-sm border border-gold/60 bg-gold/10 px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-gold hover:bg-gold hover:text-stone-950"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-stone-100">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-stone-400">
          Something went wrong on our end.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-sm bg-gold px-5 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-stone-950"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-sm border border-gold/40 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-gold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "kesmarthomes — Boutique Nairobi Real Estate" },
      {
        name: "description",
        content:
          "A boutique Nairobi atelier curating warm, light-filled luxury residences, executive suites, and family villas.",
      },
      { name: "author", content: "kesmarthomes" },
      { property: "og:title", content: "kesmarthomes" },
      {
        property: "og:description",
        content: "Boutique luxury real estate in Nairobi.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-stone-950">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
