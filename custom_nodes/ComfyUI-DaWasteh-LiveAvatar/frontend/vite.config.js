import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({base:'./', build:{outDir:resolve(import.meta.dirname,'../web/vrm-app'), emptyOutDir:true, sourcemap:false}});
