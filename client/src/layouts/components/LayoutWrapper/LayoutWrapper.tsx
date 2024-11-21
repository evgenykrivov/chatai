import { ReactNode } from "react"
import styles from "./LayoutWrapper.module.scss"

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return <div className={styles.wrapper}>{children}</div>
}
