import { defineConfig, globalIgnores } from 'eslint/config'

import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import eslintConfigPrettier from 'eslint-config-prettier'

const eslintConfig = defineConfig([
    ...nextCoreWebVitals,
    ...nextTypescript,
    eslintConfigPrettier,
    globalIgnores(['.netlify/**']),
])

export default eslintConfig
