<template>
  <span>
    <span>@{{ user.username }}</span>
    <span
      v-if="user.host || detail || $store.state.showFullAcct"
      style="opacity: 0.5"
      >@{{ user.host || host }}</span
    >
  </span>
</template>

<script lang="ts" setup>
import * as misskey from "misskey-js";
import { toUnicode } from "punycode/";
import { host as hostRaw } from "@/config";

defineProps<{
  user: misskey.entities.UserDetailed;
  detail?: boolean;
}>();

const host = toUnicode(hostRaw);
</script>
