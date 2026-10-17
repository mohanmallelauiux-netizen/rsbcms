import React from 'react'

type TextNode = {
  text: string
  type: 'text'
  format?: number
  style?: string
  mode?: string
  detail?: number
}

type ElementNode = {
  type: string
  children?: (ElementNode | TextNode)[]
  format?: string | number
  indent?: number
  version?: number
  [key: string]: any
}

type LexicalContent = {
  root: ElementNode
}

export default function RichText({ content }: { content: any }) {
  if (!content) return null

  // Ensure content is parsed if passed as string
  const data: LexicalContent = typeof content === 'string' ? JSON.parse(content) : content

  if (!data.root || !data.root.children) return null

  const renderTextNode = (node: TextNode, key: number) => {
    let text: React.ReactNode = node.text

    // Apply basic formatting flags
    // 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline
    const format = node.format || 0
    if (format & 1) text = <strong key={key}>{text}</strong>
    if (format & 2) text = <em key={key}>{text}</em>
    if (format & 8) text = <span key={key} className="underline">{text}</span>
    if (format & 4) text = <span key={key} className="line-through">{text}</span>

    return text
  }

  const renderElementNode = (node: ElementNode, key: number): React.ReactNode => {
    const children = node.children?.map((child, idx) => {
      if ('type' in child && child.type === 'text') {
        return renderTextNode(child as TextNode, idx)
      }
      return renderElementNode(child as ElementNode, idx)
    })

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={key} className="text-xs text-muted/90 leading-relaxed mb-4">
            {children}
          </p>
        )
      case 'heading':
        const Tag = `h${Math.min(node.tag ? parseInt(node.tag.replace('h', '')) : 3, 6)}` as any
        const headingStyles =
          Tag === 'h1'
            ? 'font-serif text-2xl font-bold mt-8 mb-4 text-foreground'
            : Tag === 'h2'
            ? 'font-serif text-xl font-bold mt-6 mb-3 text-foreground'
            : 'font-serif text-base font-bold mt-4 mb-2 text-foreground'
        return (
          <Tag key={key} className={headingStyles}>
            {children}
          </Tag>
        )
      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        const listStyles = node.listType === 'number' ? 'list-decimal ml-6 mb-4 text-xs flex flex-col gap-2' : 'list-disc ml-6 mb-4 text-xs flex flex-col gap-2'
        return (
          <ListTag key={key} className={listStyles}>
            {children}
          </ListTag>
        )
      case 'listitem':
        return (
          <li key={key} className="text-muted/90">
            {children}
          </li>
        )
      case 'quote':
        return (
          <blockquote key={key} className="border-l-2 border-primary pl-4 py-2 italic bg-secondary/20 rounded-r-lg my-6 text-xs text-foreground">
            {children}
          </blockquote>
        )
      default:
        return <div key={key}>{children}</div>
    }
  }

  return (
    <div className="rich-text-container font-sans">
      {data.root.children.map((child, idx) => {
        if ('type' in child && child.type === 'text') {
          return renderTextNode(child as TextNode, idx)
        }
        return renderElementNode(child as ElementNode, idx)
      })}
    </div>
  )
}
