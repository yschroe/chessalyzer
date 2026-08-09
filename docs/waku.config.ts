import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { fumadocsMdx } from 'fumadocs-mdx/vite';
import { createLogger, type Plugin } from 'vite';
import { defineConfig } from 'waku/config';

// Sourcemaps of zbsearch point to non-existent src folder. Suppress the warning.
const logger = createLogger();
// oxlint-disable-next-line typescript/unbound-method
const loggerWarnOnce = logger.warnOnce;
logger.warnOnce = (msg, options) => {
    if (typeof msg === 'string' && msg.includes('points to missing source files')) return;
    loggerWarnOnce(msg, options);
};

const docsRoot = path.dirname(fileURLToPath(import.meta.url));
/** Importable image dir for MDX `![…](/file.png)` — not Vite `public/` (those can't be imported). */
const mdxAssetsDir = path.join(docsRoot, 'content/assets');

/**
 * Rolldown does not resolve relative asset imports from fumadocs MDX modules
 * (`*.mdx?macro_id=…`). Resolve them from the on-disk MDX path ourselves so
 * `remarkImage` `useImport: true` works (and Vite applies `basePath` to the URL).
 */
function resolveMdxAssetImports(): Plugin {
    const assetExt = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
    return {
        name: 'resolve-mdx-asset-imports',
        resolveId(id, importer) {
            if (!importer?.includes('.mdx')) return;
            if (!assetExt.test(id) || path.isAbsolute(id)) return;
            const importerFile = path.resolve(docsRoot, importer.split('?')[0]!);
            const resolved = path.resolve(path.dirname(importerFile), id);
            if (fs.existsSync(resolved)) return resolved;
        },
    };
}

// Set the base path for the documentation.
const basePath = process.env.DOCS_BASE_PATH
    ? `${process.env.DOCS_BASE_PATH.replace(/\/$/, '')}/`
    : '/';

export default defineConfig({
    basePath,
    vite: {
        customLogger: logger,
        resolve: {
            tsconfigPaths: true,
            // Rewrite @base-ui's bare CJS imports to local ESM shims (exact match only).
            alias: [
                {
                    find: /^use-sync-external-store\/shim\/with-selector$/,
                    replacement: new URL(
                        './src/shims/use-sync-external-store-with-selector.ts',
                        import.meta.url,
                    ).pathname,
                },
            ],
        },
        optimizeDeps: {
            include: ['use-sync-external-store/shim/with-selector.js'],
        },
        plugins: [
            resolveMdxAssetImports(),
            tailwindcss(),
            fumadocsMdx({
                globalOptions: {
                    mdxOptions: {
                        remarkImageOptions: {
                            publicDir: mdxAssetsDir,
                        },
                    },
                },
            }),
        ],
    },
});
