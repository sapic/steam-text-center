<template>
  <editor-menu-bar
    v-slot="{ commands, isActive }"
    :editor="editor"
  >
    <div class="menubar">
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bold() }"
        @click="commands.bold"
      >
        <IconBold />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.italic() }"
        @click="commands.italic"
      >
        <!-- <icon name="italic" /> --><IconItalic />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.strike() }"
        @click="commands.strike"
      >
        <!-- <icon name="strike" /> --><IconStrike />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.underline() }"
        @click="commands.underline"
      >
        <!-- <icon name="underline" /> --><IconUnderline />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
        @click="commands.heading({ level: 1 })"
      >
        H1
      </button>

      <button
        class="menubar__button"
        @click="commands.horizontal_rule"
      >
        <!-- <icon name="hr" /> --><IconHR />
      </button>

      <button
        class="menubar__button"
        @click="commands.undo"
      >
        <!-- <icon name="undo" /> --><IconUndo />
      </button>

      <button
        class="menubar__button"
        @click="commands.redo"
      >
        <!-- <icon name="redo" /> --><IconRedo />
      </button>
    </div>
  </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from 'tiptap'

import IconBold from '@/assets/editor/bold'
import IconHR from '@/assets/editor/hr'
import IconItalic from '@/assets/editor/italic'
import IconRedo from '@/assets/editor/redo'
import IconStrike from '@/assets/editor/strike'
import IconUnderline from '@/assets/editor/underline'
import IconUndo from '@/assets/editor/undo'

export default {
  components: {
    EditorMenuBar,
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
  padding: 0;
  display: flex;
  background: none;
  border: none;
  /* padding: 2px; */
  color: white;
  font-size: 13.3333px;
  font-weight: 700;

  padding: 3.6px 9px;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
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
  /* height: 24px; */
}
</style>
