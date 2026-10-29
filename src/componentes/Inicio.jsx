import { USUARIO_REGISTRADO, buscarDistribuidor } from "../datos.js";

// Decisión 1: el proveedor habitual aparece en el inicio, con «Pedir gas» y «Llamar».
export default function Inicio({ onPedir, contactar }) {
  const habitual = buscarDistribuidor(USUARIO_REGISTRADO.distribuidorHabitual);
  return (
    <section className="pantalla">
      <h1>Hola</h1>
      <div className="tarjeta">
        <p className="etiqueta">Su distribuidor habitual</p>
        <p className="destacado">{habitual.nombre}</p>
        <p className="suave">{habitual.telefono}</p>
        <div className="fila-botones">
          <button className="boton" onClick={onPedir}>Pedir gas</button>
          <button className="boton secundario" onClick={() => contactar("distribuidor")}>Llamar</button>
        </div>
      </div>
    </section>
  );
}
