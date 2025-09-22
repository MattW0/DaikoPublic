import { QuartzComponentConstructor } from "./types"
import styles from "./styles/multi-column.scss"
 
export default (() => {
  function MultiColumn() {
    return <p>Example Component</p>
  }
 
  MultiColumn.css = styles
  return MultiColumn
}) satisfies QuartzComponentConstructor