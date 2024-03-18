import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { Divider, Box } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';

interface Props {
  openBfErros: boolean;
  setBfErros: Function;
  errors: any

}



export default function BfErros({ openBfErros, setBfErros, errors }: Props) {

  const [messages, setMessages] = useState([]);

  const GetMessage = async (obj: any) => {
    Object.entries(obj).forEach(function ([chave, valor]) {
      if (valor.hasOwnProperty('message')) {
        if (!messages.includes(valor['message'])) {
          // console.log("S:", valor['message'], messages.includes(valor['message']))
          setMessages(prevState => [...prevState, valor['message']])
        }
      } else {
        GetMessage(valor)
      }
    });
  }

  const handleClickOpen = () => {
    setBfErros(true);
  };

  const handleClose = () => {
    setBfErros(false);
  };

  useEffect(() => {

    if (Object.keys(errors).length > 0) {
      GetMessage(errors)
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {messages?.map((message, index) => (
            <Alert key={index} severity="error" sx={{ width: "100%"}}>{message}</Alert>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>

  );
}
