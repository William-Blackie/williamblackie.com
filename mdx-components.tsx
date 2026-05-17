import Image, { type ImageProps } from 'next/image'
import { type MDXComponents } from 'mdx/types'
import { ExcalidrawWrapper } from '@/components/Excalidraw'
import { InternalExternalLink } from '@/components/InternalExternalLink'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        Image: (props: ImageProps) => (
            <Image {...props} alt={props.alt ?? ''} />
        ),
        Excalidraw: ExcalidrawWrapper,
        a: InternalExternalLink,
    }
}
