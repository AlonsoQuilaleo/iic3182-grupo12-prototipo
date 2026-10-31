// Horario de atención y plazos. Una sola referencia: la entrega estimada y el atraso
// se calculan desde el despacho (hora del pedido, o la próxima apertura si se pidió fuera de horario).

export const HORA_APERTURA = 6; // lunes a viernes, 6:00 a 20:00
export const HORA_CIERRE = 20;
export const PLAZO_MS = 2 * 60 * 60 * 1000; // 2 horas, máximo estipulado por las compañías

// Feriados que caen de lunes a viernes. Lista de prueba: verificar contra el calendario oficial.
const FERIADOS = [
  "2026-01-01", "2026-04-03", "2026-05-01", "2026-05-21", "2026-06-29",
  "2026-07-16", "2026-09-18", "2026-10-12", "2026-12-08", "2026-12-25",
  "2027-01-01", "2027-03-26", "2027-05-21", "2027-06-21", "2027-06-28",
  "2027-07-16", "2027-10-11", "2027-11-01", "2027-12-08",
];

export const isoDia = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const diaHabil = (d) => d.getDay() >= 1 && d.getDay() <= 5 && !FERIADOS.includes(isoDia(d));

export const enHorario = (d) =>
  diaHabil(d) && d.getHours() >= HORA_APERTURA && d.getHours() < HORA_CIERRE;

export function proximaApertura(desde) {
  if (enHorario(desde)) return new Date(desde);
  const d = new Date(desde);
  if (d.getHours() >= HORA_APERTURA) d.setDate(d.getDate() + 1);
  d.setHours(HORA_APERTURA, 0, 0, 0);
  while (!diaHabil(d)) d.setDate(d.getDate() + 1);
  return d;
}

export const hora = (d) =>
  d.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

// Solo la hora, en formato 08:00 AM / 02:30 PM.
export const horaAmPm = (d) => {
  const h = d.getHours() % 12 || 12;
  return `${String(h).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} ${d.getHours() < 12 ? "AM" : "PM"}`;
};

export const diaYHora =(d, referencia) =>
  isoDia(d) === isoDia(referencia)
    ? `hoy a las ${hora(d)}`
    : `el ${d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" })} a las ${hora(d)}`;

// Duración en horas y minutos: «2 horas», «1 hora y 10 minutos», «45 minutos».
export function duracion(ms) {
  const total = Math.round(ms / 60000);
  const h = Math.floor(total / 60), m = total % 60;
  const partes = [];
  if (h) partes.push(`${h} ${h === 1 ? "hora" : "horas"}`);
  if (m || !h) partes.push(`${m} ${m === 1 ? "minuto" : "minutos"}`);
  return partes.join(" y ");
}
