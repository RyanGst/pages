// @ts-check
import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import starlightGiscus from "starlight-giscus";
import starlightLinksValidator from "starlight-links-validator";

import cloudflare from "@astrojs/cloudflare";
import {config} from "./src/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: config.site,
    integrations: [
        starlight({
            favicon: "/favicon.ico",
            title: config.title,
            credits: true,
            description: config.description,
            plugins: [
                starlightLinksValidator(),
                starlightGiscus({
                    repo: "ryangst/guides",
                    repoId: "R_kgDOQTxF8A",
                    category: "Q&A",
                    categoryId: "DIC_kwDOQTxF8M4CxsGx",
                    inputPosition: 'top',
                    mapping: 'pathname',

                }),
            ],
            logo: {
                src: "./src/assets/axe_logo.png",
                alt: "ryangst Logo",
                replacesTitle: true,
            },
            routeMiddleware: "./src/routeData.ts",
            customCss: ["./src/styles/custom.css"],
            locales: {
                root: {
                    label: "English",
                    lang: "en",
                },
                "pt-br": {
                    label: "Português (Brasil)",
                    lang: "pt-BR",
                },
            },
            defaultLocale: "root",
            social: config.social,
            editLink: {
                baseUrl: "https://github.com/RyanGst/guides/edit/main",
            },
            sidebar: [
                {
                    label: "Guides",
                    autogenerate: {directory: "guides"},
                    translations: {
                        "pt-br": "Guias",
                    },
                },
                {
                    label: "Tutorship",
                    autogenerate: {directory: "tutorship"},
                    translations: {
                        "pt-br": "Tutoria",
                    },
                },
                {
                    label: "webdev",
                    autogenerate: {directory: "webdev"},
                    translations: {
                        "pt-br": "Desenvolvimento Web",
                    },
                },
            ],
        }),
        sitemap()],
    adapter: cloudflare(),
});