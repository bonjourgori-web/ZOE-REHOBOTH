export const WHATSAPP_NUMBER = "2250759493118";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
export const FACEBOOK_PAGE = "https://www.facebook.com/ZoeAndRehobothEditions";
export const FACEBOOK_VIDEO = "https://www.facebook.com/share/r/18KBRRPDzS/";

export const getWhatsappUrl = (title, lang) => {
  const msg =
    lang === "fr"
      ? `Bonjour, je souhaite commander le livre : "${title}". Merci.`
      : `Hello, I would like to order the book: "${title}". Thank you.`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;
};

export const books = [
  {
    id: 1,
    image: "/images/image4.jpeg",
    title_fr: "Protocoles des Palais pour Percées Professionnelles",
    title_en: "Palace Protocols for Professional Breakthroughs",
    author: "Lewis Ekra",
    price: 10000,
    promo_price: null,
    has_promo: false,
    description_fr:
      "Un guide prophétique révélant les protocoles divins qui déverrouillent les portes de vos percées professionnelles et de votre avancement.",
    description_en:
      "A prophetic guide revealing the divine protocols that unlock the doors to your professional breakthroughs and advancement.",
    excerpt_fr:
      "« Toute grâce éminente est accordée à celui qui connaît les protocoles du Palais du Roi des Rois. Il y a des portes que la connaissance ouvre, des faveurs que l'honneur attire et des percées que la révélation active… »\n\nDans ce livre extraordinaire, Lewis Ekra vous invite à découvrir les lois du Palais Céleste qui gouvernent votre avancement professionnel. Chaque protocole révélé est une clé prophétique pour débloquer ce que Dieu a préparé pour vous dans votre carrière, vos affaires et votre mission divine.",
    excerpt_en:
      "\"All eminent grace is granted to those who know the protocols of the Palace of the King of Kings. There are doors that knowledge opens, favors that honor attracts, and breakthroughs that revelation activates...\"\n\nIn this extraordinary book, Lewis Ekra invites you to discover the laws of the Heavenly Palace that govern your professional advancement. Each revealed protocol is a prophetic key to unlock what God has prepared for you in your career, business, and divine mission.",
    order_link: null,
  },
  {
    id: 2,
    image: "/images/image3.jpeg",
    title_fr: "Paroles de Percées pour Destinées Glorieuses (Version Enfant — Tome 1)",
    title_en: "Breakthrough Words for Glorious Destinies (Children's Version — Volume 1)",
    author: "Lewis Ekra",
    price: 10000,
    promo_price: null,
    has_promo: false,
    description_fr:
      "31 déclarations prophétiques conçues pour les enfants, pour les aider à connaître leur identité et leur destinée glorieuse en Christ.",
    description_en:
      "31 prophetic declarations designed for children, helping them discover their identity and glorious destiny in Christ.",
    excerpt_fr:
      "« Je suis un enfant de Dieu, héritier du Royaume Céleste. Ma vie est remplie de la grâce divine et je suis destiné(e) à la grandeur. Chaque jour, je déclare que les plans de Dieu pour moi sont de prospérité et non de malheur, pour me donner un avenir et une espérance… »\n\nCe livre unique offre 31 déclarations prophétiques adaptées aux enfants. Chaque déclaration est accompagnée d'un verset biblique et d'une prière simple pour ancrer la foi des plus jeunes dans la Parole de Dieu et les préparer à leur glorieuse destinée.",
    excerpt_en:
      "\"I am a child of God, heir to the Heavenly Kingdom. My life is filled with divine grace and I am destined for greatness. Every day, I declare that God's plans for me are of prosperity and not of harm, to give me a future and a hope...\"\n\nThis unique book offers 31 prophetic declarations adapted for children. Each declaration is accompanied by a Bible verse and a simple prayer to anchor young people's faith in God's Word and prepare them for their glorious destiny.",
    order_link: null,
  },
  {
    id: 3,
    image: "/images/image5.jpeg",
    title_fr: "Déclarations pour la Vie (Volume 1)",
    title_en: "Declarations for Life (Volume 1)",
    author: "Lewis Ekra",
    price: 12000,
    promo_price: null,
    has_promo: false,
    description_fr:
      "Un recueil puissant de déclarations prophétiques pour transformer chaque domaine de votre vie quotidienne par la Parole.",
    description_en:
      "A powerful collection of prophetic declarations to transform every area of your daily life through the Word.",
    excerpt_fr:
      "« Je déclare que ma vie est gouvernée par la sagesse divine. Je déclare que mes finances sont sous la bénédiction de l'Éternel. Je déclare que ma famille est protégée et couverte par le sang précieux de Jésus-Christ. Je déclare que mon avenir est radieux et plein de la faveur de Dieu… »\n\nCe volume inaugural de la série 'Déclarations pour la Vie' vous équipe avec des déclarations prophétiques puissantes pour chaque situation : santé, finances, relations, travail et destinée spirituelle. Chaque déclaration est ancrée dans la Parole de Dieu.",
    excerpt_en:
      "\"I declare that my life is governed by divine wisdom. I declare that my finances are under the blessing of the Lord. I declare that my family is protected and covered by the precious blood of Jesus Christ. I declare that my future is bright and full of God's favor...\"\n\nThis inaugural volume of the 'Declarations for Life' series equips you with powerful prophetic declarations for every situation: health, finances, relationships, work and spiritual destiny. Each declaration is anchored in the Word of God.",
    order_link: "https://declarationspourlavie.chenoustudio.com/",
  },
  {
    id: 4,
    image: "/images/image2.jpeg",
    title_fr: "Soyons Édifiés (30 Prières Quotidiennes)",
    title_en: "Let Us Be Edified (30 Daily Prayers)",
    author: "Vogel Deza",
    price: 3500,
    promo_price: null,
    has_promo: false,
    description_fr:
      "Un guide de 30 prières quotidiennes pour fortifier votre vie spirituelle et marcher plus près de Dieu chaque jour.",
    description_en:
      "A guide of 30 daily prayers to strengthen your spiritual life and walk closer to God each day.",
    excerpt_fr:
      "« Seigneur, que Ta Présence soit ma demeure aujourd'hui. Que Ta Parole soit la lampe de mes pieds et la lumière de mon sentier. Je m'engage à marcher dans Ton Esprit et à refléter Ta gloire dans chaque aspect de ma vie ce jour… »\n\nCes 30 prières quotidiennes sont le fruit d'une vie d'intercession et de communion avec Dieu. Vogel Deza partage avec vous les prières qui ont marqué sa vie spirituelle et transformé son intimité avec le Seigneur, pour que vous puissiez, vous aussi, être édifié(e) chaque jour.",
    excerpt_en:
      "\"Lord, let Your Presence be my dwelling place today. Let Your Word be a lamp to my feet and a light to my path. I commit to walking in Your Spirit and reflecting Your glory in every aspect of my life this day...\"\n\nThese 30 daily prayers are the fruit of a life of intercession and communion with God. Vogel Deza shares the prayers that have marked her spiritual life and transformed her intimacy with the Lord, so that you too can be edified every day.",
    order_link: null,
  },
  {
    id: 5,
    image: "/images/image1.jpeg",
    title_fr: "La Mission d'Ambassadeur",
    title_en: "The Ambassador's Mission",
    author: "Vogel Deza",
    price: 7000,
    promo_price: null,
    has_promo: false,
    description_fr:
      "Découvrez votre identité d'ambassadeur du Royaume de Dieu et comment accomplir votre mission divine sur terre avec excellence.",
    description_en:
      "Discover your identity as an ambassador of God's Kingdom and how to fulfill your divine mission on earth with excellence.",
    excerpt_fr:
      "« Vous êtes des ambassadeurs du Christ, mandatés pour représenter le Royaume des Cieux dans chaque sphère de la société. Votre présence dans ce monde n'est pas accidentelle — elle est une mission divine confiée par le Roi des Rois… »\n\nDans ce livre inspirant, Vogel Deza explore la vocation de tout croyant à vivre en tant qu'ambassadeur du Royaume de Dieu. Elle révèle les caractéristiques d'un ambassadeur fidèle, les protocoles du Royaume et les clés pour accomplir sa mission avec excellence et autorité spirituelle.",
    excerpt_en:
      "\"You are ambassadors of Christ, commissioned to represent the Kingdom of Heaven in every sphere of society. Your presence in this world is not accidental — it is a divine mission entrusted by the King of Kings...\"\n\nIn this inspiring book, Vogel Deza explores every believer's calling to live as an ambassador of God's Kingdom. She reveals the characteristics of a faithful ambassador, the Kingdom's protocols, and the keys to fulfilling one's mission with excellence and spiritual authority.",
    order_link: null,
  },
];

