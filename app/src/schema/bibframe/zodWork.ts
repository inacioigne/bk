import { z } from "zod";

export const ZodWork = z.object({ 
    contribution: z.array(
        z.object({
            agent: z.string(),
            label: z.string(),
            role: z.string(),
            roleLabel: z.string()
    })),
    subject: z.array(
        z.object({
            label: z.string(),
            lang: z.string(),
            uri: z.string(),
            type: z.string()
        })
    ),
    type: z.string(),
    title: z.object({
        mainTitle: z.string().min(1, {message: "O título é obrigatório."}),
        subtitle: z.string(),
        }),
    content: z.object({
        label: z.string(),
        // type: z.string(),
        uri: z.string()
    }),
    language: z.array(
        z.object({
            label: z.string(),
            // lang: z.string().nullable(),
            // type: z.string(),
            uri: z.string()
        })
    ), 
    // hasCloseExternalAuthority: z.array(
    //     z.object({
    //         uri: z.string().nullable(),
    //         label: z.string(),
    //         base: z.string().nullable()
    //     })
    // ),
    
    // imagem: z.string().nullable()
});