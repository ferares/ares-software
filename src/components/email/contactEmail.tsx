import { type CSSProperties } from "react"

import { Link, Text } from "@react-email/components"

import { escapeHtml } from "@/helpers/strings"

import EmailLayout from "./emailLayout"

const styles: Record<string, CSSProperties> = {
  detailContainer: {
    marginBottom: "22px",
  },
  label: {
    fontSize: "16px",
    color: "#6c757d",
    lineHeight: 1,
  },
  text: {
    fontWeight: "normal",
    fontSize: "16px",
    color: "#212529",
    display: "inline-block",
    lineHeight: 1,
    margin: 0,
  },
  link: {
    color: "#145DA0",
    fontWeight: "normal",
    fontSize: "16px",
    textDecoration: "none",
  },
}

interface ContactEmailProps { name?: string, email: string, message: string }

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <EmailLayout title="Contacto">
      {name && (
        <div style={styles.detailContainer}>
          <Text style={styles.label}>
            <strong style={styles.label}>Nombre</strong>: {name}
          </Text>
          
        </div>
      )}
      <div style={styles.detailContainer}>
        <Text style={styles.label}>
          <strong style={styles.label}>Email</strong>:&nbsp;
          <Link href={`mailto:${email}`} style={styles.link}>
            {email}
          </Link>
        </Text>
      </div>
      <div style={styles.detailContainer}>
        <Text style={styles.label}>
          <strong style={styles.strong}>Mensaje</strong>:
        </Text>
        <Text style={styles.text} dangerouslySetInnerHTML={{ __html: escapeHtml(message).replace(/\n/g, '<br>') }} />
      </div>
    </EmailLayout>
  );
}