export const authors = [
  {
    id: "lewis",
    name: "Lewis Ekra",
    image: "/images/lewis_ekra.jpeg",
    bio_fr:
      "Professionnel du capital humain, Conférencier et Formateur, Lewis EKRA est un Homme de vision qui sert sa génération en annonçant l'Évangile et en œuvrant pour un impact tangible. Porteur de la vision « Life Academy — École de la Vie, École de Destinée », il est un coach et mentor passionné qui accompagne le développement de leaders fondés sur l'excellence et l'intégrité. Auteur de plusieurs ouvrages, il partage également son expertise par l'écriture.",
    bio_en:
      "Human capital professional, Speaker and Trainer, Lewis EKRA is a visionary man who serves his generation by proclaiming the Gospel and working for tangible impact. Carrier of the 'Life Academy — School of Life, School of Destiny' vision, he is a passionate coach and mentor who accompanies the development of leaders grounded in excellence and integrity. Author of several works, he also shares his expertise through writing.",
    books: [1, 2, 3],
  },
  {
    id: "vogel",
    name: "Vogel Deza",
    image: "/images/image7.jpeg",
    bio_fr:
      "Vogel DEZA est un passionné de Christ, profondément engagé dans le partage, le coaching et le mentorat auprès des jeunes. Ingénieur Statisticien Économiste de formation, diplômé de l'ENSEA d'Abidjan et titulaire d'un Mastère Spécialisé en Stratégie et Management de l'ESCP Business School à Paris, il œuvre aujourd'hui dans le secteur du développement international. Écrivain engagé, il est l'auteur de deux ouvrages dédiés au leadership chrétien.",
    bio_en:
      "Vogel DEZA is a passionate follower of Christ, deeply committed to sharing, coaching, and mentoring young people. A Statistical Economist Engineer by training, graduate of ENSEA Abidjan and holder of a Specialized Master's in Strategy and Management from ESCP Business School in Paris, he now works in the international development sector. A committed writer, he is the author of two works dedicated to Christian leadership.",
    books: [4, 5],
  },
];

