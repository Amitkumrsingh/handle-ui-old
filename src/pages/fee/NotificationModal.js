import React, { useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '40px',
    marginRight: '40px',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '2rem 20rem 2rem 20rem',
    width: '90%',
    outline: 'none',
    maxHeight: '90%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4em',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
  smallText: {
    fontSize: '14px',
  },
}));

const NotificationModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const [whatsapp, setWhatsapp] = useState(true);
  const [message, setMessage] = useState(true);
  const [email, setEmail] = useState(true);

  const [subject, setSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');

  const handleWhatsappChange = () => {
    setWhatsapp(!whatsapp);
  };

  const handleMessageChange = () => {
    setMessage(!message);
  };

  const handleEmailChange = () => {
    setEmail(!email);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageContentChange = (event) => {
    setMessageContent(event.target.value);
  };

  const handleSend = () => {
    // Implement your logic for sending notifications
    console.log('Sending notifications...');
    handleClose();
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h4 className={classes.smallText}>NOTIFY THE CLIENT</h4>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={whatsapp}
                  onChange={handleWhatsappChange}
                  color="primary"
                />
              }
              label="Whatsapp"
              className={classes.smallText}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={message}
                  onChange={handleMessageChange}
                  color="primary"
                />
              }
              label="Message"
              className={classes.smallText}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={email}
                  onChange={handleEmailChange}
                  color="primary"
                />
              }
              label="Email"
              className={classes.smallText}
            />
          </FormGroup>
          <TextField
            label="Subject"
            value={subject}
            onChange={handleSubjectChange}
            margin="normal"
            variant="outlined"
            className={classes.smallText}
          />
          <TextField
            label="Message"
            value={messageContent}
            onChange={handleMessageContentChange}
            fullWidth
            margin="large"
            variant="outlined"
            multiline
            rows={4}
            className={classes.smallText}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSend}
          >
            Send
          </Button>
          <h4 className={classes.smallText}>INVOICE</h4>
          <FormGroup>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Whatsapp"
              className={classes.smallText}
            />
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Email"
              className={classes.smallText}
            />
          </FormGroup>
          <div style={{ border: '1px solid #ccc', height: '200px' }} />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSend}
          >
            Send
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default NotificationModal;
