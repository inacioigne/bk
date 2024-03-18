import { z } from "zod";

// Metadata
import bibframe from "@/share/bibframe/instance.json";

function isRequerid(acc: any, item: any) {
  acc[`${item.name}`] = z.string().min(1, {message: "O título é obrigatório."})
  // return acc

}

const obj = {};
bibframe.sections.forEach((section) => {
  section.fields.forEach((field) => {
    if (field.repeatable) {
      let zSub = field.subfields.reduce((acc: any, item) => {

        if (item.type === "select") {
          // console.log(item, field.name)

        //   acc[`${item.name}`] = z.array(
        //     z.object({
        //     value: z.string(),
        //     label: z.string()
        // }))
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
      obj[`${field.name}`] = z.array(z.object(zSub));

    } else {

      let zSub = field.subfields.reduce((acc: any, item) => {
        if (item.type === "select") {
          acc[`${item.name}`] = z.object({
            value: z.string(),
            label: z.string(),
          });
          // console.log(item)
        } else {
          if (item.required) {
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

const ZodInstance = z.object(obj);
// console.log("z: ", obj)

export default ZodInstance;

// export const ZodInstance = z.object({
//   instanceOf: z.object({
//     value: z.string(),
//   }),
//   type: z.string(),
//   media: z.object({
//     label: z.string(),
//     uri: z.string(),
//   }),
//   carrier: z.object({
//     label: z.string(),
//     uri: z.string(),
//   }),
//   issuance: z.object({
//     label: z.string(),
//     uri: z.string(),
//   }),
//   title: z.object({
//     mainTitle: z.string().min(1, { message: "O título é obrigatório." }),
//     subtitle: z.string(),
//   }),
//   publication: z.object({
//     agent: z.string(),
//     date: z.string(),
//     place: z.string(),
//   }),
//   language: z.array(
//     z.object({
//       label: z.string(),
//       uri: z.string(),
//     })
//   ),
//   image: z.string(),
// });
