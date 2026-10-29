import { ETAPAS } from "../datos.js";
import { Camion, Casa, Check } from "./Iconos.jsx";

// Línea de tiempo vertical: el camión ocupa la parada actual y la casa es la última.
export default function LineaTiempo({ etapas, idx }) {
  return (
    <ol className="linea">
      {etapas.map((e, i) => {
        const clase = i < idx ? "hecho" : i === idx ? "actual" : "pendiente";
        const ultima = i === etapas.length - 1;
        let icono = null;
        if (i < idx) icono = <Check />;
        else if (i === idx) icono = <Camion />;
        else if (ultima) icono = <Casa />;
        return (
          <li key={e} className={clase} aria-current={i === idx ? "step" : undefined}>
            <span className="parada">{icono}</span>
            <span className="nombre">{ETAPAS[e]}</span>
          </li>
        );
      })}
    </ol>
  );
}
