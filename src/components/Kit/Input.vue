<script setup>
import { vMaska } from "maska/vue";
import { useField } from "vee-validate";
import { computed, ref } from "vue";

const props = defineProps({
    name: { type: String, required: true },
    type: { type: String, default: "text" },
    label: { type: String, default: "" },
    helpText: { type: String, default: "" },
    mask: { type: String, default: "" },
});

const { value, errorMessage, handleBlur, meta } = useField(props.name);

const hasError = computed(() => !!errorMessage.value && meta.touched);
const isFocused = ref(false);

const onFocus = () => (isFocused.value = true);
const onBlur = (e) => {
    handleBlur(e);
    isFocused.value = false;
};
</script>

<template>
    <label class="input-field" :class="{ error: hasError, focused: isFocused || value }" :for="props.name">
        <span v-if="props.label" class="input-field__label">{{ props.label }}</span>

        <input :id="props.name" :type="props.type" v-model="value" v-maska="props.mask" @focus="onFocus" @blur="onBlur"
            class="input-field__input" />

        <span v-if="props.helpText && !hasError" class="input-field__help">
            {{ props.helpText }}
        </span>
        <span v-show="hasError" class="input-field__error">{{ errorMessage }}</span>
    </label>
</template>

<script>
import { vMaska } from "maska/vue";

export default {
    directives: {
        maska: vMaska,
    },
};
</script>
