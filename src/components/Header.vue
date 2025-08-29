<script setup>
import LogoIcon from '../assets/images/logo.svg'
import Button from './Kit/Button.vue';
</script>

<template>
    <header class="header">
        <div class="container header__inner">
            <LogoIcon class="logo" />

            <div class="button__group">
                <Button text="Users" link="#users" />
                <Button text="Sign up" link="#add-user" />
            </div>
        </div>
    </header>
</template>