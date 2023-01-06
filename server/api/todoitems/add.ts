/** @format */

import { add } from "~~/server/lib/firestore";
import { serverTimestamp } from "firebase/firestore";

export default defineEventHandler(async (event) => {
    try {
        const { collection } = getQuery(event) as { collection: string };
        const { title, description, priority } = (await readBody(event)) as {
            title: string;
            description: string;
            priority: number;
        };

        const document = {
            title,
            description,
            // priority, If priority is not set, it will be set to 0
            priority: priority || 0,
            status: "Pending",
            createdAt: serverTimestamp(),
        };

        const docRef = await add(collection, document);
        return { result: docRef };
    } catch (error: any) {
        return { error: error.message };
    }
});
