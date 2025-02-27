import nodemailer from "nodemailer"

import { render } from "@react-email/components"

import ContactEmail from "@/components/email/contactEmail"

const { MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM_NAME, MAIL_FROM_ADDRESS, MAIL_ADMIN_ADDRESS } = process.env

function createTransport() {
  return nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    secure: true,
    auth: { user: MAIL_USERNAME, pass: MAIL_PASSWORD },
  })
}

export async function sendContactEmail({ name, email, message }: { name?: string, email: string, message: string }) {
  const transporter = createTransport()
  return transporter.sendMail({
    from: `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDRESS}>`,
    to: MAIL_ADMIN_ADDRESS,
    replyTo: name ? `"${name}" <${email}>` : email,
    subject: "Contacto Web Ares",
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`,
    html: await render(<ContactEmail email={email} message={message} name={name} />),
  })
}