import { getRequestConfig } from "next-intl/server"

import { defaultLocale, type LocaleOption, locales } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if ((!locale) || (!locales.includes(locale as LocaleOption))) locale = defaultLocale
  const messages = (await import(`../../langs/${locale}.json`)) as { default: IntlMessages }
  return { locale, messages: messages.default }
})