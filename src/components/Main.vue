<template>
  <div id="maindiv" class="loaded">
    <a href="https://github.com/alza54/steam-text-center-tool" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#fff; color:#151513; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
    <Logo class="animated pulse"></Logo>
    <Shellcode class="animated pulse"></Shellcode>
    <div class="editor-container" :style="{ 'max-width': width + 'px' }">
      <editor-menu :editor="editor"></editor-menu>
      <editor-content class="editor-content" :editor="editor" />
    </div>

    <div class="flex-inline">
      <ShowcaseSelect v-model="width"/>
      <a class="btn_profile_action btn_medium" href="#" @click="reset">
        <span>{{ $t("reset") }}</span>
      </a>
      <CopyButton :editor="editor" />
      <CenterButton :editor="editor" :width="width" />
    </div>
  </div>
</template>

<script>
import "prosemirror-view/style/prosemirror.css";

import CopyButton from "./CopyButton";
import CenterButton from "./CenterButton";
import ShowcaseSelect from "./ShowcaseSelect";

import { Editor, EditorContent } from "tiptap";

import EditorMenu from "./EditorMenu";

import Logo from "./Logo.vue";
import Shellcode from "./Shellcode.vue";
import {
  Heading,
  HorizontalRule,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from "tiptap-extensions";

import ClipboardHook from "./ClipboardHook.js";

export default {
  components: {
    Logo,
    Shellcode,
    EditorContent,
    EditorMenu,
    CopyButton,
    CenterButton,
    ShowcaseSelect,
  },

  name: "maind",

  data() {
    return {
      textCentered: false,
      width: 616,

      editor: null,
    };
  },
  methods: {
    reset(e) {
      e.preventDefault();
      this.editor.setContent("");
    },

    update(e) {
      console.log("update e", e);
      // Quill embeds are buggy...
      // var selector = '.ql-editor img:not([src^="https://steamcommunity-a.akamaihd.net/economy/emoticon/"])';
      // document.querySelectorAll(selector).forEach(e => e.outerHTML = '');

      var generateEmoticon = function (e) {
        e = e.replace(/:| /g, "");
        return `<img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/${e}">&#160;`;
      };

      this.editor = e.html;

      if (e.html.match(/:\w{1,}: /g)) {
        e.html.match(/:\w{1,}: /g).forEach((o) => {
          this.editor = e.html.replace(o, generateEmoticon(o));
        });
      }
    },
  },

  mounted() {
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
      content: "<p>This is just a boring paragraph</p>",
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
.editor-container {
  background: #0b0b0b;
  width: 100%;
}

#textp {
  display: inline;
  margin: 0;
  padding: 0;
}

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

#maindiv svg#logo,
#maindiv svg#Shellcode {
  fill: white;
  width: 100%;
  align-self: center;
}

#maindiv svg#logo {
  max-width: 150px;
  margin-left: 10px;
}

#maindiv svg#Shellcode {
  max-width: 100px;
  height: 30px;
  margin-left: -13px;
}

#maindiv p {
  text-align: center;
}

.center-text-box {
  font-family: Arial, Helvetica, Verdana, sans-serif;
  font-size: 13px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 90vw;
  height: 50vh;
  margin: 10px 0;
  border: none;
  background: #0b0b0b;
  overflow-y: hidden;
  align-self: center;
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

.btn_profile_action {
  height: 35px;
  margin: 0 0.4em 0.4em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: roboto, sans-serif;
  font-weight: 300;
  color: #fff;
  text-align: center;
  transition: all 0.2s;
  outline: none;
}

.btn_profile_action:hover {
  color: #000;
  background: #fff;
}

.btn_profile_action {
  padding: 0.25em 1.2em;
  border: 0.13em solid #fff;
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

.editor-content {
  min-height: 400px;
  width: 100%;
  display: flex;
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}

@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}

@media all and (min-width: 600px) {
  .btn_profile_action:nth-of-type(1) {
    margin-left: auto;
  }
}

@media all and (max-height: 710px) {
  #logo {
    margin-top: 10px;
  }
}
</style>

<style>
.ql-editor {
  white-space: normal !important;
}

.ProseMirror {
  flex: 1;
}

.ProseMirror:focus {
  outline: none;
}

.text-tester {
  position: absolute;
  top: -9999px;
  left: -9999px;
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
</style>
