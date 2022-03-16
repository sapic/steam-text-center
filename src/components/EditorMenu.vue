<template>
  <div v-if="editor">
    <div class="menubar">
      <button
        class="menubar__button"
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <IconBold />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <IconItalic />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <IconStrike />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': editor.isActive('underline') }"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <IconUnderline />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({level: 1}).run()"
      >
        H1
      </button>

      <button
        class="menubar__button"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <IconHR />
      </button>

      <button
        class="menubar__button"
        @click="editor.chain().focus().undo().run()"
      >
        <IconUndo />
      </button>

      <button
        class="menubar__button"
        @click="editor.chain().focus().redo().run()"
      >
        <IconRedo />
      </button>
    </div>
  </div>
</template>

<script>
import IconBold from '@/assets/editor/bold.vue'
import IconHR from '@/assets/editor/hr.vue'
import IconItalic from '@/assets/editor/italic.vue'
import IconRedo from '@/assets/editor/redo.vue'
import IconStrike from '@/assets/editor/strike.vue'
import IconUnderline from '@/assets/editor/underline.vue'
import IconUndo from '@/assets/editor/undo.vue'

export default {
  components: {
    IconBold,
    IconStrike,
    IconHR,
    IconItalic,
    IconRedo,
    IconUnderline,
    IconUndo,
  },

  props: {
    editor: {
      type: Object,
      required: false,
      default: null,
    },
  },
}
</script>

<style scoped>
.menubar {
  display: flex;
  color: white;
  margin: 10px 10px 10px 0;
}

.menubar__button {
  width: 32px;
  height: 22px;
  display: flex;
  background: none;
  border: none;
  color: white;
  font-size: 13.3333px;
  font-weight: 700;
  padding: 3.6px 9px;
  cursor: pointer;
  margin: 0 auto;
}

.menubar__button:focus {
  outline: none;
}

.menubar__button.is-active {
  background-color: rgba(255, 255, 255, 0.1);
}

.menubar__button svg {
  color: white;
  fill: currentColor;
  width: 100%;
  height: 100%;
}
</style>
