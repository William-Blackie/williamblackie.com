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

export default withMDX(nextConfig)
