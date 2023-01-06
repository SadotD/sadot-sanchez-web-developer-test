/** @format */

import { del } from "~~/server/lib/firestore";

export default defineEventHandler(async (event) => {
    try {
        const { collection } = getQuery(event) as { collection: string };
        const { id } = (await readBody(event)) as { id: string };
        await del(collection, id);
        return { result: id };
    } catch (error: any) {
        return { error: error.message };
    }
});
