<template>
  <Mfm
    :text="user.name ?? user.username"
    :author="user"
    :plain="true"
    :nowrap="nowrap"
    :emoji-urls="user.emojis"
  />
</template>

<script lang="ts" setup>
import {} from "vue";
import * as misskey from "misskey-js";

const props = withDefaults(
  defineProps<{
    user: misskey.entities.User;
    nowrap?: boolean;
  }>(),
  {
    nowrap: true,
  }
);
</script>
