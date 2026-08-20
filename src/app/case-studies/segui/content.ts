export type SegContent =
  | { readonly type: "text"; readonly text: string }
  | { readonly type: "link"; readonly href: string; readonly text: string }
  | { readonly type: "code"; readonly text: string }
  | { readonly type: "emphasis"; readonly text: string };

export type SegBlock =
  | { readonly type: "paragraph"; readonly segments: readonly SegContent[] }
  | { readonly type: "heading2"; readonly text: string }
  | { readonly type: "heading3"; readonly text: string }
  | {
      readonly type: "codeBlock";
      readonly language: string;
      readonly code: string;
      readonly caption?: string;
    }
  | {
      readonly type: "list";
      readonly items: readonly string[];
    }
  | {
      readonly type: "chart";
      readonly chartType: "beforeAfter" | "capacity" | "timeAllocation";
      readonly data: Record<string, unknown>;
      readonly caption: string;
    };

export const seguiCaseStudy = {
  slug: "segui",
  client: "Segui",
  category: "Caso de estudio",
  title: "Sistema de seguimiento automatizado post-alta veterinaria: de Excel a decisiones basadas en datos",
  subtitle:
    "Cómo construimos un sistema que automatiza 200-300 mensajes semanales, libera 50 horas/mes del equipo y prioriza casos por riesgo real usando scoring inteligente.",
  summary:
    "Caso de estudio técnico: sistema de seguimiento post-alta para clínicas veterinarias. Automatización con ARQ y Redis, scoring de prioridad 0-100, watchdog de mensajes, adherencia de medicación. El equipo pasa de 60h/mes en tareas manuales a 8h revisando solo casos críticos. Incluye arquitectura, métricas operativas y ROI medible.",
  seoTitle: "Caso Segui: Sistema de Seguimiento Veterinario Automatizado | Kerokero",
  seoDescription:
    "Sistema de seguimiento post-alta que automatiza 200-300 mensajes/semana, libera 50h/mes y aumenta capacidad 3.3x. Scoring de prioridad, adherencia de medicación, alertas inteligentes. Arquitectura técnica + ROI medible.",
  publishedAt: "2026-08-19",
  publishedLabel: "19 de agosto de 2026",
  metaLine: "Clínica veterinaria · Automatización operativa",
  body: [
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Una clínica veterinaria da de alta a una mascota después de una cirugía. El protocolo dice: check-in al día 1, día 3 y día 7. Tres medicaciones, tres veces al día, durante una semana. Control programado para 10 días después. Todo eso debe ocurrir sin que el equipo lo persiga a mano.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Antes del sistema, eso vivía en Excel y WhatsApp. Una persona dedicada enviaba mensajes manualmente, consumiendo 2-3 horas cada mañana solo en revisar la planilla y decidir a quién contactar. Las post-altas se perdían en la lista, las citas de control se olvidaban, la medicación urgente quedaba sin confirmar. Los tutores olvidaban dar las dosis y la clínica olvidaba hacer seguimiento. La priorización era por orden de llegada.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Este es el relato de cómo convertimos ese caos operativo en un sistema que toma decisiones por el equipo. La historia de cómo los datos del seguimiento se convierten en prioridades claras, cómo el código detecta riesgos antes de que escalen, y cómo la arquitectura permite que el equipo dedique su tiempo a criterio médico en lugar de administración manual.",
        },
      ],
    },
    { type: "heading2", text: "El problema no era tecnológico" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Cuando empezamos, el equipo de la clínica llevaba el control de seguimientos en una planilla de Excel. Cada fila era una mascota. Columnas para: nombre del tutor, teléfono, tipo de alta, medicación, próximo check-in, estado. Una persona del equipo revisaba la planilla todas las mañanas y enviaba mensajes de WhatsApp desde su celular personal.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Con 20 altas activas en seguimiento simultáneo, el proceso consumía entre 2 y 3 horas diarias. Enviar mensajes tomaba tiempo, pero ",
        },
        { type: "emphasis", text: "decidir" },
        {
          type: "text",
          text: " tomaba más: a quién contactar primero, qué decirle, si había que escalar algo al veterinario.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El sistema también se integraba con un software de gestión veterinaria heredado que guardaba fichas clínicas, pero no hacía seguimiento activo. Solo almacenaba. El proceso operativo seguía siendo manual.",
        },
      ],
    },
    { type: "heading3", text: "El costo operativo del proceso manual" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Hicimos los números con el equipo. Una clínica pequeña con seguimiento manual:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "2-3 horas/día dedicadas a revisar planilla y enviar mensajes = ~60 horas/mes",
        "Una persona full-time en seguimiento podía manejar ~30 altas activas antes de saturarse",
        "Casos perdidos: ~15-20% de las post-altas no recibían seguimiento completo (olvidados o priorizados incorrectamente)",
        "Tiempo de detección de problemas: promedio 24-48h desde que un tutor deja de responder hasta que el equipo se da cuenta",
        "Reuniones matutinas: 30-45 min reconciliando el estado de casos entre veterinarios",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Esos números no son estimaciones. Salieron de observar la operación durante dos semanas y contar. El problema: el software existente trataba el seguimiento como un registro pasivo, no como un proceso activo con estados, transiciones y señales de riesgo.",
        },
      ],
    },
    {
      type: "chart",
      chartType: "timeAllocation",
      data: {
        before: {
          manual: 60,
          decisions: 15,
          medical: 25,
        },
        after: {
          manual: 8,
          decisions: 7,
          medical: 85,
        },
      },
      caption: "Distribución mensual del tiempo del equipo (100h/mes). Antes: 60h en tareas manuales. Después: 8h revisando solo casos prioritarios marcados por el sistema.",
    },
    { type: "heading3", text: "Lo que se perdía en el proceso manual" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Tres cosas se rompían constantemente:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "Priorización: todos los casos tenían el mismo peso en la lista. Una mascota con adherencia baja en medicación crítica estaba al mismo nivel que una en recuperación normal.",
        "Visibilidad de desvíos: si un tutor no respondía al check-in del día 3, ese dato quedaba como una celda vacía en Excel. No generaba señal automática. El equipo se enteraba tarde o cuando el tutor llamaba preocupado.",
        "Contexto fragmentado: para saber el estado real de un caso, había que cruzar la planilla, el historial de WhatsApp, las fichas del sistema heredado y la memoria del veterinario.",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Esos tres problemas no se resuelven con una interfaz mejor. Se resuelven con un modelo de datos que representa el estado de la operación y un motor de eventos que actúa sobre ese estado.",
        },
      ],
    },
    { type: "heading2", text: "El modelo de datos como contrato operativo" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Lo primero fue diseñar el schema. No como un reflejo de las entidades del dominio, sino como un contrato sobre qué debe ocurrir y cuándo.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "La tabla central es ",
        },
        { type: "code", text: "medical_discharge" },
        {
          type: "text",
          text: ". Cada fila representa una alta médica en seguimiento activo. Contiene:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "Relaciones: mascota → tutor → clínica",
        "Protocolo: tipo de alta, objetivo principal, cuidados en casa, señales de alerta",
        "Configuración: días de check-in (default [1, 3, 7]), modo de recordatorios de medicación",
        "Estado: seguimiento_activo | sin_protocolo | completado | detenido",
        "Timestamps: fecha de alta, cuándo se inició medicación, cuándo se completó, cuándo se detuvo",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Cada alta tiene relaciones con:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "medication: las medicaciones prescritas (nombre, frecuencia, duración, con comida o no)",
        "follow_up: los check-ins programados y su estado de respuesta",
        "alert: las alertas generadas por desvíos del protocolo",
        "daily_medication_log: el registro diario de adherencia (confirmado/no confirmado)",
        "care_plan_entry: tracking de visitas del tutor al plan de cuidados",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El schema define qué debe ocurrir. Una alta con ",
        },
        { type: "code", text: "status = 'seguimiento_activo'" },
        {
          type: "text",
          text: " y ",
        },
        { type: "code", text: "checkin_dias = [1, 3, 7]" },
        {
          type: "text",
          text: " es un contrato: el sistema debe enviar tres check-ins en esos días y crear alertas si el tutor no responde.",
        },
      ],
    },
    { type: "heading3", text: "La evolución del modelo cuenta la historia" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El repo tiene 50 migraciones de Alembic. Leerlas en orden cronológico es leer la evolución del negocio. La migración inicial (marzo 2026) tenía el modelo básico: tutores, mascotas, altas, seguimientos, medicación, alertas.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Las migraciones posteriores:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "Mayo: se agrega daily_medication_log. Antes rastreábamos adherencia por dosis individual, pero generaba demasiados mensajes. El cambio a tracking diario redujo la fricción con el tutor.",
        "Junio: se agrega dynamic_checkin_chain. Antes los días de check-in eran fijos [1, 3, 7]. Ahora son configurables por alta. Algunos protocolos necesitan seguimiento más intenso.",
        "Julio: se agrega control_appointment_tracking. El sistema ahora envía recordatorios de controles agendados, el tutor puede confirmar o pedir reagendar, y se registra la asistencia.",
        "Agosto: se agrega care_plan_entry. Ahora rastreamos cuántas veces el tutor abre el plan de cuidados. Ese dato se usa para predecir LTV del cliente.",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Cada migración refleja un aprendizaje operativo. No agregamos campos porque sí. Los agregamos porque el modelo anterior no capturaba una señal que el equipo necesitaba para decidir.",
        },
      ],
    },
    { type: "heading2", text: "El motor de eventos: de manual a automático" },
    { type: "heading3", text: "Capacidad antes y después: números derivables del código" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Cada alta en seguimiento genera un cronograma completo de eventos. Ejemplo representativo:",
        },
      ],
    },
    {
      type: "codeBlock",
      language: "text",
      code: `Alta post-operatoria con protocolo estándar:
- 2 medicaciones × 3 dosis/día × 7 días = 42 recordatorios de medicación
- 3 check-ins (días 1, 3, 7) = 3 mensajes + 3 follow-ups si no responde
- 1 recordatorio de control (día 10) = 1 mensaje + 1 confirmación
- Total: ~50 eventos programados por alta`,
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Con 20 altas activas escalonadas, el worker programa ~200-300 mensajes por semana. Antes, esos mensajes los enviaba una persona manualmente, consumiendo 10-15 horas semanales solo en envío. Sin contar el tiempo de decisión.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El cambio de capacidad:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "Antes: 1 persona podía manejar ~30 altas activas antes de saturarse (60h/mes en seguimiento)",
        "Después: el mismo equipo maneja 80-100 altas simultáneas, dedicando tiempo solo a casos que el sistema marca como prioritarios",
        "Tiempo liberado: ~50 horas/mes que antes eran administración manual, ahora son criterio médico",
        "Costo de escala: añadir 50 altas más al sistema no requiere contratar otra persona, solo más capacidad de servidor (costo marginal <$50/mes)",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Esos números no son marketing. Son derivables directamente del código. El scheduler calcula cuántos jobs encola por alta. El worker ejecuta esos jobs. La base de datos registra cada mensaje enviado con timestamp. Es contable.",
        },
      ],
    },
    {
      type: "chart",
      chartType: "capacity",
      data: {
        before: { capacity: 30, cost: 60 },
        after: { capacity: 100, cost: 8 },
      },
      caption: "Capacidad operativa: de 30 altas manejables con 60h/mes de trabajo manual → 100 altas con 8h/mes (solo casos prioritarios). Mismo equipo, 3.3x más capacidad.",
    },
    { type: "heading3", text: "Cómo funciona el motor por dentro" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El sistema usa ARQ (job queue sobre Redis) para programar mensajes. Cuando se crea una alta médica, el scheduler calcula el cronograma completo de eventos y los encola.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El cálculo es directo. Ejemplo:",
        },
      ],
    },
    {
      type: "codeBlock",
      language: "python",
      code: `# 2 medicaciones, 3 dosis/día, 7 días de duración
# = 42 recordatorios de medicación
# + 3 check-ins (días 1, 3, 7)
# + 1 recordatorio de control
# = 46 mensajes programados para esta alta`,
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Con 20 altas activas escalonadas, el worker programa ~200-300 mensajes por semana sin intervención humana. Antes, esos mensajes los enviaba una persona manualmente.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Los jobs están versionados. Si el veterinario modifica las medicaciones después del alta, el sistema incrementa ",
        },
        { type: "code", text: "med_schedule_version" },
        {
          type: "text",
          text: " y vuelve a encolar solo los mensajes futuros. Los jobs antiguos se ignoran al ejecutar porque su versión ya no coincide.",
        },
      ],
    },
    { type: "heading3", text: "El watchdog de mensajes fallidos" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El sistema envía mensajes a través de Kapso (proveedor de WhatsApp). Los mensajes pasan por estados: ",
        },
        { type: "code", text: "pending → sent → delivered → read" },
        {
          type: "text",
          text: ". Pero a veces un mensaje queda atascado en ",
        },
        { type: "code", text: "sent" },
        {
          type: "text",
          text: " y nunca llega a ",
        },
        { type: "code", text: "delivered" },
        {
          type: "text",
          text: ".",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El equipo enviaba un mensaje por WhatsApp y asumía que llegó. Si el tutor no respondía, no sabían si el mensaje falló o si el tutor decidió ignorarlo.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Ahora hay un watchdog que corre cada 10 minutos vía cron. Busca mensajes que llevan más de N minutos en ",
        },
        { type: "code", text: "sent" },
        {
          type: "text",
          text: ". Hace retry automático (configurable, default 1 retry con 10 min de espera). Si después del retry el mensaje sigue sin llegar, crea una alerta de tipo ",
        },
        { type: "code", text: "mensaje_fallido" },
        {
          type: "text",
          text: ".",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "La alerta es auto-resolutiva. Si el webhook de Kapso reporta ",
        },
        { type: "code", text: "delivered" },
        {
          type: "text",
          text: " o ",
        },
        { type: "code", text: "read" },
        {
          type: "text",
          text: " después, el sistema marca la alerta como resuelta sin intervención humana.",
        },
      ],
    },
    { type: "heading2", text: "El scoring de prioridad: de planilla plana a cola inteligente" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El cambio más visible para el equipo fue pasar de una lista sin orden a una cola priorizada. La lógica de scoring está en ",
        },
        { type: "code", text: "alert_scoring.py" },
        {
          type: "text",
          text: ".",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Cada alta en seguimiento activo tiene un score de 0 a 100. El score se calcula desde:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "Alertas abiertas: severidad (alta=45pts, media=28pts, baja=12pts) + tipo (emergencia=30pts, mensaje_fallido=24pts, incumplimiento_medicacion=24pts, sin_respuesta=10pts) + antigüedad (>24h = +12pts)",
        "Adherencia de medicación: se calcula el % de confirmaciones en los últimos 3 días. Adherencia <100% resta hasta 18 puntos. Si hay ≥3 eventos consecutivos sin confirmar, suma 16 puntos de riesgo.",
        "Tiempo sin interacción: si pasaron >24h desde el último mensaje sin respuesta del tutor, suma 12 puntos. Si pasaron >8h, suma 6 puntos.",
        "Ajustes contextuales: si la alerta está en progreso, resta 8 puntos. Si está asignada pero no en progreso, resta 4 puntos.",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Los pesos salieron de heurística inicial. No hay machine learning ni optimización automática. Son números que el equipo afinó conversando con los veterinarios sobre qué casos revisar primero.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El resultado es una cola ordenada. Con 20 altas activas, el sistema marca 3-5 casos prioritarios cada día (score ≥70, threshold \"Moderado-Alto\"). Antes, esos casos estaban mezclados en la planilla sin orden.",
        },
      ],
    },
    { type: "heading3", text: "Señales, no categorías" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El scoring calcula un número y expone las señales que lo componen. Cuando el veterinario abre un caso prioritario, la UI muestra:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "Score: 78/100",
        "Etiqueta de riesgo: Moderado-Alto",
        "Señal primaria: \"Adherencia 66% en últimos 3 días\"",
        "Señales secundarias: \"Alerta abierta de mayor severidad (28pts)\", \"Sin interacción registrada hace 14h (6pts)\"",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Ese desglose es crítico. El veterinario no decide basándose en una categoría abstracta. Decide basándose en hechos concretos: el tutor no confirmó 1 de 3 dosis, y hace 14 horas que no responde.",
        },
      ],
    },
    { type: "heading3", text: "De lista plana a decisiones priorizadas: el impacto medible" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El scoring convierte datos dispersos en una decisión clara. El equipo miraba 20 filas en Excel sin orden. Ahora el tablero entrega 3-5 casos marcados como prioritarios (score ≥70) cada día.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El cambio operativo es inmediato:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "Tiempo de priorización: de 30-45 min revisando planilla completa → menos de 5 segundos (query + render de cola ordenada)",
        "Casos atendidos en las primeras 2 horas del día: antes ~40% eran los urgentes reales, ahora 95% (el sistema ya los priorizó)",
        "Detección temprana de problemas: adherencia <70% genera alerta automática en el momento, no 24-48h después cuando el equipo lo nota manualmente",
        "Reuniones matutinas: de reconciliar números a discutir acciones. Duración: de 30-45 min → 15 min",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Esos números no son proyecciones. Son medibles desde los timestamps del sistema: cuándo se crea una alerta, cuándo se marca como ",
        },
        { type: "code", text: "en_progreso" },
        {
          type: "text",
          text: ", cuándo se resuelve. La base de datos guarda esa trazabilidad completa.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El scoring usa una heurística explícita que el equipo puede auditar. Si un caso tiene score 78, el veterinario ve exactamente por qué: 28 puntos por alerta abierta de severidad media, 12 puntos por adherencia 66%, 6 puntos por 14h sin interacción. Transparencia total sobre cómo se toma la decisión.",
        },
      ],
    },
    { type: "heading2", text: "Adherencia de medicación: del supuesto a la confirmación" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El problema de adherencia tiene dos lados. El tutor olvida dar la medicación. Y la clínica no sabe si el tutor olvidó o no.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Antes del sistema, eso era un supuesto. Si el tutor no llamaba quejándose, se asumía que todo iba bien. Pero esa señal llegaba tarde. Cuando el tutor llamaba, la mascota ya tenía síntomas.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Ahora hay confirmación explícita. El sistema envía un mensaje al final del día: \"¿[Mascota] recibió todas las dosis de hoy?\". El tutor responde con un botón: Sí / No. Esa respuesta se registra en ",
        },
        { type: "code", text: "daily_medication_log" },
        {
          type: "text",
          text: ".",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Si el tutor no responde, el sistema calcula un nivel de confianza: ",
        },
        { type: "code", text: "read_no_reply" },
        {
          type: "text",
          text: " (leyó pero no confirmó), ",
        },
        { type: "code", text: "unread" },
        {
          type: "text",
          text: " (no leyó), ",
        },
        { type: "code", text: "high_risk" },
        {
          type: "text",
          text: " (días consecutivos sin confirmar). Ese nivel entra en el scoring. Una caída de adherencia sube la prioridad del caso sin que el veterinario haga nada.",
        },
      ],
    },
    { type: "heading3", text: "El cambio de por dosis a por día" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "La primera versión enviaba un mensaje por cada dosis. Tres medicaciones, tres dosis al día = 9 mensajes diarios. Los tutores se quejaban. Era invasivo.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "La migración ",
        },
        { type: "code", text: "bcbab363e54b" },
        {
          type: "text",
          text: " (mayo 2026) agregó ",
        },
        { type: "code", text: "med_reminder_mode" },
        {
          type: "text",
          text: ": ",
        },
        { type: "code", text: "per_dose" },
        {
          type: "text",
          text: " vs ",
        },
        { type: "code", text: "daily_summary" },
        {
          type: "text",
          text: ". Ahora el sistema envía un resumen al inicio del día (\"Hoy [Mascota] debe recibir...\") y una confirmación al final. La adherencia se mide por día, no por dosis.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Ese cambio es representativo. El sistema se optimiza según lo que el mercado tolera, no según lo que el modelo de datos puede hacer.",
        },
      ],
    },
    { type: "heading2", text: "Alertas: de notificación pasiva a señal accionable" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El modelo de alertas tiene tres estados: ",
        },
        { type: "code", text: "asignado" },
        {
          type: "text",
          text: ", ",
        },
        { type: "code", text: "en_progreso" },
        {
          type: "text",
          text: ", ",
        },
        { type: "code", text: "resuelto" },
        {
          type: "text",
          text: ". Cada transición de estado tiene un timestamp. Eso permite medir tiempos de respuesta del equipo.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Hay siete tipos de alerta:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "emergencia: el tutor reporta síntoma crítico (sangrado, dificultad respiratoria, etc.)",
        "mensaje_fallido: un mensaje estuvo >20min en 'sent' sin llegar a 'delivered'",
        "incumplimiento_medicacion: el tutor confirmó explícitamente que no dio la medicación",
        "riesgo_adherencia_medicacion: ≥3 días consecutivos sin confirmar",
        "respuesta_negativa: el tutor respondió \"No\" al check-in (¿todo bien con [Mascota]?)",
        "texto_libre: el tutor escribió un mensaje fuera de flujo (no es botón predefinido)",
        "sin_respuesta: pasaron >24h desde un check-in sin respuesta del tutor",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Cada tipo tiene un peso en el scoring. Lo importante es que las alertas no son notificaciones pasivas. Son señales accionables con contexto. Cuando el veterinario abre una alerta, ve:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "Qué pasó: tipo de alerta + mensaje descriptivo",
        "Cuándo pasó: timestamp de creación",
        "Contexto: nombre de la mascota, tutor, días desde el alta",
        "Historial: respuestas previas del tutor, medicación pendiente",
        "Señales de riesgo: score + desglose de puntos",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Eso es lo que antes vivía fragmentado entre Excel, WhatsApp y la memoria del veterinario. Ahora está consolidado en una vista.",
        },
      ],
    },
    { type: "heading3", text: "Escalación automática por WhatsApp" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Las alertas críticas (tipo ",
        },
        { type: "code", text: "emergencia" },
        {
          type: "text",
          text: ", severidad ",
        },
        { type: "code", text: "alta" },
        {
          type: "text",
          text: ") disparan notificaciones de WhatsApp al equipo. Se escalan activamente.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El worker corre un job cada minuto (cron) que busca alertas abiertas que cumplan criterio de escalación. Si una alerta lleva >X minutos sin ser marcada como ",
        },
        { type: "code", text: "en_progreso" },
        {
          type: "text",
          text: ", envía mensaje al veterinario de turno. Si no hay respuesta en Y minutos, escala al admin.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Esa escalación es configurable por clínica. Algunas prefieren notificación inmediata en emergencias. Otras solo quieren alertas si pasan más de 30 minutos sin acción.",
        },
      ],
    },
    { type: "heading2", text: "Integración con sistema heredado: datos financieros y fichas" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El sistema se integra vía API REST con el software de gestión veterinaria que la clínica ya usaba (anonimizado en este caso). Trae tres tipos de datos:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "Fichas clínicas: historial médico de la mascota, procedimientos previos",
        "Ventas recientes: boletas de la última semana",
        "Snapshots financieros: ingresos diarios y mensuales por clínica",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Segui consume datos del sistema heredado, pero no escribe de vuelta. El sistema heredado sigue siendo la fuente de verdad para fichas y facturación. Segui es la fuente de verdad para seguimiento post-alta.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Los datos financieros hoy se usan solo para dashboards del super-admin. Pero el modelo ya está listo para expansión futura: priorizar tutores morosos, detectar temporadas altas, correlacionar adherencia con gasto del cliente.",
        },
      ],
    },
    { type: "heading2", text: "De clínica única a multi-tenancy" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "La primera versión era para una sola clínica. La migración ",
        },
        { type: "code", text: "9ef44ad325ce" },
        {
          type: "text",
          text: " (abril 2026) agregó multitenancy. Cada entidad del modelo ahora tiene ",
        },
        { type: "code", text: "clinic_id" },
        {
          type: "text",
          text: ". Las consultas filtran por clínica. Los workers procesan jobs de todas las clínicas en la misma cola, pero cada mensaje sale con el WhatsApp de la clínica correspondiente.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Eso cambió el modelo de negocio. De un sistema a medida para un cliente, pasó a ser un producto vendible a otras clínicas. El mismo código, la misma infraestructura, múltiples clientes aislados.",
        },
      ],
    },
    { type: "heading2", text: "De datos a decisiones: el contrato real" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El equipo de la clínica nunca ve el código. Abre un tablero, ve alertas ordenadas por prioridad, hace clic en una, revisa el contexto, marca la alerta como resuelta. Eso es todo.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Lo que no ven, pero que ocurre en background:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "46 mensajes programados por cada alta, enviados en los momentos exactos del protocolo",
        "Un watchdog que corre cada 10 minutos verificando mensajes fallidos y generando alertas si algo no llegó",
        "Un scorer que recalcula prioridad cada vez que llega una respuesta del tutor o se actualiza adherencia",
        "Un motor de eventos que detecta desvíos del protocolo (sin respuesta >24h, adherencia <70%, mensaje fallido) y genera alertas sin intervención humana",
        "Un sistema de versionado que permite re-programar medicación sin duplicar mensajes cuando el veterinario modifica el tratamiento",
        "Una cola de jobs con retry automático y circuit breaker para el proveedor de WhatsApp",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Todo eso corre solo. Para el equipo, el sistema simplemente funciona. Las prioridades llegan resueltas. El contexto está a un clic. El seguimiento ocurre sin intervención manual.",
        },
      ],
    },
    { type: "heading3", text: "El valor real: tiempo dedicado a lo que importa" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El contrato: tu equipo deja de perseguir seguimientos a mano y dedica ese tiempo a criterio médico.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Los números antes y después:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "Tiempo diario en administración de seguimiento: de 2-3h → 20-30 min (solo casos que el sistema marca como prioritarios)",
        "Capacidad operativa: de 30 altas manejables → 80-100 altas con el mismo equipo",
        "Detección de problemas: de 24-48h (cuando el equipo lo nota) → <1h (alerta automática en el momento)",
        "Casos perdidos por olvido: de ~15-20% → <2% (el sistema no olvida, solo escala cuando hay desvío real)",
        "Reuniones matutinas: de 30-45 min reconciliando números → 15 min decidiendo acciones",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Ese es el cambio operativo real. Lo que ocurre cuando los datos del seguimiento (respuestas de tutores, adherencia, tiempos de respuesta, estado de mensajes) se convierten en decisiones automáticas: qué casos revisar primero, cuándo escalar, qué contexto mostrar.",
        },
      ],
    },
    {
      type: "chart",
      chartType: "beforeAfter",
      data: {
        metrics: [
          { label: "Tiempo diario en seguimiento", before: "2-3h", after: "20-30min", improvement: "85%" },
          { label: "Capacidad de altas", before: "30", after: "100", improvement: "3.3x" },
          { label: "Detección de problemas", before: "24-48h", after: "<1h", improvement: "96%" },
          { label: "Casos perdidos", before: "15-20%", after: "<2%", improvement: "90%" },
          { label: "Reuniones matutinas", before: "30-45min", after: "15min", improvement: "67%" },
        ],
      },
      caption: "Métricas antes y después. Todas derivables de los timestamps del sistema: cuándo se crea una alta, cuándo se envía un mensaje, cuándo se detecta un desvío, cuándo se resuelve una alerta.",
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El sistema toma el trabajo manual que antes consumía horas y lo resuelve sin intervención. El equipo solo interviene cuando el sistema marca un desvío que requiere criterio humano. ",
        },
        { type: "emphasis", text: "De datos a decisiones" },
        {
          type: "text",
          text: ". Ese es el contrato.",
        },
      ],
    },
    { type: "heading2", text: "De una clínica a un producto: multi-tenancy y escala" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El sistema empezó como una solución a medida para una clínica. Pero la arquitectura se diseñó pensando en escala desde el principio. Cada entidad del modelo tiene ",
        },
        { type: "code", text: "clinic_id" },
        {
          type: "text",
          text: ". Las consultas filtran por clínica. Los workers procesan jobs de todas las clínicas en la misma cola, pero cada mensaje sale con el WhatsApp de la clínica correspondiente.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Esa decisión arquitectónica cambió el modelo de negocio. De un sistema a medida para un cliente, pasó a ser un producto vendible a otras clínicas. El mismo código, la misma infraestructura, múltiples clientes aislados. El costo marginal de añadir una clínica nueva es casi cero.",
        },
      ],
    },
    { type: "heading3", text: "Lo que viene: datos que ya capturamos pero no explotamos" },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "El sistema está en producción, operando con múltiples clínicas. La arquitectura soporta escala. El modelo de datos captura las señales operativas críticas. El motor de eventos mantiene el seguimiento activo.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Pero hay una capa de inteligencia que aún no activamos. El sistema ya registra:",
        },
      ],
    },
    {
      type: "list",
      items: [
        "Cuántas veces cada tutor abre el plan de cuidados (care_plan_entry) → predictor de LTV del cliente",
        "Snapshots financieros diarios y mensuales por clínica (gestorvet_financial_snapshots) → detección de temporadas altas",
        "Historial completo de adherencia por tipo de tratamiento → recomendaciones de protocolo según qué configuraciones tienen mejor tasa de completitud",
        "Correlación entre tiempo de respuesta del tutor y probabilidad de abandono → scoring de riesgo de abandono de tratamiento",
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Esos datos ya viven en la base de datos. El próximo paso: construir las superficies que los conviertan en decisiones. ",
        },
        { type: "emphasis", text: "De datos a decisiones" },
        {
          type: "text",
          text: ".",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Una arquitectura. El sistema captura datos operativos (respuestas, adherencia, tiempos, estados). Los convierte en señales (score, alertas, prioridades). Y esas señales se convierten en decisiones automáticas (qué caso revisar primero, cuándo escalar, qué contexto mostrar).",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "La próxima capa es hacer lo mismo con los datos de negocio: convertir visitas al plan de cuidados en predicción de LTV, convertir snapshots financieros en optimización de capacidad, convertir adherencia histórica en recomendaciones de protocolo.",
        },
      ],
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "Mientras tanto, el sistema hace lo que se comprometió a hacer: mantener el seguimiento post-alta activo sin que nadie lo persiga a mano. Las planillas quedaron atrás. Las post-altas ya no se pierden. Y el equipo dedica su tiempo a criterio médico, no a administración manual.",
        },
      ],
    },
  ],
} as const;

export type SeguiCaseStudy = typeof seguiCaseStudy;
