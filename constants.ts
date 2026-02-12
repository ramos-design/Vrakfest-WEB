

import { Driver, EventItem, ProgramStep, MarketItem, StandingsDriver } from './types';


export const N8N_RIDER_REGISTRATION_WEBHOOK_URL = 'https://n8n.srv1004354.hstgr.cloud/webhook-test/4b112680-9384-47ce-b21f-cb0e2ead65a5';

export const DRIVERS: Driver[] = [
  {
    id: 'v1',
    name: 'PATRIK "KLEPI" KLEPÁČ',
    car: 'FELICIE',
    category: 'DO 1.6L',
    image: '/drivers/muddy_profile.png',
    stats: { wins: 8, wrecks: 32, experience: '5 ROKŮ', races: 45, points: 33 }
  },
  {
    id: 'v2',
    name: 'VÁCLAV "ADAM" ADAMČÍK',
    car: 'OCTAVIE',
    category: 'NAD 1.6L',
    image: '/drivers/rough_portrait.png',
    stats: { wins: 6, wrecks: 28, experience: '4 ROKY', races: 38, points: 29 }
  },
  {
    id: 'v3',
    name: 'KATEŘINA "PIKA" PIKOVÁ',
    car: 'FELICIE',
    category: 'ŽENY',
    image: '/drivers/action_helmet.png',
    stats: { wins: 5, wrecks: 15, experience: '3 ROKY', races: 24, points: 25 }
  },
  {
    id: 'v4',
    name: 'MARTIN "ČERV" ČERVENKA',
    car: 'PEUGEOT 206',
    category: 'DO 1.6L',
    image: '/drivers/muddy_helmet.png',
    stats: { wins: 7, wrecks: 30, experience: '6 ROKŮ', races: 52, points: 32 }
  }
];

export const EVENTS: EventItem[] = [
  { id: '1', title: 'OSTRAVA', date: '04.04.2026', location: 'VŘESÍNSKÁ STRŽ', image: '/media/DSC_7229.jpg' },
  { id: '2', title: 'HRACHOVEC', date: '23.05.2026', location: 'AREÁL EKOREMA', image: '/media/VFzavodník2-felicie.jpg' },
  { id: '3', title: 'PŘEKVAPENÍ', date: '22.08.2026', location: 'NOVÉ MÍSTO', image: '/media/DSC_0655.jpg' },
  { id: '4', title: 'OSTRAVA', date: '24.10.2026', location: 'VŘESÍNSKÁ STRŽ', image: '/media/DSC_4209.jpg' }
];

export const PROGRAM: ProgramStep[] = [
  { time: '09:30', title: 'START VRAKFEST RACE', description: 'Kvalifikační jízdy a eliminace.' },
  { time: '15:30', title: 'SEMIFINÁLE VRAKFEST RACE', description: 'To nejlepší z celého dne. Boj o postup.' },
  { time: '16:00', title: 'FINÁLE VRAKFEST RACE', description: 'Boj o titul Vrakfest Champion 2026.' },
  { time: '17:30', title: 'DEMOLITION DERBY', description: 'Totální destrukce všech zbylých vraků.' },
  { time: '18:00', title: 'VYHLÁŠENÍ VÝSLEDKŮ', description: 'Předání pohárů a ukončení akce.' }
];

export const MARKET_ITEMS: MarketItem[] = [
  { id: '1', name: 'ZESÍLENÝ RÁM E36', price: '4 500 Kč', image: 'https://picsum.photos/seed/m1/300/300' },
  { id: '2', name: 'TERÉNNÍ PNEU 14"', price: '1 200 Kč', image: 'https://picsum.photos/seed/m2/300/300' },
  { id: '3', name: 'ZÁVODNÍ SEDAČKA', price: '2 800 Kč', image: 'https://picsum.photos/seed/m3/300/300' },
  { id: '4', name: 'HASÍCÍ SYSTÉM', price: '1 900 Kč', image: 'https://picsum.photos/seed/m4/300/300' }
];

