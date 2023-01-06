<!-- @format -->

<template>
    <div>
        <h1 class="text-4xl ml-10">Home</h1>
        <p class="text-lg mt-5">
            Click one of the following links to go to its respective page:
        </p>
        <div class="flex flex-col items-center justify-center mt-12 gap-5">
            <NuxtLink to="/todo_list" class="text-lg">
                <button
                    class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Todo List
                </button>
            </NuxtLink>
            <NuxtLink to="/frontend_concepts" class="text-lg">
                <button
                    class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Frontend Concepts
                </button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
