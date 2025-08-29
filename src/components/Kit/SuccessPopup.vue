<script setup>
import Button from './Button.vue';

const props = defineProps({
    message: { type: String, required: true },
});

const emit = defineEmits(['close']);

function handleClose(event) {
    if (!props.disabled) {
        emit('close', event);
    }
}
</script>

<template>
    <div class="success-popup container">
        <h3 class="success-popup__message title-text">{{ props.message }}</h3>
        <img src="../../assets/images/success.webp" alt="Success" class="success-popup__image">
        <Button @click="handleClose" text="Ok" />
    </div>
</template>