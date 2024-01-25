import { z } from "zod";

const pluginConfigSchema = z.object({
	model: z.string(),
	prompt_template: z.string(),
	model_temperature: z.number(),
	top_p: z.number(),
	frequency_penalty: z.number(),
	presence_penalty: z.number(),
	top_k_docs: z.number(),
});

export const chatPayloadSchema = z.object({
	question: z.string(),
	chatbot_id: z.string(),
	username: z.string(),
	session_id: z.string(),
	type: z.string(),
	user_id: z.string(),
	plugin_config: pluginConfigSchema.or(z.string()).transform((arg) => {
		if (typeof arg === "string") {
			return JSON.parse(arg);
		}
		return arg;
	}),
});

export const lastMessageSchema = z.object({
	sender: z.string(),
	message: z.string(),
	type: z.union([
		z.literal("start"),
		z.literal("stream"),
		z.literal("end"),
		z.literal("error"),
	]),
});

export type ChatPayload = z.infer<typeof chatPayloadSchema>;
export type LastMessagePayload = z.infer<typeof lastMessageSchema>;
