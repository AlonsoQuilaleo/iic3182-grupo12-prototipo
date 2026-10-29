// Datos de prueba. Todo es ficticio: nombres, teléfonos, direcciones y códigos.

export const DISTRIBUIDORES = [
  { id: "aromos", nombre: "Gas Los Aromos", telefono: "+56 9 0000 0001" },
  { id: "roble", nombre: "Distribuidora El Roble", telefono: "+56 9 0000 0002" },
  { id: "cordillera", nombre: "Gas Cordillera", telefono: "+56 9 0000 0003" },
];

export const TAMANOS = [5, 11, 15, 45]; // kg

// Usuario registrado simulado: su distribuidor habitual y los datos de su último pedido.
export const USUARIO_REGISTRADO = {
  nombre: "Usuario de prueba",
  distribuidorHabitual: "aromos",
  ultimoPedido: { direccion: "Calle Ficticia 123, Santiago", tamano: 15 },
};

export const CODIGO_DESCUENTO = "AM-0000-PRUEBA";

export const SERVICIO_CLIENTE = { telefono: "+56 9 0000 0000" };

export const ETAPAS = {
  pago: "Pago confirmado",
  realizado: "Pedido realizado",
  comunicado: "Chofer comunicado sobre su pedido",
  camino: "Pedido en camino",
  frente: "Pedido frente a su domicilio",
  finalizado: "Pedido finalizado",
};

export const buscarDistribuidor = (id) => DISTRIBUIDORES.find((d) => d.id === id);
