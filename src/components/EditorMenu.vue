<template>
  <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
    <div class="menubar">

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bold() }"
        @click="commands.bold"
      >
        <!-- <icon name="bold" /> -->bold
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.italic() }"
        @click="commands.italic"
      >
        <!-- <icon name="italic" /> -->italic
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.strike() }"
        @click="commands.strike"
      >
        <!-- <icon name="strike" /> -->strike
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.underline() }"
        @click="commands.underline"
      >
        <!-- <icon name="underline" /> -->underline
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
        <!-- <icon name="hr" /> -->hr
      </button>

      <button
        class="menubar__button"
        @click="commands.undo"
      >
        <!-- <icon name="undo" /> -->undo
      </button>

      <button
        class="menubar__button"
        @click="commands.redo"
      >
        <!-- <icon name="redo" /> -->redo
      </button>

    </div>
  </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from "tiptap";

export default {
  components: { EditorMenuBar },

  props: {
    editor: {
      type: Object,
      required: false,
    },
  },
};
</script>