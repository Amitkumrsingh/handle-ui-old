import React from "react";
import styled from "styled-components";
import moment from 'moment';
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField as MuiTextField,
  FormControl as MuiFormControl,
  FormHelperText,
  Select,
  Select as MuiSelect,
  InputLabel,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography,
  Grid
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { TimePicker, DatePicker as MuiDatePicker, DateTimePicker } from "@material-ui/pickers";
 

const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)`
   width: 300px;
   padding: 20px;
`;
const FormControlSpacing = styled(MuiFormControl)(spacing);
const DatePicker = styled(MuiDatePicker)(spacing);

const FormControl = styled(FormControlSpacing)`
  width: 300px;
  padding: 20px;
 
  `;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




const TEXT = props => {
  return <TextField variant="outlined"  {...props} />;
};

const TEXTAREA = props => {
  return (
    <TextField
      multiline
      variant="outlined"
      rowsMax={props.rowsMax ? props.rowsMax : "5"}
      rows={props.rows ? props.rows : "4"}
      {...props}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  outlinedSelect: {
    "& .MuiSelect-root": {
      padding: "23px 10px 10px 12px",
      borderRadius: 2,
      border: "0.5px solid black",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      justifyContent: "center",
      
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0px, -15.6px) scale(0.75)",
      transformOrigin: "top left",
    },
    "& .MuiInput-formControl": {
      marginTop: 4,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
      borderBottom: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
  },
   inputLabel: {
     marginTop: "10px",
     marginLeft: "12px",
  },
  
}));

const SELECT = (props) => {
  const classes = useStyles();

  return (
    <FormControl m={4} {...props}>
      <InputLabel className={classes.inputLabel} htmlFor={props.name} shrink={props.value !== undefined}>
        {props.label}
      </InputLabel>
      <MuiSelect
        className={classes.outlinedSelect}
        defaultValue=""
        {...props}
        inputProps={{
          name: props.name,
        }}
      >
        {props.options &&
          props.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
      </MuiSelect>
    </FormControl>
  );
};
const DATE = props => {
  return (
    <DatePicker
      disableFuture={!props.disableFuture ? true : false}
      openTo="date"
      margin="normal"
      clearable
      views={["date", "month", "year"]}
      defaultValue=""
      {...props}
      onChange={(value) => {
        var date = new moment(value)
        props.setFieldValue(props.name, date.format('DD-MM-YYYY'))
      }}
    />
  );
};

const FILE = props => {
  return (
    <TextField
      type="file"
    
      {...props}
    />
  );
};

const MULTI_SELECT = props => {
  return (
    <FormControl m={2}>
      {/* <InputLabel htmlFor={props.name}>{props.label}</InputLabel> */}
      <Select
        multiple
        input={<TextField />}
        renderValue={selected => selected.join(', ')}
        MenuProps={MenuProps}
        value={props.courses}
        label={props.label}
      >
        {props.options && props.options.map(option => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={props.courses.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const PLAIN_VIEW = props => {
  return (
    <Typography component="h6">
      {`${props.name} - ${props.value}`}
    </Typography>
  )
}

const LIST = props => {
  const { installments } = props;
  return (
    installments && installments.length && <Grid xs={12} sm={6} lg={4}>
      {installments.map(() => {
        return (
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <TextField
              id="date"
              type="date"
              defaultValue="20-06-2023"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              type="text"
              defaultValue="500"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        )
      })}
    </Grid>
  )
}


export const TYPES = {
  TEXT,
  TEXTAREA,
  SELECT,
  DATE,
  TIME: "TIME",
  FILE,
  MULTI_SELECT,
  PLAIN_VIEW,
  LIST
};
