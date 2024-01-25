import z from "zod";

export const nftDetailSchema = z.object({
	sft_id: z.string().min(1),
});
