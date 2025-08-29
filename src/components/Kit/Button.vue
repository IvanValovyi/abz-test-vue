<script setup>
const props = defineProps({
    text: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: "button" },
    link: { type: String, default: "" },
});

const emit = defineEmits(["click"]);

function handleClick(event) {
    if (!props.disabled && !props.link) {
        emit("click", event);
    }
}
</script>

<template>
    <component :is="link ? 'a' : 'button'" class="btn btn--primary" :href="link || null" :type="!link ? type : null"
        :disabled="disabled" @click="handleClick">
        {{ text }}
    </component>
</template>
