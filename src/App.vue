<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "./components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";
import { provide, reactive } from "vue";
import type User from '@/types/User'
import type Entry from "@/types/Entry";
import { userInjectionKey } from './injectionKeys'

const user = reactive<User>({
  id: 1,
  username: "burmese_potato",
  settings: []
})
provide(userInjectionKey, user)

const entries = reactive<Entry[]>([])

/* METHODS */
const handleEntry = (entry: Entry) => {
  entries.push(entry)
}

</script>

<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor @create="handleEntry" />
    <ul>
      <li v-for="entry in entries" :key="entry.id">
        <EntryCard :entry="entry" />
      </li>
    </ul>
  </main>
</template>
