import BfModal from "./bfModal";
import BfSelect from "./bfSelec";

interface Props {
    subfield: any;
    register: Function;
    index: number;
    control: any;
    setValue: Function;
    name: string;

}

export default function BfSubField(
    { subfield, register, index, control, setValue, name }: Props
) {
    // console.log("I: ", index)
    

    if (subfield.type === 'select') {
        return (
            <BfSelect 
            subfield={subfield} 
            setValue={setValue}
            index={index}
            control={control}
            name={name}
             />
   
        )
    }  else if (subfield.type === 'list') {
        return (
            <code>LIST</code>
        )
    }

}