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
            link: [
                // Comfortaa font
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap",
                },
            ],
        },
    },
});
