<script setup lang="ts">
import { Box, CameraControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

</script>

<template>
  <TresCanvas clear-color="#222222">
    <TresPerspectiveCamera :position="[6, 6, 8]" :fov="75" />
    <CameraControls />
      <Grid
        cell-color="#82dbc5"
        section-color="#fbb03b"
        :args="[10.5, 10.5]"
        :cell-size="0.6"
        :cell-thickness="0.5"
        :section-size="2"
        :section-thickness="1.3"
        :infinite-grid="true"
        :follow-camera="true"
        :fade-from="1"
        :fade-distance="30"
        :fade-strength="1"
      />
    <Box :scale="2"  :position="[0, 1, 0]">
      <TresMeshToonMaterial color="orange"/>
    </Box>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>