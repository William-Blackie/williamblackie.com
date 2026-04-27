export default function typographyStyles({ theme }) {
  return {
    DEFAULT: {
      css: {
        color: 'var(--tw-prose-body)',
        '--tw-prose-body': 'theme(colors.ctp.text)',
        '--tw-prose-headings': 'theme(colors.ctp.mauve)',
        '--tw-prose-links': 'theme(colors.ctp.blue)',
        '--tw-prose-links-hover': 'theme(colors.ctp.pink)',
        '--tw-prose-underline': 'theme(colors.ctp.blue / 0.4)',
        '--tw-prose-underline-hover': 'theme(colors.ctp.pink)',
        '--tw-prose-bold': 'theme(colors.ctp.text)',
        '--tw-prose-code': 'theme(colors.ctp.text)',
        '--tw-prose-code-bg': 'theme(colors.ctp.surface0)',
        '--tw-prose-pre-code': 'theme(colors.ctp.text)',
        '--tw-prose-pre-bg': 'theme(colors.ctp.mantle)',

        lineHeight: theme('lineHeight.7'),
        '> *': {
          marginTop: theme('spacing.10'),
          marginBottom: theme('spacing.10'),
        },
        p: {
          marginTop: theme('spacing.7'),
          marginBottom: theme('spacing.7'),
        },

        'h2, h3': {
          color: 'var(--tw-prose-headings)',
          fontWeight: theme('fontWeight.semibold'),
        },
        h2: {
          fontSize: theme('fontSize.xl')[0],
          lineHeight: theme('lineHeight.7'),
          marginTop: theme('spacing.20'),
          marginBottom: theme('spacing.4'),
        },
        h3: {
          fontSize: theme('fontSize.base')[0],
          lineHeight: theme('lineHeight.7'),
          marginTop: theme('spacing.16'),
          marginBottom: theme('spacing.4'),
        },
        ':is(h2, h3) + *': {
          marginTop: 0,
        },

        img: {
          borderRadius: theme('borderRadius.3xl'),
        },

        a: {
          color: 'var(--tw-prose-links)',
          fontWeight: theme('fontWeight.semibold'),
          textDecoration: 'underline',
          textDecorationColor: 'var(--tw-prose-underline)',
          transitionProperty: 'color, text-decoration-color',
          transitionDuration: theme('transitionDuration.150'),
        },
        'a:hover': {
          color: 'var(--tw-prose-links-hover)',
          textDecorationColor: 'var(--tw-prose-underline-hover)',
        },
        strong: {
          color: 'var(--tw-prose-bold)',
          fontWeight: theme('fontWeight.semibold'),
        },
        code: {
          display: 'inline-block',
          color: 'var(--tw-prose-code)',
          fontSize: theme('fontSize.sm')[0],
          fontWeight: theme('fontWeight.semibold'),
          backgroundColor: 'var(--tw-prose-code-bg)',
          borderRadius: theme('borderRadius.lg'),
          paddingLeft: theme('spacing.1'),
          paddingRight: theme('spacing.1'),
        },
        'a code': {
          color: 'inherit',
        },
        ':is(h2, h3) code': {
          fontWeight: theme('fontWeight.bold'),
        },

        blockquote: {
          paddingLeft: theme('spacing.6'),
          borderLeftWidth: theme('borderWidth.2'),
          borderLeftColor: 'theme(colors.ctp.mauve)',
          fontStyle: 'italic',
        },

        figcaption: {
          color: 'theme(colors.ctp.subtext0)',
          fontSize: theme('fontSize.sm')[0],
          lineHeight: theme('lineHeight.6'),
          marginTop: theme('spacing.3'),
        },
        'figcaption > p': {
          margin: 0,
        },

        ul: {
          listStyleType: 'disc',
        },
        ol: {
          listStyleType: 'decimal',
        },
        'ul, ol': {
          paddingLeft: theme('spacing.6'),
        },
        li: {
          marginTop: theme('spacing.6'),
          marginBottom: theme('spacing.6'),
          paddingLeft: theme('spacing[3.5]'),
        },
        'li::marker': {
          color: 'theme(colors.ctp.text)',
        },

        pre: {
          color: 'var(--tw-prose-pre-code)',
          fontSize: theme('fontSize.sm')[0],
          fontWeight: theme('fontWeight.medium'),
          backgroundColor: 'var(--tw-prose-pre-bg)',
          borderRadius: theme('borderRadius.3xl'),
          padding: theme('spacing.8'),
          overflowX: 'auto',
          border: '1px solid',
          borderColor: 'theme(colors.ctp.surface0)',
        },
        'pre code': {
          display: 'inline',
          color: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          backgroundColor: 'transparent',
          borderRadius: 0,
          padding: 0,
        },

        hr: {
          marginTop: theme('spacing.20'),
          marginBottom: theme('spacing.20'),
          borderTopWidth: '1px',
          borderColor: 'theme(colors.ctp.surface1)',
        },
      },
    },
  }
}
