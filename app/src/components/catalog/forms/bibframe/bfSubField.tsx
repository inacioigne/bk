import BfModal from "./bfModal";
import BfSelect from "./bfSelec";
import BfTextField from "./bfTextField";

interface Props {
    subfield: any;
    register: Function;
    index: number | boolean;
    control: any;
    setValue: Function;
    name: string;

}

export default function BfSubField(
    { subfield, register, index, control, setValue, name }: Props
) {
    // console.log("SUB: ", subfield)


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
    } else if (subfield.type === 'textField') {
        return (
            <BfTextField subfield={subfield} register={register} />
        )
    }

}