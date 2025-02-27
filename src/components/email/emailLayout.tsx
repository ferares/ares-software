import { type CSSProperties, type ReactNode } from "react"

import { Html, Head, Body, Container, Text, Heading } from "@react-email/components"

const styles: Record<string, CSSProperties> = {
  body: {
    fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
    backgroundColor: "#edf2f7",
    margin: 0,
    padding: "20px",
    color: "#333",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  iconContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  icon: {
    display: "block",
    margin: "0 auto",
  },
  contentContainer: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
  },
  heading: {
    color: "#495057",
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    color: "#212529",
    marginTop: "20px",
  },
}

interface EmailLayoutProps { title?: string, children: ReactNode }

export default function EmailLayout({ title, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <div style={styles.contentContainer}>
            {title && (<Heading style={styles.heading}>{title}</Heading>)}
            {children}
          </div>
        </Container>
        <div style={styles.footer}>
          <Text>© {(new Date()).getFullYear()} Ares Software Development.</Text>
        </div>
      </Body>
    </Html>
  )
}