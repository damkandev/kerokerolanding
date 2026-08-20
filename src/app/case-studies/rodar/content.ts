export type RodarBlock =
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "heading2"; readonly text: string }
  | { readonly type: "heading3"; readonly text: string }
  | { readonly type: "formula"; readonly lines: readonly string[]; readonly caption: string }
  | { readonly type: "list"; readonly items: readonly string[] }
  | {
      readonly type: "image";
      readonly src: string;
      readonly alt: string;
      readonly caption: string;
      readonly width: number;
      readonly height: number;
    }
  | {
      readonly type: "chart";
      readonly chartType: "dataChain" | "signalDecision" | "capitalCycle";
      readonly caption: string;
    }
  | { readonly type: "callout"; readonly eyebrow: string; readonly text: string };

export const rodarCaseStudy = {
  slug: "rodar",
  client: "Rodar",
  category: "Caso de estudio",
  title: "De una patente a una decisión de millones.",
  subtitle:
    "Cómo Kerokero diseñó con Rodar una estructura de datos que cruza la condición del vehículo, sus antecedentes y el mercado para decidir cuánto pagar, cuánto arriesgar y cuánto capital mantener en inventario.",
  summary:
    "Caso de estudio sobre el diseño de datos detrás de Rodar: identidad vehicular, cruces legales y técnicos, señales de riesgo, valorización de inventario y financiamiento para automotoras.",
  seoTitle: "Caso Rodar: datos para comprar y valorizar vehículos | Kerokero",
  seoDescription:
    "Cómo Kerokero diseñó con Rodar el modelo que cruza datos legales, técnicos y de mercado para evaluar compras, valorizar inventario y financiar automotoras.",
  publishedAt: "2026-08-20",
  publishedLabel: "20 de agosto de 2026",
  metaLine: "Inteligencia automotriz · Datos y producto",
  body: [
    {
      type: "paragraph",
      text: "Una automotora encuentra un vehículo publicado en $12 millones. Estima que puede venderlo en $14 millones. El margen aparente es de $2 millones, pero todavía faltan varias preguntas.",
    },
    {
      type: "paragraph",
      text: "¿El kilometraje es real? ¿Tiene una prenda vigente? ¿El motor registra fallas que alguien borró antes de la inspección? ¿Ese modelo se vende al mismo precio en esa zona? ¿Cuánto tiempo puede permanecer en inventario antes de que el costo financiero consuma la ganancia?",
    },
    {
      type: "paragraph",
      text: "El encargado suele responder cada pregunta en un lugar distinto. Revisa portales, compra certificados, conecta un equipo de diagnóstico y recurre a su experiencia. Después intenta reunir todo antes de que otra automotora compre el vehículo.",
    },
    {
      type: "paragraph",
      text: "Creamos Rodar para resolver esa evaluación. Las automotoras administran activos de alto valor con información fragmentada. En Kerokero diseñamos la estructura que reúne esas piezas y las convierte en criterios de compra.",
    },
    {
      type: "callout",
      eyebrow: "La decisión que ordenó el proyecto",
      text: "Una automotora debía poder mirar un vehículo y decidir si convenía comprarlo, negociar su precio o dejarlo pasar.",
    },
    { type: "heading2", text: "La patente como punto de unión" },
    {
      type: "paragraph",
      text: "La primera decisión de datos fue definir qué representaba un vehículo dentro del sistema. Una patente inicia la búsqueda. El número de chasis identifica la unidad física. Los módulos internos registran su uso. Las observaciones de mercado agregan una referencia comercial que cambia según fecha y ubicación.",
    },
    {
      type: "paragraph",
      text: "Diseñamos el modelo alrededor de una identidad compuesta. Cada consulta, lectura y precio observado queda asociado a la misma unidad y conserva su fuente. Así podemos distinguir dos vehículos del mismo modelo y detectar cuando los documentos y la identidad electrónica describen unidades diferentes.",
    },
    {
      type: "formula",
      lines: [
        "vehículo = patente + número de chasis",
        "+ identidad electrónica + atributos de fabricación",
      ],
      caption: "Modelo conceptual de identidad. Cada fuente se conecta a una unidad verificable.",
    },
    {
      type: "chart",
      chartType: "dataChain",
      caption:
        "Kerokero diseñó el tramo central: fuentes distintas convergen en una identidad, señales comparables y criterios que el equipo puede revisar.",
    },
    { type: "heading2", text: "Tres fuentes describen una misma compra" },
    { type: "heading3", text: "Antecedentes públicos y legales" },
    {
      type: "paragraph",
      text: "Rodar consulta anotaciones vigentes, prendas, embargos, deudas viales, revisiones técnicas y alertas asociadas al vehículo. Cada antecedente modifica la compra de una forma distinta. Una deuda puede convertirse en un costo negociable. Una prenda cambia la posibilidad de transferir. Una alerta de clonación detiene la operación.",
    },
    {
      type: "paragraph",
      text: "El modelo conserva el dato original y agrega una interpretación operacional. El equipo distingue entre algo que debe revisar, algo que debe descontar y algo que impide continuar.",
    },
    { type: "heading3", text: "Información directa del vehículo" },
    {
      type: "paragraph",
      text: "La segunda fuente proviene del auto. Rodar lee kilometraje, horas de funcionamiento, fallas, borrados recientes y señales de desgaste. También relaciona información del motor, la transmisión, la batería y otros módulos.",
    },
    {
      type: "paragraph",
      text: "Una lectura aislada puede tener varias explicaciones. El cruce entrega contexto. El tablero puede mostrar un kilometraje y otro módulo conservar horas de uso incompatibles con esa cifra. Una falla puede desaparecer después de un borrado, mientras otros registros mantienen rastros del problema.",
    },
    { type: "heading3", text: "Mercado" },
    {
      type: "paragraph",
      text: "El tercer grupo responde cuánto vale el vehículo en su contexto. La ubicación, la versión, el año, el kilometraje y el comportamiento reciente de unidades comparables cambian la referencia. Rodar organiza esas observaciones por modelo, zona y momento.",
    },
    {
      type: "paragraph",
      text: "La automotora distingue el precio que alguien publica del rango en que puede comprar y vender. El equipo consulta esa referencia junto con los antecedentes del vehículo que tiene delante.",
    },
    {
      type: "formula",
      lines: [
        "referencia de mercado = comparables + ubicación",
        "+ momento + condición observada",
      ],
      caption: "La referencia comercial pertenece a un vehículo, un lugar y un momento.",
    },
    {
      type: "image",
      src: "/case-studies/rodar-market.webp",
      alt: "Comparación de valores de un vehículo por zona geográfica",
      caption:
        "El precio pertenece a un contexto. Rodar compara vehículos equivalentes por zona y momento.",
      width: 1200,
      height: 960,
    },
    { type: "heading2", text: "Las diferencias entre fuentes producen señales" },
    {
      type: "paragraph",
      text: "Una lista de antecedentes solo trasladaría el trabajo manual a otra pantalla. Diseñamos una capa que compara fuentes y registra el efecto de cada diferencia sobre la compra.",
    },
    {
      type: "paragraph",
      text: "El kilometraje declarado adquiere sentido al compararlo con las horas de motor y los registros de revisión. El precio de mercado cambia cuando aparecen costos técnicos. Una oportunidad comercial pierde valor cuando el vehículo puede permanecer demasiado tiempo en inventario.",
    },
    {
      type: "chart",
      chartType: "signalDecision",
      caption:
        "Cada señal conserva su origen y termina en una acción. El encargado puede revisar por qué Rodar recomienda continuar, negociar o detener la compra.",
    },
    {
      type: "formula",
      lines: [
        "riesgo = antecedentes + condición + consistencia",
        "oportunidad = precio de venta - compra - costos - tiempo",
        "decisión = riesgo + margen + rotación + caja",
      ],
      caption: "La evaluación combina riesgo y retorno sin esconder los supuestos del equipo.",
    },
    { type: "heading2", text: "El vehículo como una secuencia de observaciones" },
    {
      type: "paragraph",
      text: "Un diagnóstico registra el estado del vehículo en un momento. Rodar ordena esas observaciones en el tiempo. Cada lectura conserva la fecha, la fuente y la unidad a la que pertenece. El modelo diferencia una condición actual de un evento anterior y una falla persistente de un registro borrado.",
    },
    {
      type: "paragraph",
      text: "La lectura profunda agrega observaciones de otros módulos. Rodar contrasta el odómetro con distintos componentes, busca registros de colisión y reconoce modificaciones que no aparecen en los documentos. El equipo evalúa el riesgo con señales consistentes.",
    },
    {
      type: "paragraph",
      text: "La estructura también aprende de la operación. La automotora puede comparar la evaluación inicial con los costos y el tiempo que el vehículo acumula después de la compra. Cada unidad vendida mejora la referencia para las siguientes.",
    },
    { type: "heading2", text: "Del diagnóstico a una decisión de compra" },
    {
      type: "paragraph",
      text: "Rodar presenta el valor de mercado, el precio sugerido de compra, la venta proyectada, el margen y la permanencia estimada en inventario. Los riesgos técnicos y legales aparecen como ajustes sobre ese escenario.",
    },
    {
      type: "formula",
      lines: [
        "precio sugerido = valor de mercado",
        "- costos técnicos - obligaciones - riesgo de inmovilización",
      ],
      caption: "La recomendación muestra qué elemento cambió el valor y cuánto debe revisar el equipo.",
    },
    {
      type: "image",
      src: "/case-studies/rodar-evaluation.webp",
      alt: "Evaluación Rodar con recomendación, valor de mercado, margen y antecedentes técnicos",
      caption:
        "La evaluación reúne la recomendación comercial y la evidencia que la sostiene.",
      width: 705,
      height: 1440,
    },
    {
      type: "paragraph",
      text: "El equipo continúa cuando el margen compensa el riesgo. Negocia cuando un costo conocido admite un descuento. Descarta cuando la identidad, los antecedentes o la condición técnica hacen inviable la compra.",
    },
    {
      type: "paragraph",
      text: "La recomendación conserva sus componentes. El encargado puede cambiar un supuesto y revisar su efecto. La experiencia del equipo sigue siendo relevante, respaldada por una evaluación que otros pueden entender y discutir.",
    },
    { type: "heading2", text: "Modelar el inventario como capital" },
    {
      type: "paragraph",
      text: "Cada vehículo inmoviliza capital desde la compra hasta la venta. El precio esperado importa junto con el margen, el riesgo y el tiempo que ese dinero permanecerá detenido.",
    },
    {
      type: "paragraph",
      text: "Rodar agrega las evaluaciones individuales para construir una valorización del inventario. La automotora observa cuánto capital mantiene en vehículos, cómo se distribuye y qué unidades requieren una decisión.",
    },
    {
      type: "formula",
      lines: [
        "valor de la flota = valores observados",
        "- riesgos pendientes - costos esperados",
      ],
      caption: "Rodar calcula el valor de la flota con la misma información utilizada para evaluar cada compra.",
    },
    {
      type: "paragraph",
      text: "Rodar usa la valorización de la flota para respaldar el acceso a financiamiento. La automotora evalúa el capital disponible y financia nuevas compras sobre una base que puede revisar.",
    },
    {
      type: "chart",
      chartType: "capitalCycle",
      caption:
        "El modelo conecta una compra individual con la siguiente. Evaluar mejor protege el margen, ordena el inventario y entrega una base para financiar nuevas unidades.",
    },
    { type: "heading2", text: "El trabajo de Kerokero" },
    {
      type: "paragraph",
      text: "En Kerokero concentramos el trabajo en la estructura que sostiene la cadena completa. Definimos la identidad del vehículo y las fuentes capaces de describirlo. Después diseñamos cómo registrar observaciones sin perder su procedencia ni su momento.",
    },
    {
      type: "list",
      items: [
        "Un modelo común para la identidad física, legal y electrónica del vehículo.",
        "Una capa de observaciones que conserva fuente, fecha y contexto.",
        "Señales que traducen contradicciones y costos en riesgo operacional.",
        "Criterios para comprar, negociar, valorizar inventario y financiar nuevas unidades.",
      ],
    },
    {
      type: "paragraph",
      text: "La interfaz hace visible el resultado. El valor de Kerokero está en el modelo que permite pasar desde una patente hasta una decisión financiera sin reconstruir el caso a mano.",
    },
    { type: "heading2", text: "Un mercado tradicional lleno de datos" },
    {
      type: "paragraph",
      text: "El mercado automotriz lleva décadas comprando y vendiendo vehículos. Los registros públicos, los sensores y las publicaciones de mercado ya existían. Kerokero diseñó la estructura que permite leerlos como partes de una misma decisión.",
    },
    {
      type: "paragraph",
      text: "Rodar conecta el vehículo físico con sus documentos, su mercado y el capital de la automotora. El equipo evalúa una compra, administra el inventario y accede a financiamiento sobre una misma base de información.",
    },
    {
      type: "callout",
      eyebrow: "De datos a decisiones",
      text: "Kerokero reúne la información, incorpora los criterios del negocio y construye la herramienta que el equipo usa para decidir.",
    },
  ] satisfies readonly RodarBlock[],
} as const;

export type RodarCaseStudy = typeof rodarCaseStudy;
