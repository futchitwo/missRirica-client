<template>
  <MkStickyContainer>
    <template #header
      ><MkPageHeader
        v-model:tab="tab"
        :actions="headerActions"
        :tabs="headerTabs"
    /></template>
    <MkSpacer :content-max="1400">
      <div class="_root">
        <div v-if="tab === 'explore'">
          <MkFoldableSection class="_margin">
            <template #header
              ><i class="ti ti-clock"></i>{{ i18n.ts.recentPosts }}</template
            >
            <MkPagination
              v-slot="{ items }"
              :pagination="recentPostsPagination"
              :disable-auto-load="true"
            >
              <div class="vfpdbgtk">
                <MkGalleryPostPreview
                  v-for="post in items"
                  :key="post.id"
                  :post="post"
                  class="post"
                />
              </div>
            </MkPagination>
          </MkFoldableSection>
          <MkFoldableSection class="_margin">
            <template #header
              ><i class="ti ti-comet"></i>{{ i18n.ts.popularPosts }}</template
            >
            <MkPagination
              v-slot="{ items }"
              :pagination="popularPostsPagination"
              :disable-auto-load="true"
            >
              <div class="vfpdbgtk">
                <MkGalleryPostPreview
                  v-for="post in items"
                  :key="post.id"
                  :post="post"
                  class="post"
                />
              </div>
            </MkPagination>
          </MkFoldableSection>
        </div>
        <div v-else-if="tab === 'liked'">
          <MkPagination v-slot="{ items }" :pagination="likedPostsPagination">
            <div class="vfpdbgtk">
              <MkGalleryPostPreview
                v-for="like in items"
                :key="like.id"
                :post="like.post"
                class="post"
              />
            </div>
          </MkPagination>
        </div>
        <div v-else-if="tab === 'my'">
          <MkA to="/gallery/new" class="_link" style="margin: 16px"
            ><i class="ti ti-plus"></i> {{ i18n.ts.postToGallery }}</MkA
          >
          <MkPagination v-slot="{ items }" :pagination="myPostsPagination">
            <div class="vfpdbgtk">
              <MkGalleryPostPreview
                v-for="post in items"
                :key="post.id"
                :post="post"
                class="post"
              />
            </div>
          </MkPagination>
        </div>
      </div>
    </MkSpacer>
  </MkStickyContainer>
</template>

<script lang="ts" setup>
import { computed, defineComponent, watch } from "vue";
import XUserList from "@/components/MkUserList.vue";
import MkFoldableSection from "@/components/MkFoldableSection.vue";
import MkInput from "@/components/MkInput.vue";
import MkButton from "@/components/MkButton.vue";
import MkTab from "@/components/MkTab.vue";
import MkPagination from "@/components/MkPagination.vue";
import MkGalleryPostPreview from "@/components/MkGalleryPostPreview.vue";
import number from "@/filters/number";
import * as os from "@/os";
import { definePageMetadata } from "@/scripts/page-metadata";
import { i18n } from "@/i18n";
import { useRouter } from "@/router";

const router = useRouter();

const props = defineProps<{
  tag?: string;
}>();

let tab = $ref("explore");
let tags = $ref([]);
let tagsRef = $ref();

const recentPostsPagination = {
  endpoint: "gallery/posts" as const,
  limit: 6,
};
const popularPostsPagination = {
  endpoint: "gallery/featured" as const,
  limit: 5,
};
const myPostsPagination = {
  endpoint: "i/gallery/posts" as const,
  limit: 5,
};
const likedPostsPagination = {
  endpoint: "i/gallery/likes" as const,
  limit: 5,
};

const tagUsersPagination = $computed(() => ({
  endpoint: "hashtags/users" as const,
  limit: 30,
  params: {
    tag: this.tag,
    origin: "combined",
    sort: "+follower",
  },
}));

watch(
  () => props.tag,
  () => {
    if (tagsRef) tagsRef.tags.toggleContent(props.tag == null);
  }
);

const headerActions = $computed(() => [
  {
    icon: "ti ti-plus",
    text: i18n.ts.create,
    handler: () => {
      router.push("/gallery/new");
    },
  },
]);

const headerTabs = $computed(() => [
  {
    key: "explore",
    title: i18n.ts.gallery,
    icon: "ti ti-icons",
  },
  {
    key: "liked",
    title: i18n.ts._gallery.liked,
    icon: "ti ti-heart",
  },
  {
    key: "my",
    title: i18n.ts._gallery.my,
    icon: "ti ti-edit",
  },
]);

definePageMetadata({
  title: i18n.ts.gallery,
  icon: "ti ti-icons",
});
</script>

<style lang="scss" scoped>
.vfpdbgtk {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 12px;
  margin: 0 var(--margin);

  > .post {
  }
}
</style>
