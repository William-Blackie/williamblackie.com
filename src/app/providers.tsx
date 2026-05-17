'use client'

import { ThemeProvider, ThemeProviderProps } from 'next-themes'

const CatpucchinThemeProviderProps: ThemeProviderProps = {
    attribute: 'class',
    defaultTheme: 'system',
    disableTransitionOnChange: true,
    enableSystem: true,
    themes: ['light', 'dark'],
    value: { light: 'latte', dark: 'mocha' },
}

export function Providers({
    children,
}: {
    children: React.ReactNode
}): React.ReactElement {
    return (
        <ThemeProvider {...CatpucchinThemeProviderProps}>
            {children}
        </ThemeProvider>
    )
}
