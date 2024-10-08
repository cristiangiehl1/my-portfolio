import Image from 'next/image'

import LinksWithAnimation from './links-with-animation'
import Magneto from './magneto'

export default function ContactSection() {
  return (
    <section
      id="contact-section"
      className="panel contact-section relative z-0 flex h-[100vh] w-full flex-col place-content-center items-center justify-center gap-6 overflow-hidden bg-slate-800"
    >
      <div className="flex items-center justify-center gap-6">
        <Image
          src={'https://github.com/cristiangiehl1.png'}
          alt=""
          width={40}
          height={40}
          loading="eager"
          className="rounded-full border-2"
        />

        <h2 className="text-2xl font-bold sm:text-4xl">{`Let's work together`}</h2>
      </div>

      <div className="z-50 flex items-center justify-center">
        <Magneto
          text="Get in touch"
          className="h-[100px] w-[100px] bg-red-800 md:h-[120px] md:w-[120px]"
          href="/contact"
          magnetoStrength={40}
          magnetoTextStrength={20}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <LinksWithAnimation
          linkProps={{
            href: 'mailto:cristiangiehl@gmail.com',
            className: 'p-5 rounded-full border-[2px]',
            'aria-label': 'Send e-mail to Cristian Giehl.',
          }}
          blobProps={{ className: 'rounded-full bg-slate-500' }}
        >
          <span className="relative z-10 text-sm sm:text-base">
            cristiangiehl@gmail.com
          </span>
        </LinksWithAnimation>

        <LinksWithAnimation
          linkProps={{
            href: 'https://wa.me/5521999815903',
            className: 'p-5 rounded-full border-[2px]',
            target: '_blank',
            'aria-label': 'Open whatsapp chat with Cristian Giehl.',
          }}
          blobProps={{ className: 'rounded-full bg-slate-500' }}
        >
          <span className="relative z-10 text-sm sm:text-base">
            +55 21 99981 5903
          </span>
        </LinksWithAnimation>
      </div>
    </section>
  )
}
