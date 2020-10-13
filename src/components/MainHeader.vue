<template>
  <div class="header">
    <GithubButton />

    <a
      class="logo__shellcode"
      href="https://shellcode.team/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Logo class="animated pulse" />
      <Shellcode class="animated pulse" />
    </a>

    <div class="logo__plus">
      <img src="@/assets/plus.svg">
    </div>

    <a
      class="logo__sapic"
      href="https://steam.design/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="@/assets/logo.png">
    </a>
  </div>
</template>

<script>
import GithubButton from './GithubButton.vue'
import Logo from './Logo.vue'
import Shellcode from './Shellcode.vue'

export default {
  components: {
    Logo,
    Shellcode,
    GithubButton,
  },
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.header svg#logo,
.header svg#Shellcode {
  fill: white;
  width: 100%;
  align-self: center;
}

.header svg#logo {
  max-width: 150px;
  margin-left: 10px;
}

.header svg#Shellcode {
  max-width: 100px;
  height: 30px;
  margin-left: -13px;
}

.logo__shellcode {
  display: flex;
  flex-direction: column;
}
.logo__plus {
  width: 88px;
  height: 88px;
  margin: 0 40px 0 40px;
}

.logo__sapic {
  width: 175px;
  height: 175px;
}

.logo__sapic img {
  width: 175px;
  height: 175px;
}
</style>
