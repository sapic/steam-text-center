<template>
  <div
    id="maindiv"
    class="loaded"
  >
    <MainHeader />
    <EditorContainer
      v-model="editor"
      :width="width"
    />

    <div class="flex-inline">
      <ShowcaseSelect v-model="width" />
      <a
        class="btn_profile_action btn_medium"
        href="#"
        @click="reset"
      >
        <span>{{ $t("reset") }}</span>
      </a>
      <CopyButton :editor="editor" />
      <CenterButton
        :editor="editor"
        :width="width"
      />
    </div>

    <Scripts />
  </div>
</template>

<script>
import CopyButton from './CopyButton'
import CenterButton from './CenterButton'
import ShowcaseSelect from './ShowcaseSelect'
import EditorContainer from './EditorContainer'
import MainHeader from './MainHeader'
import Scripts from './Scripts'

export default {
  name: 'Maind',

  components: {
    MainHeader,
    CopyButton,
    CenterButton,
    ShowcaseSelect,
    EditorContainer,
    Scripts,
  },

  data () {
    return {
      textCentered: false,
      width: 616,

      editor: null,
    }
  },

  methods: {
    reset (e) {
      e.preventDefault()
      this.editor.setContent('')
    },
  },
}
</script>

<style scoped>
#maindiv {
  display: flex;
  flex-direction: column;
  color: white;
  font-family: futura-pt, sans-serif;
  font-weight: 400;
  font-style: normal;
  align-items: center;
  width: 100%;
}

#maindiv:not(.loaded) {
  display: none;
}

#maindiv p {
  text-align: center;
}

.flex-inline {
  display: flex;
  flex-wrap: wrap;
  max-width: 90vw;
}

img.emoticon {
  vertical-align: text-bottom;
  height: 18px;
  width: 18px;
}

@media all and (max-height: 710px) {
  #logo {
    margin-top: 10px;
  }
}
</style>

<style>
body {
  background: #121111;
}

.ProseMirror {
  flex: 1;
}

.ProseMirror:focus {
  outline: none;
}

.text-tester p,
.editor-content p {
  font-size: 13px;
  margin: 0;
}

.text-tester h1,
.editor-content h1 {
  font-size: 20px;
  line-height: 23px;
  color: #5aa9d6;
  font-weight: normal;
  margin-bottom: 10px;
  clear: both;
}

.text-tester h1 {
  display: inline;
}

.btn_profile_action {
  height: 35px;
  margin: 5px 0.4em 0.4em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: roboto, sans-serif;
  font-weight: 300;
  color: #fff;
  text-align: center;
  transition: all 0.2s;
  outline: none;
  display: flex;
  align-items: center;
  padding: 0.25em 1.2em;
  border: 0.13em solid #0B0B0B;
  background-color: #0B0B0B;
}

.center_button {
  background: linear-gradient(45deg, #36bbf7 0%, #702df9 100%) !important;
  opacity: 0.9;
  height: 34px;
  border: none;
  bottom: 34px;
  position: relative;
}

.center_button:hover {
  opacity: 1;
}

.saveButtonShadow {
  background: linear-gradient(45deg, #36bbf7 0%, #702df9 100%);
  filter: blur(9px);
  position: relative;
  right: 2px;
  height: 34px;
  width: 146px;
  top: 5px;
}

.btn_profile_action:hover {
  background: #fff;
}

@media all and (min-width: 600px) {
  .btn_profile_action:nth-of-type(1) {
    margin-left: auto;
  }
}
</style>
