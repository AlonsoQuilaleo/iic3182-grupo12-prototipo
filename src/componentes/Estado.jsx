import { CODIGO_DESCUENTO, ETAPAS, USUARIO_REGISTRADO, buscarDistribuidor } from "../datos.js";
import { PLAZO_MS, diaYHora, duracion, horaAmPm } from "../horario.js";
import LineaTiempo from "./LineaTiempo.jsx";
import Qr from "./Qr.jsx";
import { LuCheck } from "react-icons/lu";
import { FaTriangleExclamation } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";

export default function Estado({ cuenta, pedido, contactar, seguimiento, reloj, cupon, onCerrarAvisoCupon }) {
  const { etapas, idx, pedidoAt, despachoAt, entregaAt } = seguimiento;
  const actual = etapas[idx];
  // El horario se muestra siempre; la hora de despacho solo si la entrega real supera las 2 horas.
  const entregaMayorAPlazo = entregaAt - pedidoAt > PLAZO_MS;
  const enEspera = ["realizado", "comunicado", "camino"].includes(actual);
  const atrasado = ["comunicado", "camino"].includes(actual) && reloj >= entregaAt;
  const tieneDescuento = cuenta === "invitado" || cupon;
  // Si pagó online, el descuento ya se aplicó al pagar: no hay QR que mostrar al chofer.
  const muestraDescuento = tieneDescuento && pedido.pago === "recibir";
  const avisoCuponAplicado = tieneDescuento && pedido.pago === "ahora" && seguimiento.avisoCupon;
  // Se recalcula con el reloj interno: antes del despacho se muestra el plazo completo.
  const tiempoRestante = reloj < despachoAt ? duracion(PLAZO_MS) : duracion(Math.max(entregaAt - reloj, 0));
  const esHabitual = cuenta === "registrado" && pedido.distribuidor === USUARIO_REGISTRADO.distribuidorHabitual;

  return (
    <section className="pantalla">
      {avisoCuponAplicado && (
        <div className="capa" role="dialog" aria-modal="true" aria-labelledby="titulo-cupon">
          <div className="popup">
            <p className="popup-icono" aria-hidden="true"><LuCheck /></p>
            <p id="titulo-cupon" className="destacado">Cupón de descuento aplicado con éxito</p>
            <button className="boton" onClick={onCerrarAvisoCupon}>Aceptar</button>
          </div>
        </div>
      )}

      <div className="tarjeta">
        <p className="estado-actual">{ETAPAS[actual]}</p>
        {actual === "frente" && <p className="texto-normal">Salga a recibirlo.</p>}
        {actual === "finalizado" && <p className="texto-normal">Su pedido ha sido entregado con éxito.</p>}
      </div>

      <div className="tarjeta">
        <LineaTiempo etapas={etapas} idx={idx} />
      </div>

      {enEspera && (
        <div className="bloque info">
          <p><strong>Tiempo estimado para la entrega:</strong> {tiempoRestante}</p>
          <p>
            <strong>Hora de entrega estimada:</strong> {horaAmPm(entregaAt)}
            {atrasado && <span className="vencida"> (ya pasó)</span>}
          </p>
        </div>
      )}

      <div className="bloque info">
        <p>
          Los horarios de atención son de lunes a viernes de 6:00 a 20:00, sin incluir feriados
          {actual === "realizado" && entregaMayorAPlazo
            ? `, por lo que su pedido será despachado ${diaYHora(despachoAt, reloj)}.`
            : "."}
        </p>
      </div>

      {atrasado && (
        <div className="bloque alerta" role="alert">
          <p className="titulo-alerta"><FaTriangleExclamation className="icono-alerta" aria-hidden="true" /> Su pedido se encuentra atrasado</p>
          <p>Puede contactar directamente a su distribuidor para reportar este atraso.</p>
          <button className="boton" onClick={() => contactar("distribuidor", pedido.distribuidor)}>
            Llamar a {buscarDistribuidor(pedido.distribuidor).nombre}
          </button>
        </div>
      )}

      {actual === "camino" && muestraDescuento && (
        <div className="bloque discreto">
          <p>Aquí tiene su código de descuento:</p>
          <p className="codigo">{CODIGO_DESCUENTO}</p>
        </div>
      )}

      {actual === "frente" && muestraDescuento && (
        <div className="bloque info">
          <p>Muestre este QR o código de descuento al chofer para acceder a estos beneficios.</p>
          <div className="qr">
            <Qr />
            <span className="codigo grande">{CODIGO_DESCUENTO}</span>
          </div>
        </div>
      )}

      {actual === "frente" && pedido.pago === "recibir" && (
        <div className="bloque recordatorio">
          <p><MdNotificationsActive className="icono-recordatorio" aria-hidden="true" /> <strong>Recordatorio:</strong> Pagar el pedido con el chofer.</p>
        </div>
      )}

      {actual === "finalizado" && (
        <div className="bloque alerta" role="alert">
          <p>Si usted no fue quien recibió el pedido, por favor comuníquese con servicio al cliente.</p>
          <button className="boton" onClick={() => contactar("servicio")}>Contactar a servicio al cliente</button>
        </div>
      )}

      <details className="tarjeta resumen">
        <summary>Resumen del pedido</summary>
        <dl>
          <dt>Cilindro</dt><dd>{pedido.tamano} kg</dd>
          <dt>Dirección</dt><dd>{pedido.direccion}</dd>
          <dt>Distribuidor</dt>
          <dd>
            {buscarDistribuidor(pedido.distribuidor).nombre}
            {esHabitual && <span className="chip">Habitual</span>}
          </dd>
          <dt>Pago</dt><dd>{pedido.pago === "ahora" ? "Pagado online" : "Pagará al recibir"}</dd>
        </dl>
      </details>
    </section>
  );
}
