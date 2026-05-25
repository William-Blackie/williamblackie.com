import Image, { type ImageProps } from 'next/image'
import React from 'react'
import { type MDXComponents } from 'mdx/types'
import { ExcalidrawWrapper } from '@/components/Excalidraw'
import { InternalExternalLink } from '@/components/InternalExternalLink'
import { slugifyHeading } from '@/lib/headings'
import { CodeBlockPre } from '@/components/CodeBlock'

function getNodeText(node: React.ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node)
    }

    if (Array.isArray(node)) {
        return node.map(getNodeText).join('')
    }

    if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
        return getNodeText(node.props.children)
    }

    return ''
}

function Heading({
    as: Component,
    children,
    id,
    ...props
}: React.ComponentPropsWithoutRef<'h2'> & {
    as: 'h2' | 'h3'
}): React.ReactElement {
    const headingId = id ?? slugifyHeading(getNodeText(children))

    return (
        <Component id={headingId} {...props}>
            <a href={`#${headingId}`} className="heading-anchor">
                {children}
                <span aria-hidden="true" className="heading-anchor-indicator">
                    #
                </span>
            </a>
        </Component>
    )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        Image: (props: ImageProps) => (
            <Image {...props} alt={props.alt ?? ''} />
        ),
        Excalidraw: ExcalidrawWrapper,
        a: InternalExternalLink,
        h2: (props) => <Heading as="h2" {...props} />,
        h3: (props) => <Heading as="h3" {...props} />,
        pre: CodeBlockPre,
    }
}