export const SPONSORS = [
  {
    name: 'GRANEX',
    description: 'Specialista na náhradní díly. Granex nabízí široký sortiment dílů pro váš vrak, od motorových částí až po karosářské prvky.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800'
  },
  {
    name: 'YOMAX',
    description: 'Výrobce stylových pohárů a ocenění. Yomax dodává unikátní trofeje pro vítěze všech kategorií Vrakfestu.',
    image: 'https://images.unsplash.com/photo-1578267139062-70fb980f7694?q=80&w=800'
  },
  {
    name: 'ELEKTRO DVOŘÁK',
    description: 'Váš partner pro elektro ve Valašském Meziříčí. Elektro Dvořák věnuje hodnotné dárky pro ty nejlepší závodníky.',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800'
  },
  {
    name: 'HYPE PRINT',
    description: 'Profesionální tisk a grafika. Hype Print se stará o to, aby Vrakfest vypadal skvěle na bannerech i samolepkách.',
    image: 'https://images.unsplash.com/photo-1598301257982-0cf014dabbcd?q=80&w=800'
  },
  {
    name: 'VRAKOVIŠTĚ SILVIE',
    description: 'Nekonečný zdroj materiálu pro demoliční derby. Vrakoviště Silvie je klíčovým dodavatelem vozů pro naše závody.',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=800'
  },
  {
    name: 'ZVÝŠENO',
    description: 'Komunita a servis pro ty, co chtějí víc než jen sériovku. Zvýšeno podporuje technickou kreativitu našich jezdců.',
    image: 'https://images.unsplash.com/photo-1620216447820-2c7009403328?q=80&w=800'
  },
  {
    name: 'FRESH RADIO OSTRAVA',
    description: 'Oficiální mediální partner. Fresh Radio Ostrava zajišťuje hudební setup a šíří atmosféru Vrakfestu do celého éteru.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800'
  }
];

