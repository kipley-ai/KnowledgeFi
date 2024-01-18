import z from "zod";

export const delSchema = z.object({
	bucketPath: z.string().min(1),
});

export const postSchema = z.object({
	filename: z.string().min(1),
});
