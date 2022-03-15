<template>
  <div
    class="editor-container"
    :style="{ 'width': width + 16 + 'px' }"
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

// import {
//   Heading,
//   HorizontalRule,
//   Bold,
//   Italic,
//   Link,
//   Strike,
//   Underline,
//   History,
// } from 'tiptap-extensions'

import { Editor, EditorContent } from '@tiptap/vue-3'

import EditorMenu from './EditorMenu.vue'
// import ClipboardHook from './ClipboardHook.js'

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
        // new Heading(),
        // new HorizontalRule(),
        // new Bold(),
        // new Italic(),
        // new Link(),
        // new Strike(),
        // new Underline(),
        // new History(),
        // new ClipboardHook(),
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
  padding: 0 8px;
  box-sizing: border-box;
}

@media screen and (max-width: 768px) {
  .editor-container {
    transform: scale(0.55, 0.55);
    margin: -80px 0;
  }
}
</style>
