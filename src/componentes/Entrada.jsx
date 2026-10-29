export default function Entrada({ onEntrar }) {
  return (
    <section className="pantalla">
      <h1>Pida su gas a domicilio</h1>
      <div className="tarjeta pila">
        <button className="boton" onClick={() => onEntrar("invitado")}>
          Entrar como invitado
        </button>
        <button className="boton secundario" onClick={() => onEntrar("registrado")}>
          Ingresar
        </button>
        <p className="nota">«Ingresar» es simulado: no pide credenciales.</p>
      </div>
    </section>
  );
}
