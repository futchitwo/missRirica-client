<template>
  <Transition :name="$store.state.animation ? '_transition_zoom' : ''" appear>
    <div :class="$style.root">
      <img
        :class="$style.img"
        src="https://xn--931a.moe/assets/error.jpg"
        class="_ghost"
      />
      <p :class="$style.text">
        <i class="ti ti-alert-triangle"></i> {{ i18n.ts.somethingHappened }}
      </p>
      <MkButton :class="$style.button" @click="() => $emit('retry')">{{
        i18n.ts.retry
      }}</MkButton>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import MkButton from "@/components/MkButton.vue";
import { i18n } from "@/i18n";
</script>

<style lang="scss" module>
.root {
  padding: 32px;
  text-align: center;
  align-items: center;
}

.text {
  margin: 0 0 8px 0;
}

.button {
  margin: 0 auto;
}

.img {
  vertical-align: bottom;
  width: 128px;
  height: 128px;
  margin-bottom: 16px;
  border-radius: 16px;
}
</style>
