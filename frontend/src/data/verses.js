// Algorithme : dayOfYear % totalVerses → même verset pour tous les visiteurs chaque jour

export const getDailyVerseIndex = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear % verses.length;
};

export const getDailyVerse = () => {
  return verses[getDailyVerseIndex()];
};

export const verses = [
  {
    fr: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
    en: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    ref: "Jérémie 29:11",
    ref_en: "Jeremiah 29:11",
  },
  {
    fr: "Je puis tout par celui qui me fortifie.",
    en: "I can do all things through Christ who strengthens me.",
    ref: "Philippiens 4:13",
    ref_en: "Philippians 4:13",
  },
  {
    fr: "L'Éternel est mon berger : je ne manquerai de rien.",
    en: "The Lord is my shepherd; I shall not want.",
    ref: "Psaume 23:1",
    ref_en: "Psalm 23:1",
  },
  {
    fr: "Ne crains point, car je suis avec toi ; ne te laisse pas effrayer, car je suis ton Dieu ; je te fortifie, je viens à ton secours, je te soutiens de ma droite victorieuse.",
    en: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you and help you; I will uphold you with my righteous right hand.",
    ref: "Ésaïe 41:10",
    ref_en: "Isaiah 41:10",
  },
  {
    fr: "Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.",
    en: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    ref: "Matthieu 6:33",
    ref_en: "Matthew 6:33",
  },
  {
    fr: "Remets ton sort à l'Éternel, mets en lui ta confiance, et il agira.",
    en: "Commit your way to the Lord; trust in him and he will do this.",
    ref: "Psaume 37:5",
    ref_en: "Psalm 37:5",
  },
  {
    fr: "Ayez confiance, j'ai vaincu le monde.",
    en: "Take heart! I have overcome the world.",
    ref: "Jean 16:33",
    ref_en: "John 16:33",
  },
  {
    fr: "Heureux les purs en cœur, car ils verront Dieu.",
    en: "Blessed are the pure in heart, for they will see God.",
    ref: "Matthieu 5:8",
    ref_en: "Matthew 5:8",
  },
  {
    fr: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
    en: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    ref: "Jean 3:16",
    ref_en: "John 3:16",
  },
  {
    fr: "Je suis le chemin, la vérité et la vie. Nul ne vient au Père que par moi.",
    en: "I am the way and the truth and the life. No one comes to the Father except through me.",
    ref: "Jean 14:6",
    ref_en: "John 14:6",
  },
  {
    fr: "Que ta grâce, ô Éternel, soit sur nous, comme nous espérons en toi.",
    en: "May your unfailing love be with us, Lord, even as we put our hope in you.",
    ref: "Psaume 33:22",
    ref_en: "Psalm 33:22",
  },
  {
    fr: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles.",
    en: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
    ref: "Ésaïe 40:31",
    ref_en: "Isaiah 40:31",
  },
  {
    fr: "C'est la grâce de l'Éternel que nous ne soyons pas consumés, car sa compassion ne cesse point.",
    en: "Because of the Lord's great love we are not consumed, for his compassions never fail.",
    ref: "Lamentations 3:22",
    ref_en: "Lamentations 3:22",
  },
  {
    fr: "Que toutes vos choses se fassent avec charité.",
    en: "Do everything in love.",
    ref: "1 Corinthiens 16:14",
    ref_en: "1 Corinthians 16:14",
  },
  {
    fr: "En toutes choses rendez grâces, car c'est à votre égard la volonté de Dieu en Jésus-Christ.",
    en: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
    ref: "1 Thessaloniciens 5:18",
    ref_en: "1 Thessalonians 5:18",
  },
  {
    fr: "Invoquez-moi, et je vous répondrai ; je vous annoncerai de grandes choses et d'inaccessibles, que vous ne connaissez pas.",
    en: "Call to me and I will answer you and tell you great and unsearchable things you do not know.",
    ref: "Jérémie 33:3",
    ref_en: "Jeremiah 33:3",
  },
  {
    fr: "L'Éternel te bénisse et te garde ! L'Éternel fasse luire sa face sur toi et te soit propice !",
    en: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.",
    ref: "Nombres 6:24-25",
    ref_en: "Numbers 6:24-25",
  },
  {
    fr: "Soyez forts et courageux. Ne craignez point et ne vous effrayez point devant eux ; car l'Éternel, ton Dieu, marchera avec toi.",
    en: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you.",
    ref: "Deutéronome 31:6",
    ref_en: "Deuteronomy 31:6",
  },
  {
    fr: "Dieu est notre refuge et notre force, un secours qui ne manque jamais dans la détresse.",
    en: "God is our refuge and strength, an ever-present help in trouble.",
    ref: "Psaume 46:1",
    ref_en: "Psalm 46:1",
  },
  {
    fr: "Que la paix de Dieu, qui surpasse toute intelligence, garde vos cœurs et vos pensées en Jésus-Christ.",
    en: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    ref: "Philippiens 4:7",
    ref_en: "Philippians 4:7",
  },
  {
    fr: "Fortifiez-vous, et que votre cœur prenne courage, vous tous qui espérez en l'Éternel !",
    en: "Be strong and take heart, all you who hope in the Lord.",
    ref: "Psaume 31:24",
    ref_en: "Psalm 31:24",
  },
  {
    fr: "L'Éternel, ton Dieu, est au milieu de toi, comme un héros qui sauve.",
    en: "The Lord your God is with you, the Mighty Warrior who saves.",
    ref: "Sophonie 3:17",
    ref_en: "Zephaniah 3:17",
  },
  {
    fr: "Heureux l'homme qui ne marche pas selon le conseil des méchants... mais qui trouve son plaisir dans la loi de l'Éternel.",
    en: "Blessed is the one who does not walk in step with the wicked... but whose delight is in the law of the Lord.",
    ref: "Psaume 1:1-2",
    ref_en: "Psalm 1:1-2",
  },
  {
    fr: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence.",
    en: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.",
    ref: "Romains 12:2",
    ref_en: "Romans 12:2",
  },
  {
    fr: "Nous savons du reste que toutes choses concourent au bien de ceux qui aiment Dieu.",
    en: "And we know that in all things God works for the good of those who love him.",
    ref: "Romains 8:28",
    ref_en: "Romans 8:28",
  },
  {
    fr: "Si quelqu'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées ; voici, toutes choses sont devenues nouvelles.",
    en: "If anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    ref: "2 Corinthiens 5:17",
    ref_en: "2 Corinthians 5:17",
  },
  {
    fr: "Et maintenant ces trois choses demeurent : la foi, l'espérance, la charité ; mais la plus grande, c'est la charité.",
    en: "And now these three remain: faith, hope and love. But the greatest of these is love.",
    ref: "1 Corinthiens 13:13",
    ref_en: "1 Corinthians 13:13",
  },
  {
    fr: "Ton Parole est une lampe à mes pieds, et une lumière sur mon sentier.",
    en: "Your word is a lamp for my feet, a light on my path.",
    ref: "Psaume 119:105",
    ref_en: "Psalm 119:105",
  },
  {
    fr: "L'Éternel a dit : Je ne te laisserai point, je ne t'abandonnerai point.",
    en: "God has said, 'Never will I leave you; never will I forsake you.'",
    ref: "Hébreux 13:5",
    ref_en: "Hebrews 13:5",
  },
  {
    fr: "Car rien n'est impossible à Dieu.",
    en: "For nothing will be impossible with God.",
    ref: "Luc 1:37",
    ref_en: "Luke 1:37",
  },
  {
    fr: "Ayez de l'affection les uns pour les autres par l'amour fraternel ; rivalisez d'honneurs entre vous.",
    en: "Be devoted to one another in love. Honor one another above yourselves.",
    ref: "Romains 12:10",
    ref_en: "Romans 12:10",
  },
  {
    fr: "Ouvrez-moi les portes de la justice ! J'entrerai, je célébrerai l'Éternel.",
    en: "Open for me the gates of the righteous; I will enter and give thanks to the Lord.",
    ref: "Psaume 118:19",
    ref_en: "Psalm 118:19",
  },
  {
    fr: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant.",
    en: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
    ref: "Psaume 91:1",
    ref_en: "Psalm 91:1",
  },
  {
    fr: "Priez sans cesse.",
    en: "Pray continually.",
    ref: "1 Thessaloniciens 5:17",
    ref_en: "1 Thessalonians 5:17",
  },
  {
    fr: "Que la parole de Christ habite parmi vous abondamment, en toute sagesse.",
    en: "Let the message of Christ dwell among you richly, as you teach and admonish one another with all wisdom.",
    ref: "Colossiens 3:16",
    ref_en: "Colossians 3:16",
  },
  {
    fr: "Heureux ceux qui ont faim et soif de la justice, car ils seront rassasiés.",
    en: "Blessed are those who hunger and thirst for righteousness, for they will be filled.",
    ref: "Matthieu 5:6",
    ref_en: "Matthew 5:6",
  },
  {
    fr: "Le Seigneur est bon, un refuge au jour de la détresse ; il connaît ceux qui se confient en lui.",
    en: "The Lord is good, a refuge in times of trouble. He cares for those who trust in him.",
    ref: "Nahum 1:7",
    ref_en: "Nahum 1:7",
  },
  {
    fr: "Réjouissez-vous dans le Seigneur en tout temps ; je le répète, réjouissez-vous.",
    en: "Rejoice in the Lord always. I will say it again: Rejoice!",
    ref: "Philippiens 4:4",
    ref_en: "Philippians 4:4",
  },
  {
    fr: "La foi est la certitude des choses qu'on espère, la démonstration de celles qu'on ne voit pas.",
    en: "Now faith is confidence in what we hope for and assurance about what we do not see.",
    ref: "Hébreux 11:1",
    ref_en: "Hebrews 11:1",
  },
  {
    fr: "Le Seigneur est ma lumière et mon salut : de qui aurais-je crainte ? L'Éternel est le soutien de ma vie : de qui m'effraierais-je ?",
    en: "The Lord is my light and my salvation — whom shall I fear? The Lord is the stronghold of my life — of whom shall I be afraid?",
    ref: "Psaume 27:1",
    ref_en: "Psalm 27:1",
  },
  {
    fr: "Tout ce que vous ferez, faites-le de bon cœur, comme pour le Seigneur et non pour des hommes.",
    en: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
    ref: "Colossiens 3:23",
    ref_en: "Colossians 3:23",
  },
  {
    fr: "Le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bienveillance, la fidélité, la douceur, la maîtrise de soi.",
    en: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.",
    ref: "Galates 5:22-23",
    ref_en: "Galatians 5:22-23",
  },
  {
    fr: "Remets ta cause à l'Éternel, et il agira ; il fera paraître ta justice comme la lumière.",
    en: "Commit your way to the Lord; trust in him and he will do this: He will make your righteous reward shine like the dawn.",
    ref: "Psaume 37:5-6",
    ref_en: "Psalm 37:5-6",
  },
  {
    fr: "Voici, je me tiens à la porte, et je frappe. Si quelqu'un entend ma voix et ouvre la porte, j'entrerai chez lui.",
    en: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in.",
    ref: "Apocalypse 3:20",
    ref_en: "Revelation 3:20",
  },
  {
    fr: "Que l'Éternel te bénisse de Sion ! Que tu voies le bonheur de Jérusalem tous les jours de ta vie !",
    en: "May the Lord bless you from Zion; may you see the prosperity of Jerusalem all the days of your life.",
    ref: "Psaume 128:5",
    ref_en: "Psalm 128:5",
  },
  {
    fr: "Car l'Éternel est bon ; sa grâce dure toujours, et sa fidélité de génération en génération.",
    en: "For the Lord is good and his love endures forever; his faithfulness continues through all generations.",
    ref: "Psaume 100:5",
    ref_en: "Psalm 100:5",
  },
  {
    fr: "Entrez par la porte étroite. Car large est la porte, spacieux est le chemin qui mènent à la perdition.",
    en: "Enter through the narrow gate. For wide is the gate and broad is the road that leads to destruction.",
    ref: "Matthieu 7:13",
    ref_en: "Matthew 7:13",
  },
  {
    fr: "Soyez sobres et veillez. Votre adversaire, le diable, rôde comme un lion rugissant, cherchant qui il dévorera.",
    en: "Be sober-minded; be watchful. Your adversary the devil prowls around like a roaring lion, seeking someone to devour.",
    ref: "1 Pierre 5:8",
    ref_en: "1 Peter 5:8",
  },
  {
    fr: "Et nous savons que toutes choses concourent au bien de ceux qui aiment Dieu.",
    en: "And we know that all things work together for good to them that love God.",
    ref: "Romains 8:28",
    ref_en: "Romans 8:28",
  },
  {
    fr: "Chantez à l'Éternel un cantique nouveau ! Car il a fait des merveilles.",
    en: "Sing to the Lord a new song, for he has done marvelous things.",
    ref: "Psaume 98:1",
    ref_en: "Psalm 98:1",
  },
  {
    fr: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
    en: "Come to me, all you who are weary and burdened, and I will give you rest.",
    ref: "Matthieu 11:28",
    ref_en: "Matthew 11:28",
  },
  {
    fr: "Que la grâce du Seigneur Jésus soit avec vous tous. Amen.",
    en: "The grace of the Lord Jesus be with God's people. Amen.",
    ref: "Apocalypse 22:21",
    ref_en: "Revelation 22:21",
  },
];
