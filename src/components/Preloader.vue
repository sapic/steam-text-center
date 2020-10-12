<template>
  <div id="preloader" v-bind:class="exitWatch">
    <Logo v-bind:class="completedWatch"></Logo>
    <Shellcode v-bind:class="completedWatch"></Shellcode>
    <div id="typed-strings">
      <p>{{ $t("preloaderLines.one") }}</p>
      <p>{{ $t("preloaderLines.two") }}</p>
      <p>{{ $t("preloaderLines.three") }}</p>
      <p>{{ $t("preloaderLines.four") }}</p>
      <p>{{ $t("preloaderLines.five") }}</p>
      <p>{{ $t("preloaderLines.six") }}</p>
    </div>
    <div id="typed-container" v-bind:class="completedWatch"><span id="typed"></span></div>
    <div id="skip" @click="skip">{{ $t("skip") }}</div>
  </div>
</template>

<script>
import Typed from "typed.js";
import Anime from "animejs";
import Logo from "./Logo.vue";
import Shellcode from "./Shellcode.vue";

export default {
  components: { Logo, Shellcode },
  name: "preloader",
  data() {
    return {
      ready: false,
      ended: false,
      hide: false,
      exit: false,
    };
  },
  methods: {
    skip(e) {
      this.exit = true;
    },
  },
  mounted() {
    if (localStorage.getItem("introduction")) {
      return (this.exit = true);
    }

    // console.time('draw time test');
    var initTyped = () => {
      var typed = new Typed("#typed", {
        stringsElement: "#typed-strings",
        typeSpeed: 40,
        onComplete: () => {
          setTimeout(() => (this.ended = true), 1000);
          setTimeout(() => (this.hide = true), 2000);
          setTimeout(() => (this.exit = true), 2500);
        },
      });
    };
    var lineDrawing = Anime({
      targets: "path",
      strokeDashoffset: [Anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 2000,
      delay: function (el, i) {
        return i * 20;
      },
      direction: "forwards",
      loop: false,
      complete: () => (this.ready = true),
    });
    setTimeout(initTyped, 5000);
  },
  computed: {
    completedWatch() {
      if (this.hide) {
        return "hide";
      } else if (this.ended) {
        return "completed ended animated fadeOutDown";
      } else if (this.ready) {
        return "completed ready";
      }
    },
    exitWatch() {
      if (this.exit) {
        localStorage.setItem("introduction", true);
        this.$root.$emit("loaded");
        return "exit";
      }
    },
  },
  i18n: {
    messages: {
      en: {
        preloaderLines: {
          one:
            "We are proud to present you our completely new tool for text centering on Steam.",
          two:
            "We are happy that the previous version has been warmly welcomed by the community, so we have prepared a new, better one.",
          three:
            "We hope that using this tool will be only convenience and pleasure for you.",
          four:
            "If you have any questions or problems, please contact the author by sending an e-mail (expl0it@shellcode.team),",
          five:
            "by writing on Discord (mordzaty#3839), or Steam (id/shellcode). The source code can be found on GitHub.",
          six: "Have fun and beauuuutiful profile!",
        },
        skip: "skip",
      },
      pl: {
        preloaderLines: {
          one:
            "Mamy zaszczyt przedstawić Ci nasze zupełnie nowe narzędzie do środkowania tekstu na Steam.",
          two:
            "Cieszymy się, że poprzednia wersja została ciepło przyjęta przez społeczność, zatem przygotowaliśmy nową, lepszą.",
          three:
            "Mamy nadzieję, że korzystanie z tego narzędzia będzie dla Ciebie samą wygodą i przyjemnością.",
          four:
            "W razie pytań lub problemów prosimy o kontakt z autorem wysyłając e-mail (expl0it@shellcode.team),",
          five:
            "pisząc na Discord (mordziaty#3839), lub Steam (id/shellcode). Kod źródłowy znajdziesz na GitHubie.",
          six: "Dobrej zabawy i piękneeeego profilu!",
        },
        skip: "pomiń",
      },
    },
  },
};
</script>

<style scoped>
/* // @import url("https://use.typekit.net/rwm6wor.css"); */

#preloader.exit {
  display: none;
}

#preloader #logo {
  transition: fill 1s, width 2s ease-in-out;
  stroke: light-gray;
  fill: transparent;
  width: 100%;
  max-height: 90vh;
  max-width: 400px;
  z-index: 1;
}

#preloader #logo.completed {
  fill: light-gray;
  stroke: none;
}

#preloader #logo.ready {
  width: 200px;
}

#Shellcode {
  opacity: 0;
  transition: visibility 0s, opacity 2s ease-in-out;
  fill: white;
  visibility: hidden;
  width: 100px;
}

#Shellcode.ready {
  visibility: visible;
  opacity: 1;
}

#Shellcode.hide,
#logo.hide,
#typed-container.hide,
#typed-strings {
  display: none;
}

#typed-container {
  min-height: 20px;
  display: inline;
  position: fixed;
  text-align: center;
  bottom: 25%;
  background: #121111;
}

#typed {
  color: white;
  font-family: futura-pt, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 1.2em;
}

#skip {
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: #fff;
  letter-spacing: 0.1em;
  text-transform: lowercase;
  font-weight: bold;
  cursor: pointer;
}
</style>
