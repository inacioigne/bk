import { z } from "zod";

export const ZodWork = z.object({ 
    type: z.string(),
    title: z.object({
        mainTitle: z.string(),
        subtitle: z.string(),
        }),    
    // hasCloseExternalAuthority: z.array(
    //     z.object({
    //         uri: z.string().nullable(),
    //         label: z.string(),
    //         base: z.string().nullable()
    //     })
    // ),
    // identifiesRWO: z.array(
    //     z.object({
    //         uri: z.string().nullable(),
    //         label: z.string(),
    //         base: z.string().nullable()
    //     })
    // ),
    // occupation: z.array(
    //     z.object({
    //         uri: z.string().optional(),
    //         label: z.string(),
    //         base: z.string().nullable()
    //     })
    // ),
    // fieldOfActivity: z.array(
    //     z.object({
    //         uri: z.string().nullable(),
    //         label: z.string(),
    //         base: z.string().nullable()
    //     }).nullable()
    // ),
    // imagem: z.string().nullable()
});