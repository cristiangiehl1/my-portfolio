import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

import EmailDataReceivedTemplate from '@/../emails/email-data-received-template'
import EmailGreetingsTemplate from '@/../emails/email-greetings-template'
import { env } from '@/env'

const resend = new Resend(env.RESEND_API_KEY)

const sendEmailBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  organization: z.string(),
  contactMessage: z.string(),
})

type SendEmailBody = z.infer<typeof sendEmailBodySchema>

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SendEmailBody
    const result = sendEmailBodySchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json({
        success: false,
        message: null,
        errors,
      })
    }

    const { name, email, organization, contactMessage } = result.data

    const { error } = await resend.batch.send([
      {
        from: 'contact@cristiangiehl.com.br',
        to: ['cristiangiehl@gmail.com'],
        subject: 'Meu Portfólio - Nova Mensagem',
        react: EmailDataReceivedTemplate({
          contactMessage,
          email,
          name,
          organization,
        }),
      },
      {
        from: 'contact@cristiangiehl.com.br',
        to: [email],
        subject: `Auto-Reply: Your Request Has Been Received`,
        react: EmailGreetingsTemplate({
          name,
        }),
      },
    ])

    if (error) {
      return NextResponse.json({
        success: false,
        message: error,
        errors: true,
      })
    }

    return NextResponse.json({
      success: true,
      message:
        'Your email has been successfully sent. I will respond as soon as possible.',
      errors: null,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({
      success: false,
      message:
        'An unexpected error occurred while attempting to send the email. Please feel free to contact me via phone.',
      errors: err,
    })
  }
}
