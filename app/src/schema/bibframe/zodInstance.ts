import { z } from "zod";

export const ZodInstance = z.object({ 
    type: z.string(),
    media: z.object({
        label: z.string(),
        uri: z.string()
    }),
    carrier: z.object({
        label: z.string(),
        uri: z.string()
    }),
    issuance: z.object({
        label: z.string(),
        uri: z.string()
    }),
    title: z.object({
        mainTitle: z.string().min(1, {message: "O título é obrigatório."}),
        subtitle: z.string(),
        }),
    publication: z.object({
        agent: z.string(),
        date: z.string(),
        place: z.string()
    }),
    language: z.array(
        z.object({
            label: z.string(),
            uri: z.string()
        })
    ),
    image: z.string()
});