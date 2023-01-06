/** @format */

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss"],
    app: {
        head: {
            title: "Sadot Sanchez",
            meta: [
                {
                    name: "description",
                    content: "Sadot Sanchez's | Web Developer Test",
                },
            ],
        },
    },
});
