<script lang="ts" setup>
import Entry from "@/types/Entry";
import DateDisplay from "./DateDisplay.vue";
import UseEmojis from "@/composables/UseEmojis";
import { userInjectionKey } from "@/injectionKeys";
import { inject } from "vue";

const { findEmoji } = UseEmojis();

interface Props {
  entry: Entry
}
defineProps<Props>()

const injectedUser = inject(userInjectionKey)

</script>
<template>
  <div class="entry-card">
    <div class="entry-card-body">
      <component width="75" :is="findEmoji(entry.emoji)"></component>
      <div class="entry-text">{{ entry.body }}</div>
    </div>
    <div class="entry-footer">
      <DateDisplay :date="entry.createdAt" class="mr-2" />
      |
      <span class="ml-2">{{ injectedUser?.username || 'anonymous' }}</span>
    </div>
  </div>
</template>
