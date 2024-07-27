import { writable } from "@macfja/svelte-persistent-store"

export let comfyUrlWritable = writable('comfyUrl', '');
export let pushyAppIdWritable = writable('pushyAppId', '');