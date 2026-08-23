const VARIANTS = [
  // 01 — E-commerce Platform
  ({ id }) => (
    <>
      <circle cx="72%" cy="30%" r="120" fill="#DCE8FF" opacity="0.7" />
      <rect x="8%" y="52%" width="34%" height="34%" rx="18" fill="#2F5DFF" opacity="0.14" />
      <g stroke="#1E46D6" strokeOpacity="0.35">
        <line x1="0" y1="20%" x2="100%" y2="20%" />
        <line x1="20%" y1="0" x2="20%" y2="100%" />
      </g>
      <rect x="14%" y="58%" width="18%" height="18%" rx="10" fill="#0B0F19" opacity="0.06" />
      <text x="8%" y="92%" fontSize="13" fill="#2F5DFF" fontFamily="monospace" opacity="0.5">
        {id}
      </text>
    </>
  ),
  // 02 — Business Website
  ({ id }) => (
    <>
      <rect x="10%" y="16%" width="80%" height="1" fill="#1E46D6" opacity="0.3" />
      <rect x="10%" y="40%" width="55%" height="1" fill="#1E46D6" opacity="0.3" />
      <rect x="10%" y="64%" width="35%" height="1" fill="#1E46D6" opacity="0.3" />
      <circle cx="80%" cy="70%" r="90" fill="#2F5DFF" opacity="0.12" />
      <rect x="10%" y="20%" width="14%" height="14%" rx="8" fill="#DCE8FF" />
      <text x="10%" y="92%" fontSize="13" fill="#2F5DFF" fontFamily="monospace" opacity="0.5">
        {id}
      </text>
    </>
  ),
  // 03 — Mobile Application
  ({ id }) => (
    <>
      <rect x="60%" y="10%" width="26%" height="80%" rx="24" fill="#0B0F19" opacity="0.06" />
      <rect x="64%" y="16%" width="18%" height="68%" rx="14" fill="#DCE8FF" opacity="0.8" />
      <circle cx="26%" cy="60%" r="70" fill="#1E46D6" opacity="0.16" />
      <g stroke="#2F5DFF" strokeOpacity="0.3">
        <line x1="8%" y1="24%" x2="42%" y2="24%" />
        <line x1="8%" y1="32%" x2="30%" y2="32%" />
      </g>
      <text x="8%" y="92%" fontSize="13" fill="#2F5DFF" fontFamily="monospace" opacity="0.5">
        {id}
      </text>
    </>
  ),
  // 04 — SaaS Platform
  ({ id }) => (
    <>
      <rect x="8%" y="18%" width="84%" height="54%" rx="14" fill="#E0F2FE" stroke="#E1E8F7" />
      <rect x="14%" y="26%" width="30%" height="8%" rx="4" fill="#DCE8FF" />
      <rect x="14%" y="40%" width="72%" height="1" fill="#E1E8F7" />
      <rect x="14%" y="48%" width="50%" height="14%" rx="6" fill="#2F5DFF" opacity="0.14" />
      <rect x="68%" y="48%" width="18%" height="14%" rx="6" fill="#1E46D6" opacity="0.2" />
      <text x="8%" y="92%" fontSize="13" fill="#2F5DFF" fontFamily="monospace" opacity="0.5">
        {id}
      </text>
    </>
  ),
];

export default function ProjectArt({ index, id }) {
  const Variant = VARIANTS[index % VARIANTS.length];
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill="#F0F9FF" />
      <Variant id={id} />
    </svg>
  );
}
