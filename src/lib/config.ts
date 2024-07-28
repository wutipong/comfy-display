import { env } from '$env/dynamic/public';

let obj = {};
if (env.PUBLIC_COMFY_HEADERS) {
    obj = JSON.parse(env.PUBLIC_COMFY_HEADERS)
}

export const comfyHeaders = new Map<string, string>(Object.entries(obj));
export const comfyURL = env.PUBLIC_COMFY_URL? env.PUBLIC_COMFY_URL: "http://127.0.0.1:8188";