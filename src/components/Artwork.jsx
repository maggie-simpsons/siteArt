import { memo, useState } from 'react'

function Artwork({ work, className = '', eager = false }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      // Si l'image est déjà en cache, onLoad peut ne pas se déclencher : on vérifie `complete`.
      ref={(img) => {
        if (img?.complete && img.naturalWidth) setLoaded(true)
      }}
      className={`${className} ${loaded ? 'is-loaded' : ''}`}
      src={work.image}
      alt={`${work.title} — ${work.artist}`}
      style={{ aspectRatio: work.ratio }}
      loading={eager ? 'eager' : 'lazy'}
      onLoad={() => setLoaded(true)}
    />
  )
}

export default memo(Artwork)
