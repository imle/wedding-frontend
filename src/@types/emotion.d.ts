import "@emotion/react"
import {Theme as LibTheme} from '@material-ui/core/styles'

declare module "@emotion/react" {
  export interface Theme extends LibTheme {
  }
}