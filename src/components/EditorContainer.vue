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

// import Document from '@tiptap/extension-document'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
// import HorizontalRule from '@tiptap/extension-horizontal-rule'

import { Editor, EditorContent, useEditor } from '@tiptap/vue-3'

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

  setup () {
    const editor = useEditor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit,
        Underline,
        // HorizontalRule,
      ],
    })

    return { editor }
  },

  mounted () {
    this.$emit('updateEditor', this.editor)
  }

  // data () {
  //   return {
  //     editor: null,
  //   }
  // },

  // mounted () {
  //   this.editor = new Editor({
  //     content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  //     extensions: [
  //       StarterKit,
  //     ],
  //     // extensions: [
  //     //   Document,
  //     //   Paragraph,
  //     //   Text,
  //     //   // new Heading(),
  //     //   // new HorizontalRule(),
  //     //   // new Bold(),
  //     //   // new Italic(),
  //     //   // new Link(),
  //     //   // new Strike(),
  //     //   // new Underline(),
  //     //   // new History(),
  //     //   // new ClipboardHook(),
  //     // ],
  //     // content: '<p>This is just a boring paragraph</p>',
  //   })

  //   // this.$emit('input', this.editor)
  // },
  // beforeUnmount () {
  //   this.editor.destroy()
  // },
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
