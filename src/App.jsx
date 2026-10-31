import { useState } from "react";
import { MdPropaneTank } from "react-icons/md";
import { USUARIO_REGISTRADO } from "./datos.js";
import { PLAZO_MS, proximaApertura } from "./horario.js";
import Entrada from "./componentes/Entrada.jsx";
import Inicio from "./componentes/Inicio.jsx";
import Pedido from "./componentes/Pedido.jsx";
import Estado from "./componentes/Estado.jsx";
import Ayuda from "./componentes/Ayuda.jsx";
import Contacto from "./componentes/Contacto.jsx";
import PanelSimulacion from "./componentes/PanelSimulacion.jsx";

const ahoraRedondeado = () => {
  const d = new Date();
  d.setSeconds(0, 0);
  return d;
};

const pedidoVacio = { direccion: "", tamano: null, distribuidor: null, pago: null };

export default function App() {
  const [pantalla, setPantalla] = useState("entrada");
  const [historial, setHistorial] = useState([]); // pantallas a las que vuelve «Volver»
  const [cuenta, setCuenta] = useState(null); // "invitado" | "registrado"
  const [pedido, setPedido] = useState(pedidoVacio);
  const [seguimiento, setSeguimiento] = useState(null);
  const [contacto, setContacto] = useState(null); // { tipo: "servicio" | "distribuidor", distribuidor? }
  const [reloj, setReloj] = useState(ahoraRedondeado);
  const [cupon, setCupon] = useState(true);

  const irA = (destino) => {
    if (destino === "ayuda" || destino === "contacto") setHistorial([...historial, pantalla]);
    setPantalla(destino);
    window.scrollTo(0, 0);
  };

  const volver = () => {
    setPantalla(historial[historial.length - 1] ?? "entrada");
    setHistorial(historial.slice(0, -1));
    window.scrollTo(0, 0);
  };

  const entrar = (tipo) => {
    setCuenta(tipo);
    if (tipo === "registrado") {
      // Decisión 2: se reutiliza la dirección del pedido anterior. El tamaño y el distribuidor
      // no se preseleccionan: el último tamaño y el habitual solo van marcados en sus listas.
      setPedido({ ...pedidoVacio, direccion: USUARIO_REGISTRADO.ultimoPedido.direccion });
      irA("inicio");
    } else {
      setPedido(pedidoVacio);
      irA("pedido");
    }
  };

  const confirmarPedido = () => {
    const pedidoAt = new Date(reloj);
    const despachoAt = proximaApertura(pedidoAt);
    const etapas = (pedido.pago === "ahora" ? ["pago"] : []).concat(
      ["realizado", "comunicado", "camino", "frente", "finalizado"]
    );
    setSeguimiento({
      pedidoAt,
      despachoAt,
      entregaAt: new Date(despachoAt.getTime() + PLAZO_MS),
      etapas,
      idx: etapas.indexOf("realizado"),
      avisoCupon: true, // aviso de cupón aplicado (solo se muestra si pagó online con descuento)
    });
    irA("estado");
  };

  const avanzarEtapa = () => {
    if (!seguimiento || seguimiento.idx >= seguimiento.etapas.length - 1) return;
    const idx = seguimiento.idx + 1;
    // El chofer recibe el pedido recién cuando hay atención.
    if (seguimiento.etapas[idx] === "comunicado" && reloj < seguimiento.despachoAt) {
      setReloj(new Date(seguimiento.despachoAt));
    }
    setSeguimiento({ ...seguimiento, idx });
  };

  const contactar = (tipo, distribuidor) => {
    setContacto({ tipo, distribuidor });
    irA("contacto");
  };

  const reiniciar = () => {
    setCuenta(null);
    setPedido(pedidoVacio);
    setSeguimiento(null);
    setContacto(null);
    setHistorial([]);
    setPantalla("entrada");
  };

  const comunes = { cuenta, pedido, contactar };

  return (
    <div className="app">
      <header className="barra">
        <span className="marca-app"><MdPropaneTank aria-hidden="true" /> Mi gas</span>
        {pantalla !== "ayuda" && pantalla !== "contacto" && (
          <button className="enlace-ayuda" onClick={() => irA("ayuda")}>
            ¿Necesitas ayuda?
          </button>
        )}
      </header>

      <main>
        {pantalla === "entrada" && <Entrada onEntrar={entrar} />}
        {pantalla === "inicio" && <Inicio onPedir={() => irA("pedido")} contactar={contactar} />}
        {pantalla === "pedido" && (
          <Pedido
            {...comunes}
            setPedido={setPedido}
            onConfirmar={confirmarPedido}
          />
        )}
        {pantalla === "estado" && seguimiento && (
          <Estado
            {...comunes}
            seguimiento={seguimiento}
            reloj={reloj}
            cupon={cupon}
            onCerrarAvisoCupon={() => setSeguimiento({ ...seguimiento, avisoCupon: false })}
          />
        )}
        {pantalla === "ayuda" && (
          <Ayuda cuenta={cuenta} contactar={contactar} onVolver={volver} />
        )}
        {pantalla === "contacto" && contacto && <Contacto tipo={contacto.tipo} distribuidor={contacto.distribuidor} onVolver={volver} />}
      </main>

      <PanelSimulacion
        reloj={reloj}
        setReloj={setReloj}
        cupon={cupon}
        setCupon={setCupon}
        puedeAvanzar={pantalla === "estado"}
        onAvanzar={avanzarEtapa}
        onReiniciar={reiniciar}
      />
    </div>
  );
}
