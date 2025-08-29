<script setup>
import { onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import Button from './Kit/Button.vue';
import Loader from './Kit/Loader.vue';

const store = useStore();

const users = computed(() => store.getters['users/usersList']);
const canLoadMore = computed(() => store.getters['users/canLoadMore']);
const isLoading = computed(() => store.getters['users/isLoading']);

const loadMore = () => {
    store.dispatch('users/fetchUsers', { nextPage: true });
};

onBeforeMount(() => {
    store.dispatch('users/fetchUsers');
});
</script>

<template>
    <section class="users container" id="users">
        <h2 class="users__title title-text">Working with GET request</h2>

        <div class="users__list">
            <div class="user__item" v-for="user in users" :key="user.id">
                <img :src="user.photo" alt="User avatar" class="user__avatar" />
                <div class="user__info">
                    <span class="user__name">{{ user.name }}</span>
                    <span class="user__position">{{ user.position }}</span>
                    <span class="user__email">{{ user.email }}</span>
                    <span class="user__phone">{{ user.phone }}</span>
                </div>
            </div>
        </div>

        <div class="users__load-more" v-if="canLoadMore">
            <Button text="Show more" @click="loadMore" v-if="!isLoading" />
            <Loader v-else />
        </div>
    </section>
</template>
