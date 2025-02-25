import * as Misskey from "misskey-js";
import { markRaw } from "vue";
import { $i } from "@/account";

export const stream = $i
  ? markRaw(
      new Misskey.Stream($i.instanceUrl, {
        token: $i?.token,
      })
    )
  : null;
