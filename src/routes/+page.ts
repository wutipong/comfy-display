import { env } from '$env/dynamic/public';

let obj = {};
if(env.PUBLIC_COMFY_HEADERS !== undefined){
    obj = JSON.parse(env.PUBLIC_COMFY_HEADERS)
}

const comfyHeaders = new Map<string, string> ( Object.entries(obj));
const comfyUrl = env.PUBLIC_COMFY_URL;

export interface PageData {
    imageUrl: URL[]
}

export async function load({ fetch, params }): Promise<PageData> {
    const historyUrl = new URL('/history', comfyUrl)
    historyUrl.searchParams.append('max_items', '1');

    try {
        const request = new Request(historyUrl);

        for (const k of comfyHeaders.keys()) {
            const v = comfyHeaders.get(k);
            if (v !== undefined)
                request.headers.append(k, v);
        }

        const data = await fetch(request)
        const obj = await data.json();

        const history = obj[Object.keys(obj)[0]];
        const outputs = history["outputs"];
        if (outputs === undefined) {
            throw new Error()
        }
        const outputKeys = Object.keys(outputs);

        let images = [];

        for (const k of outputKeys) {
            for (const i of outputs[k].images) {
                images.push(i)
            }
        }

        let imageUrl = [];
        for (const i of images) {
            const url = new URL('/view', comfyUrl);
            url.searchParams.append('filename', i.filename);
            url.searchParams.append('type', i.type);
            url.searchParams.append('subfolder', i.subfolder);

            imageUrl.push(url);
        }

        return {
            imageUrl: imageUrl
        };
    } catch (e) {
        console.log(e);
        return {
            imageUrl: []
        };
    }
}