<template>
  <div class="cpjygsrt" :class="{ error: error != null, warn: warn != null }">
    <header>
      <div class="title"><slot name="header"></slot></div>
      <div class="buttons">
        <slot name="func"></slot>
        <button v-if="removable" class="_button" @click="remove()">
          <i class="ti ti-trash"></i>
        </button>
        <button v-if="draggable" class="drag-handle _button">
          <i class="ti ti-menu-2"></i>
        </button>
        <button class="_button" @click="toggleContent(!showBody)">
          <template v-if="showBody"><i class="ti ti-chevron-up"></i></template>
          <template v-else><i class="ti ti-chevron-down"></i></template>
        </button>
      </div>
    </header>
    <p v-show="showBody" v-if="error != null" class="error">
      {{
        $t("_pages.script.typeError", {
          slot: error.arg + 1,
          expect: $t(`script.types.${error.expect}`),
          actual: $t(`script.types.${error.actual}`),
        })
      }}
    </p>
    <p v-show="showBody" v-if="warn != null" class="warn">
      {{ $t("_pages.script.thereIsEmptySlot", { slot: warn.slot + 1 }) }}
    </p>
    <div v-show="showBody" class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    expanded: {
      type: Boolean,
      default: true,
    },
    removable: {
      type: Boolean,
      default: true,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    error: {
      required: false,
      default: null,
    },
    warn: {
      required: false,
      default: null,
    },
  },
  emits: ["toggle", "remove"],
  data() {
    return {
      showBody: this.expanded,
    };
  },
  methods: {
    toggleContent(show: boolean) {
      this.showBody = show;
      this.$emit("toggle", show);
    },
    remove() {
      this.$emit("remove");
    },
  },
});
</script>

<style lang="scss" scoped>
.cpjygsrt {
  position: relative;
  overflow: hidden;
  background: var(--panel);
  border: solid 2px var(--X12);
  border-radius: 8px;

  &:hover {
    border: solid 2px var(--X13);
  }

  &.warn {
    border: solid 2px #dec44c;
  }

  &.error {
    border: solid 2px #f00;
  }

  > header {
    > .title {
      z-index: 1;
      margin: 0;
      padding: 0 16px;
      line-height: 42px;
      font-size: 0.9em;
      font-weight: bold;
      box-shadow: 0 1px rgba(#000, 0.07);

      > i {
        margin-right: 6px;
      }

      &:empty {
        display: none;
      }
    }

    > .buttons {
      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;

      > button {
        padding: 0;
        width: 42px;
        font-size: 0.9em;
        line-height: 42px;
      }

      .drag-handle {
        cursor: move;
      }
    }
  }

  > .warn {
    color: #b19e49;
    margin: 0;
    padding: 16px 16px 0 16px;
    font-size: 14px;
  }

  > .error {
    color: #f00;
    margin: 0;
    padding: 16px 16px 0 16px;
    font-size: 14px;
  }

  > .body {
    ::v-deep(.juejbjww),
    ::v-deep(.eiipwacr) {
      &:not(.inline):first-child {
        margin-top: 28px;
      }

      &:not(.inline):last-child {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
