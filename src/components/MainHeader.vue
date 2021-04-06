<template>
  <div class="header">
    <GithubButton />

    <div class="header__logos">
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
        <img src="@/assets/logo.svg">
      </a>
    </div>

    <h1>Center text for your Steam Profile Text Showcase and Summary Containers!</h1>
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
  /* margin-bottom: 30px; */
  flex-direction: column;
}

.header__logos {
  display: flex;
  align-items: center;
}

h1 {
  max-width: 600px;
  text-align: center;
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
  width: 50px;
  height: 50px;
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

@media screen and (max-width: 768px) {
  .header {
    margin: 0 20px;
  }

  h1 {
    max-width: 600px;
    text-align: center;
    font-size: 16px;
  }

  .logo__sapic {
    width: 120px;
    height: 120px;
  }

  .logo__sapic img {
    width: 120px;
    height: 120px;
  }
}
</style>
