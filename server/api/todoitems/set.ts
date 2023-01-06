/** @format */

import { set } from "~~/server/lib/firestore";
import { serverTimestamp } from "firebase/firestore";

export default defineEventHandler(async (event) => {
    try {
        const { collection } = getQuery(event) as { collection: string };
        const { id, title, description, priority, status } = (await readBody(
            event
        )) as {
            id: string;
            title: string;
            description: string;
            priority: number;
            status: string;
        };

        if (!id || !title || !description || !status) {
            throw new Error("Invalid request");
        }

        const document = {
            id,
            title,
            description,
            priority: priority || 0,
            status,
            updatedAt: serverTimestamp(),
        };

        const docRef = await set(collection, document);
        return { result: docRef };
    } catch (error: any) {
        return { error: error.message };
    }
});
