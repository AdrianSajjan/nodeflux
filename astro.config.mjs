import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import lottie from "astro-integration-lottie";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({ applyBaseStyles: false }), lottie()],
});
