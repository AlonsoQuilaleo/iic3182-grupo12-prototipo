import { useState } from "react";
import { DISTRIBUIDORES, TAMANOS, USUARIO_REGISTRADO } from "../datos.js";

export default function Pedido({ cuenta, pedido, setPedido, onConfirmar }) {
  const guardada = USUARIO_REGISTRADO.ultimoPedido.direccion;
  // El registrado parte con su dirección guardada; «Otra dirección» abre el campo de texto.
  const [otraDireccion, setOtraDireccion] = useState(
    cuenta !== "registrado" || pedido.direccion !== guardada
  );
  const cambiar = (campo, valor) => setPedido({ ...pedido, [campo]: valor });
  const completo = pedido.direccion.trim() && pedido.tamano && pedido.distribuidor && pedido.pago;

  const elegirGuardada = () => {
    setOtraDireccion(false);
    cambiar("direccion", guardada);
  };
  const elegirOtra = () => {
    setOtraDireccion(true);
    cambiar("direccion", "");
  };

  const campoDireccion = (
    <input
      id="direccion"
      className="campo"
      value={pedido.direccion}
      placeholder="Calle, número y comuna"
      onChange={(e) => cambiar("direccion", e.target.value)}
    />
  );

  return (
    <section className="pantalla">
      <h1>Su pedido</h1>

      <div className="tarjeta">
        <label className="etiqueta" htmlFor="direccion">Dirección</label>
        {cuenta === "registrado" ? (
          <div className="pila">
            <button
              className={`opcion ${!otraDireccion ? "elegida" : ""}`}
              aria-pressed={!otraDireccion}
              onClick={elegirGuardada}
            >
              {guardada}
            </button>
            <button
              className={`opcion ${otraDireccion ? "elegida" : ""}`}
              aria-pressed={otraDireccion}
              onClick={elegirOtra}
            >
              Otra dirección
            </button>
            {otraDireccion && campoDireccion}
          </div>
        ) : (
          campoDireccion
        )}
      </div>

      <div className="tarjeta">
        <p className="etiqueta">Tamaño del cilindro</p>
        <div className="opciones-grilla">
          {TAMANOS.map((t) => {
            const ultimo = cuenta === "registrado" && t === USUARIO_REGISTRADO.ultimoPedido.tamano;
            return (
              <button
                key={t}
                className={`opcion ${pedido.tamano === t ? "elegida" : ""}`}
                aria-pressed={pedido.tamano === t}
                onClick={() => cambiar("tamano", t)}
              >
                {t} kg
                {ultimo && <span className="chip chip-bajo">Último pedido</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="tarjeta">
        <p className="etiqueta">Distribuidor</p>
        <div className="pila">
          {DISTRIBUIDORES.map((d) => {
            const habitual = cuenta === "registrado" && d.id === USUARIO_REGISTRADO.distribuidorHabitual;
            return (
              <button
                key={d.id}
                className={`opcion fila ${pedido.distribuidor === d.id ? "elegida" : ""}`}
                aria-pressed={pedido.distribuidor === d.id}
                onClick={() => cambiar("distribuidor", d.id)}
              >
                <span>{d.nombre}</span>
                {habitual && <span className="chip">Habitual</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="tarjeta">
        <p className="etiqueta">Forma de pago</p>
        <div className="pila">
          <button
            className={`opcion ${pedido.pago === "ahora" ? "elegida" : ""}`}
            aria-pressed={pedido.pago === "ahora"}
            onClick={() => cambiar("pago", "ahora")}
          >
            Pagar ahora
          </button>
          <button
            className={`opcion ${pedido.pago === "recibir" ? "elegida" : ""}`}
            aria-pressed={pedido.pago === "recibir"}
            onClick={() => cambiar("pago", "recibir")}
          >
            Pagar al recibir
            <span className="suave"> (efectivo o medio electrónico)</span>
          </button>
        </div>
      </div>

      <button className="boton" disabled={!completo} onClick={onConfirmar}>Confirmar pedido</button>
      {!completo && <p className="nota centrada">Complete los datos para continuar.</p>}
    </section>
  );
}
