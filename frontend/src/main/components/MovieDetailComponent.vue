<template>
    <div class="mt-3">
        <p v-if="value"><strong>{{ label }}</strong> {{ value }}</p>
    </div>
</template>

<script setup>

import { defineProps } from 'vue';
// eslint-disable-next-line
const props = defineProps({
    label: { type: String, required: true },
    value: { type: String, default: '' }
});
</script>

<style scoped>
</style>
