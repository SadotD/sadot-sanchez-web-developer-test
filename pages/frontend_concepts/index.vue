<!-- @format -->

<template>
    <div class="self-center">
        <div class="flex flex-col items-center my-auto">
            <h1 class="mb-6 text-3xl font-extrabold">
                Front-end concepts - CSS Positions
            </h1>

            <!-- Make a carrousel, when it reaches the end it should show the beginning -->
            <!-- and the next and previous cards blurred  -->
            <!-- NOTE: Use tailwind classes  -->
            <div class="flex justify-center items-center max-w-7xl mx-auto">
                <div class="relative">
                    <div class="py-6 px-16 md:px-24 rounded-xl bg-white">
                        <Transition>
                            <h1
                                class="text-2xl md:text-4xl font-bold absolute inset-x-0 top-4 text-center"
                                :key="carrouselCurrent.title"
                            >
                                {{ carrouselCurrent.title }}
                            </h1>
                        </Transition>
                        <Transition name="slide">
                            <div
                                :key="carrouselCurrent.title"
                                class="md:text-2xl lg:text-3xl xl:text-4xl xl:mt-16"
                            >
                                <p class="mt-8">
                                    <i>Description: </i>
                                    {{ carrouselCurrent.description }}
                                </p>
                                <p class="mt-4">
                                    <i>Uses: </i>
                                    {{ carrouselCurrent.uses }}
                                </p>
                            </div>
                        </Transition>
                    </div>
                    <!-- Arrows for left and right positioned absolute -->
                    <div class="absolute inset-y-0 left-4 flex items-center">
                        <button
                            class="h-5/6 bg-teal-500 hover:bg-teal-700 text-white font-bold px-1 md:px-4 rounded-lg focus:outline-none focus:shadow-outline hover:scale-110 transition-all duration-500 ease-in-out"
                            @click="carrouselIndex = carrouselPreviousIndex"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="absolute inset-y-0 right-4 flex items-center">
                        <button
                            class="h-5/6 bg-teal-500 hover:bg-teal-700 text-white font-bold px-1 md:px-4 rounded-lg focus:outline-none focus:shadow-outline hover:scale-110 transition-all duration-500 ease-in-out"
                            @click="carrouselIndex = carrouselNextIndex"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- Make a button group of all the carrousel -->
                <!-- NOTE: Use tailwind classes  -->
            </div>
            <div class="flex flex-row items-center gap-2 md:gap-4 mt-4">
                <button
                    v-for="(carrousel, index) in carrouselData"
                    :key="carrousel.title"
                    class="text-white font-bold py-2 px-2 md:px-4 rounded-lg focus:outline-none focus:shadow-outline hover:scale-110 transition-all duration-500 ease-in-out text-xs"
                    :class="{
                        'bg-teal-700': carrouselIndex === index,
                        'bg-teal-500': carrouselIndex !== index,
                    }"
                    @click="carrouselIndex = index"
                >
                    {{ carrousel.title }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    useHead({
        title: "Sadot Sanchez | Front-end concepts - CSS Positions",
        meta: [
            {
                name: "description",
                content: "Front-end concepts - CSS Positions",
            },
        ],
    });

    type CarrouselData = {
        title: string;
        description: string;
        uses: string;
    };

    const carrouselData: CarrouselData[] = [
        {
            title: "Static",
            description:
                "This is the default position property value. It follows the default order of the containing element.",
            uses: "This is used by default for all elements and is preferred for elements that do not need to be positioned in a special way.",
        },
        {
            title: "Relative",
            description:
                "An element with this value will have its position defined relative to its default (static) position. It will not affect the position of other elements, therefore it may overlap other elements.",
            uses: "This is used to move elements around without affecting the position of other elements.",
        },
        {
            title: "Absolute",
            description:
                "An element with this value will be positioned relative to the parent element overlapping the parent element.",
            uses: "This is used to place an element in a specific position inside a container.",
        },
        {
            title: "Fixed",
            description:
                "An element with this value will be positioned relative to the viewport (the user's screen), which means it will stay in the same place even if the page is scrolled.",
            uses: "This is used to place an element in a specific position inside the viewport.",
        },
        {
            title: "Sticky",
            description:
                "Similar to fixed, in that it is positioned relative to the viewport, but it will stick to the viewport when the user scrolls past it. Before that, it will behave like a static element.",
            uses: "This is used to have an element stick to the viewport when the user scrolls past it.",
        },
    ];

    const carrouselIndex = ref(0);

    const carrouselLength = ref(carrouselData.length);

    const carrouselNextIndex = computed(() => {
        // If the current index is the last one, return the first one
        return carrouselIndex.value === carrouselLength.value - 1
            ? 0
            : carrouselIndex.value + 1;
    });

    const carrouselPreviousIndex = computed(() => {
        // If the current index is the first one, return the last one
        return carrouselIndex.value === 0
            ? carrouselLength.value - 1
            : carrouselIndex.value - 1;
    });

    const carrouselCurrent = computed(() => {
        return carrouselData[carrouselIndex.value];
    });

    const carrouselNext = computed(() => {
        return carrouselData[carrouselNextIndex.value];
    });

    const carrouselPrevious = computed(() => {
        return carrouselData[carrouselPreviousIndex.value];
    });
</script>

<style scoped>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.7s ease;
    }

    .v-enter-active {
        transition-delay: 0.5s;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .slide-move,
    .slide-enter-active,
    .slide-leave-active {
        transition: opacity 0.7s ease;
    }

    /* Delay the enter */
    .slide-enter-active {
        transition-delay: 0.5s;
    }

    .slide-enter-from,
    .slide-leave-to {
        opacity: 0;
    }

    /* ensure leaving items are taken out of layout flow so that moving
    animations can be calculated correctly. */
    @media (max-width: 768px) {
        .slide-leave-active {
            position: absolute;
            left: 4rem;
            right: 4rem;
        }
    }

    @media (min-width: 768px) {
        .slide-leave-active {
            position: absolute;
            left: 6rem;
            right: 6rem;
        }
    }

    /* When it enters overlap over the other one to not create a giant paragraph */
</style>
