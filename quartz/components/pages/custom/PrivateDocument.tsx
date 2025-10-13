import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../../types"

const PrivateDocument: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
    const pageTitle = "Private"
    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const baseDir = url.pathname

  return (
    <article class="popover-hint text-center mt-16">
      <h1>🔒 {pageTitle}</h1>
      <p>Pssst Finger weg, DM daddies are working on it.</p>
      <a href={baseDir}>Back to home</a>
    </article>
  )
}

export default (() => PrivateDocument) satisfies QuartzComponentConstructor