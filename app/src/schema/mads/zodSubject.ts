import { z } from "zod";

export const ZodSubjects = z.object({
    type: z.string(),
    elementList: z.array(
        z.object({
            type: z.string(),
            elementValue: z.object({
                value: z.string().nonempty("Nome é obrigatório"), lang: z.string().nullable()
            })
        })),
    hasVariant: z.array(
        z.object({
            type: z.string(),
            elementList: z.array(
                z.object({ type: z.string(), elementValue: z.object({ value: z.string() }) })
            )
        })
    ),
    hasCloseExternalAuthority: z.array(
        z.object({
            uri: z.string().nullable(),
            label: z.string(),
            base: z.string().nullable()
        })
    ),
    hasBroaderAuthority: z.array(
        z.object({
            uri: z.string().nullable(),
            label: z.string(),
            base: z.string().nullable()
        })
    ),
    hasNarrowerAuthority: z.array(
        z.object({
            uri: z.string().nullable(),
            label: z.string(),
            base: z.string().nullable()
        })
    ),
    hasReciprocalAuthority: z.array(
        z.object({
            uri: z.string().nullable(),
            label: z.string(),
            base: z.string().nullable()
        }).nullable()
    ),
    // imagem: z.string().nullable()
});