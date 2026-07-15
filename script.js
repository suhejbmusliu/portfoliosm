/* ============================================================
   Suhejb Musliu — Portfolio interactions
   ============================================================ */

/* ------------------------------------------------------------
   1. TECH MARQUEE — languages, frameworks & platforms
   ------------------------------------------------------------ */
const glyph = (bg, inner) =>
  `<span class="tech-glyph" style="background:${bg}">${inner}</span>`;

const txt = (t, fill, size = 11) =>
  `<svg viewBox="0 0 30 30" width="30" height="30"><text x="15" y="15" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif" font-weight="bold" font-size="${size}" fill="${fill}">${t}</text></svg>`;

const TECH = [
  { name: "Next.js", g: glyph("#111", txt("N", "#fff", 15)) },
  { name: "React", g: glyph("#23272f", `<svg viewBox="0 0 30 30" width="30" height="30"><g fill="none" stroke="#61dafb" stroke-width="1.4"><ellipse cx="15" cy="15" rx="10" ry="4"/><ellipse cx="15" cy="15" rx="10" ry="4" transform="rotate(60 15 15)"/><ellipse cx="15" cy="15" rx="10" ry="4" transform="rotate(120 15 15)"/></g><circle cx="15" cy="15" r="2" fill="#61dafb"/></svg>`) },
  { name: "TypeScript", g: glyph("#3178c6", txt("TS", "#fff")) },
  { name: "JavaScript", g: glyph("#f7df1e", txt("JS", "#111")) },
  { name: "Node.js", g: glyph("#2f9e44", `<svg viewBox="0 0 30 30" width="30" height="30"><path d="M15 4l9 5.2v10.4L15 24.8 6 19.6V9.2z" fill="none" stroke="#fff" stroke-width="1.8"/><text x="15" y="15.5" text-anchor="middle" dominant-baseline="central" font-family="Arial" font-weight="bold" font-size="8" fill="#fff">N</text></svg>`) },
  { name: "Express", g: glyph("#3a3a3a", txt("ex", "#fff")) },
  { name: "PostgreSQL", g: glyph("#336791", `<svg viewBox="0 0 30 30" width="30" height="30"><g fill="none" stroke="#fff" stroke-width="1.6"><ellipse cx="15" cy="10" rx="7" ry="3"/><path d="M8 10v10c0 1.65 3.1 3 7 3s7-1.35 7-3V10"/><path d="M8 15c0 1.65 3.1 3 7 3s7-1.35 7-3"/></g></svg>`) },
  { name: "Prisma", g: glyph("#1a202c", `<svg viewBox="0 0 30 30" width="30" height="30"><path d="M15 5 23 21l-11 3.4z" fill="#fff"/><path d="M15 5 7 19l5 5.4z" fill="#cbd5e0"/></svg>`) },
  { name: "Tailwind CSS", g: glyph("#0f172a", `<svg viewBox="0 0 30 30" width="30" height="30"><path d="M8 14c1-3.5 3.1-5.2 6.4-5.2 4.9 0 5.5 3.6 8 4.3 1.6.4 3-.1 4.1-1.6-1 3.5-3.1 5.2-6.4 5.2-4.9 0-5.5-3.6-8-4.3-1.6-.4-3 .1-4.1 1.6z" fill="#38bdf8" transform="translate(-2 -1) scale(0.92)"/><path d="M8 21c1-3.5 3.1-5.2 6.4-5.2 4.9 0 5.5 3.6 8 4.3 1.6.4 3-.1 4.1-1.6-1 3.5-3.1 5.2-6.4 5.2-4.9 0-5.5-3.6-8-4.3-1.6-.4-3 .1-4.1 1.6z" fill="#0ea5e9" transform="translate(-4.5 -2.5) scale(0.92)"/></svg>`) },
  { name: "Supabase", g: glyph("#1c1c1c", `<svg viewBox="0 0 30 30" width="30" height="30"><path d="M16.5 3.5 7 17h7v9.5L23.5 13h-7z" fill="#3ecf8e"/></svg>`) },
  { name: "Clerk", g: glyph("#6c47ff", txt("C", "#fff", 14)) },
  { name: "Docker", g: glyph("#2496ed", `<svg viewBox="0 0 30 30" width="30" height="30"><g fill="#fff"><rect x="6" y="13" width="4" height="4" rx="0.8"/><rect x="11" y="13" width="4" height="4" rx="0.8"/><rect x="16" y="13" width="4" height="4" rx="0.8"/><rect x="11" y="8" width="4" height="4" rx="0.8"/><rect x="16" y="8" width="4" height="4" rx="0.8"/><path d="M5 19h20c-1 3.5-4 5.5-9.5 5.5S6.5 22 5 19z"/></g><circle cx="23.5" cy="15" r="2.2" fill="#fff"/></svg>`) },
  { name: "Git", g: glyph("#f05032", `<svg viewBox="0 0 30 30" width="30" height="30"><g fill="none" stroke="#fff" stroke-width="1.7"><circle cx="10" cy="8" r="2.6"/><circle cx="10" cy="22" r="2.6"/><circle cx="20" cy="15" r="2.6"/><path d="M10 10.6v8.8M12.3 9.5l5.5 3.6M12.3 20.5l5.5-3.6"/></g></svg>`) },
  { name: "GitHub", g: glyph("#181717", txt("GH", "#fff")) },
  { name: "Vercel", g: glyph("#111", `<svg viewBox="0 0 30 30" width="30" height="30"><path d="M15 7.5 24 23H6z" fill="#fff"/></svg>`) },
  { name: "Figma", g: glyph("#1e1e1e", `<svg viewBox="0 0 30 30" width="30" height="30"><circle cx="10.5" cy="15" r="3" fill="#a259ff"/><circle cx="19.5" cy="9.5" r="3" fill="#ff7262"/><circle cx="19.5" cy="20.5" r="3" fill="#1abcfe"/></svg>`) },
  { name: "Postman", g: glyph("#ff6c37", `<svg viewBox="0 0 30 30" width="30" height="30"><circle cx="15" cy="15" r="8" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="18" cy="12" r="2.6" fill="#fff"/></svg>`) },
  { name: "REST APIs", g: glyph("#0f5132", `<svg viewBox="0 0 30 30" width="30" height="30"><g fill="none" stroke="#7ed957" stroke-width="1.8"><path d="M11 10l-5 5 5 5M19 10l5 5-5 5"/></g></svg>`) },
];

