
export interface Driver {
  id: string;
  name: string;
  car: string;
  category: string;
  image: string;
  stats: {
    wins: number;
    wrecks: number;
    experience: string;
  };
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
}

export interface ProgramStep {
  time: string;
  title: string;
  description: string;
  isCurrent?: boolean;
}

export interface MarketItem {
  id: string;
  name: string;
  price: string;
  image: string;
}
