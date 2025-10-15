import fs from "fs"
import path from "path"
import { QuartzEmitterPlugin } from "../../types"
import { QuartzComponentProps } from "../../../components/types"
import BodyConstructor from "../../../components/Body"
import { pageResources, renderPage } from "../../../components/renderPage"
import { FullPageLayout } from "../../../cfg"
import { FullSlug } from "../../../util/path"
import { sharedPageComponents } from "../../../../quartz.layout"
import { defaultProcessedContent } from "../../vfile"
import { write } from "../helpers"
import NonexistentDocument from "../../../components/pages/custom/NonexistentDocument"

export const NonexistentDocumentPage: QuartzEmitterPlugin = () => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    pageBody: NonexistentDocument(),
    beforeBody: [],
    left: [],
    right: [],
  }

  const { head: Head, pageBody, footer: Footer } = opts
  const Body = BodyConstructor()

  return {
    name: "NonexistentDocumentPage",
    getQuartzComponents() { return [Head, Body, pageBody, Footer] },

    async *emit(ctx, _content, resources) {
      const cfg = ctx.cfg.configuration
      const jsonPath = path.resolve(process.cwd(), "private_links.json")

      let nonexistentLinks: string[] = []
      try {
        const data = fs.readFileSync(jsonPath, "utf-8")
        const parsed = JSON.parse(data)
        
        nonexistentLinks = parsed.nonexistent_links ?? []
        console.log(`🕳️ Loaded ${nonexistentLinks.length} nonexistent links from ${jsonPath}`)
      } catch (err) {
        console.warn("⚠️ Could not load nonexistent links:", err)
        nonexistentLinks = []
      }

      for (const slugStr of nonexistentLinks) {
        const slug = slugStr as FullSlug
        const title = slugStr.split("/").pop()?.replace(/-/g, " ") ?? "Missing Document"

        const [tree, vfile] = defaultProcessedContent({
          slug,
          text: title,
          description: "This document has not been created yet.",
          frontmatter: { title, tags: [] },
        })

        const externalResources = pageResources(slug, resources)
        const componentData: QuartzComponentProps = {
          ctx,
          fileData: vfile.data,
          externalResources,
          cfg,
          children: [],
          tree,
          allFiles: [],
        }

        yield write({
          ctx,
          content: renderPage(cfg, slug, componentData, opts, externalResources),
          slug,
          ext: ".html",
        })
      }
    },

    async *partialEmit() {},
  }
}