const techTrack = document.getElementById("techTrack");
if (techTrack) {
  const items = TECH.map(
    (t) => `<span class="tech-item">${t.g}${t.name}</span>`
  ).join("");
  techTrack.innerHTML = items + items; /* duplicated for seamless -50% loop */
}

/* ------------------------------------------------------------
   2. PROJECT MOCKUPS — hand-drawn SVG previews per project
   ------------------------------------------------------------ */
const MOCKUPS = {
  zendo: `
    <svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zendo storefront preview">
      <rect width="300" height="190" fill="#fbfbfa"/>
      <rect width="300" height="30" fill="#111311"/>
      <rect x="12" y="11" width="46" height="8" rx="4" fill="#baf7c4"/>
      <rect x="196" y="9" width="60" height="12" rx="6" fill="#7ed957"/>
      <circle cx="274" cy="15" r="7" fill="#2a2e2a"/>
      <rect x="12" y="42" width="120" height="12" rx="6" fill="#1c1f1c"/>
      <rect x="12" y="60" width="80" height="7" rx="3.5" fill="#c9cdc7"/>
      <g>
        <rect x="12" y="80" width="86" height="94" rx="10" fill="#fff" stroke="#e3e5df"/>
        <rect x="20" y="88" width="70" height="48" rx="6" fill="#eef2ec"/>
        <rect x="20" y="144" width="50" height="7" rx="3.5" fill="#9a9e94"/>
        <rect x="20" y="157" width="32" height="9" rx="4.5" fill="#111311"/>
      </g>
      <g>
        <rect x="107" y="80" width="86" height="94" rx="10" fill="#fff" stroke="#e3e5df"/>
        <rect x="115" y="88" width="70" height="48" rx="6" fill="#e7f9e9"/>
        <rect x="115" y="144" width="56" height="7" rx="3.5" fill="#9a9e94"/>
        <rect x="115" y="157" width="32" height="9" rx="4.5" fill="#111311"/>
      </g>
      <g>
        <rect x="202" y="80" width="86" height="94" rx="10" fill="#fff" stroke="#e3e5df"/>
        <rect x="210" y="88" width="70" height="48" rx="6" fill="#eef2ec"/>
        <rect x="210" y="144" width="44" height="7" rx="3.5" fill="#9a9e94"/>
        <rect x="210" y="157" width="32" height="9" rx="4.5" fill="#7ed957"/>
      </g>
    </svg>`,
  nexon: `
    <svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NEXON One landing preview">
      <rect width="300" height="190" fill="#0a0c14"/>
      <g opacity="0.9">
        <circle cx="30" cy="40" r="1.5" fill="#5865a3"/><circle cx="80" cy="22" r="1" fill="#5865a3"/>
        <circle cx="140" cy="50" r="1.2" fill="#5865a3"/><circle cx="240" cy="30" r="1.5" fill="#5865a3"/>
        <circle cx="270" cy="70" r="1" fill="#5865a3"/><circle cx="50" cy="120" r="1.2" fill="#5865a3"/>
        <circle cx="260" cy="140" r="1.4" fill="#5865a3"/><circle cx="200" cy="20" r="1" fill="#5865a3"/>
        <circle cx="110" cy="160" r="1.2" fill="#5865a3"/><circle cx="170" cy="130" r="1" fill="#5865a3"/>
      </g>
      <circle cx="150" cy="82" r="34" fill="none" stroke="#4c6ef5" stroke-width="1.5" opacity="0.8"/>
      <circle cx="150" cy="82" r="22" fill="#141a30"/>
      <circle cx="150" cy="82" r="22" fill="none" stroke="#748ffc" stroke-width="1"/>
      <path d="M150 60a22 22 0 0 1 20 13" stroke="#ffd43b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <rect x="98" y="128" width="104" height="10" rx="5" fill="#e9ecf8"/>
      <rect x="118" y="146" width="64" height="6" rx="3" fill="#39405e"/>
      <g>
        <rect x="96" y="162" width="24" height="16" rx="4" fill="#141a30" stroke="#39405e"/>
        <rect x="126" y="162" width="24" height="16" rx="4" fill="#141a30" stroke="#39405e"/>
        <rect x="156" y="162" width="24" height="16" rx="4" fill="#141a30" stroke="#39405e"/>
        <rect x="186" y="162" width="18" height="16" rx="4" fill="#4c6ef5"/>
      </g>
    </svg>`,
  shkdituria: `
    <svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shkdituria blog preview">
      <rect width="300" height="190" fill="#fdfdfc"/>
      <rect width="300" height="34" fill="#fff"/>
      <rect x="0" y="33" width="300" height="1.5" fill="#e8e8e4"/>
      <rect x="14" y="12" width="72" height="11" rx="5.5" fill="#1d3557"/>
      <rect x="200" y="13" width="30" height="8" rx="4" fill="#c3c8bf"/><rect x="238" y="13" width="30" height="8" rx="4" fill="#c3c8bf"/>
      <rect x="14" y="48" width="164" height="86" rx="10" fill="#1d3557"/>
      <rect x="26" y="94" width="100" height="10" rx="5" fill="#fff"/>
      <rect x="26" y="112" width="70" height="7" rx="3.5" fill="#7d94b5"/>
      <rect x="26" y="60" width="44" height="12" rx="6" fill="#e63946"/>
      <g>
        <rect x="188" y="48" width="98" height="25" rx="7" fill="#f1f2ee"/>
        <rect x="188" y="79" width="98" height="25" rx="7" fill="#f1f2ee"/>
        <rect x="188" y="110" width="98" height="24" rx="7" fill="#f1f2ee"/>
        <rect x="196" y="56" width="60" height="7" rx="3.5" fill="#8a8f85"/>
        <rect x="196" y="87" width="70" height="7" rx="3.5" fill="#8a8f85"/>
        <rect x="196" y="118" width="54" height="7" rx="3.5" fill="#8a8f85"/>
      </g>
      <g>
        <rect x="14" y="146" width="86" height="30" rx="8" fill="#fff" stroke="#e8e8e4"/>
        <rect x="107" y="146" width="86" height="30" rx="8" fill="#fff" stroke="#e8e8e4"/>
        <rect x="200" y="146" width="86" height="30" rx="8" fill="#fff" stroke="#e8e8e4"/>
        <rect x="22" y="157" width="56" height="8" rx="4" fill="#c3c8bf"/>
        <rect x="115" y="157" width="62" height="8" rx="4" fill="#c3c8bf"/>
        <rect x="208" y="157" width="50" height="8" rx="4" fill="#c3c8bf"/>
      </g>
    </svg>`,
  saqipi: `
    <svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Saqipi Construction preview">
      <rect width="300" height="190" fill="#f7f6f3"/>
      <rect width="300" height="110" fill="#22262b"/>
      <rect x="14" y="14" width="60" height="10" rx="5" fill="#f4a428"/>
      <rect x="212" y="13" width="74" height="13" rx="6.5" fill="#3b414a"/>
      <rect x="14" y="42" width="140" height="14" rx="7" fill="#fff"/>
      <rect x="14" y="64" width="100" height="8" rx="4" fill="#8a919c"/>
      <rect x="14" y="84" width="58" height="14" rx="7" fill="#f4a428"/>
      <g>
        <rect x="196" y="38" width="14" height="60" fill="#f4a428"/>
        <rect x="216" y="52" width="14" height="46" fill="#5a6270"/>
        <rect x="236" y="30" width="14" height="68" fill="#454c57"/>
        <rect x="256" y="60" width="14" height="38" fill="#f4a428" opacity="0.7"/>
      </g>
      <g>
        <rect x="14" y="124" width="86" height="52" rx="8" fill="#fff" stroke="#e5e3dc"/>
        <rect x="107" y="124" width="86" height="52" rx="8" fill="#fff" stroke="#e5e3dc"/>
        <rect x="200" y="124" width="86" height="52" rx="8" fill="#fff" stroke="#e5e3dc"/>
        <rect x="24" y="136" width="30" height="16" rx="4" fill="#fdeacc"/>
        <rect x="117" y="136" width="30" height="16" rx="4" fill="#fdeacc"/>
        <rect x="210" y="136" width="30" height="16" rx="4" fill="#fdeacc"/>
        <rect x="24" y="158" width="56" height="7" rx="3.5" fill="#b9beb4"/>
        <rect x="117" y="158" width="48" height="7" rx="3.5" fill="#b9beb4"/>
        <rect x="210" y="158" width="60" height="7" rx="3.5" fill="#b9beb4"/>
      </g>
    </svg>`,
  keramika: `
    <svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Keramika DOO preview">
      <rect width="300" height="190" fill="#faf7f4"/>
      <rect x="14" y="14" width="80" height="11" rx="5.5" fill="#9a4b2f"/>
      <g>
        <rect x="206" y="13" width="22" height="12" rx="6" fill="#eaddd3"/>
        <rect x="232" y="13" width="22" height="12" rx="6" fill="#eaddd3"/>
        <rect x="258" y="13" width="22" height="12" rx="6" fill="#9a4b2f"/>
      </g>
      <g>
        <rect x="14" y="42" width="64" height="64" rx="6" fill="#c96f4a"/>
        <rect x="84" y="42" width="64" height="64" rx="6" fill="#e0b8a4"/>
        <rect x="154" y="42" width="64" height="64" rx="6" fill="#8c5b45"/>
        <rect x="224" y="42" width="62" height="64" rx="6" fill="#d9a08a"/>
        <path d="M14 74h64M46 42v64" stroke="#faf7f4" stroke-width="2"/>
        <path d="M84 74h64M116 42v64" stroke="#faf7f4" stroke-width="2"/>
        <path d="M154 74h64M186 42v64" stroke="#faf7f4" stroke-width="2"/>
        <path d="M224 74h62M255 42v64" stroke="#faf7f4" stroke-width="2"/>
      </g>
      <rect x="14" y="122" width="150" height="13" rx="6.5" fill="#3d2a20"/>
      <rect x="14" y="143" width="110" height="8" rx="4" fill="#c4b3a8"/>
      <rect x="14" y="160" width="70" height="15" rx="7.5" fill="#9a4b2f"/>
      <g>
        <rect x="210" y="128" width="76" height="48" rx="8" fill="#fff" stroke="#eaddd3"/>
        <rect x="220" y="138" width="40" height="7" rx="3.5" fill="#c4b3a8"/>
        <rect x="220" y="152" width="56" height="7" rx="3.5" fill="#e0b8a4"/>
      </g>
    </svg>`,
  qendraera: `
    <svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QendraERA preview">
      <rect width="300" height="190" fill="#f4faf9"/>
      <circle cx="268" cy="26" r="40" fill="#d3f1ec"/>
      <circle cx="24" cy="170" r="30" fill="#fde8d7"/>
      <rect x="14" y="16" width="76" height="11" rx="5.5" fill="#0f766e"/>
      <rect x="14" y="52" width="150" height="14" rx="7" fill="#134e4a"/>
      <rect x="14" y="74" width="110" height="8" rx="4" fill="#8ab5b0"/>
      <rect x="14" y="94" width="66" height="15" rx="7.5" fill="#0f766e"/>
      <g>
        <rect x="14" y="128" width="122" height="48" rx="10" fill="#fff" stroke="#d5e8e5"/>
        <circle cx="36" cy="152" r="10" fill="#fbbf77"/>
        <rect x="54" y="142" width="66" height="7" rx="3.5" fill="#9db8b4"/>
        <rect x="54" y="156" width="48" height="7" rx="3.5" fill="#d5e8e5"/>
      </g>
      <g>
        <rect x="168" y="96" width="118" height="80" rx="12" fill="#134e4a"/>
        <rect x="180" y="110" width="70" height="16" rx="8" fill="#fff"/>
        <rect x="204" y="132" width="82" height="16" rx="8" fill="#0f766e" transform="translate(-24 0)"/>
        <rect x="180" y="154" width="56" height="12" rx="6" fill="#1e6b64"/>
        <circle cx="266" cy="160" r="9" fill="#3ecfbb"/>
        <path d="M262 160l3 3 5-6" stroke="#0b3f3a" stroke-width="1.8" fill="none"/>
      </g>
    </svg>`,
  birent: `
    <svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bi Rent preview">
      <rect width="300" height="190" fill="#f6f7fa"/>
      <rect x="14" y="14" width="58" height="11" rx="5.5" fill="#d92632"/>
      <rect x="226" y="12" width="60" height="14" rx="7" fill="#14213d"/>
      <rect x="14" y="44" width="130" height="14" rx="7" fill="#14213d"/>
      <rect x="14" y="66" width="90" height="8" rx="4" fill="#9aa3b8"/>
      <g>
        <rect x="14" y="88" width="164" height="88" rx="12" fill="#fff" stroke="#e2e6ee"/>
        <path d="M40 138c4-14 12-20 30-20h22c16 0 24 5 30 16l14 4c5 1.6 7 5 7 9v7H30v-8c0-4 3-7 10-8z" fill="#14213d"/>
        <circle cx="60" cy="154" r="9" fill="#f6f7fa" stroke="#14213d" stroke-width="3"/>
        <circle cx="126" cy="154" r="9" fill="#f6f7fa" stroke="#14213d" stroke-width="3"/>
        <rect x="40" y="100" width="60" height="9" rx="4.5" fill="#d92632"/>
        <rect x="128" y="98" width="40" height="13" rx="6.5" fill="#eef1f6"/>
      </g>
      <g>
        <rect x="190" y="88" width="96" height="40" rx="10" fill="#fff" stroke="#e2e6ee"/>
        <rect x="190" y="136" width="96" height="40" rx="10" fill="#d92632"/>
        <rect x="200" y="100" width="56" height="8" rx="4" fill="#9aa3b8"/>
        <rect x="200" y="114" width="36" height="7" rx="3.5" fill="#e2e6ee"/>
        <rect x="200" y="148" width="60" height="8" rx="4" fill="#fff"/>
        <rect x="200" y="162" width="40" height="7" rx="3.5" fill="#f2a0a6"/>
      </g>
    </svg>`,
  pandamind: `
    <svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PandaMind NFT preview">
      <rect width="300" height="190" fill="#12101d"/>
      <circle cx="260" cy="20" r="50" fill="#231d3a" opacity="0.8"/>
      <rect x="14" y="14" width="80" height="11" rx="5.5" fill="#a78bfa"/>
      <rect x="238" y="12" width="48" height="14" rx="7" fill="#7c3aed"/>
      <rect x="14" y="44" width="150" height="14" rx="7" fill="#f3f0ff"/>
      <rect x="14" y="66" width="100" height="8" rx="4" fill="#564f78"/>
      <g>
        <rect x="14" y="92" width="82" height="84" rx="12" fill="#1d1930" stroke="#37305a"/>
        <circle cx="55" cy="122" r="18" fill="#f3f0ff"/>
        <circle cx="47" cy="117" r="5" fill="#12101d"/>
        <circle cx="63" cy="117" r="5" fill="#12101d"/>
        <ellipse cx="55" cy="128" rx="6" ry="4" fill="#12101d"/>
        <rect x="26" y="150" width="44" height="7" rx="3.5" fill="#564f78"/>
        <rect x="26" y="161" width="30" height="8" rx="4" fill="#7c3aed"/>
      </g>
      <g>
        <rect x="106" y="92" width="82" height="84" rx="12" fill="#1d1930" stroke="#37305a"/>
        <circle cx="147" cy="122" r="18" fill="#c4b5fd"/>
        <circle cx="139" cy="117" r="5" fill="#12101d"/>
        <circle cx="155" cy="117" r="5" fill="#12101d"/>
        <ellipse cx="147" cy="128" rx="6" ry="4" fill="#12101d"/>
        <rect x="118" y="150" width="50" height="7" rx="3.5" fill="#564f78"/>
        <rect x="118" y="161" width="30" height="8" rx="4" fill="#7c3aed"/>
      </g>
      <g>
        <rect x="198" y="92" width="82" height="84" rx="12" fill="#1d1930" stroke="#37305a"/>
        <circle cx="239" cy="122" r="18" fill="#fbbf77"/>
        <circle cx="231" cy="117" r="5" fill="#12101d"/>
        <circle cx="247" cy="117" r="5" fill="#12101d"/>
        <ellipse cx="239" cy="128" rx="6" ry="4" fill="#12101d"/>
        <rect x="210" y="150" width="40" height="7" rx="3.5" fill="#564f78"/>
        <rect x="210" y="161" width="30" height="8" rx="4" fill="#a78bfa"/>
      </g>
    </svg>`,
};

