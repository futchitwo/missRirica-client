<template>
  <MkStickyContainer>
    <template #header
      ><MkPageHeader
        v-model:tab="tab"
        :actions="headerActions"
        :tabs="headerTabs"
    /></template>
    <MkSpacer :content-max="700">
      <div v-if="tab === 'featured'" class="">
        <MkPagination v-slot="{ items }" :pagination="featuredFlashsPagination">
          <div class="_gaps_s">
            <MkFlashPreview
              v-for="flash in items"
              :key="flash.id"
              class=""
              :flash="flash"
            />
          </div>
        </MkPagination>
      </div>

      <div v-else-if="tab === 'my'" class="my">
        <div class="_gaps">
          <MkButton
            class="new"
            gradate
            rounded
            style="margin: 0 auto"
            @click="create()"
            ><i class="ti ti-plus"></i
          ></MkButton>
          <MkPagination v-slot="{ items }" :pagination="myFlashsPagination">
            <div class="_gaps_s">
              <MkFlashPreview
                v-for="flash in items"
                :key="flash.id"
                class=""
                :flash="flash"
              />
            </div>
          </MkPagination>
        </div>
      </div>

      <div v-else-if="tab === 'liked'" class="">
        <MkPagination v-slot="{ items }" :pagination="likedFlashsPagination">
          <div class="_gaps_s">
            <MkFlashPreview
              v-for="like in items"
              :key="like.flash.id"
              class=""
              :flash="like.flash"
            />
          </div>
        </MkPagination>
      </div>
    </MkSpacer>
  </MkStickyContainer>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue";
import MkFlashPreview from "@/components/MkFlashPreview.vue";
import MkPagination from "@/components/MkPagination.vue";
import MkButton from "@/components/MkButton.vue";
import { useRouter } from "@/router";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";

const router = useRouter();

let tab = $ref("featured");

const featuredFlashsPagination = {
  endpoint: "flash/featured" as const,
  noPaging: true,
};
const myFlashsPagination = {
  endpoint: "flash/my" as const,
  limit: 5,
};
const likedFlashsPagination = {
  endpoint: "flash/my-likes" as const,
  limit: 5,
};

function create() {
  router.push("/play/new");
}

const headerActions = $computed(() => [
  {
    icon: "ti ti-plus",
    text: i18n.ts.create,
    handler: create,
  },
]);

const headerTabs = $computed(() => [
  {
    key: "featured",
    title: i18n.ts._play.featured,
    icon: "ti ti-flare",
  },
  {
    key: "my",
    title: i18n.ts._play.my,
    icon: "ti ti-edit",
  },
  {
    key: "liked",
    title: i18n.ts._play.liked,
    icon: "ti ti-heart",
  },
]);

definePageMetadata(
  computed(() => ({
    title: "Play",
    icon: "ti ti-player-play",
  }))
);
</script>

<style lang="scss" scoped>
.rknalgpo {
  &.my .ckltabjg:first-child {
    margin-top: 16px;
  }

  .ckltabjg:not(:last-child) {
    margin-bottom: 8px;
  }

  @media (min-width: 500px) {
    .ckltabjg:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}
</style>
