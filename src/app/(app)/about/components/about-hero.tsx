import ContactSection from '@/app/components/contact-section'

export default function AboutHero() {
  return (
    <div
      ref={aboutRef}
      className="relative min-h-screen w-full overflow-x-hidden"
    >
      <Header />

      <main className="contact-hero min-h-screen w-full">
        <section className="panel flex min-h-[110vh] w-full flex-col items-start justify-center gap-6 overflow-hidden bg-slate-500 px-20 pt-24 md:flex-row md:justify-between md:pt-32">
          <div
            className="flex w-full translate-y-full flex-col items-center justify-start md:h-full"
            style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          >
            <h1 className="text-3xl font-bold leading-snug tracking-tighter md:text-5xl">
              Turning{' '}
              <span className="text-about-animation px-2 text-yellow-300">
                ideas
              </span>{' '}
              into solutions that make an impact
            </h1>

            <p className="w-full text-left leading-relaxed">
              {`Passionate about exploring new technologies and discovering
                innovative ways to turn concepts into reality.`}
            </p>
          </div>

          <div
            className="flex h-full w-full translate-y-full items-start justify-center"
            style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          >
            <Image
              src={aboutImg}
              alt=""
              width={500}
              height={500}
              quality={100}
              priority
              sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 400px"
              className="about-img h-[50vh] bg-white object-cover p-2 md:h-[70vh]"
              style={{
                boxShadow:
                  ' rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
              }}
            />
          </div>
        </section>

        <section className="website-content panel flex min-h-[110vh] w-full flex-col items-center justify-center overflow-hidden bg-slate-700 px-20 py-16">
          <h2 className="help-with-element-heading w-full text-left text-2xl font-bold text-purple-300 md:text-3xl">
            I can help you with<span className="dot-appear">...</span>
          </h2>

          <div className="mt-4 flex w-full flex-col justify-between gap-6 sm:flex-row lg:gap-16">
            <div className="help-with-element w-full">
              <div className="w-full border-b-[2px] border-gray-300 pb-4">
                <span className="text-xs font-bold text-gray-300">01</span>
              </div>

              <h3 className="mb-2 pt-4 text-xl font-bold text-purple-300 md:text-2xl">
                Front-End
              </h3>

              <p className="text-sm md:text-base">
                I build websites from scratch. My focus is on micro animations,
                transitions and interaction. Building with GSAP.
              </p>
            </div>

            <div className="help-with-element w-full">
              <div className="w-full border-b-[2px] border-gray-300 pb-4">
                <span className="text-xs font-bold text-gray-300">02</span>
              </div>

              <h3 className="mb-2 pt-4 text-xl font-bold text-purple-300 md:text-2xl">
                Back-End
              </h3>

              <p className="text-sm md:text-base">
                I build APIs from the ground up. My focus is on creating
                efficient architectures, optimizing performance, and ensuring
                scalability. Building with Node.js, Zod, and Prisma.
              </p>
            </div>

            <div className="help-with-element w-full">
              <div className="w-full border-b-[2px] border-gray-300 pb-4">
                <span className="text-xs font-bold text-gray-300">03</span>
              </div>

              <h3 className="mb-2 pt-4 text-xl font-bold text-purple-300 md:text-2xl">
                Full-Stack
              </h3>
              <p className="text-sm md:text-base">
                I create complete websites with custom APIs to ensure optimal
                performance and efficiency. From intuitive front-end interfaces
                to high-performance back-end systems, I focus on building fast,
                scalable solutions that deliver a seamless user experience.{' '}
              </p>
            </div>
          </div>
        </section>

        <section className="panel relative flex min-h-[110vh] w-full flex-col items-center justify-center overflow-hidden bg-slate-600 px-6">
          <h2 className="soft-skills-heading absolute translate-y-20 text-6xl font-bold opacity-0">
            <span className="cloudy text-yellow-500">Soft</span>
            <span className="target ml-16">Skills</span>
          </h2>

          <div className="soft-skills flex w-full flex-col items-center justify-center gap-4 md:flex-row">
            <div
              className="soft-skills-l z-10 flex flex-col gap-6 rounded-2xl bg-slate-900 p-6 text-xl md:text-2xl"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
              }}
            >
              <span>Communication</span>
              <span>Teamwork</span>
              <span>Adaptability</span>
            </div>
            <div
              className="soft-skills-r z-10 flex flex-col gap-6 rounded-2xl bg-slate-900 p-6 text-xl md:text-2xl"
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
              }}
            >
              <span>Problem-Solving</span>
              <span>Work Ethic</span>
              <span>Time Management</span>
            </div>
          </div>
        </section>
      </main>

      <section className="pinned absolute left-8 top-[5vh] flex items-center justify-center sm:top-[10vh]">
        <div className="revelear relative mt-20 rounded-full opacity-0">
          <div
            className="revelear-1 absolute left-1/2 top-1/2 h-10 w-10 bg-white"
            style={{
              clipPath: 'ellipse(40% 50% at 50% 50%)',
              transform: 'translate(-50%, -50%)',
            }}
          ></div>

          <div
            className="revelear-2 absolute left-1/2 top-1/2 h-10 w-10 bg-white"
            style={{
              clipPath: 'ellipse(40% 50% at 50% 50%)',
              transform: 'rotate(90deg) translate(-50%, +50%)',
            }}
          ></div>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
