import { Helmet } from 'react-helmet-async';

const SITE = 'Goal Genie';
const BASE = 'https://goalgenie.onrender.com';
const DEFAULT_DESC = 'Get all the latest Fixed VIP Tips, Football Predictions, Betting Odds and livescores, results & fixtures for all leagues and competitions, including the Premier League, Championship and across the world.';
const DEFAULT_IMG = `${BASE}/logo512.png`;

const ROUTE_META = {
  '/': { title: 'Home', desc: 'Fixed VIP Football Tips, today\u2019s predictions, live odds and winning history for all major leagues.', keywords: 'football predictions today, VIP tips, fixed matches, betting odds, livescores' },
  '/about': { title: 'About', desc: 'Learn about Goal Genie \u2014 our expert analysis, prediction accuracy and VIP membership benefits.', keywords: 'about goal genie, football prediction service, VIP membership' },
  '/pay': { title: 'Pay', desc: 'Subscribe to Goal Genie VIP. Pay securely via M-Pesa, PayPal or cryptocurrency and unlock premium tips.', keywords: 'VIP subscription, pay, M-Pesa, PayPal, crypto payment, football tips' },
  '/login': { title: 'Login', desc: 'Log in to your Goal Genie account to access VIP predictions and your dashboard.', keywords: 'goal genie login, account, VIP access' },
  '/register': { title: 'Register', desc: 'Create a free Goal Genie account and start getting expert football predictions today.', keywords: 'goal genie register, sign up, free account, football predictions' },
};

export default function AppHelmet({ title, location }) {
  const pathname = typeof location === 'string' ? location : (location?.pathname || '/');
  const meta = ROUTE_META[pathname] || { title: title || 'Page', desc: DEFAULT_DESC, keywords: '' };
  const fullTitle = `${meta.title} | ${SITE} - Fixed VIP Football Tips, Predictions and Odds`;
  const canonicalUrl = `${BASE}${pathname === '/' ? '/' : pathname}`;
  const noIndex = ['/login', '/register', '/pay'].includes(pathname);

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{fullTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={meta.desc} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      {noIndex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:site_name" content={SITE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={meta.desc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={DEFAULT_IMG} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={meta.desc} />
      <meta name="twitter:image" content={DEFAULT_IMG} />
    </Helmet>
  );
}
