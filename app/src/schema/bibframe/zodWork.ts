import { z } from "zod";

// Metadata
import bibframe from "@/share/bibframe/work.json";

const obj = {};

bibframe.sections.forEach((section) => {
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

const ZodWork = z.object(obj);
// console.log("z: ", ZodWork)

export default ZodWork;

// export const ZodWork = z.object({ 
//     resourceType: z.array(
//         z.object({
//         value: z.string(),
//         label: z.string()
//     })),
//     adminMetadata: z.object({
//         status: z.object({
//             value: z.string(),
//             label: z.string()
//         }),
//         descriptionConventions: z.object({
//             value: z.string(),
//             label: z.string()
//         })
//     }),
//     classification: z.object({
//         cdd: z.string(),
//         cutter: z.string()
//     }),
//     title: z.object({
//         mainTitle: z.string().min(1, {message: "O título é obrigatório."}),
//         subtitle: z.string(),
//         }),
//     variantTitle: z.array(
//         z.object({
//             mainTitle: z.string(),
//             subtitle: z.string()
//         })
//     ),
//     language: z.array(
//         z.object({
//             value: z.string(),
//             label: z.string()
//         })
//     ),
//     genreForm: z.array(
//         z.object({
//             value: z.string(),
//             label: z.string()
//         })
//     ),
//     contribution: z.array(
//         z.object({
//             term: z.object({
//                 value: z.string(),
//                 label: z.string()
//             }),
//             role: z.object({
//                 value: z.string(),
//                 label: z.string()
//             })
//     })),
//     subject: z.array(
//         z.object({
//             term: z.object({
//                 value: z.string(),
//                 label: z.string()
//             }),
//             lang: z.string(),
//             type: z.string()
//         })
//     )
// });