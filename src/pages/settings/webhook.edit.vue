<template>
  <div class="_gaps_m">
    <MkInput v-model="name">
      <template #label>Name</template>
    </MkInput>

    <MkInput v-model="url" type="url">
      <template #label>URL</template>
    </MkInput>

    <MkInput v-model="secret">
      <template #prefix><i class="ti ti-lock"></i></template>
      <template #label>Secret</template>
    </MkInput>

    <FormSection>
      <template #label>Events</template>

      <div class="_gaps_s">
        <MkSwitch v-model="event_follow">Follow</MkSwitch>
        <MkSwitch v-model="event_followed">Followed</MkSwitch>
        <MkSwitch v-model="event_note">Note</MkSwitch>
        <MkSwitch v-model="event_reply">Reply</MkSwitch>
        <MkSwitch v-model="event_renote">Renote</MkSwitch>
        <MkSwitch v-model="event_reaction">Reaction</MkSwitch>
        <MkSwitch v-model="event_mention">Mention</MkSwitch>
      </div>
    </FormSection>

    <MkSwitch v-model="active">Active</MkSwitch>

    <div class="_buttons">
      <MkButton primary inline @click="save"
        ><i class="ti ti-check"></i> {{ i18n.ts.save }}</MkButton
      >
      <MkButton danger inline @click="del"
        ><i class="ti ti-trash"></i> {{ i18n.ts.delete }}</MkButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import {} from "vue";
import MkInput from "@/components/MkInput.vue";
import FormSection from "@/components/form/section.vue";
import MkSwitch from "@/components/MkSwitch.vue";
import MkButton from "@/components/MkButton.vue";
import * as os from "@/os";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import { useRouter } from "@/router";

const router = useRouter();

const props = defineProps<{
  webhookId: string;
}>();

const webhook = await os.api("i/webhooks/show", {
  webhookId: props.webhookId,
});

let name = $ref(webhook.name);
let url = $ref(webhook.url);
let secret = $ref(webhook.secret);
let active = $ref(webhook.active);

let event_follow = $ref(webhook.on.includes("follow"));
let event_followed = $ref(webhook.on.includes("followed"));
let event_note = $ref(webhook.on.includes("note"));
let event_reply = $ref(webhook.on.includes("reply"));
let event_renote = $ref(webhook.on.includes("renote"));
let event_reaction = $ref(webhook.on.includes("reaction"));
let event_mention = $ref(webhook.on.includes("mention"));

async function save(): Promise<void> {
  const events = [];
  if (event_follow) events.push("follow");
  if (event_followed) events.push("followed");
  if (event_note) events.push("note");
  if (event_reply) events.push("reply");
  if (event_renote) events.push("renote");
  if (event_reaction) events.push("reaction");
  if (event_mention) events.push("mention");

  os.apiWithDialog("i/webhooks/update", {
    name,
    url,
    secret,
    webhookId: props.webhookId,
    on: events,
    active,
  });
}

async function del(): Promise<void> {
  const { canceled } = await os.confirm({
    type: "warning",
    text: i18n.t("deleteAreYouSure", { x: webhook.name }),
  });
  if (canceled) return;

  await os.apiWithDialog("i/webhooks/delete", {
    webhookId: props.webhookId,
  });

  router.push("/settings/webhook");
}
const headerActions = $computed(() => []);

const headerTabs = $computed(() => []);

definePageMetadata({
  title: "Edit webhook",
  icon: "ti ti-webhook",
});
</script>
