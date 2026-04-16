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
import CashTracker from "../../../components/pages/custom/CashTracker"

export const CashTrackerPage: QuartzEmitterPlugin = () => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    pageBody: CashTracker(),
    beforeBody: [],
    left: [],
    right: [],
  }

  const { head: Head, pageBody, footer: Footer } = opts
  const Body = BodyConstructor()
 
  return {
    name: "PrivateDocumentPage",
    getQuartzComponents() { return [Head, Body, pageBody, Footer] },

    async *emit(ctx, _content, resources) {
      const cfg = ctx.cfg.configuration
      const jsonPath = path.resolve(process.cwd(), "private_links.json")
      
      let privateLinks: string[] = []
        try {
          const data = fs.readFileSync(jsonPath, "utf-8")
          let parsed = JSON.parse(data)

          privateLinks = parsed.private_links ?? []
          console.log(`🕳️ Loaded ${privateLinks.length} nonexistent links from ${jsonPath}`)
        } catch (err) {
            console.warn("⚠️ No private_links.json found or invalid JSON:", err)
            privateLinks = []
        }

      for (const slugStr of privateLinks) {
          const slug = slugStr as FullSlug
          const title = slugStr.split("/").pop()?.replace(/-/g, " ") ?? "Private Document"

          console.log("Generating private page:", slug)

        const [tree, vfile] = defaultProcessedContent({
          slug,
          text: title,
          description: "This document needs the #Public tag to be accessible.",
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
