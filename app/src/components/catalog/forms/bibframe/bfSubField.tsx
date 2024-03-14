import BfModal from "./bfModal";
import BfSelect from "./bfSelec";
import BfTextField from "./bfTextField";
import BfTextfieldThesarus from "./bfTextfieldThesarus";

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

    if (subfield.thesarus) {
        return (
            <BfTextfieldThesarus
                name={name}
                control={control}
                subfield={subfield}
                register={register}
                index={index}
                setValue={setValue}
            />
        )
    } else {
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
                <BfTextField
                    subfield={subfield}
                    register={register}
                    name={name}
                    index={index} />
            )
        }
    }
}