/* ------------------------------------------------------------
   3. PROJECT DATA — every project from the CV
   ------------------------------------------------------------ */
const PROJECTS = [
  {
    id: "nexon",
    name: "NEXON One",
    type: "3D landing page",
    desc: "High-fidelity animated landing page for a futuristic tech product — Three.js 3D rendering, a particle field, scroll-driven GSAP animations and a live countdown with waitlist form.",
    tech: ["Three.js", "GSAP", "JavaScript", "CSS3"],
    url: "https://nexon-three.vercel.app",
    label: "nexon-three.vercel.app",
  },
  {
    id: "shkdituria",
    name: "Shkdituria",
    type: "Blog platform",
    desc: "Full-stack publishing platform with public pages and a secure admin panel — REST API on Node.js + Express, JWT authentication, role management and a PostgreSQL schema via Prisma ORM.",
    tech: ["Node.js", "Express", "PostgreSQL", "Prisma", "JWT"],
    url: "https://www.shkdituria.com",
    label: "shkdituria.com",
  },
  {
    id: "keramika",
    name: "Keramika DOO",
    type: "Corporate website",
    desc: "Marketing site for a ceramic tile studio in three languages (Albanian, English, Serbian) — gallery, materials showcase, project portfolio, testimonials, FAQ and a quote-request form, all with smooth scroll animations.",
    tech: ["React", "TypeScript", "Framer Motion", "i18n"],
    url: "https://keramika-vert.vercel.app",
    label: "keramika-vert.vercel.app",
  },
  {
    id: "qendraera",
    name: "QendraERA",
    type: "Healthcare website",
    desc: "Responsive website for a children's educational & rehabilitation center, with contact forms and an AI-based chatbot that helps families navigate the center's services.",
    tech: ["Next.js", "React", "JavaScript", "Figma"],
    url: "https://www.qendraera.com",
    label: "qendraera.com",
  },
  {
    id: "birent",
    name: "Bi Rent",
    type: "Rental landing",
    desc: "Car rental marketing landing page targeting Skopje, North Macedonia — bilingual (Macedonian + Albanian), contact form and fully responsive design.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    url: "https://birent.vercel.app",
    label: "birent.vercel.app",
  },
  {
    id: "saqipi",
    name: "Saqipi Construction",
    type: "Company website",
    desc: "Modern company website for a construction company, built in React with reusable components, responsive layout and professional branding.",
    tech: ["React", "JavaScript ES6+", "CSS3", "Vercel"],
    url: "https://saqipiconstruction.vercel.app",
    label: "saqipiconstruction.vercel.app",
  },
  {
    id: "pandamind",
    name: "PandaMind",
    type: "NFT platform",
    desc: "Company website for PandaMind — featuring smooth animations, a modern responsive design, and an engaging user experience.",
    tech: ["React", "JavaScript", "CSS"],
    url: "https://pandamind.vercel.app",
    label: "pandamind.vercel.app",
  },
];

