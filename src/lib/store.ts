import { writable } from "@macfja/svelte-persistent-store"

export interface HttpHeaderField{
    field: string,
    value: string, 
}

export let comfyUrlWritable = writable('comfyUrl', '');
export let comfyHeadersWritable = writable<HttpHeaderField[]>('comfyHeaders', [])
export let pushyAppIdWritable = writable('pushyAppId', '');