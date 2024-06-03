import { z } from "zod";

// Metadata
import bibframe from "@/share/bibframe/work.json";

const obj = {};

// bibframe.sections.forEach((section) => {
//     section.fields.forEach((field) => {
//       if (field.repeatable) {
//         let zSub = field.subfields.reduce((acc: any, item) => {
//           if (item.thesarus) {            
//             acc[`${item.name}`] = z.object({
//               base: z.string(),
//               uri: z.string(),
//               label: z.string(),
//             });
//           } else {
//             console.log(item)
//             if (item.type === "select") {
//               acc[`${item.name}`] = z.string()
//               acc["label"] = z.string()
//               } else {
//                 if (item.required) {
                    
//                   acc[`${item.name}`] = z.string().min(1, {message: item.messageError})
//                 } else {          
//                   acc[`${item.name}`] = z.string();
//                 }
//               }
//           }
//           return acc;
//         }, {});
        
//         obj[`${field.name}`] = z.array(z.object(zSub));

//         // if (field.name === 'contribution') {
//         //     obj["contribution"]  = z.array(
//         //         z.object({
//         //             term: z.object({
//         //                 value: z.string(),
//         //                 label: z.string()
//         //             }),
//         //         role: z.object({
//         //             value: z.string(),
//         //             label: z.string()
//         //         })}))
//         // } else if (field.name === 'subject') {
//         //     obj["subject"]  = z.array(
//         //                 z.object({
//         //                     term: z.object({
//         //                         value: z.string(),
//         //                         label: z.string()
//         //                     }),
//         //                     lang: z.string(),
//         //                     type: z.string()
//         //                 })
//         //             )
//         // } else {
//         //     obj[`${field.name}`] = z.array(z.object(zSub));
//         // }
  
//       } else {
  
//         let zSub = field.subfields.reduce((acc: any, item) => {
//           if (item.type === "select") {
//             acc[`${item.name}`] = z.object({
//               value: z.string(),
//               label: z.string(),
//             });
//           } else {
//             if (item.required) {
//                 // console.log(item)
//               acc[`${item.name}`] = z.string().min(1, {message: item.messageError})
  
//             } else {
//               acc[`${item.name}`] = z.string().nullable().optional();
//             }
//           }
  
//           return acc;
//         }, {});
  
//         obj[`${field.name}`] = z.object(zSub);
//       }
//     });
//   });

bibframe.sections.forEach((section) => {
  section.fields.forEach((field) => {
    if (field.repeatable) {
      let zSub = field.subfields.reduce((acc: any, item) => {
        if (item.thesarus) {
          acc[`${item.name}`] = z.object({
            base: z.string(),
            uri: z.string(),
            label: z.string(),
          });
        } else {
          if (item.type === "select") {
            if (item.required) {
              acc[`${item.name}`] = z.object({
                value: z.string().min(3, { message: item.messageError }),
                label: z.string(),
              });
            } else {
              acc[`${item.name}`] = z.object({
                value: z.string(),
                label: z.string(),
              });
            }
          } else {
            if (item.required) {
              acc[`${item.name}`] = z
                .string()
                .min(1, { message: item.messageError });
            } else {
              acc[`${item.name}`] = z.string();
            }
          }
        }
        return acc;
      }, {});
      obj[`${field.name}`] = z.array(z.object(zSub));

      // if (field.name === "hasVariant") {
      //   obj["hasVariant"] = z.array(
      //     z.object({
      //       typeVariant: z.object({
      //         value: z.string(),
      //         label: z.string(),
      //       }),
      //       elementList: z.array(
      //         z.object({
      //           elementType: z.object({
      //             value: z.string(),
      //             label: z.string(),
      //           }),
      //           elementValue: z.string(),
      //           elementLang: z.object({
      //             value: z.string(),
      //             label: z.string(),
      //           }),
      //         })
      //       ),
      //     })
      //   );
      // } else if (field.name === "hasAffiliation") {
      //   obj["hasAffiliation"] = z.array(
      //     z.object({
      //       authority: z.object({
      //         base: z.string(),
      //         uri: z.string(),
      //         label: z.string(),
      //       }),
      //       affiliationStart: z.string(),
      //       affiliationEnd: z.string(),
      //     })
      //   );
      // } else {
      //   obj[`${field.name}`] = z.array(z.object(zSub));
      // }
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
            acc[`${item.name}`] = z
              .string()
              .min(1, { message: item.messageError });
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

export default ZodWork;

