<script setup>
import { useField } from "vee-validate";
import { computed } from "vue";

const props = defineProps({
    name: { type: String, required: true },
    options: { type: Array, required: true },
    label: { type: String, default: "" },
});

const { value, errorMessage, handleChange, meta } = useField(props.name);

const hasError = computed(() => !!errorMessage.value && meta.touched);

const onChange = (id) => {
    handleChange(id);
};
</script>

<template>
    <div class="radio-group" :class="{ error: hasError }">
        <p v-if="label" class="radio-group__label">{{ label }}</p>

        <div v-for="option in options" :key="option.id" class="radio-group__option" @click="onChange(option.id)">
            <div class="radio-group__circle" :class="{ checked: value == option.id }">
                <div class="radio-group__dot"></div>
            </div>
            <span class="radio-group__text">{{ option.name }}</span>
        </div>

        <span v-show="hasError" class="input-field__error">{{ errorMessage }}</span>
    </div>
</template>
