

import { Driver, EventItem, ProgramStep, MarketItem, StandingsDriver } from './types';


export const DRIVERS: Driver[] = [
  {
    id: '1',
    name: 'PETR "DEMOLIČ" NOVÁK',
    car: 'ŠKODA FELICIA TANK',
    category: 'VETERAN CLASH',
    image: 'https://picsum.photos/seed/driver1/400/500',
    stats: { wins: 12, wrecks: 45, experience: '8 ROKŮ' }
  },
  {
    id: '2',
    name: 'JAN "VRAKOUN" SVOBODA',
    car: 'BMW E36 COMPACT',
    category: 'PRO SERIES',
    image: 'https://picsum.photos/seed/driver2/400/500',
    stats: { wins: 24, wrecks: 89, experience: '12 ROKŮ' }
  },
  {
    id: '3',
    name: 'LUKÁŠ "ŠROT" MAREK',
    car: 'VW GOLF MK3',
    category: 'STREET FIGHT',
    image: 'https://picsum.photos/seed/driver3/400/500',
    stats: { wins: 5, wrecks: 12, experience: '2 ROKY' }
  },
  {
    id: '4',
    name: 'MARTIN "OCEL" ČERNÝ',
    car: 'OPEL ASTRA G',
    category: 'PRO SERIES',
    image: 'https://picsum.photos/seed/driver4/400/500',
    stats: { wins: 31, wrecks: 102, experience: '15 ROKŮ' }
  }
];

export const EVENTS: EventItem[] = [
  { id: '1', title: 'OSTRAVA', date: '04.04.2026', location: 'VŘESÍNSKÁ STRŽ', image: 'https://picsum.photos/seed/ev1/600/400' },
  { id: '2', title: 'PŘIPRAVUJEME', date: '???', location: '???', image: 'https://picsum.photos/seed/ev2/600/400' },
  { id: '3', title: 'PŘIPRAVUJEME', date: '???', location: '???', image: 'https://picsum.photos/seed/ev3/600/400' },
  { id: '4', title: 'PŘIPRAVUJEME', date: '???', location: '???', image: 'https://picsum.photos/seed/ev4/600/400' }
];

export const PROGRAM: ProgramStep[] = [
  { time: '09:30', title: 'START VRAKFEST RACE', description: 'Kvalifikační jízdy a eliminace.' },
  { time: '15:30', title: 'SEMIFINÁLE VRAKFEST RACE', description: 'To nejlepší z celého dne. Boj o postup.' },
  { time: '16:00', title: 'FINÁLE VRAKFEST RACE', description: 'Boj o titul Vrakfest Champion 2026.' },
  { time: '17:30', title: 'DEMOLITION DERBY', description: 'Totální destrukce všech zbylých vraků.', isCurrent: true },
  { time: '18:00', title: 'VYHLÁŠENÍ VÝSLEDKŮ', description: 'Předání pohárů a ukončení akce.' }
];

export const MARKET_ITEMS: MarketItem[] = [
  { id: '1', name: 'ZESÍLENÝ RÁM E36', price: '4 500 Kč', image: 'https://picsum.photos/seed/m1/300/300' },
  { id: '2', name: 'TERÉNNÍ PNEU 14"', price: '1 200 Kč', image: 'https://picsum.photos/seed/m2/300/300' },
  { id: '3', name: 'ZÁVODNÍ SEDAČKA', price: '2 800 Kč', image: 'https://picsum.photos/seed/m3/300/300' },
  { id: '4', name: 'HASÍCÍ SYSTÉM', price: '1 900 Kč', image: 'https://picsum.photos/seed/m4/300/300' }
];

export const SPONSORS = [
  'MONSTER ENERGY', 'CASTROL EDGE', 'AKUMA BATTERIES', 'WURTH', 'KARCHER', 'SPARCO', 'PIRELLI'
];

