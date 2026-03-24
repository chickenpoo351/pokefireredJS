import { defineConfig } from "vite";

export default defineConfig (({ mode }) => {
    return {
        build: {
            outDir: `dist/${mode}`,
            emptyOutDir: true,
        },
        define: {
            __GAME_VERSION__: JSON.stringify(mode),
        },
    }
});