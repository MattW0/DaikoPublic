import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../../types"

const NonexistentDocument: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title ?? "Missing Document"

  return (
    <article class="popover-hint">
      <h1>{title}</h1>
      <p>This document has not been created yet.</p>
      <p>
        Nobody yet knows what <code> { title } </code> is about...
      </p>
    </article>
  )
}

export default (() => NonexistentDocument) satisfies QuartzComponentConstructor
