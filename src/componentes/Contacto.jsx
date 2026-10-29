import { useState } from "react";
import { SERVICIO_CLIENTE, USUARIO_REGISTRADO, buscarDistribuidor } from "../datos.js";

// Pantallas ficticias: el contacto real está fuera del alcance del prototipo.
export default function Contacto({ tipo, distribuidor, onVolver }) {
  // Sin distribuidor indicado (inicio y ayuda), se llama al habitual del usuario registrado.
  const llamado = buscarDistribuidor(distribuidor ?? USUARIO_REGISTRADO.distribuidorHabitual);
  const [avisoWhatsapp, setAvisoWhatsapp] = useState(false);
  return (
    <section className="pantalla">
      <div className="tarjeta centrada pila">
        {tipo === "distribuidor" ? (
          <>
            <h1>Llamando a {llamado.nombre}</h1>
            <p className="suave">{llamado.telefono}</p>
          </>
        ) : (
          <>
            <h1>Bienvenido a servicio al cliente</h1>
            <p className="suave">{SERVICIO_CLIENTE.telefono}</p>
            <button className="boton whatsapp" onClick={() => setAvisoWhatsapp(true)}>
              Escribir por WhatsApp
            </button>
            {avisoWhatsapp && (
              <p className="advertencia" role="status">Esto es una maqueta, no se abrirá WhatsApp realmente.</p>
            )}
          </>
        )}
        <p className="advertencia">Vista fuera del alcance del prototipo</p>
      </div>
      <button className="boton secundario" onClick={onVolver}>Volver</button>
    </section>
  );
}
