export default function BrandMark({ className = "" }) {
  return (
    <span className={`brandMark ${className}`.trim()} aria-label="Answer Right Now">
      <svg className="brandMarkIcon" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="brandMarkGradient" x1="5" y1="4" x2="27" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#164e48" />
            <stop offset="1" stopColor="#0e3b36" />
          </linearGradient>
        </defs>
        <path className="brandMarkBubble" d="M6 7.5A4.5 4.5 0 0 1 10.5 3h11A4.5 4.5 0 0 1 26 7.5v8a4.5 4.5 0 0 1-4.5 4.5h-5.2L11 25v-5H10.5A4.5 4.5 0 0 1 6 15.5z" />
        <path className="brandMarkLine" d="M9.5 17.2h3.2" />
        <path className="brandMarkSpark" d="m16 7.5 1.2 3.3 3.3 1.2-3.3 1.2-1.2 3.3-1.2-3.3-3.3-1.2 3.3-1.2z" />
      </svg>
      <span className="brandName">Answer<span>Right</span>Now</span>
    </span>
  );
}
