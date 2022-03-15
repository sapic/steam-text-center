<template>
  <a
    class="btn_profile_action btn_medium"
    href="#"
    @click="copy"
  >
    <span>{{ $t("copy") }}</span>
  </a>
</template>

<script>
export default {
  props: {
    editor: {
      type: Object,
      required: false,
      default: null,
    },
  },

  methods: {
    copy (e) {
      e.preventDefault()

      const decodeEntities = (function () {
        // this prevents any overhead from creating the object each time
        const element = document.createElement('div')

        function decodeHTMLEntities (str) {
          if (str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
            element.innerHTML = str
            str = element.textContent
            element.textContent = ''
          }

          return str
        }

        return decodeHTMLEntities
      })()

      let output = this.editor.getHTML()
      output = output.replace(/&nbsp;/g, ' ')
      output = output.replace(/<h1>/g, '[h1]').replace(/<\/h1>/g, '[/h1]\n')
      output = output.replace(/<p>/g, '').replace(/<\/p>/g, '\n')
      output = output
        .replace(/<strong>/g, '[b]')
        .replace(/<\/strong>/g, '[/b]')
      output = output.replace(/<em>/g, '[i]').replace(/<\/em>/g, '[/i]')
      output = output.replace(/<u>/g, '[u]').replace(/<\/u>/g, '[/u]')
      output = output
        .replace(/<s>/g, '[strike]')
        .replace(/<\/s>/g, '[/strike]')

      output = output.replace(/<hr>/g, '[hr][/hr]')

      output = output.replace(/<br>/g, '\n')
      output = output.replace(
        /<span class="quill-precision" title="Precision">﻿<span contenteditable="false"><span contenteditable="false">[0-9]*\.[0-9]*%<\/span><\/span>﻿<\/span>/g, // eslint-disable-line
        '',
      )
      const r = /<img src="https:\/\/steamcommunity-a\.akamaihd\.net\/economy\/emoticon\/(\w+)">/g
      output = output.replace(r, ':$1:')
      output = decodeEntities(output)
      this.$copyText(output)
      // .then(
      //   (e) => {
      //     alert(this.$t("copied"));
      //   },
      //   (e) => {
      //     alert(this.$t("cannotCopy"));
      //   }
      // );
    },
  },
}
</script>
