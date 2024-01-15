import { z } from "zod";

export const ZodItem = z.object({ 
    items: z.array(
        z.object({
            cdd: z.string(),
            cutter: z.string(),
            year: z.string(),
            collection: z.string(),
            shelf: z.string(),
            barcode: z.string(),
    }))
});