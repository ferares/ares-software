"use client"

import { GoogleTagManager as Gtm } from "@next/third-parties/google"

import { useCookieConsentContext } from "@/context/cookieConsent"

interface GoogleTagManagerProps { gtmId: string }

function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const { consentGiven } = useCookieConsentContext()
  if (!consentGiven) return null
  return <Gtm gtmId={gtmId} />
}

export default GoogleTagManager