/* ---- real screenshot with SVG-mockup fallback ---- */
/* Default image is assets/<id>.png. A project can override it by adding
   an `img: "assets/whatever.jpg"` field. If the file is missing or broken,
   the hand-drawn SVG mockup takes over automatically. */
const shot = (id, name, img) =>
  `<img src="${img || `assets/${id}.png`}" alt="${name} — live site screenshot" loading="lazy"
        onerror="this.closest('.device-screen, .project-shot').innerHTML = MOCKUPS['${id}']">`;

/* ---- projects grid ---- */
const grid = document.getElementById("projectsGrid");
if (grid) {
  const cards = PROJECTS.map(
    (p) => `
    <article class="project-card reveal">
      <div class="project-shot">${shot(p.id, p.name, p.img)}</div>
      <div class="project-head">
        <h3>${p.name}</h3>
        <span class="project-type">${p.type}</span>
      </div>
      <p>${p.desc}</p>
      <div class="project-foot">
        <div class="chips">${p.tech.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
        <a class="project-link" href="${p.url}" target="_blank" rel="noopener">${p.label}
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M7 17 17 7M9 7h8v8"/></svg>
        </a>
      </div>
    </article>`
  ).join("");

  const ctaCard = `
    <article class="project-card reveal" style="display:flex;flex-direction:column;justify-content:center;align-items:flex-start;background:var(--ink);border-color:var(--ink);min-height:320px;padding:36px;">
      <span class="section-tag section-tag-invert">Next project</span>
      <h3 style="color:#fff;font-size:26px;margin-top:16px;line-height:1.25;">This spot is reserved<br/>for your idea<span class="accent-dot">.</span></h3>
      <p style="color:#b8bcb2;margin:14px 0 22px 0;font-size:14.5px;">Marketplace, dashboard, landing page or something nobody has built yet — let's talk about it.</p>
      <a href="mailto:suhejbmusliu69@gmail.com?subject=Project%20inquiry" class="btn btn-light">Start a project</a>
    </article>`;

  grid.innerHTML = cards + ctaCard;
}

