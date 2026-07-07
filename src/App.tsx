import { useState, useEffect, useRef } from 'react'

// Simple hook to detect when an element enters the viewport
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-20 transition-all duration-500 ${
          scrolled ? 'bg-cave/95 backdrop-blur-sm shadow-lg shadow-cave/20' : ''
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-parchment">
          <a href="#" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-parchment/40 font-display text-lg">
              C
            </span>
            <span className="font-display text-sm tracking-[0.2em] uppercase">Cave of Adullam</span>
          </a>
          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#events" className="hover:text-ember transition-colors">Events</a>
            <a href="#manifesto" className="hover:text-ember transition-colors">Our heart</a>
            <a href="#join" className="hover:text-ember transition-colors">Join us</a>
          </nav>
          <a
            href="https://forms.gle/fs7fJUaoeVsXhU2G8"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-parchment/50 px-4 py-2 text-xs uppercase tracking-widest backdrop-blur-sm hover:bg-parchment hover:text-cave transition"
          >
            RSVP
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
        <img
          src="/assets/hero-picnic.jpg"
          alt="Friends gathered under a tree at golden hour with bibles and a guitar"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cave/70 via-cave/30 to-cave/85" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:pb-28">
          <div className="mx-auto w-full max-w-7xl text-parchment">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-ember">
              Summer 2026 — A Gathering Movement
            </p>
            <h1 className="font-display text-5xl leading-[0.95] text-balance md:text-7xl lg:text-[5.5rem]">
              Come to <em className="not-italic text-ember">the cave</em>.
            </h1>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#events"
                className="rounded-full bg-ember px-7 py-3 text-sm font-medium uppercase tracking-wider text-parchment hover:bg-primary transition shadow-lg shadow-cave/30"
              >
                See this summer's gatherings
              </a>
              <a
                href="#manifesto"
                className="text-sm uppercase tracking-wider text-parchment/80 hover:text-parchment underline-offset-8 hover:underline"
              >
                Why we gather →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scripture Band ── */}
      <section className="bg-cave text-parchment">
        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
          <FadeIn>
            <p className="font-display text-3xl leading-snug text-balance md:text-5xl">
              <span className="text-ember">"</span>Now that we are surrounded by such a great cloud of witnesses… let us run with perseverance the race marked out for us.<span className="text-ember">"</span>
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.35em] text-parchment/60">Hebrews 12:1</p>
          </FadeIn>
        </div>
      </section>

      {/* ── Events ── */}
      <section id="events" className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <FadeIn className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ember">This Summer</p>
              <h2 className="font-display text-4xl text-balance md:text-6xl">
                Three gatherings.<br />
                <span className="italic text-muted-foreground">One body, in person.</span>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Every event is a little different — but the table is always open, and Christ is always the centre.
            </p>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                num: '01',
                vol: 'Vol. 01 — July 3rd',
                title: 'Potluck & BBQ',
                desc: 'Bring a dish from your kitchen, a story from your week, and an appetite. Lock the door behind you — let them eat, drink and be merry.',
                img: '/assets/event-bbq.jpg',
                alt: 'Backyard potluck under string lights',
                date: 'Friday, July 3rd',
                location: 'The Backyard — address shared on RSVP',
                bring: 'A dish to share + your Bible',
                rsvp: 'https://forms.gle/fs7fJUaoeVsXhU2G8',
                delay: 0,
              },
              {
                num: '02',
                vol: 'Vol. 02 — July',
                title: 'Worship in the Park',
                desc: 'Open-air singing as the sun goes down. Acoustic, unpolished, honest. Hands raised under a sky that\'s already declaring His glory.',
                img: '/assets/event-worship.jpg',
                alt: 'Worship gathering with hands raised at sunset',
                date: null,
                location: null,
                bring: null,
                delay: 100,
              },
              {
                num: '03',
                vol: 'Vol. 03 — August',
                title: 'Movie Night Under the Stars',
                desc: 'Blankets, popcorn, a projector, and a film worth talking about afterwards. We stay long after the credits roll.',
                img: '/assets/event-movie.jpg',
                alt: 'Outdoor movie night with projector and string lights',
                date: null,
                location: null,
                bring: null,
                delay: 200,
              },
            ].map((event) => (
              <FadeIn key={event.num} delay={event.delay}>
                <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border/60 transition hover:shadow-xl hover:-translate-y-1">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={event.img}
                      alt={event.alt}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-cave/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-parchment backdrop-blur">
                      {event.num}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-xs uppercase tracking-[0.25em] text-ember">{event.vol}</p>
                    <h3 className="mt-3 font-display text-2xl md:text-3xl">{event.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.desc}</p>
                    {event.date && (
                      <div className="mt-5 space-y-1.5 border-t border-border pt-5">
                        <p className="text-sm font-medium">{event.date}</p>
                        <p className="text-xs text-muted-foreground">{event.location}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-ember mt-2">{event.bring}</p>
                      </div>
                    )}
                    {event.rsvp && (
                      <a
                        href={event.rsvp}
                        target={event.rsvp.startsWith('http') ? '_blank' : undefined}
                        rel={event.rsvp.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-foreground/30 px-5 py-2.5 text-sm font-medium text-foreground hover:border-ember hover:text-ember transition"
                      >
                        Save my spot <span aria-hidden="true">→</span>
                      </a>
                    )}
                    {!event.rsvp && (
                      <p> Coming soon</p>
                    )}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto ── */}
      <section id="manifesto" className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:py-32 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ember">The Cave of Adullam</p>
            <h2 className="font-display text-4xl leading-tight text-balance md:text-5xl">
              David didn't run the race alone.
              <span className="block italic text-muted-foreground">Neither should you.</span>
            </h2>
          </FadeIn>
          <FadeIn className="space-y-8 text-base leading-relaxed lg:col-span-7" delay={100}>
            <p>
              When David fled into the cave of Adullam, he didn't stay there by himself. Four hundred came to him — the weary, the in-debt, the discontent — and he became their captain. A movement of brothers and sisters formed in the wilderness.
            </p>
            <p>
              We believe summer is too short, the days too urgent, and the table too good to eat alone. So we're throwing the doors open: potlucks, worship in the park, movies under the stars. Different every time. Same family, every time.
            </p>
            <blockquote className="border-l-2 border-ember pl-6 font-display text-xl italic text-foreground md:text-2xl">
              "Let us not give up meeting together… but let us encourage one another — and all the more as you see the Day approaching."
              <footer className="mt-3 not-italic font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Hebrews 10:25
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ── Join / RSVP ── */}
      <section id="join" className="relative overflow-hidden bg-cave text-parchment">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,oklch(0.62_0.18_40/0.5),transparent_50%),radial-gradient(circle_at_80%_70%,oklch(0.55_0.16_45/0.4),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
          <FadeIn>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-ember">Pull up a chair</p>
            <h2 className="font-display text-4xl leading-[1.05] text-balance md:text-6xl">
              Come hungry. Leave full.<br />
              <span className="italic text-parchment/80">Bring a friend.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-parchment/70">
              Friday, July 3rd · The Backyard · Address shared on RSVP.<br />
              Bring a dish to share and your Bible.
            </p>
            <div className="mt-10">
              <a
                href="https://forms.gle/fs7fJUaoeVsXhU2G8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ember px-8 py-4 text-sm font-medium uppercase tracking-wider text-parchment hover:bg-primary transition shadow-lg shadow-cave/30"
              >
                RSVP → Vol. 01
              </a>
            </div>
            <p className="mt-8 text-xs text-parchment/40 uppercase tracking-[0.2em]">
              Details for Vol. 02 &amp; 03 coming soon
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-cave text-parchment/60 border-t border-parchment/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-xs uppercase tracking-[0.25em] md:flex-row">
          <p>Cave of Adullam · Summer 2026</p>
          <p className="text-parchment/40">A gathering movement · Soli Deo Gloria</p>
        </div>
      </footer>
    </div>
  )
}
