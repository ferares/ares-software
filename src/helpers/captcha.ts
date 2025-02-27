import { logError } from "./logger"

type HCaptchaOutcome = {
  "success": boolean, // is the passcode valid, and does it meet security criteria you specified, e.g. sitekey?
  "challenge_ts": string, // timestamp of the challenge (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  "hostname": string, // the hostname of the site where the challenge was passed
  "error-codes": string[] // optional: any error codes
}

const { CAPTCHA_URL, CAPTCHA_SECRET, CAPTCHA_SITE_KEY } = process.env

export async function verifyCaptcha(token: string, ip?: string) {
  if ((!CAPTCHA_URL) || (!CAPTCHA_SECRET)) {
    logError(new Error("no captcha URL and/or secret found"))
    return false
  }
  const body = new URLSearchParams()
  body.append("secret", CAPTCHA_SECRET)
  body.append("response", token)
  body.append("sitekey", CAPTCHA_SITE_KEY ?? "")
  body.append("remoteip", ip ?? "")
  const captchaResponse = await fetch(CAPTCHA_URL, { method: "POST", body, headers: { "Content-Type": "application/x-www-form-urlencoded" } })
  if (captchaResponse.status !== 200) throw new Error("turnstile request error", { cause: captchaResponse })
  const captchaOutcome = await captchaResponse.json() as HCaptchaOutcome
  return captchaOutcome.success
}