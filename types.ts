
export interface TechnologyStep {
  icon: string; // font-awesome class
  title: string;
  description: string;
}

export interface Benefit {
  icon: string; // font-awesome class
  title: string;
  description: string;
  progress?: {
    value: number;
    label: string;
    colorClass: string;
  };
  graph?: boolean;
}

export interface NavLink {
    name: string;
    href: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}