/* ---- showcase strip (all projects incl. Zendo) ---- */
const SHOWCASE_ORDER = [
  { id: "zendo", name: "Zendo.mk", href: "#zendo", ext: false },
  ...PROJECTS.map((p) => ({ id: p.id, name: p.name, href: p.url, ext: true, img: p.img })),
];

const showcaseTrack = document.getElementById("showcaseTrack");
if (showcaseTrack) {
  const items = SHOWCASE_ORDER.map(
    (s) => `
    <a class="showcase-item" href="${s.href}" ${s.ext ? 'target="_blank" rel="noopener"' : ""}>
      <div class="device-frame">
        <div class="device-screen">${shot(s.id, s.name, s.img)}</div>
      </div>
      <span class="showcase-label">${s.name}<span class="go">${s.ext ? "visit ↗" : "founder · my product ↓"}</span></span>
    </a>`
  ).join("");
  showcaseTrack.innerHTML = items + items; /* duplicated for seamless loop */
}

/* ------------------------------------------------------------
   4. SCROLL REVEAL — IntersectionObserver with sibling stagger
   ------------------------------------------------------------ */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  els.forEach((el) => {
    const parent = el.parentElement;
    const siblings = parent ? [...parent.children].filter((c) => c.classList.contains("reveal")) : [el];
    const idx = siblings.indexOf(el);
    el.style.setProperty("--reveal-delay", `${Math.min(idx, 6) * 80}ms`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}
initReveal();

/* ------------------------------------------------------------
   5. SCROLL PROGRESS + NAV STATE
   ------------------------------------------------------------ */
const progressBar = document.getElementById("progressBar");
const navWrap = document.getElementById("navWrap");

let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    if (navWrap) navWrap.classList.toggle("scrolled", window.scrollY > 40);
    ticking = false;
  });
}, { passive: true });

/* ------------------------------------------------------------
   6. CONTACT FORM — composes an email (no backend needed)
   ------------------------------------------------------------ */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const message = data.get("message") || "";
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:suhejbmusliu69@gmail.com?subject=${subject}&body=${body}`;

    const btn = form.querySelector("button[type=submit]");
    if (btn) {
      btn.classList.add("form-sent");
      btn.textContent = "Opening your email app…";
      setTimeout(() => {
        btn.classList.remove("form-sent");
        btn.innerHTML = `Send message <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 12h15M13 6l6 6-6 6"/></svg>`;
      }, 4000);
    }
  });
}
