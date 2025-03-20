"use client"

import { type FormEvent, useCallback, useRef, useState } from "react"

import { useLocale, useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

import { emailPattern } from "@/helpers/strings"

import HCaptcha from "@hcaptcha/react-hcaptcha"
import { useAlertsContext } from "@/context/alerts"
import { useLoaderContext } from "@/context/loader"

interface ContactProps { captchaSiteKey: string }

function Contact({ captchaSiteKey }: ContactProps) {
  const { pushAlert, pushScreenReaderAlert } = useAlertsContext()
  const { setLoading } = useLoaderContext()
  const [wasValidated, setWasValidated] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [captchaToken, setCaptchaToken] = useState<string>()
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const captchaRef = useRef<HCaptcha>(null)
  const t = useTranslations()
  const locale = useLocale()

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if ((!emailRef.current?.validity.valid) || (!messageRef.current?.validity.valid) || (!captchaToken)) {
      setWasValidated(true)
      if (!emailRef.current?.validity.valid) emailRef.current?.focus()
      else if (!messageRef.current?.validity.valid) messageRef.current?.focus()
      else return pushAlert("danger", t("Messages.invalid-captcha"), 3000)
      pushScreenReaderAlert("assertive", t("Messages.invalid-form"))
      return
    }
    const body = JSON.stringify({ email, name, message, captchaToken })
    setLoading(true, t("Messages.contact-submitting"))
    try {
      const response = await fetch("/api/contact", { method: "POST", body })
      if (response.status === 200) {
        pushAlert("success", t("Messages.contact-success"), 3000)
        setWasValidated(false)
        setName("")
        setEmail("")
        setMessage("")
      } else {
        pushAlert("danger", t("Messages.error"), 3000)
      }
    } catch (error) {
      console.error(error)
      pushAlert("danger", t("Messages.error"), 3000)
    } finally {
      captchaRef.current?.resetCaptcha()
    }
    setLoading(false)
  }, [captchaToken, email, message, name, t, setLoading, pushAlert, pushScreenReaderAlert])

  return (
    <section id="contact" className="contact">
      <div className="max-width contact__content">
        <h2 className="section-title">
          {t("Sections.Contact.title")}
        </h2>
        <form noValidate className={`contact__form ${wasValidated ? "was-validated" : ""}`} onSubmit={handleSubmit}>
          <div className="contact__form__row">
            <label className="contact__form__label" htmlFor="name">{t("Labels.name")}</label>
            <input className="contact__form__input" type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="contact__form__row">
            <label className="contact__form__label" htmlFor="email">{t("Labels.email")} ({t("Labels.required")})</label>
            <input className="contact__form__input" ref={emailRef}  type="email" id="email" value={email} required pattern={emailPattern} onChange={(event) => setEmail(event.target.value)} />
            <div className="contact__form__invalid-feedback">{t("Messages.input-an-email")}</div>
          </div>
          <div className="contact__form__row">
            <label className="contact__form__label" htmlFor="message">{t("Labels.message")} ({t("Labels.required")})</label>
            <textarea className="contact__form__input" ref={messageRef} id="message" rows={6} required value={message} onChange={(event) => setMessage(event.target.value)} />
            <div className="contact__form__invalid-feedback">{t("Messages.input-a-message")}</div>
          </div>
          <div className="contact__form__row">
            <HCaptcha ref={captchaRef} sitekey={captchaSiteKey} onVerify={setCaptchaToken} languageOverride={locale} />
          </div>
          {<div className={`contact__form__invalid-feedback ${!captchaToken ? "show" : ""}`}>{t("Messages.invalid-captcha")}</div>}
          <div className="contact__form__submit-row">
            <a className="contact__form__email" href="mailto:fermin@ares.uy">
              <FontAwesomeIcon icon={faEnvelope} />
              fermin@ares.uy
            </a>
            <button type="submit" className="btn btn-primary">
              {t("Labels.send")}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact