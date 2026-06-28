import Image from "next/image";
import { getGalleryPhotos } from "@/lib/gallery";

export const dynamic = "force-dynamic";

const highlights = [
  {
    title: "3BR guesthouse stay",
    description:
      "A full three-bedroom property suited for families, friend groups, and short private retreats.",
  },
  {
    title: "Events and photoshoots",
    description:
      "Open outdoor character and scenic backdrops make the property fit for celebrations and creative shoots.",
  },
  {
    title: "Quiet farm-edge escape",
    description:
      "Set in Kondamadugu, the stay balances access from Hyderabad with a calmer countryside feel.",
  },
];

const amenityGroups = [
  "Private 3-bedroom villa setup",
  "Open grounds for gatherings",
  "Photo-friendly resort atmosphere",
  "Weekend family stay destination",
  "Accessible location near Ghatkesar side",
  "Direct host contact for bookings",
];

const stayMoments = [
  "Family weekends",
  "Birthday and small events",
  "Pre-wedding photoshoots",
  "Farm-style day outings",
];

const stats = [
  { value: "3BR", label: "private guesthouse layout" },
  { value: "4.5", label: "star business rating" },
  { value: "24/7", label: "direct phone enquiries" },
];

export default async function Home() {
  const galleryPhotos = await getGalleryPhotos();

  return (
    <main className="relative overflow-hidden">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-18 pt-8 sm:px-10 lg:px-12">
        <header className="glass-panel sticky top-4 z-10 mb-10 flex items-center justify-between rounded-full px-5 py-3 text-sm text-[color:var(--muted)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-lg font-semibold text-[color:var(--accent)]">
              H
            </div>
            <div>
              <p className="font-display text-2xl leading-none text-[color:var(--foreground)]">
                Heavenrock Guesthouse
              </p>
              <p className="text-xs uppercase tracking-[0.3em]">
                Kondamadugu, Telangana
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="rounded-full border border-[color:var(--line)] px-4 py-2 font-semibold text-[color:var(--foreground)] transition hover:bg-white/70"
          >
            Book a stay
          </a>
        </header>

        <div className="grid flex-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--forest)]">
              Resort stay • Events • Photoshoots
            </div>
            <div className="space-y-5">
              <h1 className="font-display max-w-4xl text-6xl leading-[0.95] font-semibold tracking-tight text-[color:var(--foreground)] sm:text-7xl lg:text-8xl">
                A warm countryside retreat for stays that feel private and memorable.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
                Heavenrock Guesthouse brings together a three-bedroom stay,
                event-friendly open space, and a relaxed farm-edge atmosphere for
                families, groups, and creative gatherings.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:+919949214746"
                className="rounded-full bg-[color:var(--accent)] px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:brightness-110"
              >
                Call +91 99492 14746
              </a>
              <a
                href="#gallery"
                className="rounded-full border border-[color:var(--line)] px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--foreground)] transition hover:bg-white/70"
              >
                Explore photos
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-panel rounded-3xl px-5 py-5">
                  <p className="font-display text-4xl text-[color:var(--forest)]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-5 translate-y-6 rounded-[2rem] bg-[color:var(--sun)]/25 blur-3xl" />
            <div className="section-shell relative overflow-hidden rounded-[2rem] p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.32)),linear-gradient(135deg,#e8d5b5_0%,#6d8a73_52%,#233b2d_100%)]">
                <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,236,203,0.95),transparent_68%)]" />
                <div className="absolute inset-x-6 bottom-6 rounded-[1.6rem] bg-white/82 p-6 shadow-xl backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)]">
                    Signature stay
                  </p>
                  <h2 className="font-display mt-3 text-3xl leading-tight text-[color:var(--foreground)]">
                    A resort-style guesthouse designed for slow mornings and shared weekends.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    Use the live gallery below to showcase your newest property photos as soon as they are uploaded to Supabase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-6 pb-8 sm:px-10 lg:grid-cols-3 lg:px-12">
        {highlights.map((item) => (
          <article key={item.title} className="section-shell rounded-[1.8rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">
              Highlight
            </p>
            <h3 className="font-display mt-4 text-3xl text-[color:var(--foreground)]">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
              {item.description}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div className="section-shell rounded-[2rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)]">
            Why guests choose it
          </p>
          <h2 className="font-display mt-4 text-5xl leading-tight text-[color:var(--foreground)]">
            Comfortable for overnight stays. Flexible for day events.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
            The current online presence highlights Heavenrock as a 3BR guesthouse
            with a strong leisure and event appeal. This new website is structured
            to grow into a fuller resort showcase as you add more photos and stay details.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {amenityGroups.map((amenity) => (
            <div
              key={amenity}
              className="glass-panel rounded-[1.6rem] px-5 py-6 text-base leading-7 text-[color:var(--foreground)]"
            >
              {amenity}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-12" id="gallery">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)]">
              Live gallery
            </p>
            <h2 className="font-display mt-3 text-5xl leading-tight text-[color:var(--foreground)]">
              Fresh photos appear here whenever you add them.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[color:var(--muted)]">
            The page reads from Supabase Storage and photo metadata on every request,
            so newly uploaded resort images can show up without rebuilding the site.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {galleryPhotos.map((photo) => (
            <article key={photo.id} className="section-shell overflow-hidden rounded-[1.8rem]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--accent-soft)]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-3xl text-[color:var(--foreground)]">
                  {photo.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                  {photo.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:px-12">
        <div className="section-shell rounded-[2rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)]">
            Best for
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {stayMoments.map((moment) => (
              <div key={moment} className="rounded-[1.4rem] border border-[color:var(--line)] bg-white/70 px-5 py-5 text-lg text-[color:var(--foreground)]">
                {moment}
              </div>
            ))}
          </div>
        </div>

        <div id="contact" className="section-shell rounded-[2rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)]">
            Contact and location
          </p>
          <h2 className="font-display mt-4 text-4xl leading-tight text-[color:var(--foreground)]">
            Plan your visit to Heavenrock Guesthouse.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-[color:var(--muted)]">
            <p>
              NIMS Enclave, Plot 78, Kondamadugu, Telangana 508126, India
            </p>
            <p>
              Phone: <a className="font-semibold text-[color:var(--forest)]" href="tel:+919949214746">+91 9949214746</a>
            </p>
            <p>
              Google Maps rating and local discovery are already active, making this page a stronger branded destination for direct enquiries.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://maps.google.com/?q=17.47949,78.768892"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[color:var(--forest)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:brightness-110"
            >
              Open directions
            </a>
            <a
              href="https://sites.google.com/view/theheavenrock/home"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[color:var(--line)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground)] transition hover:bg-white/70"
            >
              Existing site
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
