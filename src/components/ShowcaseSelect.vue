<template>
  <select
    class="gray_bevel"
    @change="changeMode"
  >
    <option value="616">
      {{ $t("modes.textShowcaseCenter") }}
    </option>
    <option value="626">
      {{ $t("modes.groupSummaryCenter") }}
    </option>
    <option value="544">
      {{ $t("modes.profileCommentCenter") }}
    </option>
    <option value="534">
      {{ $t("modes.groupCommentCenter") }}
    </option>
    <option value="454">
      {{ $t("modes.summaryCenter") }}
    </option>
  </select>
</template>

<script>
export default {
  methods: {
    changeMode (e) {
      this.$emit('input', parseInt(e.target.value))
    },
  },
}
</script>

<style scoped>
select.gray_bevel,
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

select.gray_bevel {
  padding: 0 0.1em 0.1em 1em;
  border: 0.15em solid #fff;
  background: none;
  font-size: 0.9em;
}

select.gray_bevel option {
  background: #121111;
}
</style>