export const STANDINGS: StandingsDriver[] = [
  // Do 1.6L (30 drivers)
  { startNumber: 12, name: 'PETR NOVÁK', car: 'ŠKODA FELICIA', points: 245, category: 'do1.6L' },
  { startNumber: 7, name: 'MARTIN SVOBODA', car: 'VW POLO', points: 198, category: 'do1.6L' },
  { startNumber: 23, name: 'TOMÁŠ DVOŘÁK', car: 'OPEL CORSA', points: 176, category: 'do1.6L' },
  { startNumber: 45, name: 'JAKUB ČERNÝ', car: 'FORD FIESTA', points: 154, category: 'do1.6L' },
  { startNumber: 18, name: 'LUKÁŠ PROCHÁZKA', car: 'PEUGEOT 206', points: 132, category: 'do1.6L' },
  { startNumber: 31, name: 'DAVID KRÁL', car: 'RENAULT CLIO', points: 118, category: 'do1.6L' },
  { startNumber: 56, name: 'VÁCLAV BENEŠ', car: 'ŠKODA FAVORIT', points: 105, category: 'do1.6L' },
  { startNumber: 9, name: 'MIROSLAV POSPÍŠIL', car: 'FIAT PUNTO', points: 98, category: 'do1.6L' },
  { startNumber: 42, name: 'STANISLAV FIALA', car: 'SEAT IBIZA', points: 87, category: 'do1.6L' },
  { startNumber: 27, name: 'JOSEF HÁJEK', car: 'CITROËN SAXO', points: 76, category: 'do1.6L' },
  { startNumber: 63, name: 'ALEŠ Urban', car: 'NISSAN MICRA', points: 68, category: 'do1.6L' },
  { startNumber: 14, name: 'RADEK KOLÁŘ', car: 'MAZDA 121', points: 61, category: 'do1.6L' },
  { startNumber: 38, name: 'VLASTIMIL RŮŽIČKA', car: 'HONDA CIVIC', points: 54, category: 'do1.6L' },
  { startNumber: 51, name: 'ZDENĚK BLAŽEK', car: 'TOYOTA YARIS', points: 48, category: 'do1.6L' },
  { startNumber: 19, name: 'MILAN KREJČÍ', car: 'HYUNDAI ACCENT', points: 43, category: 'do1.6L' },
  { startNumber: 74, name: 'JAROSLAV MORAVEC', car: 'KIA RIO', points: 39, category: 'do1.6L' },
  { startNumber: 6, name: 'VLADIMÍR POKORNÝ', car: 'SUZUKI SWIFT', points: 35, category: 'do1.6L' },
  { startNumber: 88, name: 'BOHUMIL ČECH', car: 'DACIA SANDERO', points: 31, category: 'do1.6L' },
  { startNumber: 33, name: 'ANTONÍN DOLEŽAL', car: 'LADA SAMARA', points: 28, category: 'do1.6L' },
  { startNumber: 47, name: 'BŘETISLAV HOLUB', car: 'CHEVROLET AVEO', points: 25, category: 'do1.6L' },
  { startNumber: 21, name: 'CTIBOR JELÍNEK', car: 'DAEWOO MATIZ', points: 22, category: 'do1.6L' },
  { startNumber: 59, name: 'DALIBOR KUČERA', car: 'ROVER 25', points: 19, category: 'do1.6L' },
  { startNumber: 82, name: 'EMANUEL NOVOTNÝ', car: 'MG ZR', points: 16, category: 'do1.6L' },
  { startNumber: 15, name: 'FERDINAND MAREK', car: 'PROTON PERSONA', points: 13, category: 'do1.6L' },
  { startNumber: 67, name: 'GUSTAV SVOBODA', car: 'CHRYSLER NEON', points: 10, category: 'do1.6L' },
  { startNumber: 91, name: 'HERBERT VESELÝ', car: 'DODGE NEON', points: 8, category: 'do1.6L' },
  { startNumber: 24, name: 'IGNÁC HORÁK', car: 'PLYMOUTH NEON', points: 6, category: 'do1.6L' },
  { startNumber: 76, name: 'JINDŘICH NĚMEC', car: 'SATURN SL', points: 4, category: 'do1.6L' },
  { startNumber: 53, name: 'KAMIL DVOŘÁK', car: 'GEO METRO', points: 2, category: 'do1.6L' },
  { startNumber: 29, name: 'LADISLAV ČERNÝ', car: 'PONTIAC SUNFIRE', points: 1, category: 'do1.6L' },

  // Nad 1.6L (30 drivers)
  { startNumber: 5, name: 'JAN VÁVRA', car: 'BMW E36', points: 289, category: 'nad1.6L' },
  { startNumber: 14, name: 'ONDŘEJ MAREK', car: 'AUDI A4', points: 267, category: 'nad1.6L' },
  { startNumber: 8, name: 'MICHAL HORÁK', car: 'VW GOLF MK4', points: 234, category: 'nad1.6L' },
  { startNumber: 22, name: 'PAVEL KUČERA', car: 'ŠKODA OCTAVIA', points: 201, category: 'nad1.6L' },
  { startNumber: 36, name: 'ROMAN VESELÝ', car: 'OPEL ASTRA', points: 178, category: 'nad1.6L' },
  { startNumber: 41, name: 'FILIP NĚMEC', car: 'FORD MONDEO', points: 145, category: 'nad1.6L' },
  { startNumber: 17, name: 'ROBERT SOUKUP', car: 'MERCEDES C-CLASS', points: 134, category: 'nad1.6L' },
  { startNumber: 52, name: 'DANIEL ŠIMEK', car: 'VOLVO S40', points: 126, category: 'nad1.6L' },
  { startNumber: 3, name: 'ADAM BARTOŠ', car: 'SAAB 9-3', points: 118, category: 'nad1.6L' },
  { startNumber: 68, name: 'RICHARD KONEČNÝ', car: 'ALFA ROMEO 156', points: 109, category: 'nad1.6L' },
  { startNumber: 25, name: 'MAREK SEDLÁČEK', car: 'FIAT BRAVO', points: 102, category: 'nad1.6L' },
  { startNumber: 79, name: 'TOMÁŠ RŮŽIČKA', car: 'SEAT LEON', points: 95, category: 'nad1.6L' },
  { startNumber: 11, name: 'JAKUB VLČEK', car: 'RENAULT LAGUNA', points: 88, category: 'nad1.6L' },
  { startNumber: 44, name: 'PETR ZEMAN', car: 'PEUGEOT 406', points: 81, category: 'nad1.6L' },
  { startNumber: 60, name: 'LUKÁŠ KOLÁŘ', car: 'CITROËN XSARA', points: 74, category: 'nad1.6L' },
  { startNumber: 32, name: 'MARTIN NOVÁK', car: 'HONDA ACCORD', points: 67, category: 'nad1.6L' },
  { startNumber: 87, name: 'JAN PROCHÁZKA', car: 'MAZDA 6', points: 60, category: 'nad1.6L' },
  { startNumber: 16, name: 'DAVID KRÁL', car: 'NISSAN PRIMERA', points: 53, category: 'nad1.6L' },
  { startNumber: 49, name: 'ONDŘEJ SVOBODA', car: 'TOYOTA AVENSIS', points: 46, category: 'nad1.6L' },
  { startNumber: 71, name: 'MICHAL DVOŘÁK', car: 'SUBARU LEGACY', points: 39, category: 'nad1.6L' },
  { startNumber: 4, name: 'PAVEL ČERNÝ', car: 'MITSUBISHI LANCER', points: 32, category: 'nad1.6L' },
  { startNumber: 58, name: 'ROMAN NOVOTNÝ', car: 'HYUNDAI SONATA', points: 25, category: 'nad1.6L' },
  { startNumber: 83, name: 'FILIP VESELÝ', car: 'KIA OPTIMA', points: 18, category: 'nad1.6L' },
  { startNumber: 20, name: 'ROBERT HORÁK', car: 'CHEVROLET CRUZE', points: 11, category: 'nad1.6L' },
  { startNumber: 65, name: 'DANIEL NĚMEC', car: 'FORD FOCUS', points: 9, category: 'nad1.6L' },
  { startNumber: 92, name: 'ADAM MAREK', car: 'OPEL VECTRA', points: 7, category: 'nad1.6L' },
  { startNumber: 37, name: 'RICHARD KUČERA', car: 'VW PASSAT', points: 5, category: 'nad1.6L' },
  { startNumber: 73, name: 'MAREK SOUKUP', car: 'ŠKODA SUPERB', points: 3, category: 'nad1.6L' },
  { startNumber: 10, name: 'TOMÁŠ ŠIMEK', car: 'AUDI A6', points: 2, category: 'nad1.6L' },
  { startNumber: 55, name: 'JAKUB BARTOŠ', car: 'BMW E46', points: 1, category: 'nad1.6L' },

  // Ženy (30 drivers)
  { startNumber: 3, name: 'PETRA NOVÁKOVÁ', car: 'ŠKODA FABIA', points: 212, category: 'zeny' },
  { startNumber: 17, name: 'JANA SVOBODOVÁ', car: 'VW GOLF MK3', points: 189, category: 'zeny' },
  { startNumber: 28, name: 'TEREZA MALÁ', car: 'OPEL CORSA', points: 167, category: 'zeny' },
  { startNumber: 39, name: 'LUCIE HORÁKOVÁ', car: 'PEUGEOT 307', points: 143, category: 'zeny' },
  { startNumber: 11, name: 'MARKÉTA DVOŘÁKOVÁ', car: 'RENAULT MEGANE', points: 121, category: 'zeny' },
  { startNumber: 46, name: 'KATEŘINA ČERNÁ', car: 'FORD FOCUS', points: 112, category: 'zeny' },
  { startNumber: 62, name: 'VERONIKA PROCHÁZKOVÁ', car: 'SEAT LEON', points: 105, category: 'zeny' },
  { startNumber: 8, name: 'BARBORA KRÁLOVÁ', car: 'FIAT PUNTO', points: 98, category: 'zeny' },
  { startNumber: 54, name: 'SIMONA BENEŠOVÁ', car: 'TOYOTA YARIS', points: 91, category: 'zeny' },
  { startNumber: 26, name: 'ANDREA POSPÍŠILOVÁ', car: 'HONDA JAZZ', points: 84, category: 'zeny' },
  { startNumber: 70, name: 'MICHAELA FIALOVÁ', car: 'MAZDA 2', points: 77, category: 'zeny' },
  { startNumber: 13, name: 'LENKA HÁJKOVÁ', car: 'NISSAN MICRA', points: 70, category: 'zeny' },
  { startNumber: 48, name: 'DENISA URBANOVÁ', car: 'CITROËN C3', points: 63, category: 'zeny' },
  { startNumber: 81, name: 'KRISTÝNA KOLÁŘOVÁ', car: 'HYUNDAI I20', points: 56, category: 'zeny' },
  { startNumber: 19, name: 'NIKOLA RŮŽIČKOVÁ', car: 'KIA RIO', points: 49, category: 'zeny' },
  { startNumber: 64, name: 'ADÉLA BLAŽKOVÁ', car: 'SUZUKI SWIFT', points: 42, category: 'zeny' },
  { startNumber: 35, name: 'ELIŠKA KREJČÍ', car: 'DACIA SANDERO', points: 35, category: 'zeny' },
  { startNumber: 77, name: 'KLÁRA MORAVCOVÁ', car: 'CHEVROLET SPARK', points: 28, category: 'zeny' },
  { startNumber: 2, name: 'NATÁLIE POKORNÁ', car: 'DAEWOO MATIZ', points: 21, category: 'zeny' },
  { startNumber: 50, name: 'DOMINIKA ČECHOVÁ', car: 'ROVER 25', points: 18, category: 'zeny' },
  { startNumber: 86, name: 'ANETA DOLEŽALOVÁ', car: 'MG ZR', points: 15, category: 'zeny' },
  { startNumber: 23, name: 'KAROLÍNA HOLUBOVÁ', car: 'PROTON PERSONA', points: 12, category: 'zeny' },
  { startNumber: 69, name: 'ZUZANA JELÍNKOVÁ', car: 'LADA KALINA', points: 9, category: 'zeny' },
  { startNumber: 94, name: 'PAVLÍNA KUČEROVÁ', car: 'CHRYSLER PT CRUISER', points: 7, category: 'zeny' },
  { startNumber: 40, name: 'IVANA NOVOTNÁ', car: 'DODGE CALIBER', points: 5, category: 'zeny' },
  { startNumber: 75, name: 'MONIKA MARKOVÁ', car: 'SATURN ION', points: 4, category: 'zeny' },
  { startNumber: 12, name: 'RADKA SVOBODOVÁ', car: 'GEO PRIZM', points: 3, category: 'zeny' },
  { startNumber: 57, name: 'HANA VESELÁ', car: 'PONTIAC VIBE', points: 2, category: 'zeny' },
  { startNumber: 89, name: 'ALENA HORÁKOVÁ', car: 'SAAB 9-2X', points: 1, category: 'zeny' },
  { startNumber: 30, name: 'BOŽENA NĚMCOVÁ', car: 'SUBARU IMPREZA', points: 1, category: 'zeny' },
];
