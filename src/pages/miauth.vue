<template>
  <MkStickyContainer>
    <template #header
      ><MkPageHeader :actions="headerActions" :tabs="headerTabs"
    /></template>
    <MkSpacer :content-max="800">
      <div v-if="$i">
        <div v-if="state == 'waiting'">
          <MkLoading />
        </div>
        <div v-if="state == 'denied'">
          <p>{{ i18n.ts._auth.denied }}</p>
        </div>
        <div v-else-if="state == 'accepted'" class="accepted">
          <p v-if="callback">{{ i18n.ts._auth.callback }}<MkEllipsis /></p>
          <p v-else>{{ i18n.ts._auth.pleaseGoBack }}</p>
        </div>
        <div v-else>
          <div v-if="_permissions.length > 0">
            <p v-if="name">{{ $t("_auth.permission", { name }) }}</p>
            <p v-else>{{ i18n.ts._auth.permissionAsk }}</p>
            <ul>
              <li v-for="p in _permissions" :key="p">
                {{ $t(`_permissions.${p}`) }}
              </li>
            </ul>
          </div>
          <div v-if="name">{{ $t("_auth.shareAccess", { name }) }}</div>
          <div v-else>{{ i18n.ts._auth.shareAccessAsk }}</div>
          <div :class="$style.buttons">
            <MkButton inline @click="deny">{{ i18n.ts.cancel }}</MkButton>
            <MkButton inline primary @click="accept">{{
              i18n.ts.accept
            }}</MkButton>
          </div>
        </div>
      </div>
      <div v-else>
        <p :class="$style.loginMessage">{{ i18n.ts._auth.pleaseLogin }}</p>
        <MkSignin @login="onLogin" />
      </div>
    </MkSpacer>
  </MkStickyContainer>
</template>

<script lang="ts" setup>
import {} from "vue";
import MkSignin from "@/components/MkSignin.vue";
import MkButton from "@/components/MkButton.vue";
import * as os from "@/os";
import { $i, login } from "@/account";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";

const props = defineProps<{
  session: string;
  callback?: string;
  name: string;
  icon: string;
  permission: string; // コンマ区切り
}>();

const _permissions = props.permission ? props.permission.split(",") : [];

let state = $ref<string | null>(null);

async function accept(): Promise<void> {
  state = "waiting";
  await os.api("miauth/gen-token", {
    session: props.session,
    name: props.name,
    iconUrl: props.icon,
    permission: _permissions,
  });

  state = "accepted";
  if (props.callback) {
    const cbUrl = new URL(props.callback);
    if (
      ["javascript:", "file:", "data:", "mailto:", "tel:"].includes(
        cbUrl.protocol
      )
    )
      throw new Error("invalid url");
    cbUrl.searchParams.set("session", props.session);
    location.href = cbUrl.href;
  }
}

function deny(): void {
  state = "denied";
}

function onLogin(res): void {
  login(res.i);
}

const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

definePageMetadata({
  title: "MiAuth",
  icon: "ti ti-apps",
});
</script>

<style lang="scss" module>
.buttons {
  margin-top: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.loginMessage {
  text-align: center;
  margin: 8px 0 24px;
}
</style>
