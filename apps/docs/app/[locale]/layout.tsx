import { unstable_setRequestLocale } from "next-intl/server";

import NotFound from "../not-found";

export const locales = ["en", "vn"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!locales.includes(locale as any)) return <NotFound />;

  unstable_setRequestLocale(locale);

  return <>{children}</>;
}
