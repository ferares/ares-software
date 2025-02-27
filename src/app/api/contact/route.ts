import { type NextRequest, NextResponse } from "next/server"

import { sendContactEmail } from "@/helpers/email"
import { logError } from "@/helpers/logger"
import { verifyCaptcha } from "@/helpers/captcha"

export async function POST(req: NextRequest) {
  const { name, email, message, captchaToken } = await req.json() as { name: string, email: string, message: string, captchaToken: string }
  if ((!email) || (!message) || (!captchaToken)) return NextResponse.error()
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || undefined
  try {
    const captchaSuccess = await verifyCaptcha(captchaToken, ip)
    if (!captchaSuccess) return NextResponse.error()
    const info = await sendContactEmail({ name, email, message })
    if (info.rejected.length > 0) {
      logError(new Error("failed to deliver contact email", { cause: info.rejected }))
      return NextResponse.error()
    }
    return NextResponse.json({})
  } catch (error) {
    logError(error as Error)
    return NextResponse.error()
  }
}