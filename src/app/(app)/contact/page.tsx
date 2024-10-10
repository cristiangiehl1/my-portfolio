import './styles.css'

import type { Metadata } from 'next'
import Image from 'next/image'

import Footer from '@/app/components/footer'
import Header from '@/app/components/header'

import ContactAside from './components/contact-aside'
import ContactForm from './components/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
}

export default function Contact() {
  return (
    <div className="relative min-h-screen w-full" id="contact-page-container">
      <Header />

      <main className="flex min-h-screen flex-col justify-between gap-10 px-6 py-32 md:px-20">
        <div className="flex h-[30vh] items-center justify-between gap-6 md:gap-20">
          <h1 className="mb-10 text-3xl md:text-7xl">{`Let's work together`}</h1>

          <div className="flex items-center justify-center rounded-full md:w-[40%]">
            <Image
              src={'https://github.com/cristiangiehl1.png'}
              alt=""
              width={150}
              height={150}
              className="rounded-full border-[4px] border-gray-300 object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-20 md:flex-row-reverse">
          <ContactAside />

          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
