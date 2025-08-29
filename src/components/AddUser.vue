<script setup>
import { Form } from "vee-validate";
import Input from "./Kit/Input.vue";
import RadioGroup from "./Kit/RadioGroup.vue";
import Button from "./Kit/Button.vue";
import UploadImage from "./Kit/UploadImage.vue";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import { userSchema } from "../validation/schemas";
import { useStore } from 'vuex';
import SuccessPopup from "./Kit/SuccessPopup.vue";
import OverlayLoader from "./Kit/OverlayLoader.vue";

const positions = ref([]);
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const token = ref("");
const store = useStore();

// Завантаження позицій із API
const fetchPositions = async () => {
    try {
        const res = await axios.get("https://frontend-test-assignment-api.abz.agency/api/v1/positions");
        positions.value = res.data.positions;
    } catch (err) {
        console.error("Failed to load positions:", err);
    }
};

// Отримання токена
const fetchToken = async () => {
    try {
        const res = await axios.get("https://frontend-test-assignment-api.abz.agency/api/v1/token");
        token.value = res.data.token;
    } catch (err) {
        console.error("Failed to load token:", err);
    }
};

onBeforeMount(() => {
    fetchPositions();
    fetchToken();
});

// Відправка форми
const onSubmit = async (values, { resetForm }) => {
    if (!token.value) {
        errorMessage.value = "Token is missing.";
        return;
    }

    loading.value = true;
    successMessage.value = "";
    errorMessage.value = "";

    const formData = new FormData();

    // Видалення непотрібних символів з номеру телефону
    values.phone = values.phone.replace(/[()-\s]/g, "");

    // Додавання всіх полів до FormData
    Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
    });

    try {
        const res = await axios.post(
            "https://frontend-test-assignment-api.abz.agency/api/v1/users",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Token": token.value
                }
            }
        );

        if (res.data.success) {
            successMessage.value = "User created successfully!";

            // Перезавантажуємо першу сторінку користувачів
            await store.dispatch('users/fetchUsers', { nextPage: false });

            resetForm();
        } else {
            errorMessage.value = res.data.message || "Failed to create user.";
        }
    } catch (err) {
        console.error(err);
        errorMessage.value = err.response?.data?.message || "Server error.";
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <section class="add-user container" id="add-user">
        <h2 class="add-user__title title-text">Working with POST request</h2>

        <Form :validation-schema="userSchema" @submit="onSubmit" class="add-user__form">
            <div class="add-user__form-content">
                <Input name="name" label="Your name" type="text" />
                <Input name="email" label="Email" type="email" />
                <Input name="phone" label="Phone" helpText="+38 (0XX) XXX-XX-XX" mask="+38 (0##) ###-##-##"
                    type="tel" />

                <RadioGroup name="position_id" :options="positions" label="Select your position" />

                <UploadImage name="photo" placeholder="Upload your photo" button-text="Upload" />

                <p v-if="errorMessage" class="add-user__error-message">{{ errorMessage }}</p>

                <div class="add-user__submit">
                    <Button :disabled="loading" text="Submit" type="submit" />
                </div>
            </div>

            <OverlayLoader v-if="loading" />
            <SuccessPopup :message="successMessage" @close="() => successMessage = ''" v-if="successMessage" />
        </Form>
    </section>
</template>
