import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async () => {
  const locale = "en"
  const messages = (await import(`../../langs/${locale}.json`)) as { default: IntlMessages }
  return { locale, messages: messages.default }
})