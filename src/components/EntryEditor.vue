<script lang="ts" setup>
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";
import { ref, computed, onMounted, inject } from 'vue'
import type Emoji from '@/types/Emoji'
import type Entry from "@/types/Entry";
import { userInjectionKey } from "@/injectionKeys";


const injectedUser = inject(userInjectionKey)

/* DATA */
const text = ref('')
const emoji = ref<Emoji|null>(null)
const charCount = computed(() => text.value.length)
const maxTextLength = 280

/* EVENTS */
// defineEmits(['create'])
const emit = defineEmits<{
  (e: 'create', entry: Entry): void
}>()

/* METHODS */
const handleTextInput = (e: Event) => {
  const textarea = e.target as HTMLTextAreaElement;
  if (textarea.value.length <= maxTextLength) {
    text.value = textarea.value
  } else {
    text.value = textarea.value = textarea.value.substring(0, maxTextLength)
  }
}

const handleSubmit = () => {
  emit('create', { 
    body: text.value, 
    emoji: emoji.value, 
    createdAt: new Date(), 
    id: Math.random(), 
    userId: injectedUser?.id
  } as Entry)
  text.value = ''
  emoji.value = null
}

/* TEMPLATE REFS */
const refTextarea = ref<HTMLTextAreaElement | null>(null)
onMounted(() => refTextarea.value?.focus())


</script>
<template>
  <form class="entry-form" @submit.prevent="handleSubmit">
    <textarea ref="refTextarea" :placeholder="`New Journal Entry for ${injectedUser?.username || 'anonymous'}`" v-model="text" @keyup="handleTextInput"></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>{{ charCount }} / {{ maxTextLength }}</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>

