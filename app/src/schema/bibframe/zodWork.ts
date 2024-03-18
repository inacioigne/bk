import { z } from "zod";

export const ZodWork = z.object({ 
    resourceType: z.array(
        z.object({
        value: z.string(),
        label: z.string()
    })),
    adminMetadata: z.object({
        status: z.object({
            value: z.string(),
            label: z.string()
        }),
        descriptionConventions: z.object({
            value: z.string(),
            label: z.string()
        })
    }),
    classification: z.object({
        cdd: z.string(),
        cutter: z.string()
    }),
    title: z.object({
        mainTitle: z.string().min(1, {message: "O título é obrigatório."}),
        subtitle: z.string(),
        }),
    variantTitle: z.array(
        z.object({
            mainTitle: z.string(),
            subtitle: z.string()
        })
    ),
    language: z.array(
        z.object({
            value: z.string(),
            label: z.string()
        })
    ),
    genreForm: z.array(
        z.object({
            value: z.string(),
            label: z.string()
        })
    ),
    contribution: z.array(
        z.object({
            term: z.object({
                value: z.string(),
                label: z.string()
            }),
            role: z.object({
                value: z.string(),
                label: z.string()
            })
    })),
    subject: z.array(
        z.object({
            term: z.object({
                value: z.string(),
                label: z.string()
            }),
            lang: z.string(),
            type: z.string()
        })
    )
});