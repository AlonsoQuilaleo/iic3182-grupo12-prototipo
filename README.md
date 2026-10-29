# Prototipo funcional v1 · Mi gas

Proyecto del curso **IIC3182 Interfaces Humano-Computador** (Pontificia Universidad Católica de Chile), **Grupo 12**.

Prototipo funcional de la Entrega 2: una aplicación web en React, pensada para celular, para pedir gas licuado
y seguir el estado del pedido hasta la entrega.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior (incluye npm).

## Cómo correrla en local

```
npm install
npm run dev
```

Luego abrir http://localhost:5173 en el navegador. Para verla como en un celular, usar el modo de dispositivo
móvil del navegador (por ejemplo, 390 × 844).

Para generar la versión de producción: `npm run build` (queda en `dist/`).

## Versión publicada

Pendiente.

## Flujo

1. **Entrada:** entrar como invitado o «Ingresar» (simulado, sin credenciales).
2. **Inicio** (solo usuario registrado): distribuidor habitual con «Pedir gas» y «Llamar».
3. **Pedido:** dirección, tamaño del cilindro, distribuidor y forma de pago (pagar ahora o al recibir).
4. **Estado del pedido:** línea de tiempo por etapas, hora estimada de entrega, aviso de horario de atención,
   aviso de atraso y código o QR de descuento según corresponda.
5. **¿Necesitas ayuda?:** siempre visible; preguntas frecuentes y contacto.

## Qué es simulado

El ingreso, el pago, los distribuidores, los teléfonos, los feriados, el QR, el código de descuento y las
pantallas de contacto (servicio al cliente, distribuidor y WhatsApp). Todos los datos son ficticios.

El **panel de simulación** (franja inferior) no es parte de la interfaz: sirve para cambiar el reloj, avanzar
las etapas del pedido y activar el cupón.

## Archivos

- `src/datos.js`: datos de prueba.
- `src/horario.js`: horario de atención, feriados y plazo de entrega de 2 horas.
- `src/componentes/`: una pantalla o componente por archivo.

## Uso de IA

El código de este prototipo se desarrolló con apoyo de IA, según la política del curso. El registro de prompts
está en el anexo de uso de IA del informe.
