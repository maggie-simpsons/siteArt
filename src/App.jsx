import { useEffect, useMemo, useState } from 'react'
import Artwork from './components/Artwork.jsx'
import { works, SERIES, exhibitions } from './data/works.js'
import './App.css'

/* ---------- Routage minimal par hash (#/oeuvres, #/a-propos…) ---------- */
function useRoute() {
  const get = () => window.location.hash.replace(/^#\/?/, '') || 'accueil'
  const [route, setRoute] = useState(get)
  useEffect(() => {
    const onHash = () => {
      setRoute(get())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

/* ---------- Apparition au défilement ---------- */
function useReveal(deps) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

const YEAR = new Date().getFullYear()

const NAV = [
  { id: 'oeuvres', label: 'Index' },
  { id: 'expositions', label: 'Expositions' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'contact', label: 'Contact' },
]

function Header({ route }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`}>
      <a href="#/" className="brand" onClick={() => setOpen(false)}>
        <span className="brand__name">GALERIE LUMEN</span>
        <span className="brand__tag">Musée virtuel des chefs-d’œuvre</span>
      </a>
      <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span /> <span />
      </button>
      <nav className="nav">
        {NAV.map((n, i) => (
          <a key={n.id} href={`#/${n.id}`} className={route === n.id ? 'is-active' : ''} style={{ '--i': i }} onClick={() => setOpen(false)}>
            <sup>0{i + 1}</sup>
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

/* ---------- Accueil ---------- */
function Home({ onOpen }) {
  const featured = works[2]
  const selection = [works[0], works[4], works[9]]
  useReveal([])
  return (
    <main>
      <section className="hero">
        <div className="hero__text">
          <p className="eyebrow reveal">Exposition en ligne — 2026</p>
          <h1 className="hero__title reveal">
            Maîtres de
            <em> la lumière</em>
          </h1>
          <p className="hero__lead reveal">
            De Le Greco à Kandinsky, quatre siècles de peinture réunis dans une galerie en ligne.
            Seize chefs-d’œuvre, quatre salles, une seule passion : la lumière.
          </p>
          <div className="hero__actions reveal">
            <a href="#/oeuvres" className="btn">Découvrir les œuvres</a>
            <a href="#/a-propos" className="link-arrow">La galerie →</a>
          </div>
        </div>
        <button className="hero__art reveal" onClick={() => onOpen(featured)} aria-label={`Voir ${featured.title}`}>
          <Artwork work={featured} className="art" eager />
          <span className="caption">
            <i>{featured.title}</i> — {featured.artist}, {featured.year}
          </span>
        </button>
        <div className="hero__scroll" aria-hidden>
          Défiler
        </div>
      </section>

      <section className="marquee" aria-hidden>
        <div className="marquee__track">
          {Array.from({ length: 2 }, (_, k) => (
            <span key={k}>
              Monet ✦ Van Gogh ✦ Seurat ✦ Cézanne ✦ Kandinsky ✦ Munch ✦ Le Greco ✦ Poussin ✦&nbsp;
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__head reveal">
          <h2>Sélection</h2>
          <a href="#/oeuvres" className="link-arrow">Tout l’index →</a>
        </div>
        <div className="selection">
          {selection.map((w, i) => (
            <WorkCard key={w.id} work={w} index={i} onOpen={onOpen} />
          ))}
        </div>
      </section>

      <section className="quote reveal">
        <blockquote>
          « Je rêve de peindre et puis je peins mon rêve. »
        </blockquote>
        <cite>— Vincent van Gogh</cite>
      </section>
    </main>
  )
}

function WorkCard({ work, index, onOpen }) {
  return (
    <article className="card reveal" style={{ '--d': `${(index % 3) * 90}ms` }}>
      <button className="card__frame" onClick={() => onOpen(work)} aria-label={`Voir ${work.title}`}>
        <Artwork work={work} className="art" />
        <span className="card__view">Voir</span>
      </button>
      <div className="card__meta">
        <span className="card__num">{String(work.id).padStart(2, '0')}</span>
        <div>
          <h3>{work.title}</h3>
          <p>
            {work.artist} · {work.year}
          </p>
        </div>
      </div>
    </article>
  )
}

/* ---------- Index des œuvres ---------- */
function Index({ onOpen }) {
  const [filter, setFilter] = useState('Toutes')
  const [view, setView] = useState('grille')
  const list = useMemo(() => (filter === 'Toutes' ? works : works.filter((w) => w.series === filter)), [filter])
  useReveal([filter, view])

  return (
    <main className="page">
      <div className="page__head">
        <p className="eyebrow">Index — {works.length} œuvres</p>
        <h1 className="page__title">Les œuvres</h1>
      </div>
      <div className="toolbar">
        <div className="filters" role="tablist">
          {SERIES.map((s) => (
            <button key={s} className={filter === s ? 'is-active' : ''} onClick={() => setFilter(s)}>
              {s}
            </button>
          ))}
        </div>
        <div className="views">
          {['grille', 'liste'].map((v) => (
            <button key={v} className={view === v ? 'is-active' : ''} onClick={() => setView(v)}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'grille' ? (
        <div className="masonry" key={filter}>
          {list.map((w, i) => (
            <WorkCard key={w.id} work={w} index={i} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <ol className="list" key={filter}>
          {list.map((w) => (
            <li key={w.id} className="list__row reveal" onClick={() => onOpen(w)}>
              <span className="list__num">{String(w.id).padStart(2, '0')}</span>
              <span className="list__title">{w.title}</span>
              <span className="list__series">{w.artist}</span>
              <span className="list__year">{w.year}</span>
              <span className="list__thumb">
                <Artwork work={w} className="art" />
              </span>
            </li>
          ))}
        </ol>
      )}
    </main>
  )
}

/* ---------- Expositions ---------- */
function Exhibitions() {
  useReveal([])
  return (
    <main className="page">
      <div className="page__head">
        <p className="eyebrow">Parcours</p>
        <h1 className="page__title">Expositions</h1>
      </div>
      <div className="expo">
        {exhibitions.map((e, i) => (
          <div className="expo__row reveal" key={i} style={{ '--d': `${i * 60}ms` }}>
            <span className="expo__year">{e.year}</span>
            <h3>{e.title}</h3>
            <span className="expo__place">{e.place}</span>
            <span className="expo__type">{e.type}</span>
          </div>
        ))}
      </div>
    </main>
  )
}

/* ---------- À propos ---------- */
function About() {
  useReveal([])
  return (
    <main className="page about">
      <div className="about__portrait reveal">
        <Artwork work={works[4]} className="art" />
      </div>
      <div className="about__text">
        <p className="eyebrow reveal">À propos</p>
        <h1 className="page__title reveal">
          Un musée <em>sans murs</em>
        </h1>
        <p className="reveal">
          Galerie Lumen est un espace d’exposition en ligne consacré aux grandes œuvres de l’histoire de la
          peinture. Notre ambition : rendre les chefs-d’œuvre accessibles à tous, partout, à toute heure.
        </p>
        <p className="reveal">
          Les œuvres présentées appartiennent au domaine public et proviennent des collections ouvertes de
          l’Art Institute of Chicago. Elles sont organisées en quatre salles, des maîtres anciens aux premiers
          pas de l’abstraction, pour un parcours à travers quatre siècles de lumière et de couleur.
        </p>
        <dl className="facts reveal">
          <div><dt>Œuvres</dt><dd>{works.length}</dd></div>
          <div><dt>Salles</dt><dd>4</dd></div>
          <div><dt>Siècles</dt><dd>4</dd></div>
        </dl>
      </div>
    </main>
  )
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false)
  useReveal([sent])
  return (
    <main className="page contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="page__title">
          Parlons <em>d’art</em>
        </h1>
        <p className="contact__lead">
          Visites guidées, partenariats, presse ou simple question : écrivez-nous, nous répondons sous 48 h.
        </p>
        <p className="contact__mail">contact@galerie-lumen.art</p>
      </div>
      {sent ? (
        <div className="thanks reveal">
          <h2>Merci.</h2>
          <p>Votre message a bien été envoyé.</p>
        </div>
      ) : (
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <label>
            Nom<input required name="nom" autoComplete="name" />
          </label>
          <label>
            E-mail<input required type="email" name="email" autoComplete="email" />
          </label>
          <label>
            Objet
            <select name="objet" defaultValue="Visite guidée">
              <option>Visite guidée</option>
              <option>Partenariat</option>
              <option>Presse</option>
              <option>Autre</option>
            </select>
          </label>
          <label>
            Message<textarea required rows="5" name="message" />
          </label>
          <button className="btn" type="submit">Envoyer</button>
        </form>
      )}
    </main>
  )
}

/* ---------- Visionneuse plein écran ---------- */
function Lightbox({ work, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onNav])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Fermer">✕</button>
      <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); onNav(-1) }} aria-label="Précédente">←</button>
      <div className="lightbox__inner" onClick={(e) => e.stopPropagation()} key={work.id}>
        <div className="lightbox__art">
          <Artwork work={work} className="art" />
        </div>
        <aside className="lightbox__info">
          <span className="eyebrow">{work.series} — N° {String(work.id).padStart(2, '0')}</span>
          <h2>{work.title}</h2>
          <dl>
            <div><dt>Artiste</dt><dd>{work.artist}</dd></div>
            <div><dt>Date</dt><dd>{work.year}</dd></div>
            <div><dt>Technique</dt><dd>{work.medium}</dd></div>
            <div><dt>Collection</dt><dd>{work.collection}</dd></div>
          </dl>
          <a href="#/contact" className="btn" onClick={onClose}>Réserver une visite</a>
        </aside>
      </div>
      <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); onNav(1) }} aria-label="Suivante">→</button>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__big">GALERIE LUMEN</div>
      <div className="footer__row">
        <span>© {YEAR} Galerie Lumen — Images : Art Institute of Chicago (domaine public, CC0)</span>
        <span className="footer__links">
          <a href="#/oeuvres">Index</a>
          <a href="#/a-propos">À propos</a>
          <a href="#/contact">Contact</a>
          <a href="#/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Haut ↑</a>
        </span>
      </div>
    </footer>
  )
}

export default function App() {
  const route = useRoute()
  const [current, setCurrent] = useState(null)

  const close = useMemo(() => () => setCurrent(null), [])
  const nav = useMemo(
    () => (dir) =>
      setCurrent((c) => {
        const i = works.findIndex((w) => w.id === c.id)
        return works[(i + dir + works.length) % works.length]
      }),
    [],
  )

  let page
  switch (route) {
    case 'oeuvres': page = <Index onOpen={setCurrent} />; break
    case 'expositions': page = <Exhibitions />; break
    case 'a-propos': page = <About />; break
    case 'contact': page = <Contact />; break
    default: page = <Home onOpen={setCurrent} />
  }

  return (
    <>
      <Header route={route} />
      <div className="route" key={route}>{page}</div>
      <Footer />
      {current && <Lightbox work={current} onClose={close} onNav={nav} />}
    </>
  )
}
