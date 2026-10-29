// QR de prueba: patrón fijo que no codifica nada.
export default function Qr() {
  const celdas = [];
  let s = 7;
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      const esquina = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      s = (s * 9301 + 49297) % 233280;
      const lleno = esquina
        ? x % 6 === 0 || y % 6 === 0 || (x % 14 >= 2 && x % 14 <= 4 && y % 14 >= 2 && y % 14 <= 4)
        : s / 233280 > 0.5;
      if (lleno) celdas.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    }
  }
  return (
    <svg viewBox="-1 -1 23 23" role="img" aria-label="Código QR de descuento (de prueba)">
      {celdas}
    </svg>
  );
}
