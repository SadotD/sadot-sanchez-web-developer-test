<!-- @format -->

<template>
    <div
        class="backdrop-blur-sm top-0 left-0 fixed w-full h-full flex items-center justify-center"
        @click.self="emit('close')"
    >
        <form
            class="bg-white shadow-md rounded-3xl px-8 pt-6 pb-6 mb-4 w-11/12 md:w-1/2"
            @submit.prevent="handleSubmit"
        >
            <button
                class="float-right text-gray-500 hover:text-gray-700"
                @click="emit('close')"
            >
                &times;
            </button>
            <h2 class="text-2xl font-bold text-center mb-4">
                {{ type === "add" ? "Add Todo" : "Edit Todo" }}
            </h2>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="title"
                >
                    Title
                </label>
                <input
                    class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 hover:border-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Title"
                    v-model="title"
                    required
                    @keyup.enter="handleSubmit"
                />
            </div>
            <div class="mb-3">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="description"
                >
                    Description
                </label>
                <textarea
                    class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 hover:border-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Description"
                    v-model="description"
                    required
                ></textarea>
            </div>
            <div v-if="type === 'edit'">
                <!-- Select to modify status -->
                <div class="mb-4">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="status"
                    >
                        Status
                    </label>
                    <div class="relative">
                        <!-- Make it mobile responsive -->
                        <select
                            class="block appearance-none w-full bg-white border text-gray-700 hover:border-gray-400 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                            id="status"
                            v-model="status"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Working on it">Working on it</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                        >
                            <svg
                                class="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="flex flex-col md:flex-row md:items-center justify-between md:gap-4"
            >
                <!-- Priority in number -->
                <div class="mb-4 w-full">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="priority"
                    >
                        Priority
                    </label>
                    <input
                        class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 hover:border-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                        id="priority"
                        type="number"
                        placeholder="Priority"
                        v-model="priority"
                        @keyup.enter="handleSubmit"
                    />
                </div>
                <!-- Delete button for edit -->

                <button
                    class="mt-3 md:w-full text-center bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    :disabled="isLoading"
                >
                    <div v-if="isLoading">
                        <svg
                            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            ></path>
                        </svg>
                    </div>
                    <div v-else>
                        {{ type === "add" ? "Add" : "Edit" }}
                    </div>
                </button>
                <button
                    class="mt-3 md:w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    @click="showDeleteModal = true"
                    v-if="type === 'edit'"
                >
                    Delete
                </button>
            </div>
        </form>
        <TodoListDeleteTodoModal
            v-if="showDeleteModal && existingTodo"
            :id="existingTodo.id"
            @close="showDeleteModal = false"
        />
    </div>
</template>

<script setup lang="ts">
    type Todo = {
        id?: string;
        title: string;
        description: string;
        priority: number;
        status?: string;
    };

    const emit = defineEmits(["close"]);
    const { type, existingTodo } = defineProps<{
        type: string;
        existingTodo?: Todo;
    }>();

    const title = ref(existingTodo?.title || "");
    const description = ref(existingTodo?.description || "");
    const priority = ref(existingTodo?.priority || "");
    const status = ref(existingTodo?.status || "Pending");

    const showDeleteModal = ref(false);

    const isLoading = ref(false);

    const handleSubmit = async () => {
        isLoading.value = true;
        if (type === "add") {
            await addTodo();
        } else {
            await editTodo();
        }
        // Reload the page
        window.location.reload();
    };

    const addTodo = async () => {
        const todo = {
            title: title.value,
            description: description.value,
            priority: priority.value,
        } as Todo;

        await $fetch("/api/todoitems/add?collection=todoitems", {
            method: "POST",
            body: todo,
        })
            .then((response) => {
                console.log(response);
                emit("close");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editTodo = async () => {
        const todo = {
            id: existingTodo?.id,
            title: title.value,
            description: description.value,
            priority: priority.value,
            status: status.value,
        } as Todo;

        await $fetch("/api/todoitems/set?collection=todoitems", {
            method: "PUT",
            body: todo,
        })
            .then((response) => {
                console.log(response);
                emit("close");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    onMounted(() => {
        document.addEventListener("keyup", (event) => {
            if (event.key === "Enter") handleSubmit();
        });
    });
</script>

<style scoped></style>
