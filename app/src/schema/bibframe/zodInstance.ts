import { z } from "zod";

// Metadata
import bibframe from "@/share/bibframe/instance.json";

// function isRequerid(acc: any, item: any) {
//   acc[`${item.name}`] = z.string().min(1, {message: "O título é obrigatório."})
//   // return acc

// }

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
