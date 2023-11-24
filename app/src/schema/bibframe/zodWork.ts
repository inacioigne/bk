import { z } from "zod";

export const ZodWork = z.object({ 
    type: z.string(),
    title: z.object({
        mainTitle: z.string(),
        subtitle: z.string(),
        }),
    content: z.object({
        label: z.string(),
        type: z.string(),
        uri: z.string()
    }),
    language: z.array(
        z.object({
            label: z.string(),
            lang: z.string().nullable(),
            type: z.string(),
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