'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import gsap from 'gsap'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiLoader } from 'react-icons/bi'
import { z } from 'zod'

import Magneto from '@/app/components/magneto'

type EmailResponse = {
  success: boolean
  message: string[] | null
  errors: string[] | null
}

const aboutFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, include at least 4 charecters.' }),
  email: z.string().email({ message: 'Please, provide a valid email.' }),
  organization: z
    .string()
    .min(3, { message: 'Please, include at least 3 charecters.' }),
  contactMessage: z
    .string()
    .min(1, { message: 'Please, send a contact message.' }),
})

export type AboutFormSchema = z.infer<typeof aboutFormSchema>

export default function ContactForm() {
  const [emailSentResponse, setEmailSentResponse] = useState<EmailResponse>({
    success: false,
    message: null,
    errors: null,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AboutFormSchema>({
    resolver: zodResolver(aboutFormSchema),
  })

  function modalAnimation(success: boolean) {
    gsap.to('.awnser-modal', {
      onStart: () => {
        if (success) {
          gsap.set('.awnser-modal', {
            borderColor: ' rgb(21 128 61)',
          })
          gsap.set('.modal-text', {
            color: 'rgb(21 128 61)',
          })
        } else {
          gsap.set('.awnser-modal', {
            borderColor: 'rgb(239 68 68)',
          })
          gsap.set('.modal-text', {
            color: 'rgb(239 68 68)',
          })
        }
      },
      bottom: '50%',
      opacity: 1,
      duration: 2,
      yoyo: true,
      repeat: 1,
      repeatDelay: 4,
      ease: 'power2.inOut',
    })
  }

  function handleCLoseModal() {
    gsap.killTweensOf('.awnser-modal')
    gsap.set('.awnser-modal', { bottom: '-50%', opacity: 0 })
  }

  async function handleSendEmail(data: AboutFormSchema) {
    const { contactMessage, email, name, organization } = data

    const response = await fetch('/api/email/send', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        organization,
        contactMessage,
      }),
    })

    const responseData = await response.json()

    if (responseData.success) {
      setEmailSentResponse(responseData)
      reset()
      modalAnimation(responseData.success)
    } else {
      setEmailSentResponse(responseData)
      modalAnimation(responseData.success)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSendEmail)}
      className="flex w-full flex-col"
      autoComplete="off"
    >
      <div className="flex w-full items-start justify-center gap-4 border-t-2 border-zinc-500 px-6 py-12 sm:h-[180px]">
        <span className="w-[25%] text-xs font-bold text-zinc-500">01</span>

        <div className="flex w-full flex-col items-start justify-start gap-4">
          <label htmlFor="name" className="sm-text-xl text-base md:text-2xl">
            {`What's your name?`}
          </label>
          <input
            type="text"
            id="name"
            className={`sm-text-xl w-full bg-transparent text-base text-blue-100 placeholder:text-base focus:outline-none sm:placeholder:text-xl md:text-2xl md:placeholder:text-2xl`}
            placeholder="John Doe"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-xs font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex w-full items-start justify-center gap-4 border-t-2 border-zinc-500 px-6 py-12 sm:h-[180px]">
        <span className="w-[25%] text-xs font-bold text-zinc-500">02</span>

        <div className="flex w-full flex-col items-start gap-4">
          <label htmlFor="email" className="text-base sm:text-xl md:text-2xl">
            {`What's your email?`}
          </label>
          <input
            type="email"
            id="email"
            className="w-full bg-transparent text-base text-blue-100 placeholder:text-base focus:outline-none sm:text-xl sm:placeholder:text-xl md:text-2xl md:placeholder:text-2xl"
            placeholder="john@doe.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex w-full items-start justify-center gap-4 border-t-2 border-zinc-500 px-6 py-12 sm:h-[180px]">
        <span className="w-[25%] text-xs font-bold text-zinc-500">03</span>

        <div className="flex w-full flex-col items-start gap-4">
          <label
            htmlFor="organization"
            className="text-base sm:text-xl md:text-2xl"
          >
            {`What's the name of your organization?`}
          </label>
          <input
            type="text"
            id="organization"
            className="w-full bg-transparent text-base text-blue-100 placeholder:text-base focus:outline-none sm:text-xl sm:placeholder:text-xl md:text-2xl md:placeholder:text-2xl"
            placeholder="John Doe Inc"
            {...register('organization')}
          />
          {errors.organization && (
            <p className="text-xs font-medium text-red-500">
              {errors.organization.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex w-full items-start justify-center gap-4 border-y-2 border-zinc-500 px-6 py-12 sm:h-[340px]">
        <span className="w-[25%] text-xs font-bold text-zinc-500">04</span>

        <div className="flex w-full flex-col items-start gap-4">
          <label
            htmlFor="contactMessage"
            className="text-base sm:text-xl md:text-2xl"
          >
            {`Your message`}
          </label>
          <textarea
            id="contactMessage"
            className="w-full resize-none bg-transparent text-base text-blue-100 placeholder:text-base focus:outline-none sm:text-xl sm:placeholder:text-xl md:placeholder:text-2xl"
            rows={6}
            placeholder="Hello Cristian, I want to hire you to work with..."
            {...register('contactMessage')}
          />
          {errors.contactMessage && (
            <p className="text-xs font-medium text-red-500">
              {errors.contactMessage.message}
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-8 flex justify-center">
        <Magneto
          text={`${!isSubmitting ? 'Send It!' : ''} `}
          className={`h-20 w-20 bg-slate-600 text-base sm:h-32 sm:w-32 sm:text-xl`}
          magnetoStrength={30}
          magnetoTextStrength={30}
          type="submit"
        >
          <BiLoader
            size={35}
            className={isSubmitting ? 'block animate-spin' : 'hidden'}
          />
        </Magneto>
      </div>

      {emailSentResponse && (
        <div className="awnser-modal fixed -bottom-[50%] left-[25%] z-[9999px] w-[50vw] -translate-y-1/2 items-center justify-center rounded-2xl border-[2px] border-dotted bg-slate-950 px-8 py-14 opacity-0">
          <p className="modal-text text-center font-bold">
            {emailSentResponse.message}
          </p>

          <div onClick={handleCLoseModal}>
            <Magneto
              text=" &times;"
              className={`absolute right-2 top-2 h-10 w-10 bg-black text-xs font-bold`}
              magnetoStrength={20}
              magnetoTextStrength={10}
              type="button"
            />
          </div>
        </div>
      )}
    </form>
  )
}
