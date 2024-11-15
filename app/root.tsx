import {useNonce} from '@shopify/hydrogen';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type {Shop} from '@shopify/hydrogen/storefront-api-types';
import {PageLayout} from '~/components';
import {HEADER_QUERY, FOOTER_QUERY} from '~/lib/fragments';

// Import styles with ?url for Vite to handle them properly
import appStylesUrl from './styles/app.css?url';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: appStylesUrl,
    },
  ];
}

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, cart, customerAccount} = context;
  const layout = await storefront.query(HEADER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      headerMenuHandle: 'main-menu',
    },
  });
  
  const footer = storefront.query(FOOTER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      footerMenuHandle: 'footer',
    },
  });

  const cartPromise = cart.get();
  const isLoggedIn = customerAccount.isLoggedIn();

  return defer({
    cart: cartPromise,
    footer,
    header: layout,
    isLoggedIn,
    publicStoreDomain: context.env.PUBLIC_STORE_DOMAIN,
  });
}

export default function App() {
  const nonce = useNonce();
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PageLayout {...data}>
          <Outlet />
        </PageLayout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Error</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="error-container">
          <h1>Something went wrong</h1>
          <p>Please try again later</p>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
