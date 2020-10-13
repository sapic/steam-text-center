<template>
  <div>
    <a class="btn_profile_action btn_medium" href="#" @click="centerText">
      <span>{{ $t("center") }}</span> 
    </a>

    <div class="text-tester">
      <p id="textp" ref="textp"></p>
      <h1 id="hp" ref="hp"></h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editor: {
      type: Object,
      required: false,
      default: null,
    },
    width: {
      type: Number,
      required: true,
    },
  },

  methods: {
    centerText(e) {
      e.preventDefault();

      const text = this.editor.getHTML();

      const lines = text.split(/<\/p>|<\/h1>/);
      lines.pop();
      console.log(lines);
      let newLines = [];
      for (const line of lines) {
        const isHeading = line.indexOf("<h1>") !== -1;
        const text = line
          .replace(/<p>|<h1>/, "")
          .replace(/^\u200a|\u2800+|\u200a|\u2800+$/g, "");

        const pel = isHeading ? this.$refs.hp : this.$refs.textp;

        let longSpacer = "";
        for (let i = 0; i < 10000; i++) {
          longSpacer += String.fromCharCode(10240);
        }
        pel.innerHTML = longSpacer;
        const wsWidth = pel.offsetWidth / 10000;

        longSpacer = "";
        for (let i = 0; i < 10000; i++) {
          longSpacer += String.fromCharCode(8202);
        }
        pel.innerHTML = longSpacer;
        const smallwsWidth = pel.offsetWidth / 10000;

        pel.innerHTML = text;
        console.log(pel, pel.clientHeight, pel.offsetWidth);

        const textWidth = pel.offsetWidth;
        const allWidth = parseInt(this.width);

        const neededOffset = (allWidth - textWidth) / 2;

        let spacer = "";
        let totalOffset = 0;
        let bigWsCount = 0;
        let smallwsCount = 0;

        while (totalOffset < neededOffset - wsWidth) {
          spacer += String.fromCharCode(10240);
          totalOffset += wsWidth;
          bigWsCount++;
        }
        while (totalOffset < neededOffset - smallwsWidth) {
          spacer += String.fromCharCode(8202);
          totalOffset += smallwsWidth;
          smallwsCount++;
        }

        const tag = isHeading ? "h1" : "p";
        const newLine = `<${tag}>${spacer}${text}</${tag}>`;
        newLines.push(newLine);
      }

      const newText = newLines.join("");
      this.editor.setContent(newText);
    },
  },
};
</script>