export type Article = {
  title: string;
  description: string;
  category: string;
  url: string;
};

export const articles: Article[] = [
  {
    title: "Registracija automobila u Srbiji",
    description: "Kompletan vodič kroz proces registracije, dokumenta i troškove.",
    category: "Cene",
    url: "/clanci/registracija-vozila"
  },
  {
    title: "Kako pronaći najbližu apoteku",
    description: "Alati i saveti za brzo lociranje apoteka u tvom okruženju.",
    category: "Zdravlje",
    url: "/clanci/apoteka-lokator"
  },
  {
    title: "Kada je potreban pravnik za ugovor?",
    description: "Osnovne pravne situacije kada ti treba stručna pomoć.",
    category: "Pravo",
    url: "/clanci/pravna-pomoc"
  }
];
