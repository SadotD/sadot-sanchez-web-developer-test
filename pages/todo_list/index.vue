<!-- @format -->

<template>
    <div>
        <h1 class="mb-6 ml-10 text-5xl font-extrabold">Todo List</h1>
        <div class="flex justify-center">
            <button
                class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                @click="showModal = true"
            >
                Add Todo
            </button>
        </div>
        <div>
            <TodoListTable />
        </div>
        <TodoModal v-if="showModal" @close="showModal = false" :type="'add'" />
    </div>
</template>

<script setup lang="ts">
    const showModal = ref(false);

    useHead({
        title: "Sadot Sanchez | Todo List",
        meta: [{ name: "description", content: "Todo List" }],
    });
</script>

<style scoped></style>
