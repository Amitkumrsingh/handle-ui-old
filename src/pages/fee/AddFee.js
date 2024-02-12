import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';
import NotificationModal from './NotificationModal';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: '36%',
    position: 'relative',
    
    '& label + .MuiInput-formControl': {
      marginTop: '-1px',
    },
    '& .MuiInputLabel-formControl': {
      top: 6,
      left: -136,
    },
  },
  selectControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: '36%',
  },
  input: {
    padding: '6px 12px',
    fontSize: '14px',
  },
  label: {
    fontSize: '14px',
    position: 'absolute',
    transform: 'translate(0, 1.5px) scale(1)',
    color: 'black',
  },
  selectButton: {
    padding: '0px 0px 1px',
    border: '0.2px solid #cccccc',
    borderRadius: 4,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    backgroundColor: theme.palette.background.paper,
    fontSize: '14px',
  },
  inputFormControl: {
    margin: '0px 15px 0px 0px',
    width: '100%',
  },
  additionalFieldsContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0px 30px 0px 30px',
    padding: '20px 10px 10px 20px',
  },
   submitButton: {
     margin: '20px',
     alignItems: 'left',
     justifyContent: 'left',
  },
}));

const AddFee = () => {
  const classes = useStyles();
  const [selectedMode, setSelectedMode] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const renderAdditionalFields = () => {
    if (selectedMode === 'check') {
      return (
        <div className={classes.additionalFieldsContainer}>
          <TextField
            placeholder="Check No"
            variant="outlined"
            InputProps={{ classes: { input: classes.input } }}
            className={classes.inputFormControl}
          />
          <TextField
            type="date"
            placeholder="Payment Date"
            variant="outlined"
            InputProps={{ classes: { input: classes.input } }}
            className={classes.inputFormControl}
          />
          <TextField
            placeholder="Bank Name"
            variant="outlined"
            InputProps={{ classes: { input: classes.input } }}
            className={classes.inputFormControl}
          />
        </div>
      );
    } else if (selectedMode === 'bankTransfer') {
      return (
        <div className={classes.additionalFieldsContainer}>
          <TextField
            placeholder="Bank Name"
            variant="outlined"
            InputProps={{ classes: { input: classes.input } }}
            className={classes.inputFormControl}
          />
          <TextField
            placeholder="Reference Number"
            variant="outlined"
            InputProps={{ classes: { input: classes.input } }}
            className={classes.inputFormControl}
          />
        </div>
      );
    } else if (selectedMode === 'onlineTransfer') {
      return (
        <div className={classes.additionalFieldsContainer}>
          <TextField
            placeholder="Platform"
            variant="outlined"
            InputProps={{ classes: { input: classes.input } }}
            className={classes.inputFormControl}
          />
          <TextField
            placeholder="Reference Number"
            variant="outlined"
            InputProps={{ classes: { input: classes.input } }}
            className={classes.inputFormControl}
          />
          <TextField
            type="date"
            placeholder="Payment Date"
            variant="outlined"
            InputProps={{ classes: { input: classes.input } }}
            className={classes.inputFormControl}
          />
        </div>
      );
    }
  };

  return (
    <div className={classes.formContainer}>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label}>Student Name or ID</InputLabel>
        <Select className={classes.selectButton}>
          <MenuItem value={1}>John Doe</MenuItem>
          <MenuItem value={2}>Jane Smith</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label}>Payment Date</InputLabel>
        <TextField
          type="date"
          variant="outlined"
          InputProps={{ classes: { input: classes.input } }}
          className={classes.inputFormControl}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label}>Select Mode</InputLabel>
        <Select
          className={classes.selectButton}
          value={selectedMode}
          onChange={handleModeChange}
        >
          <MenuItem value="check">Check</MenuItem>
          <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
          <MenuItem value="onlineTransfer">Online Transfer</MenuItem>
          <MenuItem value="cash">Cash</MenuItem>
        </Select>
      </FormControl>

      {renderAdditionalFields()}

      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label}>Fee</InputLabel>
        <TextField
          placeholder="Amount"
          variant="outlined"
          InputProps={{ classes: { input: classes.input } }}
          className={classes.inputFormControl}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label}>Tax</InputLabel>
        <TextField
          placeholder="Tax percentage"
          variant="outlined"
          InputProps={{ classes: { input: classes.input } }}
          className={classes.inputFormControl}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label}>Total Amount paid</InputLabel>
        <TextField
          placeholder="Total Amount"
          variant="outlined"
          InputProps={{ classes: { input: classes.input } }}
          className={classes.inputFormControl}
        />
      </FormControl>

     
      <Button variant="contained" color="primary" onClick={handleModalOpen} className={classes.submitButton}>
        Submit
      </Button>

      
      <NotificationModal open={showModal} handleClose={handleModalClose} />
    </div>
  );
};

export default AddFee;
