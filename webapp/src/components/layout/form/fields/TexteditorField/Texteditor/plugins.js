import { composeDecorators } from 'draft-js-plugins-editor'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createLinkPlugin from 'draft-js-anchor-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'

const linkPlugin = createLinkPlugin()
const inlineToolbarPlugin = createInlineToolbarPlugin()

export const focusPlugin = createFocusPlugin()
export const resizeablePlugin = createResizeablePlugin()
export const alignmentPlugin = createAlignmentPlugin()
export const blockDndPlugin = createBlockDndPlugin()
export const imageDecorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
)
export const imagePlugin = createImagePlugin({ decorator: imageDecorator })

export const plugins = [
  inlineToolbarPlugin,
  linkPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin
]

export const { AlignmentTool } = alignmentPlugin
export const { InlineToolbar } = inlineToolbarPlugin
export const { LinkButton } = linkPlugin
