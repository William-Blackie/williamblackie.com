import { withSentryConfig, type SentryBuildOptions } from '@sentry/nextjs'
import nextMDX from '@next/mdx'
import { type Options } from 'rehype-pretty-code'
import { type NextConfig } from 'next'

const nextConfig: NextConfig = {
    typedRoutes: true,

    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
}

const prettyCodeOptions: Options = {
    theme: {
        dark: 'catppuccin-mocha',
        light: 'catppuccin-latte',
    },
    defaultLang: 'plaintext',
}

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: ['remark-gfm'],
        rehypePlugins: [['rehype-pretty-code', prettyCodeOptions]],
    },
})

const sentryOrg = process.env['SENTRY_ORG']
const sentryProject = process.env['SENTRY_PROJECT']

const sentryBuildOptions = {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    ...(sentryOrg ? { org: sentryOrg } : {}),

    ...(sentryProject ? { project: sentryProject } : {}),

    // Only print logs for uploading source maps in CI
    silent: !process.env['CI'],

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: '/monitoring',

    webpack: {
        // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
        // See the following for more information:
        // https://docs.sentry.io/product/crons/
        // https://vercel.com/docs/cron-jobs
        automaticVercelMonitors: true,

        // Tree-shaking options for reducing bundle size
        treeshake: {
            // Automatically tree-shake Sentry logger statements to reduce bundle size
            removeDebugLogging: true,
        },
    },
} satisfies SentryBuildOptions

export default withSentryConfig(withMDX(nextConfig), sentryBuildOptions)
