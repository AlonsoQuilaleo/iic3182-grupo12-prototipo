// Las respuestas describen el comportamiento del prototipo; el equipo debe revisar su redacción.
const PREGUNTAS = [
  {
    pregunta: "¿Qué hago si mi pedido se atrasa?",
    respuesta:
      "Si el pedido se demora más de 2 horas se mostrará un aviso para contactar directamente a su distribuidor.",
  },
  {
    pregunta: "¿Cómo uso mi descuento o QR?",
    respuesta:
      "Cuando el camión esté frente a su domicilio, la pantalla mostrará su QR y su código. Muéstreselos al chofer.",
  },
  {
    pregunta: "¿Cuál es el horario de atención?",
    respuesta:
      "De lunes a viernes, de 6:00 a 20:00, sin incluir feriados. Si pide fuera de ese horario, la pantalla le indica cuándo se despachará.",
  },
];

export default function Ayuda({ cuenta, contactar, onVolver }) {
  return (
    <section className="pantalla">
      <h1>¿Necesitas ayuda?</h1>

      <div className="tarjeta">
        <h2>Preguntas frecuentes</h2>
        {PREGUNTAS.map((p) => (
          <details key={p.pregunta}>
            <summary>{p.pregunta}</summary>
            <p>{p.respuesta}</p>
          </details>
        ))}
      </div>

      <div className="tarjeta pila">
        <h2>Contacto</h2>
        {cuenta === "registrado" && (
          <button className="boton" onClick={() => contactar("distribuidor")}>
            Llamar a su distribuidor habitual
          </button>
        )}
        <button className="boton secundario" onClick={() => contactar("servicio")}>
          Servicio al cliente
        </button>
      </div>

      <button className="boton secundario" onClick={onVolver}>Volver</button>
    </section>
  );
}
