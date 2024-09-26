import Image from 'next/image'

import LinksWithAnimation from './links-with-animation'
import Magneto from './magneto'

export default function ContactSection() {
  return (
    <section
      id="contact-section"
      className="contact-section relative flex h-[105vh] w-full flex-col place-content-center items-center justify-center gap-6 bg-slate-800"
    >
      <div className="flex items-center justify-center gap-2">
        <Image
          src={'https://github.com/cristiangiehl1.png'}
          alt=""
          width={40}
          height={40}
          loading="eager"
          className="rounded-full border-2"
        />

        <h2 className="text-4xl font-bold">{`Let's work together`}</h2>
      </div>

      <div className="flex items-center justify-center">
        <Magneto
          text="Get in touch"
          className="h-[120px] w-[120px] bg-red-800"
          href="/contact"
          magnetoStrength={50}
          magnetoTextStrength={30}
        />
      </div>

      <div className="flex items-center justify-center gap-4">
        <LinksWithAnimation
          linkProps={{
            href: 'mailto:cristiangiehl@gmail.com',
            className: 'p-5 rounded-full border-[2px]',
            'aria-label': 'Send e-mail to Cristian Giehl.',
          }}
          blobProps={{ className: 'rounded-full bg-slate-500' }}
        >
          <span className="relative z-10">cristiangiehl@gmail.com</span>
        </LinksWithAnimation>

        <LinksWithAnimation
          linkProps={{
            href: 'https://wa.me/5521999815903?text=Bem-vindo!%20Clique%20no%20ícone%20para%20iniciar%20uma%20conversa%20comigo.',
            className: 'p-5 rounded-full border-[2px]',
            target: '_blank',
            'aria-label': 'Open whatsapp chat with Cristian Giehl.',
          }}
          blobProps={{ className: 'rounded-full bg-slate-500' }}
        >
          <span className="relative z-10">+55 21 99981 5903</span>
        </LinksWithAnimation>
      </div>
    </section>
  )
}
