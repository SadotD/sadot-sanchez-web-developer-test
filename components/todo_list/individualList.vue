<!-- @format -->

<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-lg md:text-2xl font-bold text-center">{{ status }}</h1>
        <hr class="bg-stone-600 h-1 w-5/6 self-center" />
        <div v-if="todos?.length > 0" v-for="todo in todos" :key="todo.id">
            <div class="flex justify-center">
                <div
                    class="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 w-full"
                >
                    <div class="px-2 py-1 md:px-6 md:py-4">
                        <div class="font-bold text-md md:text-xl mb-1 md:mb-2">
                            {{ todo.title }}
                        </div>
                        <hr class="mb-3" />
                        <div class="flex flex-col md:flex-row justify-between">
                            <div class="flex flex-col mb-2">
                                <p class="text-gray-700 text-xs md:text-sm">
                                    <i>Status: </i>{{ todo.status }}
                                </p>
                                <p class="text-gray-700 text-xs md:text-sm">
                                    <i>Priority: </i>{{ todo.priority }}
                                </p>
                            </div>
                            <div class="flex flex-col">
                                <button
                                    class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded focus:outline-none focus:shadow-outline text-sm md:text-md hover:scale-110 transition-all duration-500 ease-in-out"
                                    @click="showModal = true"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TodoModal
                v-if="showModal"
                @close="showModal = false"
                :type="'edit'"
                :existing-todo="todo"
            />
        </div>
        <div v-else class="text-center">
            <i class="text-sm md:text-xl">
                No "{{ status.toLowerCase() }}" to-dos yet!
            </i>
        </div>
    </div>
</template>

<script setup lang="ts">
    type Todo = {
        id: string;
        title: string;
        description: string;
        status: "Pending" | "Working on it" | "Completed";
        priority: number;
        createdAt: number;
    };

    const { todos, status } = defineProps<{ todos: Todo[]; status: string }>();

    const showModal = ref(false);
</script>

<style scoped></style>
