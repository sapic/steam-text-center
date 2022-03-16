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
import './prosemirror.css'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

import { EditorContent, useEditor } from '@tiptap/vue-3'

import EditorMenu from './EditorMenu.vue'
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

  setup () {
    const editor = useEditor({
      content: '<p>Enter you showcase text here</p>',
      extensions: [
        StarterKit,
        Underline,
        ClipboardHook,
      ],
    })

    return { editor }
  },

  mounted () {
    this.$emit('updateEditor', this.editor)
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