export const events = [
  {
    id: 1,
    date_fr: "15 Avr 2025",
    date_en: "Apr 15, 2025",
    title_fr: "Séance de Dédicaces — Cocody",
    title_en: "Book Signing — Cocody",
    location: "Day Labs, Cocody, Abidjan, Côte d'Ivoire",
    description_fr:
      "Rencontrez Lewis Ekra et obtenez une dédicace personnalisée de vos livres préférés. Une occasion unique de partager avec l'auteur.",
    description_en:
      "Meet Lewis Ekra and get a personalized dedication of your favorite books. A unique opportunity to share with the author.",
    author: "Lewis Ekra",
    upcoming: true,
  },
  {
    id: 2,
    date_fr: "22 Avr 2025",
    date_en: "Apr 22, 2025",
    title_fr: "Dédicaces — Librairie Hebron Ivoire",
    title_en: "Book Signing — Hebron Bookstore",
    location: "Librairie Hebron Ivoire, Abidjan, Côte d'Ivoire",
    description_fr:
      "Vogel Deza vous dédicacera ses ouvrages en personne. Venez partager ce moment de grâce et d'édification.",
    description_en:
      "Vogel Deza will personally sign her books for you. Come share this moment of grace and edification.",
    author: "Vogel Deza",
    upcoming: true,
  },
  {
    id: 3,
    date_fr: "10 Mai 2025",
    date_en: "May 10, 2025",
    title_fr: "Salon du Livre Chrétien",
    title_en: "Christian Book Fair",
    location: "Ma Librairie Chrétienne, Abidjan, Côte d'Ivoire",
    description_fr:
      "Retrouvez l'ensemble des ouvrages ZOE & REHOBOTH ainsi que les deux auteurs pour une journée de rencontres et de partage.",
    description_en:
      "Find all ZOE & REHOBOTH publications and both authors for a day of meetings and sharing.",
    author: "Lewis Ekra & Vogel Deza",
    upcoming: true,
  },
];

export const distributionData = [
  {
    id: "ci",
    flag: "🇨🇮",
    country_fr: "Côte d'Ivoire",
    country_en: "Ivory Coast",
    stores: ["Librairie Hebron", "Ma Librairie Chrétienne"],
    whatsapp: true,
  },
  {
    id: "tg",
    flag: "🇹🇬",
    country_fr: "Togo",
    country_en: "Togo",
    stores: [],
    whatsapp: true,
  },
  {
    id: "fr",
    flag: "🇫🇷",
    country_fr: "France",
    country_en: "France",
    stores: [],
    whatsapp: true,
  },
];
