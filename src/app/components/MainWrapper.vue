
<template>
    <div class="padding-widget">
        <div class="sidebar-content-layout">
            <MainSidebar />
            <div class="rounded-content">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// PaddingWidget logic (if needed)
</script>

<style scoped>
    .padding-widget {
        padding: 12px;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }

    .sidebar-content-layout {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        gap: 12px;
    }

    .rounded-content {
        border-radius: 12px;
        border: 1px solid;
        border-color: var(--ui-bg);
        overflow: hidden;
        height: 100%;
        width: 100%;
        flex: 1 1 0%;
    }
</style>
