<template>
  <div
    class="editor-container"
    :style="{ 'max-width': width + 'px' }"
  >
    <editor-menu :editor="editor" />
    <editor-content
      class="editor-content"
      :editor="editor"
    />
  </div>
</template>

<script>
import 'prosemirror-view/style/prosemirror.css'

import {
  Heading,
  HorizontalRule,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

import { Editor, EditorContent } from 'tiptap'

import EditorMenu from './EditorMenu'
import ClipboardHook from './ClipboardHook.js'

export default {
  components: {
    EditorContent,
    EditorMenu,
  },

  props: {
    width: {
      type: Number,
      required: true,
    },
  },

  data () {
    return {
      editor: null,
    }
  },

  mounted () {
    this.editor = new Editor({
      extensions: [
        new Heading(),
        new HorizontalRule(),
        new Bold(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
        new ClipboardHook(),
      ],
      content: '<p>This is just a boring paragraph</p>',
    })

    this.$emit('input', this.editor)
  },
  beforeDestroy () {
    this.editor.destroy()
  },
}
</script>

<style scoped>
.editor-container {
  background: #0b0b0b;
  width: 100%;
}

.editor-content {
  min-height: 400px;
  width: 100%;
  display: flex;
}
</style>
