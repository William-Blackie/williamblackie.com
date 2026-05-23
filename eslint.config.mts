import { defineConfig, globalIgnores } from 'eslint/config'

import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

const eslintConfig = defineConfig([
    ...nextCoreWebVitals,
    ...nextTypescript,
    eslintConfigPrettier,
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        '.netlify/**',
    ]),
])

export default eslintConfig
