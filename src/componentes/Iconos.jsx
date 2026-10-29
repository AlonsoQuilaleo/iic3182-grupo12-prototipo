const base = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export const Camion = () => (
  <svg {...base}>
    <path d="M3 6h11v9H3z" />
    <path d="M14 9h4l3 3v3h-7z" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

export const Casa = () => (
  <svg {...base}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </svg>
);

export const Check = () => (
  <svg {...base} strokeWidth={3}>
    <path d="M5 12l5 5 9-10" />
  </svg>
);