export const STANDINGS: StandingsDriver[] = [
  // DO 1.6 L
  { startNumber: 74, name: 'PATRIK KLEPÁČ', car: 'FELICIE', points: 33, category: 'do1.6L' },
  { startNumber: 131, name: 'MARTIN ČERVENKA', car: 'PEUGEOT 206', points: 32, category: 'do1.6L' },
  { startNumber: 337, name: 'PETR BIJA', car: 'FELICIE', points: 31, category: 'do1.6L' },
  { startNumber: 747, name: 'PETR KLEPÁČ', car: 'FELICIE', points: 27, category: 'do1.6L' },
  { startNumber: 12, name: 'MAREK CHRASTINA', car: 'VW POLO', points: 25, category: 'do1.6L' },
  { startNumber: 25, name: 'MARTIN VENCL', car: 'VW GOLF 4 16V', points: 23, category: 'do1.6L' },
  { startNumber: 146, name: 'MICHAEL BĚLÍK', car: 'FELICIE', points: 21, category: 'do1.6L' },
  { startNumber: 90, name: 'DANIEL BEZDĚK', car: 'RENAULT CLIO', points: 17, category: 'do1.6L' },
  { startNumber: 27, name: 'JIŘÍ FEIX', car: 'FABIE', points: 17, category: 'do1.6L' },
  { startNumber: 773, name: 'MATYÁŠ WYSOGLAD', car: 'NISSAN ALMERA', points: 17, category: 'do1.6L' },
  { startNumber: 153, name: 'MIROSLAV TANEČEK', car: 'FELICIE', points: 17, category: 'do1.6L' },
  { startNumber: 0, name: 'PAVEL JANKŮJ', car: 'FAVORIT', points: 17, category: 'do1.6L' },
  { startNumber: 262, name: 'MARTIN BANČIK', car: 'FELICIE', points: 15, category: 'do1.6L' },
  { startNumber: 8, name: 'JAN KOCOUREK', car: 'PEUGEOT 206', points: 14, category: 'do1.6L' },
  { startNumber: 16, name: 'ADAM PANÁČEK', car: 'HONDA CIVIC', points: 12, category: 'do1.6L' },
  { startNumber: 123, name: 'ŠTĚPÁN URBANCZYK', car: 'FELICIE', points: 12, category: 'do1.6L' },
  { startNumber: 599, name: 'JAN KRYL', car: 'VW GOLF', points: 11, category: 'do1.6L' },
  { startNumber: 1995, name: 'MARIO SCHON', car: 'FIAT PUNTO', points: 11, category: 'do1.6L' },
  { startNumber: 202, name: 'LUKÁŠ BRIM', car: 'FAVORIT', points: 10, category: 'do1.6L' },
  { startNumber: 57, name: 'PETR MICHLÍK', car: 'FELICIE', points: 10, category: 'do1.6L' },
  { startNumber: 88, name: 'ROSTISLAV MALOVANÝ', car: 'FELICIE PICKUP', points: 9, category: 'do1.6L' },
  { startNumber: 233, name: 'DAVID MLČOCH', car: 'MITSUBISHI COLT', points: 8, category: 'do1.6L' },
  { startNumber: 888, name: 'JIŘÍ VÍCHA', car: 'FELICIE', points: 8, category: 'do1.6L' },
  { startNumber: 116, name: 'MARTIN ŽITNÍK', car: 'OPEL CORSA', points: 8, category: 'do1.6L' },
  { startNumber: 6, name: 'PAVEL PAJDLA', car: 'VW GOLF 4', points: 7, category: 'do1.6L' },
  { startNumber: 4, name: 'ZDENĚK PŘÍHODA', car: 'VW POLO', points: 7, category: 'do1.6L' },
  { startNumber: 333, name: 'MILOŠ KRHOVJAK', car: 'PEUGEOT 206', points: 7, category: 'do1.6L' },
  { startNumber: 126, name: 'TOMÁŠ KŘUPALA', car: 'RENAULT MEGANE II COMBI', points: 6, category: 'do1.6L' },
  { startNumber: 31, name: 'PAVEL DREISEITL', car: 'FIAT DOBLO', points: 5, category: 'do1.6L' },
  { startNumber: 10, name: 'ADAM BARILIČ', car: 'FORD', points: 5, category: 'do1.6L' },
  { startNumber: 950, name: 'TOMÁŠ VENCL', car: 'HYUNDAI GETZ', points: 5, category: 'do1.6L' },
  { startNumber: 11, name: 'TOMÁŠ TROJÁK', car: 'SUZUKI SWIFT', points: 5, category: 'do1.6L' },
  { startNumber: 272, name: 'TOMÁŠ TORČÍK', car: 'FABIE', points: 4, category: 'do1.6L' },
  { startNumber: 919, name: 'HONZA TRYBULA', car: 'FELICIE', points: 4, category: 'do1.6L' },
  { startNumber: 323, name: 'FILIP BOHÁČ', car: 'FELICIE', points: 4, category: 'do1.6L' },
  { startNumber: 166, name: 'JAN KRAJČÍR', car: 'FIAT PUNTO', points: 4, category: 'do1.6L' },
  { startNumber: 26, name: 'ROMAN PROFOTA', car: 'PEUGEOT 206', points: 4, category: 'do1.6L' },
  { startNumber: 40, name: 'MICHAL DVOŘÁK', car: 'FABIE I', points: 4, category: 'do1.6L' },
  { startNumber: 95, name: 'TOMÁŠ VALA', car: 'FIAT', points: 4, category: 'do1.6L' },
  { startNumber: 9, name: 'TADEÁŠ VÝTISK', car: 'VW GOLF', points: 3, category: 'do1.6L' },
  { startNumber: 110, name: 'TOMÁŠ KRUL', car: 'VW POLO', points: 3, category: 'do1.6L' },
  { startNumber: 34, name: 'JAKUB KONEČNÝ', car: 'FELICIE', points: 3, category: 'do1.6L' },
  { startNumber: 570, name: 'PAVEL MARTINEK', car: 'CITROEN C1', points: 3, category: 'do1.6L' },
  { startNumber: 205, name: 'KAREL SOLANSKÝ', car: 'PEUGEOT 205', points: 3, category: 'do1.6L' },
  { startNumber: 14, name: 'MICHAL KOPECKÝ', car: 'FELICIE', points: 3, category: 'do1.6L' },
  { startNumber: 119, name: 'FILIP DIVILA', car: 'PEUGEOT 206', points: 3, category: 'do1.6L' },
  { startNumber: 1, name: 'DANIEL HURNÍK', car: 'RENAULT', points: 2, category: 'do1.6L' },
  { startNumber: 2, name: 'PATRIK GABRHEL', car: 'FELICIE', points: 2, category: 'do1.6L' },
  { startNumber: 5, name: 'LUKÁŠ VODIČKA', car: 'FABIE 1.4 16V', points: 2, category: 'do1.6L' },
  { startNumber: 80, name: 'TOMÁŠ JAKUBÍK', car: 'FELICIE', points: 2, category: 'do1.6L' },
  { startNumber: 111, name: 'JOSEF MAŠLÁŇ', car: 'FELICIE', points: 2, category: 'do1.6L' },
  { startNumber: 901, name: 'DAVID SCHON', car: 'FABIE', points: 2, category: 'do1.6L' },
  { startNumber: 17, name: 'JAKUB MALÍŘ', car: 'FELICIE', points: 1, category: 'do1.6L' },
  { startNumber: 14, name: 'MATÚŠ KRUŽLIAK', car: 'OPEL ASTRA', points: 1, category: 'do1.6L' },
  { startNumber: 340, name: 'TOMÁŠ VARKOČEK', car: 'SEAT LEON', points: 1, category: 'do1.6L' },
  { startNumber: 161, name: 'MICHAL KAČÍREK', car: 'FABIE', points: 1, category: 'do1.6L' },
  { startNumber: 34, name: 'RADEK ZDRÁHALA', car: 'FABIE', points: 1, category: 'do1.6L' },
  { startNumber: 19, name: 'MARTIN MOJEK', car: 'MAZDA 323F', points: 1, category: 'do1.6L' },

  // NAD 1.6 L
  { startNumber: 92, name: 'VÁCLAV ADAMČÍK', car: 'OCTAVIE', points: 29, category: 'nad1.6L' },
  { startNumber: 23, name: 'MATĚJ ŽUŽOV', car: 'FELICIE', points: 25, category: 'nad1.6L' },
  { startNumber: 696, name: 'PETR MAZÁNEK', car: 'VW GOLF', points: 20, category: 'nad1.6L' },
  { startNumber: 713, name: 'VÁCLAV KAŇOK', car: 'BMW', points: 19, category: 'nad1.6L' },
  { startNumber: 222, name: 'TOMÁŠ ROVENSKÝ', car: 'AUDI', points: 15, category: 'nad1.6L' },
  { startNumber: 5, name: 'KAMIL GRICHNIK', car: 'RENAULT SCENIC', points: 15, category: 'nad1.6L' },
  { startNumber: 108, name: 'LUKÁŠ DIVILA', car: 'OCTAVIE', points: 14, category: 'nad1.6L' },
  { startNumber: 46, name: 'ONDŘEJ SPÁČIL', car: 'FELICIE', points: 14, category: 'nad1.6L' },
  { startNumber: 101, name: 'KAMIL BEZDĚK', car: 'OCTAVIE', points: 12, category: 'nad1.6L' },
  { startNumber: 89, name: 'MARTIN ADAMČÍK', car: 'VW GOLF', points: 12, category: 'nad1.6L' },
  { startNumber: 66, name: 'STÁŇA JAROŠ', car: 'TOYOTA', points: 11, category: 'nad1.6L' },
  { startNumber: 112, name: 'JAN PREKOP', car: 'FORD', points: 11, category: 'nad1.6L' },
  { startNumber: 106, name: 'PAVEL ŠINDLER', car: 'BMW', points: 10, category: 'nad1.6L' },
  { startNumber: 3, name: 'LUKÁŠ BAČA', car: 'FORD COUGAR', points: 10, category: 'nad1.6L' },
  { startNumber: 21, name: 'RADEK HECZKO', car: 'OCTAVIE', points: 9, category: 'nad1.6L' },
  { startNumber: 166, name: 'JAN KRAJČÍR', car: 'FORD FOCUS', points: 9, category: 'nad1.6L' },
  { startNumber: 271, name: 'LUKÁŠ RYBÁR', car: 'FORD FOCUS', points: 9, category: 'nad1.6L' },
  { startNumber: 666, name: 'RADEK PLESNÍK', car: 'VW VENTO', points: 9, category: 'nad1.6L' },
  { startNumber: 12, name: 'MAREK CHRASTINA', car: 'VW POLO', points: 8, category: 'nad1.6L' },
  { startNumber: 311, name: 'ROMAN BREŽÁK', car: 'FORD MONDEO', points: 7, category: 'nad1.6L' },
  { startNumber: 444, name: 'VLASŤA BÁRTEK', car: 'FIAT BRAVA', points: 7, category: 'nad1.6L' },
  { startNumber: 69, name: 'MAREK LEPIL', car: 'FELICIE', points: 7, category: 'nad1.6L' },
  { startNumber: 2006, name: 'KUBA MLČÁK', car: 'OCTAVIE', points: 7, category: 'nad1.6L' },
  { startNumber: 22, name: 'OLDŘICH ŽÉDEK', car: 'FORD PUMA', points: 6, category: 'nad1.6L' },
  { startNumber: 589, name: 'ROSTISLAV SKOTÁK', car: 'OCTAVIE', points: 5, category: 'nad1.6L' },
  { startNumber: 611, name: 'JINDŘICH FIALA', car: 'VW GOLF', points: 5, category: 'nad1.6L' },
  { startNumber: 525, name: 'MICHAL KRYBUS', car: 'OPEL CORSA', points: 4, category: 'nad1.6L' },
  { startNumber: 33, name: 'JAN MORÁR', car: 'VW PASSAT', points: 4, category: 'nad1.6L' },
  { startNumber: 1, name: 'LUKÁŠ VALENTA', car: 'VW GOLF', points: 4, category: 'nad1.6L' },
  { startNumber: 599, name: 'JAN KRYL', car: 'OCTAVIE', points: 3, category: 'nad1.6L' },
  { startNumber: 8, name: 'MARTIN KLICH', car: 'MAZDA', points: 3, category: 'nad1.6L' },
  { startNumber: 2, name: 'DAVID KAMENSKÝ', car: 'AUDI', points: 3, category: 'nad1.6L' },
  { startNumber: 13, name: 'AJS', car: 'RAV 4', points: 3, category: 'nad1.6L' },
  { startNumber: 47, name: 'DAVID PECHÁČEK', car: 'OCTAVIE', points: 3, category: 'nad1.6L' },
  { startNumber: 7, name: 'TOBIAS BOGDALÍK', car: 'OPEL ASTRA', points: 3, category: 'nad1.6L' },
  { startNumber: 171, name: 'MAREK MICHÁLEK', car: 'BMW E36 COMPACT 316I', points: 2, category: 'nad1.6L' },
  { startNumber: 11, name: 'MICHAL DVOŘÁK', car: 'FABIE I', points: 2, category: 'nad1.6L' },
  { startNumber: 686, name: 'TOMÁŠ NEVŘIVA', car: 'BMW E46 320D', points: 2, category: 'nad1.6L' },
  { startNumber: 344, name: 'ERIK LESÁK', car: 'FORD MONDEO MK1', points: 2, category: 'nad1.6L' },
  { startNumber: 9, name: 'TADEÁŠ VÝTISK', car: 'VW GOLF', points: 2, category: 'nad1.6L' },
  { startNumber: 228, name: 'LAHVÁČ', car: 'OCTAVIE', points: 2, category: 'nad1.6L' },
  { startNumber: 1977, name: 'JINDŘICH FIALA', car: 'RENAULT MEGANE', points: 1, category: 'nad1.6L' },
  { startNumber: 2001, name: 'JIŘÍ KOKOŘ', car: 'MAZDA 6', points: 1, category: 'nad1.6L' },
  { startNumber: 133, name: 'JAKUB UHŘÍK', car: 'FELICIE', points: 1, category: 'nad1.6L' },
  { startNumber: 6, name: 'MATĚJ KUCHAŘ', car: 'VW GOLF', points: 1, category: 'nad1.6L' },
  { startNumber: 666, name: 'DOMINIK BOHDAL', car: 'OCTAVIE', points: 1, category: 'nad1.6L' },
  { startNumber: 690, name: 'DAVID MIČA', car: 'OCTAVIE', points: 1, category: 'nad1.6L' },
  { startNumber: 113, name: 'RADEK MYSLIVEC', car: 'OCTAVIE', points: 1, category: 'nad1.6L' },

  // ŽENY
  { startNumber: 47, name: 'KATEŘINA PIKOVÁ', car: 'FELICIE', points: 25, category: 'zeny' },
  { startNumber: 52, name: 'MARTINA PEŠKOVÁ', car: 'FABIE', points: 22, category: 'zeny' },
  { startNumber: 122, name: 'IVETA FALUŠI', car: 'TOYOTA YARIS', points: 16, category: 'zeny' },
  { startNumber: 613, name: 'NIKOLA BERNÁTKOVÁ', car: 'FELICIE', points: 14, category: 'zeny' },
  { startNumber: 6002, name: 'KAROLÍNA POSPÍŠILOVÁ', car: 'KIA CEED', points: 14, category: 'zeny' },
  { startNumber: 94, name: 'MONIKA ZÁTOPKOVÁ', car: 'OCTAVIE', points: 9, category: 'zeny' },
  { startNumber: 100, name: 'PAVLÍNA JANEČKOVÁ', car: 'HYUNDAI GETZ', points: 8, category: 'zeny' },
  { startNumber: 156, name: 'JAROSLAVA SOLANSKÁ', car: 'FORD FOCUS', points: 6, category: 'zeny' },
  { startNumber: 11, name: 'GABRIELA ZAVADILOVÁ', car: 'ŠKODA PICKUP', points: 4, category: 'zeny' },
  { startNumber: 777, name: 'SHARLOTA BOGDALÍKOVÁ', car: 'RENAULT TWINGO', points: 4, category: 'zeny' },
  { startNumber: 55, name: 'ELIŠKA HRŮZOVÁ', car: 'FABIA', points: 2, category: 'zeny' },
  { startNumber: 32, name: 'MAGDA PYSZKOVÁ', car: 'FABIE I', points: 2, category: 'zeny' },
  { startNumber: 28, name: 'NADĚŽDA STUDÝNKOVÁ', car: 'FELICIE', points: 2, category: 'zeny' },
  { startNumber: 1109, name: 'VERONIKA LANDTOVÁ', car: 'FELICIE', points: 1, category: 'zeny' },
];
