<script setup>
import { ref, computed, watch } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true },
  placeholder: { type: String, default: "" },
  buttonText: { type: String, default: "Upload" },
});

const { value: file, errorMessage, meta, setValue } = useField(props.name);
const hasError = computed(() => !!errorMessage.value && meta.touched);

const fileInput = ref(null);
const fileName = ref("");
const filePreview = ref("");

const openFileDialog = () => fileInput.value.click();

const handleFileChange = (event) => {
  const f = event.target.files[0];
  if (!f) {
    resetFile();
    return;
  }
  setValue(f);
  fileName.value = f.name;
  filePreview.value = URL.createObjectURL(f);
};

const handleDrop = (event) => {
  event.preventDefault();
  const f = event.dataTransfer.files[0];
  if (!f) {
    resetFile();
    return;
  }
  setValue(f);
  fileName.value = f.name;
  filePreview.value = URL.createObjectURL(f);
};

const handleDragOver = (event) => event.preventDefault();

const resetFile = () => {
  setValue(null);
  fileName.value = "";
  filePreview.value = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

watch(file, (newVal) => {
  if (!newVal) {
    resetFile();
  }
});
</script>

<template>
  <div class="image-uploader" :class="{ error: hasError }">
    <div class="image-uploader__container" @drop="handleDrop" @dragover="handleDragOver">
      <button type="button" class="image-uploader__button" @click="openFileDialog">
        {{ buttonText }}
      </button>
      <div class="image-uploader__text">{{ fileName || props.placeholder }}</div>

      <input type="file" ref="fileInput" class="image-uploader__input" :name="props.name" accept="image/jpeg,image/jpg"
        @change="handleFileChange" hidden />
    </div>

    <div v-if="fileName" class="image-uploader-preview">
      <img v-if="filePreview" :src="filePreview" alt="preview" class="image-uploader-preview__image" />
      <span class="image-uploader-preview__text">{{ fileName }}</span>
    </div>

    <span v-if="hasError" class="input-field__error">{{ errorMessage }}</span>
  </div>
</template>
