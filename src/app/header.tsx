export default function Header() {
  return (
    <header className="cf-app-header">
      <a href="/" className="cf-brand" aria-label="Chord Finder home">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            width="30"
            height="30"
            rx="9"
            stroke="currentColor"
            strokeOpacity=".35"
          />
          <path
            d="M10 7v18M16 7v18M22 7v18M7 12h18M7 20h18"
            stroke="currentColor"
            strokeOpacity=".5"
          />
          <circle cx="10" cy="12" r="3" fill="currentColor" />
          <circle cx="22" cy="20" r="3" fill="currentColor" />
        </svg>
        <span>
          chord<span>finder</span>
          <i />
        </span>
      </a>
      <span className="cf-header-caption">YOUR POCKET GUITAR WORKBENCH</span>
    </header>
  );
}
