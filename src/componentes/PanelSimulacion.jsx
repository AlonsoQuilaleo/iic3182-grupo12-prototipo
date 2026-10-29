import { useState } from "react";

// No es parte de la interfaz: sirve para probar estados (reloj, etapas y cupón).
const aLocal = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

export default function PanelSimulacion({ reloj, setReloj, cupon, setCupon, puedeAvanzar, onAvanzar, onReiniciar }) {
  const [abierto, setAbierto] = useState(true);
  const sumar = (min) => setReloj(new Date(reloj.getTime() + min * 60000));

  return (
    <aside className={`panel ${abierto ? "" : "cerrado"}`}>
      <button className="panel-titulo" onClick={() => setAbierto(!abierto)} aria-expanded={abierto}>
        Panel de simulación · no es parte de la interfaz {abierto ? "▾" : "▴"}
      </button>
      {abierto && (
        <div className="panel-cuerpo">
          <label>
            Reloj{" "}
            <input
              type="datetime-local"
              value={aLocal(reloj)}
              onChange={(e) => e.target.value && setReloj(new Date(e.target.value))}
            />
          </label>
          <div className="panel-fila">
            <button onClick={() => sumar(30)}>+30 min</button>
            <button onClick={() => sumar(120)}>+2 h</button>
            <button onClick={onAvanzar} disabled={!puedeAvanzar}>Avanzar etapa ▶</button>
          </div>
          <div className="panel-fila">
            <label>
              <input type="checkbox" checked={cupon} onChange={(e) => setCupon(e.target.checked)} /> Tiene cupón
              (adulto mayor o código)
            </label>
            <button onClick={onReiniciar}>Reiniciar</button>
          </div>
        </div>
      )}
    </aside>
  );
}
