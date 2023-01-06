<!-- @format -->

<template>
    <div>
        <NuxtLoadingIndicator />
        <div class="flex flex-col justify-between min-h-screen bg-slate-200">
            <header class="shadow-sm bg-white">
                <nav class="container mx-auto p-4 grid md:grid-cols-2 gap-y-4">
                    <h2 class="text-xl my-auto">
                        Sadot Sanchez - Web Developer Test
                    </h2>
                    <Transition>
                        <ul
                            class="flex flex-col md:flex-row md:gap-10 justify-end items-center col-span-2 md:col-span-1"
                        >
                            <li><NuxtLink to="/">Home</NuxtLink></li>
                            <li>
                                <NuxtLink to="/todo_list">To-do List</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/frontend_concepts"
                                    >Front-end Concepts</NuxtLink
                                >
                            </li>
                        </ul>
                    </Transition>
                </nav>
            </header>
            <div class="container mx-auto p-4 flex-grow">
                <slot />
            </div>
            <footer
                class="container mx-auto p-3 border-t-2 border-slate-400 flex justify-center items-center"
            >
                <div class="text-center text-gray-500 text-md lg:flex gap-2">
                    <p>Sadot Sanchez</p>
                </div>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style>
    .router-link-exact-active {
        color: #2dd4bf;
        font-weight: 600;
        border-bottom: 2px solid #2dd4bf;
    }
</style>
