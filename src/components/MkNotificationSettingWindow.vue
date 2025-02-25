<template>
  <MkModalWindow
    ref="dialog"
    :width="400"
    :height="450"
    :with-ok-button="true"
    :ok-button-disabled="false"
    @ok="ok()"
    @close="dialog.close()"
    @closed="emit('closed')"
  >
    <template #header>{{ i18n.ts.notificationSetting }}</template>

    <MkSpacer :margin-min="20" :margin-max="28">
      <div class="_gaps_m">
        <template v-if="showGlobalToggle">
          <MkSwitch v-model="useGlobalSetting">
            {{ i18n.ts.useGlobalSetting }}
            <template #caption>{{ i18n.ts.useGlobalSettingDesc }}</template>
          </MkSwitch>
        </template>
        <template v-if="!useGlobalSetting">
          <MkInfo>{{ i18n.ts.notificationSettingDesc }}</MkInfo>
          <div class="_buttons">
            <MkButton inline @click="disableAll">{{
              i18n.ts.disableAll
            }}</MkButton>
            <MkButton inline @click="enableAll">{{
              i18n.ts.enableAll
            }}</MkButton>
          </div>
          <MkSwitch
            v-for="ntype in notificationTypes"
            :key="ntype"
            v-model="typesMap[ntype]"
            >{{ i18n.t(`_notification._types.${ntype}`) }}</MkSwitch
          >
        </template>
      </div>
    </MkSpacer>
  </MkModalWindow>
</template>

<script lang="ts" setup>
import {} from "vue";
import { notificationTypes } from "misskey-js";
import MkSwitch from "./MkSwitch.vue";
import MkInfo from "./MkInfo.vue";
import MkButton from "./MkButton.vue";
import MkModalWindow from "@/components/MkModalWindow.vue";
import { i18n } from "@/i18n";

const emit = defineEmits<{
  (ev: "done", v: { includingTypes: string[] | null }): void;
  (ev: "closed"): void;
}>();

const props = withDefaults(
  defineProps<{
    includingTypes?: (typeof notificationTypes)[number][] | null;
    showGlobalToggle?: boolean;
  }>(),
  {
    includingTypes: () => [],
    showGlobalToggle: true,
  }
);

let includingTypes = $computed(() => props.includingTypes || []);

const dialog = $shallowRef<InstanceType<typeof MkModalWindow>>();

let typesMap = $ref<Record<(typeof notificationTypes)[number], boolean>>({});
let useGlobalSetting = $ref(
  (includingTypes === null || includingTypes.length === 0) &&
    props.showGlobalToggle
);

for (const ntype of notificationTypes) {
  typesMap[ntype] = includingTypes.includes(ntype);
}

function ok() {
  if (useGlobalSetting) {
    emit("done", { includingTypes: null });
  } else {
    emit("done", {
      includingTypes: (
        Object.keys(typesMap) as (typeof notificationTypes)[number][]
      ).filter((type) => typesMap[type]),
    });
  }

  dialog.close();
}

function disableAll() {
  for (const type in typesMap) {
    typesMap[type as (typeof notificationTypes)[number]] = false;
  }
}

function enableAll() {
  for (const type in typesMap) {
    typesMap[type as (typeof notificationTypes)[number]] = true;
  }
}
</script>
