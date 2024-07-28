import { comfyHeaders, comfyURL } from '$lib/config'

export interface PageData {
    imageUrls: URL[],
    error?: any
}

export async function load({ fetch, params }): Promise<PageData> {
    const historyUrl = new URL('/history', comfyURL)
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
        const keys = Object.keys(obj);

        if (keys.length === 0) {
            return {
                imageUrls: []
            };
        }

        const history = obj[keys[0]];

        const outputs = history["outputs"];
        if (outputs === undefined) {
            return {
                imageUrls: []
            };
        }
        const outputKeys = Object.keys(outputs);

        let images = [];

        for (const k of outputKeys) {
            for (const i of outputs[k].images) {
                images.push(i)
            }
        }

        let imageUrls = [];
        for (const i of images) {
            const url = new URL('/view', comfyURL);
            url.searchParams.append('filename', i.filename);
            url.searchParams.append('type', i.type);
            url.searchParams.append('subfolder', i.subfolder);

            imageUrls.push(url);
        }

        return {
            imageUrls: imageUrls
        };
    } catch (e) {
        return {
            imageUrls: [],
            error: e
        };
    }
}