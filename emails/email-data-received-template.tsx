import { Body, Container, Html, Section, Text } from '@react-email/components'
import * as React from 'react'

export interface EmailTemplateProps {
  name: string
  email: string
  organization: string
  contactMessage: string | null
}

export default function EmailDataReceivedTemplate({
  name,
  email,
  organization,
  contactMessage,
}: EmailTemplateProps) {
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={title}>Cristian,</Text>
            <Text style={subtitle}>
              Alguém visualizou seu portfólio e quis entrar em contato
            </Text>
          </Section>
          <Section style={content}>
            <Text style={contentTitle}>Aqui estão os dados dele:</Text>
            <Text style={item}>
              <strong>Nome: </strong>
              {name}
            </Text>
            <Text style={item}>
              <strong>Email: </strong>
              {email}
            </Text>
            <Text style={item}>
              <strong>Organização: </strong>
              {organization}
            </Text>

            <Text style={item}>
              <strong>Mensagem </strong>
              <div style={responseBox}>{contactMessage}</div>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f6f6f6',
  padding: '20px',
}

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  padding: '20px',
}

const header = {
  borderBottom: '1px solid #e6e6e6',
  paddingBottom: '10px',
  marginBottom: '20px',
}

const title = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 10px',
}

const subtitle = {
  fontSize: '16px',
  margin: '0',
}

const content = {
  padding: '10px 0',
}

const contentTitle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '10px',
}

const item = {
  fontSize: '14px',
  marginBottom: '5px',
}

const responseBox = {
  border: '1px solid #e6e6e6',
  borderRadius: '4px',
  padding: '10px',
  marginTop: '10px',
  minHeight: '100px',
}
