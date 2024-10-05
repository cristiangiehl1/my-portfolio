import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface ClientWelcomeResponseProps {
  name: string
}

export default function EmailGreetingsTemplate({
  name,
}: ClientWelcomeResponseProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://github.com/cristiangiehl1.png`}
            width="100"
            height="100"
            alt="cristian profile picture"
            style={logo}
          />
          <Section>
            <Text style={paragraph}>
              Hi <strong>{name}</strong>,
            </Text>
            <Text style={paragraph}>
              {`Thank you for reaching out! I appreciate your interest and will respond as soon as possible.`}
            </Text>
            <Text style={paragraph}>
              {`If you have any urgent inquiries, please don’t hesitate to reach out to me directly by phone: `}
              <Link
                href="https://wa.me/5521999815903"
                target="_blank"
                style={whatsappLink}
              >
                +55 21 99981-5903
              </Link>
            </Text>
            <Text style={paragraph}>
              {`Best regards,`}
              <br />
              {`Cristian Giehl.`}
            </Text>
          </Section>

          <Hr style={hr} />

          <Container style={footer}>
            <table
              role="presentation"
              width="100%"
              cellSpacing="0"
              cellPadding="0"
            >
              <tr>
                <td style={tableCell} width="50%">
                  <Text style={heading}>VERSION</Text>
                  <Text style={text}>2024 &copy; Edition</Text>
                </td>

                <td style={tableCell} width="50%">
                  <Text style={heading}>SOCIALS</Text>
                  <Text style={text}>
                    <Link
                      href="https://www.instagram.com/cristian.giehl/"
                      target="_blank"
                      style={link}
                    >
                      Instagram
                    </Link>{' '}
                    |{' '}
                    <Link
                      href="https://www.linkedin.com/in/cristian-giehl-5b3539b4/"
                      target="_blank"
                      style={link}
                    >
                      LinkedIn
                    </Link>
                  </Text>
                </td>
              </tr>
            </table>
          </Container>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
  borderRadius: '50%',
  border: '2px solid black',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '10px 0',
}

const footer = {
  marginTop: '10px',
}

const tableCell = {
  verticalAlign: 'top' as const,
}

const text = {
  fontSize: '10px',
  color: '#333333',
  marginTop: '-5px',
}

const link = {
  color: '#1A73E8',
  textDecoration: 'none',
}

const whatsappLink = {
  color: '#1ed440',
  textDecoration: 'none',
}

const heading = {
  fontSize: '10px',
  color: '#888888',
  textTransform: 'uppercase' as const,
  marginBottom: '4px',
}
