import { Block, Form } from 'pass-culture-shared'

import UrlInput from '../components/layout/UrlInput'

Object.assign(Form.inputsByType, {
  url: UrlInput
})

Object.assign(Form.defaultProps, {
  BlockComponent: Block
})
