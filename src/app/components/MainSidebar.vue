<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    // General
    {
      label: 'General',
      type: 'label',
    },
        {
            label: 'Dashboard',
            icon: 'i-lucide-app-window',
            to: '/',
        },

    // Inventory
    {
      label: 'Inventory',
      type: 'label',
    },
        {
            label: 'Products',
            icon: 'i-lucide-box',
            to: '/inventory-list'
        },
        {
            label: 'Suppliers',
            icon: 'i-lucide-users',
            to: '/suppliers'
        },
        {
            label: 'Recycle',
            icon: 'i-lucide-recycle',
            to: '/orders'
        },

    // Logistic
    {
      label: 'Logistics',
      type: 'label',
    },
        {
            label: 'Shipments',
            icon: 'i-lucide-truck',
            to: '/shipments'
        },
        {
            label: 'Tracking',
            icon: 'i-lucide-map-pin',
            to: '/tracking'
        },
        {
            label: 'Warehouse',
            icon: 'i-lucide-warehouse',
            to: '/three-js',
            badge: '3D'
        },
        {
            label: 'Orders',
            icon: 'i-lucide-clipboard-list',
            to: '/orders'
        },
    // Marketing
    {
      label: 'Marketing',
      type: 'label',
    },
        {
            label: 'Customers',
            icon: 'i-lucide-users',
            to: '/customers'
        },
        {
            label: 'Analytics',
            icon: 'i-lucide-pie-chart',
            to: '/analytics'
        },
  ],
  [
    {
        label: 'Reports',
        icon: 'i-lucide-bar-chart-3',
        to: '/reports'
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
  ]
])
</script>

<template>
    <div>
        <UNavigationMenu orientation="vertical" :items="items" tooltip class="data-[orientation=vertical]:w-48" />
    </div>
</template>