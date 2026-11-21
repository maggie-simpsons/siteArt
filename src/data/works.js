// Œuvres du domaine public (CC0) — images : Art Institute of Chicago (artic.edu).
// Pour ajouter une œuvre : placez l'image dans /public/oeuvres et ajoutez une entrée ci-dessous.

export const SERIES = ['Toutes', 'Impressionnisme', 'Post-impressionnisme', 'Symbolisme & modernes', 'Maîtres anciens']

const CREDIT = 'Art Institute of Chicago'

export const works = [
  { id: 1, title: 'Un dimanche après-midi à l’île de la Grande Jatte', artist: 'Georges Seurat', year: '1884–86', series: 'Post-impressionnisme', medium: 'Huile sur toile', image: '/oeuvres/grande-jatte.jpg', ratio: 1.49 },
  { id: 2, title: 'Rue de Paris, temps de pluie', artist: 'Gustave Caillebotte', year: '1877', series: 'Impressionnisme', medium: 'Huile sur toile', image: '/oeuvres/rue-de-paris.jpg', ratio: 1.29 },
  { id: 3, title: 'Nymphéas', artist: 'Claude Monet', year: '1906', series: 'Impressionnisme', medium: 'Huile sur toile', image: '/oeuvres/nympheas.jpg', ratio: 1.04 },
  { id: 4, title: 'La Chambre à coucher', artist: 'Vincent van Gogh', year: '1889', series: 'Post-impressionnisme', medium: 'Huile sur toile', image: '/oeuvres/chambre.jpg', ratio: 1.28 },
  { id: 5, title: 'Autoportrait', artist: 'Vincent van Gogh', year: '1887', series: 'Post-impressionnisme', medium: 'Huile sur carton', image: '/oeuvres/autoportrait-van-gogh.jpg', ratio: 0.78 },
  { id: 6, title: 'Le Panier de pommes', artist: 'Paul Cézanne', year: 'v. 1893', series: 'Post-impressionnisme', medium: 'Huile sur toile', image: '/oeuvres/pommes-cezanne.jpg', ratio: 1.25 },
  { id: 7, title: 'Peinture avec troïka', artist: 'Vassily Kandinsky', year: '1911', series: 'Symbolisme & modernes', medium: 'Huile sur carton', image: '/oeuvres/troika.jpg', ratio: 1.36 },
  { id: 8, title: 'Au Moulin Rouge', artist: 'Henri de Toulouse-Lautrec', year: '1892–95', series: 'Post-impressionnisme', medium: 'Huile sur toile', image: '/oeuvres/moulin-rouge.jpg', ratio: 1.14 },
  { id: 9, title: 'Meules, fin de l’été', artist: 'Claude Monet', year: '1890–91', series: 'Impressionnisme', medium: 'Huile sur toile', image: '/oeuvres/meules.jpg', ratio: 1.69 },
  { id: 10, title: 'La Jeune Fille à la fenêtre', artist: 'Edvard Munch', year: '1893', series: 'Symbolisme & modernes', medium: 'Huile sur toile', image: '/oeuvres/munch-fenetre.jpg', ratio: 0.68 },
  { id: 11, title: 'L’Assomption de la Vierge', artist: 'Le Greco', year: '1577–79', series: 'Maîtres anciens', medium: 'Huile sur toile', image: '/oeuvres/greco-assomption.jpg', ratio: 0.52 },
  { id: 12, title: 'Hercule et l’Hydre de Lerne', artist: 'Gustave Moreau', year: '1875–76', series: 'Symbolisme & modernes', medium: 'Huile sur toile', image: '/oeuvres/hercule-hydre.jpg', ratio: 0.87 },
  { id: 13, title: 'Le Jardin du poète', artist: 'Vincent van Gogh', year: '1888', series: 'Post-impressionnisme', medium: 'Huile sur toile', image: '/oeuvres/jardin-poete.jpg', ratio: 1.27 },
  { id: 14, title: 'Le Chant de l’alouette', artist: 'Jules Breton', year: '1884', series: 'Impressionnisme', medium: 'Huile sur toile', image: '/oeuvres/chant-alouette.jpg', ratio: 0.77 },
  { id: 15, title: 'Paysage avec saint Jean à Patmos', artist: 'Nicolas Poussin', year: '1640', series: 'Maîtres anciens', medium: 'Huile sur toile', image: '/oeuvres/poussin-patmos.jpg', ratio: 1.35 },
  { id: 16, title: 'Nature morte au gibier', artist: 'Juan Sánchez Cotán', year: 'v. 1600–03', series: 'Maîtres anciens', medium: 'Huile sur toile', image: '/oeuvres/sanchez-cotan.jpg', ratio: 1.3 },
].map((w) => ({ ...w, collection: CREDIT }))

export const exhibitions = [
  { year: '2026', title: 'La lumière et l’ombre', place: 'Salle I — Maîtres anciens', type: 'Exposition en cours' },
  { year: '2026', title: 'Impressions du dehors', place: 'Salle II — Impressionnisme', type: 'Exposition en cours' },
  { year: '2026', title: 'Couleur, émotion, rupture', place: 'Salle III — Post-impressionnisme', type: 'Exposition en cours' },
  { year: '2027', title: 'Vers l’abstraction', place: 'Salle IV — Symbolisme & modernes', type: 'Prochainement' },
  { year: '2027', title: 'Nuits blanches au musée', place: 'Visites virtuelles commentées', type: 'Événement' },
]
