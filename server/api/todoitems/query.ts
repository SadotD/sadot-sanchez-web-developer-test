/** @format */

import { queryByCollection } from "~~/server/lib/firestore";

export default defineEventHandler(async (event) => {
    try {
        const { collection } = getQuery(event) as { collection: string };
        const docs = await queryByCollection(collection);
        return { result: docs };
    } catch (error: any) {
        return { result: [], error: error.message };
    }
});
