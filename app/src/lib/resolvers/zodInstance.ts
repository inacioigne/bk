// Metadata
import bibframe from "@/share/bibframe/instance.json";
import ParserBibframe from "./parserBibframe";

const ZodInstance = ParserBibframe(bibframe)
// console.log("r", ZodInstance)

export default ZodInstance;