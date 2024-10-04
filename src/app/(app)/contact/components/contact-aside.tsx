import Image from 'next/image'

import contactImg from '@/assets/contact-img.jpg'

export default function ContactAside() {
  return (
    <aside className="flex w-full items-start justify-between gap-10 md:w-[40%] md:flex-col md:justify-start">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-bold uppercase text-zinc-500 md:text-sm">
            Contact Details
          </h2>

          <div className="flex flex-col gap-1 tracking-widest">
            <a
              className="hover-underline max-w-fit text-sm md:text-base"
              href="mailto:cristiangiehl@gmail.com"
              title="Gmail"
              aria-label="Send an e-mail to Cristian Giehl."
            >
              cristiangiehl@gmail.com
            </a>

            <a
              aria-label="Whatsapp contact"
              title="whatsapp contact"
              target="_blank"
              href="https://wa.me/5521999815903?text=Bem-vindo!%20Clique%20no%20ícone%20para%20iniciar%20uma%20conversa%20comigo."
              rel="noreferrer"
              className="hover-underline max-w-fit text-sm md:text-base"
            >
              +55 21 99981 5903
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-bold uppercase text-zinc-500 md:text-sm">
            Socials
          </h2>

          <div className="flex flex-col gap-1 tracking-widest">
            <a
              className="hover-underline max-w-fit text-sm md:text-base"
              target="_blank"
              href="https://www.instagram.com/cristian.giehl/"
              rel="noreferrer"
              aria-label="Navigate to Cristian Giehl Instagram Profile."
            >
              Instagram
            </a>

            <a
              className="hover-underline max-w-fit text-sm md:text-base"
              target="_blank"
              href="https://www.linkedin.com/in/cristian-giehl-5b3539b4/"
              rel="noreferrer"
              aria-label="Navigate to Cristian Giehl LinkedIn Profile."
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div
        className="hidden h-full w-full rounded-md p-1 sm:block md:max-h-[700px]"
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
        }}
      >
        <Image
          src={contactImg}
          alt=""
          width={300}
          height={300}
          className="h-[300px] w-full rounded-md object-cover opacity-20 md:h-full"
        />
      </div>
    </aside>
  )
}
