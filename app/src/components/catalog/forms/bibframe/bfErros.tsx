import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { Divider } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';

interface Props {
    openBfErros: boolean;
    setBfErros: Function;
    errors: any

}



export default function BfErros({openBfErros, setBfErros, errors}: Props) {

    const [messages, setMessages] = useState(null);

    function GetMessage(obj: any) {
        const messages = new Array
        Object.entries(obj).forEach(function ([chave, valor]) {
            if (valor.hasOwnProperty('message')) {
                messages.push(valor['message'])
            } else {
                GetMessage(valor)
            }
        });
        // setMessages(messages)
        // console.log("I", obj, messages)
        setMessages(messages)
        return messages
    }

    

    // GetMessage(errors)
    // console.log("ER:", messages, errors) 

     

  const handleClickOpen = () => {
    setBfErros(true);
  };

  const handleClose = () => {
    setBfErros(false);
  };

  useEffect(() => {

    if (Object.keys(errors).length > 0) {
        // const messages = GetMessage(errors)
        const mgs = GetMessage(errors)
        console.log("ER:", mgs, errors) 
    } 

 }, [errors])

  return (

      <Dialog
        open={openBfErros}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Resolva estes erros antes de salvar o registro"}
        </DialogTitle>
        <Divider />
        <DialogContent>
            {/* { errors.title &&
            <Alert severity="error">{errors.title.mainTitle.message}</Alert>
            } */}
            {messages?.map((message, index) => (
                 <Alert key={index} severity="error">{message}</Alert>

            ))}
            {messages}
        
         
        </DialogContent>
        <DialogActions>
   
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

  );
}
