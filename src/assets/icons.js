// Ícones
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faList,
  faSearch,
  faClipboardList,
  faDownload,
  faUser,
  faClock,
  faFile,
  faLink,
  faTrashAlt,
  faFolderOpen,
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

export const fontAwesomeInitialize = () => {
  return library.add(
    faList,
    faSearch,
    faClipboardList,
    faDownload,
    faUser,
    faClock,
    faFile,
    faLink,
    faTrashAlt,
    faFolderOpen,
    faPlus,
    faTimes
  )
}
