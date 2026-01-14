import { Section } from "./types";

export const FONT_OPTIONS = [
  { label: "Inter", value: "Inter", class: "font-inter" },
  { label: "Roboto", value: "Roboto", class: "font-roboto" },
  { label: "Playfair Display", value: "Playfair Display", class: "font-playfair" },
  { label: "Montserrat", value: "Montserrat", class: "font-montserrat" },
  { label: "Open Sans", value: "Open Sans", class: "font-opensans" },
];

export const INITIAL_SECTIONS: Section[] = [
  {
    id: "hero-1",
    type: "hero",
    title: "Monitor Ultra Wide Pro",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop",
    description: "Mergulhe em uma experiência visual sem precedentes. Cores vivas, detalhes nítidos e performance extrema para profissionais.",
    buttonText: "Comprar Agora",
    styles: {
      fontFamily: "Inter",
      fontSize: 42,
      color: "#0f172a",
      backgroundColor: "#ffffff"
    },
  },
  {
    id: "content-1",
    type: "content-block",
    title: "TECNOLOGIA FREESYNC",
    description: "Elimine o tearing e os travamentos com a tecnologia FreeSync, que sincroniza a taxa de atualização do monitor com a taxa de quadros da sua placa de vídeo. Isso resulta em transições suaves entre os quadros.",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    reverseLayout: false, // Text | Image
    styles: {
      fontFamily: "Inter",
      fontSize: 28,
      color: "#0f172a",
      backgroundColor: "#f8fafc"
    }
  },
  {
    id: "content-2",
    type: "content-block",
    title: "DESIGN ERGONÔMICO",
    description: "Ajuste a altura, inclinação e rotação para encontrar a posição perfeita para longas horas de uso. O conforto é essencial para sua produtividade.",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop",
    reverseLayout: true, // Image | Text
    styles: {
      fontFamily: "Inter",
      fontSize: 28,
      color: "#0f172a",
      backgroundColor: "#ffffff"
    }
  }
];
