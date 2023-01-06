/** @format */

import { get } from "~~/server/lib/firestore";

export default defineEventHandler(async (event) => {
    try {
        const { collection, id } = getQuery(event) as {
            collection: string;
            id: string;
        };
        const doc = await get(collection, id);
        return { result: doc };
    } catch (error: any) {
        return { error: error.message };
    }
});
