import { z } from "zod";

// Metadata
import mads from "@/share/mads/mads.json"

const obj = {};

mads.sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (field.repeatable) {
        let zSub = field.subfields.reduce((acc: any, item) => {
          if (item.type === "select") {
          acc[`${item.name}`] = z.string()
          acc["label"] = z.string()
          } else {
            if (item.required) {
                
              acc[`${item.name}`] = z.string().min(1, {message: item.messageError})
            } else {          
              acc[`${item.name}`] = z.string();
            }
          }
          return acc;
        }, {});
        // let expctionFields = ['contribution', 'subject']
        if (field.name === 'contribution') {
            obj["contribution"]  = z.array(
                z.object({
                    term: z.object({
                        value: z.string(),
                        label: z.string()
                    }),
                role: z.object({
                    value: z.string(),
                    label: z.string()
                })}))
        } else if (field.name === 'subject') {
            obj["subject"]  = z.array(
                        z.object({
                            term: z.object({
                                value: z.string(),
                                label: z.string()
                            }),
                            lang: z.string(),
                            type: z.string()
                        })
                    )
        } else {
            obj[`${field.name}`] = z.array(z.object(zSub));

        }
  
      } else {
  
        let zSub = field.subfields.reduce((acc: any, item) => {
          if (item.type === "select") {
            acc[`${item.name}`] = z.object({
              value: z.string(),
              label: z.string(),
            });
          } else {
            if (item.required) {
                // console.log(item)
              acc[`${item.name}`] = z.string().min(1, {message: item.messageError})
  
            } else {
              acc[`${item.name}`] = z.string().nullable().optional();
            }
          }
  
          return acc;
        }, {});
  
        obj[`${field.name}`] = z.object(zSub);
      }
    });
  });

const ZodMads = z.object(obj);

export default ZodMads;

