export const navItems = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
  { label: "Blog", href: "/blog" },
];

export const caseStudies = [
  {
    title: "Segui",
    href: "/case-studies/segui",
    icon: "/figma/paw.svg",
    weight: "font-semibold",
    copy: "Un sistema que reúne las señales críticas de la operación y las convierte en prioridades claras para el equipo. Menos seguimiento manual y más capacidad para actuar a tiempo.",
  },
  {
    title: "Tu empresa",
    href: "#contacto",
    featured: true,
    copy: "Tu empresa ya genera datos valiosos. La ventaja aparece cuando esos datos permiten decidir mejor, actuar antes y operar con menos fricción.\n\nPartimos por una decisión relevante para el negocio y construimos el sistema que tu equipo necesita para mejorarla.",
  },
  {
    title: "Rodar",
    href: "/case-studies/rodar",
    icon: "/figma/rodar.svg",
    copy: "Información dispersa convertida en una visión operativa común. El equipo puede detectar desvíos, concentrarse en lo importante y coordinar acciones con mejor contexto.",
  },
];

export type CaseStudy = (typeof caseStudies)[number];

export const methodologySteps = [
  {
    title: "Observamos",
    copy: "Entendemos cómo opera tu empresa y dónde una decisión lenta, manual o poco informada está frenando resultados.",
  },
  {
    title: "Identificamos",
    copy: "Elegimos una oportunidad concreta y definimos qué datos, señales y criterios permiten capturarla.",
  },
  {
    title: "Construimos",
    copy: "Creamos la infraestructura, los modelos y la herramienta que convierten esa información en acciones claras.",
  },
  {
    title: "Resultados",
    copy: "Integramos el sistema en la operación, medimos su impacto y lo mejoramos con el aprendizaje de tu equipo.",
    featured: true,
  },
];

export type MethodologyStep = (typeof methodologySteps)[number];
