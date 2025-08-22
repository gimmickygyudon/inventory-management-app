<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from '#imports'
import type { TabsItem } from '@nuxt/ui'

const items: TabsItem[] = [
  { label: 'Home', value: 'home', slot: 'home' },
  { label: 'Three JS', value: 'three-js', slot: 'three-js' }
]

const route = useRoute()
const router = useRouter()

const activeTab = computed({
  get: () => (route.path === '/' ? 'home' : route.path.replace('/', '')),
  set: (tab: string) => {
    console.log('Tab changed to:', tab)

    let path = `/${tab}`
    if (tab === 'home') path = '/'
    router.replace(path)
  }
})
</script>

<template>
  <UApp>
    <div class="app-flex-col">
      <UTabs v-model="activeTab" variant="link" :content="false" :items="items" class="w-full tabs" />
      <NuxtPage class="body page-flex-1" />
    </div>
  </UApp>
</template>
