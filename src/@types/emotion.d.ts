import "@emotion/react"
import {Theme as LibTheme} from '@mui/material/styles'

declare module "@emotion/react" {
  export interface Theme extends LibTheme {
  }
}