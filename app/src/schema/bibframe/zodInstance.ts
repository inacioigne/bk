import { z } from "zod";

export const ZodInstance = z.object({ 
    
    type: z.string(),
    title: z.object({
        mainTitle: z.string().min(1, {message: "O título é obrigatório."}),
        subtitle: z.string(),
        }),
    media: z.object({
        label: z.string(),
        uri: z.string()
    }),
    language: z.array(
        z.object({
            label: z.string(),
            // lang: z.string().nullable(),
            // type: z.string(),
            uri: z.string()
        })
    )
});