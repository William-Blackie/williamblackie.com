export function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      style={{
        display: 'inline',
        marginLeft: '0.25em',
        verticalAlign: 'text-bottom',
      }}
    >
      <path
        d="M14 3h3v3m0-3L10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="5"
        y="5"
        width="10"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

export function InternalIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      style={{
        display: 'inline',
        marginLeft: '0.25em',
        verticalAlign: 'text-bottom',
      }}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2.5" y="7.5" width="7" height="5" rx="2.5" />
        <rect x="10.5" y="7.5" width="7" height="5" rx="2.5" />
        <path d="M9.5 10h1" />
      </g>
    </svg>
  )
}
