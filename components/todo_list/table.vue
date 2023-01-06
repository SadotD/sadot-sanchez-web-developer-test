<!-- @format -->

<template>
    <div class="justify-center mt-6">
        <div v-if="todos.length === 0" class="text-center text-xl">
            <p>No to-dos yet :(</p>
            <br />
            <i class="text-lg">Click the button above to add one</i>
        </div>
        <div v-else class="flex flex-col items-center justify-center">
            <i class="text-lg mr-32">Filters:</i>
            <div
                class="inline-flex rounded-md justify-center mb-2 relative"
                role="group"
            >
                <button
                    type="button"
                    class="py-2 px-2 text-sm font-medium bg-white rounded-l-md border-gray-400 focus:z-10 focus:ring-teal-400"
                    :class="{
                        'bg-teal-500 text-white md:hover:bg-teal-700':
                            showPending,
                        'md:hover:bg-gray-300': !showPending,
                    }"
                    @click="showPending = !showPending"
                >
                    Pending
                </button>
                <button
                    type="button"
                    class="py-2 px-2 text-sm font-medium bg-white border-gray-400 focus:z-10 focus:ring-teal-400"
                    :class="{
                        'bg-teal-500 text-white md:hover:bg-teal-700':
                            showWorkingOnIt,
                        'md:hover:bg-gray-300': !showWorkingOnIt,
                    }"
                    @click="showWorkingOnIt = !showWorkingOnIt"
                >
                    Working on it
                </button>
                <button
                    type="button"
                    class="py-2 px-2 text-sm font-medium bg-white rounded-r-md border-gray-400 focus:z-10 focus:ring-teal-400"
                    :class="{
                        'bg-teal-500 text-white md:hover:bg-teal-700':
                            showCompleted,
                        'md:hover:bg-gray-300': !showCompleted,
                    }"
                    @click="showCompleted = !showCompleted"
                >
                    Completed
                </button>
            </div>
            <div
                class="flex justify-center gap-2 md:gap-10 min-w-full mt-4"
                v-if="showPending || showWorkingOnIt || showCompleted"
            >
                <div v-if="showPending" class="w-1/3">
                    <TodoListIndividualList
                        :todos="pendingTodos"
                        :status="'Pending'"
                    />
                </div>
                <div v-if="showWorkingOnIt" class="w-1/3">
                    <TodoListIndividualList
                        :todos="workingOnItTodos"
                        :status="'Working on it'"
                    />
                </div>
                <div v-if="showCompleted" class="w-1/3">
                    <TodoListIndividualList
                        :todos="completedTodos"
                        :status="'Completed'"
                    />
                </div>
            </div>
            <div v-else class="text-center mt-12">
                <i class="text-md"
                    >No status selected, press any status button to show its
                    corresponding list</i
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    // Set the Todo type
    type Todo = {
        id: string;
        title: string;
        description: string;
        status: "Pending" | "Working on it" | "Completed";
        priority: number;
        createdAt: number;
        updatedAt?: number;
    };

    const todos = ref<Todo[]>([]);
    const showPending = ref(true);
    const showWorkingOnIt = ref(true);
    const showCompleted = ref(true);

    // Get the todos from firestore
    const getTodos = async () => {
        const { result: todosCollection } = await $fetch(
            "/api/todoitems/query?collection=todoitems",
            { method: "GET" }
        );
        todos.value = todosCollection
            .map((doc: any) => {
                return {
                    id: doc.id,
                    title: doc.title,
                    description: doc.description,
                    status: doc.status,
                    priority: parseInt(doc.priority),
                    createdAt: doc.createdAt?.seconds,
                    updatedAt: doc.updatedAt?.seconds,
                };
            })
            .sort((a: Todo, b: Todo) =>
                // Sort by priority and then by updatedAt (if updatedAt is not available, use createdAt)
                a.priority === b.priority
                    ? (b.updatedAt || b.createdAt) -
                      (a.updatedAt || a.createdAt)
                    : b.priority - a.priority
            );
    };

    // Get the todos when the component is mounted
    onMounted(() => {
        getTodos();
    });

    // Filter the todos based on the showPending, showWorkingOnIt, and showCompleted props
    const pendingTodos = computed(() => {
        return todos.value.filter((todo) => todo.status === "Pending");
    });

    const workingOnItTodos = computed(() => {
        return todos.value.filter((todo) => todo.status === "Working on it");
    });

    const completedTodos = computed(() => {
        return todos.value.filter((todo) => todo.status === "Completed");
    });
</script>

<style scoped></style>
