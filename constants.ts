
import { Driver, EventItem, ProgramStep, MarketItem } from './types';

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
  { id: '1', title: 'PRAHA: JARNÍ MASAKR', date: '15.04.2026', location: 'STRAHOV ARENA', image: 'https://picsum.photos/seed/ev1/600/400' },
  { id: '2', title: 'BRNO: OKRUH SMRTI', date: '22.05.2026', location: 'AUTODROM BRNO', image: 'https://picsum.photos/seed/ev2/600/400' },
  { id: '3', title: 'OSTRAVA: OCELOVÁ BITVA', date: '10.07.2026', location: 'DOLNÍ VÍTKOVICE', image: 'https://picsum.photos/seed/ev3/600/400' },
  { id: '4', title: 'LIBEREC: HORSKÝ DERBY', date: '05.09.2026', location: 'AREÁL VESEC', image: 'https://picsum.photos/seed/ev4/600/400' }
];

export const PROGRAM: ProgramStep[] = [
  { time: '08:00:00', title: 'PŘEJÍMKA VOZIDEL', description: 'Technická kontrola a bezpečnostní prověrka všech účastníků.' },
  { time: '10:00:00', title: 'ROZPRAVA JEZDCŮ', description: 'Bezpečnostní briefing a losování startovních pozic.' },
  { time: '12:00:00', title: 'START KVALIFIKACE', description: 'První eliminační kola ve všech kategoriích.', isCurrent: true },
  { time: '15:30:00', title: 'HLAVNÍ ZÁVOD', description: 'Finálové jízdy o titul Vrakfest Champion 2026.' },
  { time: '18:00:00', title: 'LAST MAN STANDING', description: 'Legendární bitva do posledního funkčního vozu.' }
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
