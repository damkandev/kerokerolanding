export type BlogInlineSegment =
  | { readonly type: "text"; readonly text: string }
  | { readonly type: "link"; readonly href: string; readonly text: string }
  | { readonly type: "emphasis"; readonly text: string };

export type BlogBodyBlock =
  | { readonly type: "paragraph"; readonly segments: readonly BlogInlineSegment[] }
  | { readonly type: "heading2"; readonly text: string }
  | { readonly type: "heading3"; readonly text: string }
  | {
      readonly type: "image";
      readonly src: string;
      readonly alt: string;
      readonly caption: string;
      readonly width: number;
      readonly height: number;
    };

export const blogAuthors = {
  damian: {
    name: "Damián Panes",
    shortName: "Damián",
    role: "CEO",
    image: "/team/damian-panes.webp",
    linkedinUrl: "https://www.linkedin.com/in/damianpanes/",
    website: "https://www.dapan.es/",
  },
} as const;

export type BlogAuthor = (typeof blogAuthors)[keyof typeof blogAuthors];

export const blogArticles = [
  {
    slug: "afuera-no-adentro",
    category: "Estrategia",
    collaboration: true,
    author: blogAuthors.damian,
    title: "Afuera, no adentro.",
    subtitle:
      "Como los mercados tradicionales hoy en día son una verdadera oportunidad si sabes incursionar en ellos.",
    summary:
      "Los mercados tradicionales como oportunidad concreta para founders de software: qué son, cómo reconocerlos y por qué la inteligencia artificial vuelve viable entrar hoy.",
    publishedAt: "2026-04-04",
    publishedLabel: "4 de abril de 2026",
    seoTitle: "Afuera, no adentro: mercados tradicionales como oportunidad | Blog Kerokero",
    seoDescription:
      "Por qué los mercados tradicionales son una oportunidad concreta para founders de software y cómo la IA reduce la barrera de entrada. Un artículo de Damián Panes en colaboración con Kerokero.",
    original: {
      label: "dapan.es",
      url: "https://www.dapan.es/es/articles/afuera-no-adentro/",
    },
    authorBio:
      "Damián Panes es CEO de Kerokero. Escribe sobre software, producto y mercados en dapan.es.",
    body: [
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Es común ver a desarrolladores pasar días enteros buscando subnichos dentro de la programación: queriendo crear el próximo PostgreSQL, un lenguaje más rápido que Rust o más orientado a objetos que C++.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Eso no está mal. Alguien tiene que hacerlo.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Sin embargo, en este artículo exploraré en profundidad los mercados verticales: qué son, cómo abordarlos y por qué representan una oportunidad concreta, especialmente considerando que hoy la inteligencia artificial reduce la barrera técnica de entrada de forma significativa.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Hace algunos días, el equipo de Sequoia Capital publicó un ",
          },
          {
            type: "link",
            href: "https://sequoiacap.com/article/services-the-new-software/",
            text: "artículo",
          },
          {
            type: "text",
            text: " en el que argumentan que la próxima compañía de mil millones de dólares será aquella que logre camuflar un software como si fuera un servicio.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Pero esto no es nuevo, al menos no en Latinoamérica, y eso nos otorga una posición adelantada en el tablero.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "En la región, los consumidores ",
          },
          {
            type: "link",
            href: "https://www.revistaeyn.com/empresasymanagement/sector-servicios-de-latinoamerica-continua-creciendo-en-inversiones-AG16452103",
            text: "históricamente",
          },
          {
            type: "text",
            text: " han preferido contratar servicios antes que adquirir productos. Para quienes llevamos años desarrollando software y ofreciendo servicios, eso representa un vector de experiencia que no debería subestimarse.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Para entender por qué esto no es una tendencia reciente, vale la pena recurrir a Clayton Christensen y su libro ",
          },
          {
            type: "emphasis",
            text: "The Innovator’s Dilemma",
          },
          {
            type: "text",
            text: ". La tesis central es que las empresas establecidas fracasan no por incompetencia, sino porque optimizan tan bien para sus mercados actuales que terminan ignorando los mercados emergentes que los rodean. El paralelo con nuestra industria es directo: es fácil quedar atrapado en la profundidad técnica de un ecosistema y perder de vista la cantidad de mercados tradicionales que aún no han sido tocados por el software.",
          },
        ],
      },
      { type: "heading2", text: "¿Qué es un mercado tradicional?" },
      {
        type: "image",
        src: "/blog/afuera-no-adentro-remora.jpg",
        alt: "Pez remora adherido al cuerpo de un tiburón nodriza",
        caption: "La remora no compite con el tiburón: se adhiere y ambas partes ganan.",
        width: 550,
        height: 407,
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "La remora es un pez que se adhiere al cuerpo de tiburones y otras especies de mayor tamaño. No compite con ellos. No los amenaza. Se alimenta de los residuos que generan y a cambio les ofrece limpieza. Es una relación donde ambas partes ganan, y la remora prospera precisamente porque eligió adherirse en lugar de competir.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Esa imagen describe bien lo que es un mercado tradicional y el rol que podemos ocupar en él.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Un mercado tradicional es aquel segmento establecido, maduro y preexistente donde operan empresas convencionales con modelos de negocio probados, crecimiento lineal y bajo riesgo. Son industrias que llevan décadas funcionando: logística, construcción, ganadería, retail local, servicios profesionales.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Como founders de software, podemos adherirnos a estas empresas. Les ofrecemos un servicio que sí conlleva riesgo, que sí apunta a un crecimiento exponencial, pero que se apoya sobre modelos de negocio probados y con retornos ya medibles. No necesitamos inventar el problema. El problema ya existe, ya duele y ya hay alguien dispuesto a pagar para resolverlo.",
          },
        ],
      },
      {
        type: "heading3",
        text: "Esto no es nuevo: el caso del diseño gráfico",
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Quizás ya lo tenemos asumido, pero vale la pena aterrizarlo en un caso concreto: una industria que hoy está profundamente ligada al software, pero que durante décadas operó completamente sin él, y que ya tiene dos referentes con IPO.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "El diseño gráfico y de producto es ese caso.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Durante años, los diseñadores trabajaron con herramientas físicas: papel, lápiz, reglas de escuadra, rotuladores y mesas de luz. El proceso era manual, lento y difícil de iterar. Luego llegó la digitalización y con ella herramientas como CorelDraw y Adobe Illustrator en los años 80 y 90, que trasladaron ese flujo de trabajo a la pantalla sin cambiar demasiado la lógica detrás. Adobe terminó convirtiéndose en el estándar durante décadas con su suite completa, desde Photoshop hasta InDesign, y salió a bolsa en 1986.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Pero el mercado no estaba resuelto. Sketch apareció en 2010 y empezó a desplazar a Adobe en el diseño de interfaces digitales por ser más liviano y enfocado. Luego llegó Figma en 2016, que tomó ese mismo mercado y lo llevó completamente a la nube, añadiendo colaboración en tiempo real y eliminando la fricción de los archivos locales. Figma presentó su IPO en 2025.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Nadie inventó la necesidad de diseñar. Esa necesidad existía desde antes de que hubiera computadores. Lo que cada uno de estos productos hizo fue adherirse a un mercado tradicional, entender sus fricciones y resolverlas con software.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Ese es exactamente el patrón que estamos discutiendo.",
          },
        ],
      },
      { type: "heading2", text: "¿Por qué ahora?" },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Hoy más que nunca, la calidad del código ha dejado de ser la prioridad central. Algunos desarrolladores más puristas señalarán que la deuda técnica eventualmente llega a cobrarse, y no están equivocados. Pero para quien está evaluando entrar a un mercado tradicional con un servicio de software, ese es un precio justo a pagar.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Lo que más importa es entrar al mercado.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "La inteligencia artificial ha comprimido el tiempo entre la idea y el producto funcional de manera que hace algunos años era impensable. Un founder sin equipo puede hoy construir, desplegar y cobrar por un servicio en semanas. Eso cambia el cálculo completamente: el riesgo ya no está en si puedes construirlo, sino en si el mercado lo necesita. Y en los mercados tradicionales, esa segunda pregunta ya tiene respuesta.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Christensen describió la disrupción como un proceso lento y costoso, reservado para empresas con capital y tiempo suficiente para esperar. Esa descripción ya no aplica. Las mismas industrias que él estudió, donde los incumbentes ignoraban las señales porque optimizaban para lo que ya funcionaba, hoy pueden ser intervenidas por un founder con una suscripción a un LLM y claridad sobre el problema que quiere resolver.",
          },
        ],
      },
      { type: "heading2", text: "Cómo reconocerlo y ejecutarlo" },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "No tengo una respuesta científica para saber cuándo estás frente a un mercado tradicional. Personalmente me guío por algo bastante intuitivo: el momento del “yo podría hacer algo mejor”.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Es el instante en que te toca interactuar con el software interno de una empresa tradicional, o con el proceso manual que usan porque nunca nadie les ofreció algo mejor, y como programador sientes que podrías resolverlo de forma más eficiente. Ese pensamiento es la señal. Cuando empiezas a investigar, descubres que las únicas opciones que existen son incumbentes: empresas que llevan décadas operando, con interfaces desactualizadas y sin ningún incentivo real para innovar porque no tienen competencia que los obligue.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Ese es tu momento.",
          },
        ],
      },
      {
        type: "heading3",
        text: "El producto como puerta de entrada, no como destino",
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Lo que viene después es más simple de lo que parece. Crear un producto es cómodo, hay algo satisfactorio en construir una interfaz limpia y una API bien documentada. Pero eso no es lo que el mercado tradicional está comprando.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Sequoia lo plantea directo: por cada dólar que se gasta en software, se gastan seis en servicios. El presupuesto no está en la herramienta, está en el trabajo. Una empresa no quiere pagar por el software que cierra sus libros contables, quiere los libros cerrados.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "La ingenuidad inicial no es un defecto del proceso, es parte de él. Si supieras desde el principio la complejidad real de lo que estás enfrentando, probablemente nunca entrarías. Y los LLMs hacen que esto sea viable para un founder solo: lo que antes requería un equipo operativo detrás del software, hoy puede automatizarse lo suficiente como para comprometerse con el resultado, no solo con la herramienta.",
          },
        ],
      },
      { type: "heading2", text: "Cómo entrar a un mercado que no conoces" },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Hay una contradicción aparente en todo lo que dije hasta acá: si el objetivo es vender un servicio, ¿cómo ofreces un resultado en una industria que no entiendes?",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "La respuesta corta es que no puedes. Y ahí es donde el producto vuelve a tener sentido, pero con un rol distinto.",
          },
        ],
      },
      { type: "heading3", text: "El MVP como excusa para escuchar" },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Cuando entré al mundo automotriz y al de restaurantes no tenía idea de cómo funcionaban por dentro. No sabía cuáles eran sus procesos, dónde estaba la fricción real ni qué estarían dispuestos a pagar. Lo que sí podía hacer era construir algo concreto y llevárselo a alguien del mercado. Un producto, aunque sea básico, te da una excusa para sentarte con un cliente y escucharlo.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Esa es la función real del MVP en un mercado tradicional: no validar si puedes construirlo, sino conseguir acceso a las personas que te van a enseñar cómo funciona la industria.",
          },
        ],
      },
      { type: "heading3", text: "La fricción que está fuera de tu producto" },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Una vez adentro, el trabajo cambia. Ya no estás iterando en base a feedback directo, estás mirando los procesos externos a tu herramienta: qué hace el cliente antes de usarla, qué hace después, dónde pierde tiempo, qué resuelve con otra persona o con un Excel porque tu solución no llega hasta ahí.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Esa fricción que existe fuera de tu producto es donde está el servicio. Y es lo que eventualmente reemplaza al MVP como propuesta de valor.",
          },
        ],
      },
      { type: "heading2", text: "El mapa que usamos tiene bordes" },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "El desarrollador que abre este artículo buscando el subnicho correcto dentro de la programación probablemente va a seguir buscando después de cerrarlo. Eso también está bien. Pero si en algún momento siente que el mapa se agotó, que los nichos técnicos están cada vez más poblados y que diferenciarse dentro del ecosistema cuesta cada vez más, vale la pena recordar que ese mapa solo cubre una fracción pequeña del territorio.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Fue dibujado por desarrolladores, para desarrolladores. Y por definición, excluye todo lo que queda fuera de esa perspectiva.",
          },
        ],
      },
      { type: "heading3", text: "Lo que no aparece en Hacker News" },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "La mayoría de las industrias del mundo no tienen un equivalente de Stack Overflow donde la gente publique sus problemas. No tienen un founder que haya escrito un hilo explicando cómo resolvió su proceso de facturación. No tienen early adopters que ya entiendan el valor de lo que ofreces ni una comunidad que amplifique tu lanzamiento.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Operan con las herramientas que consiguieron hace años, con los procesos que funcionaron cuando eran más chicos, y con la resignación de que así funcionan las cosas en su sector. Nunca van a abrir un issue en GitHub pidiendo que alguien venga a resolverles el problema. Nunca van a publicar en Product Hunt. Ni siquiera saben que su problema tiene solución.",
          },
        ],
      },
      { type: "heading3", text: "La resignación como oportunidad" },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Esa resignación no es un obstáculo. Es la oportunidad.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Cuando una industria lleva décadas operando con las mismas herramientas y los mismos procesos, no es porque sus problemas sean irresolubles. Es porque nadie que supiera resolverlos se tomó el tiempo de mirar hacia allá. El incumbente que domina ese mercado no innova porque no tiene competencia que lo obligue. Y no tiene competencia porque todos los que podrían competir están mirando adentro, buscando el subniche correcto dentro de un ecosistema que ya conocen.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Afuera, en cambio, el desarrollador que llega primero no necesita ser el mejor. Solo necesita ser el que llegó.",
          },
        ],
      },
      { type: "heading3", text: "Afuera siempre estuvo ahí" },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Todo lo que describí en este artículo, el MVP como excusa para escuchar, la fricción fuera del producto como donde está el servicio real, el resultado como propuesta de valor en lugar de la herramienta, apunta a lo mismo: que el trabajo más interesante no está en construir la próxima capa de infraestructura técnica, sino en llevar software a lugares donde todavía no llegó.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Esos lugares no se anuncian. No mandan señales. No tienen una comunidad esperando que alguien los resuelva. Están ahí, funcionando como siempre funcionaron, con la misma resignación de siempre.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            type: "text",
            text: "Y van a seguir estando ahí hasta que alguien decida dejar de mirar adentro el tiempo suficiente como para verlos.",
          },
        ],
      },
    ],
  },
] as const;

export type BlogArticle = (typeof blogArticles)[number];

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}
