import { comfyUrlWritable } from '$lib/store'
import { get } from 'svelte/store'

export const ssr = false;

export interface PageData {
    imageUrl: string[]
}

export async function load({ fetch, params }): Promise<PageData> {
    const comfyUrl = get(comfyUrlWritable)
    const historyUrl = new URL('/history', comfyUrl)

    try {
        const data = await fetch(historyUrl)

        console.log(await data.json())

        return {
            imageUrl: []
        };
    } catch (e) {
        console.log(e);
        return {
            imageUrl: []
        };
    }
}