import React, { useEffect, useState } from "react";
import { makeStyles, withStyles} from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputBase,
  InputLabel,
  IconButton,
  Tooltip
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Visibility} from "@material-ui/icons";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Table from "../tables/MaterialTable";
import SelectColumns from "../tables/SelectColumns";
import { filterColumns } from "../../utils";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      margin: theme.spacing(2),
      display: 'flex',
    },
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '0.2px solid #ced4da',
    fontSize: 14,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}))(InputBase);
const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  header: {
    textAlign: 'left',
  },
  clear: {
    textAlign: 'right',
    marginRight: theme.spacing(2),
    paddingRight: theme.spacing(2),
    cursor: 'pointer',
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 250,
  },
  QuickFilters :{
    display: 'flex',
    flexDirection: 'Columns',
    flexGrow: 1,
    justifyContent: 'center',
  },
    
  select: {
    border: '0.2px solid gray',
    borderRadius: 4,
    
  },
  inputRoot: {
    padding: '8px',
    width: '100%',
  },
  inputInput: {
    padding: 0,
    // paddingLeft: '8px',
  },
  notchedOutline: {
    borderWidth: '1px',
  },
  marginDate: {
    marginTop: theme.spacing(1),
  },
  summaryContainer: {
    display: 'flex',
    // justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  summaryCard: {
    margin: theme.spacing(1),
    flex: '1 1 200px',
    padding: theme.spacing(1),
  },
   summaryCards: {
    margin: theme.spacing(1),
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  
 

}));

const monthOptions = [
  { id: 1, name: 'January' },
  { id: 2, name: 'February' },
  { id: 3, name: 'March' },
  { id: 4, name: 'April' },
  { id: 5, name: 'May' },
  { id: 6, name: 'June' },
  { id: 7, name: 'July' },
  { id: 8, name: 'August' },
  { id: 9, name: 'September' },
  { id: 10, name: 'October' },
  { id: 11, name: 'November' },
  { id: 12, name: 'December' },
];

const yearOptions = [
  { id: 1, name: '2023' },
  { id: 2, name: '2022' },
  { id: 3, name: '2021' },
  { id: 4, name: '2020' },
  { id: 5, name: '2019' },
];

const ViewPayments = () => {
const classes = useStyles();
const currentMonth = new Date().getMonth() + 1; 
const currentYear = new Date().getFullYear() + 1;
    
const initialFormValues = {
  selectDates: "",
  date__month: currentMonth.toString(),
  date__year: currentYear.toString(),
};
  const [formValues, setFormValues] = React.useState({
  fromDate: '',
  toDate: '',
  month: initialFormValues.date__month,
  year: initialFormValues.date__year,
});


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleView = (row) => {
    
  };

  const handleNotify = (row) => {
   
  };

  let [selectedColumns, setSelectedColumns] = useState([]);

  
  const getColumns = (handleView,handleNotify) => {
    return [
      { title: 'S.No.', field: 'id' },
      { title: 'Name', field: 'name' },
      { title: 'Phone', field: 'phone' },
      { title: 'Total Fee', field: 'total_fee' },
      { title: 'Paid', field: 'paid' },
      { title: 'Balance', field: 'balance' },
      { title: 'Due', field: 'due' },
      { title: 'Due Date', field: 'due_date' },
      { title: 'Status', field: 'status' },

      {
        title: 'Actions',
        field: 'actions',
        filtering: false,
        export: false,
        render: rowData => {
          return (
            <div style={{ display: "flex" }}>
              <Tooltip title="View" onClick={(e) => handleView(rowData)}>
                <IconButton aria-label="view-button">
                  <Visibility />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notify" onClick={(e) => handleNotify(rowData)} >
                <IconButton aria-label="Notify">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </div>
          )
        }
      }
    ]
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h5" className={classes.header}>
        PAYMENT DETAILS
      </Typography>

      <Typography variant="h5" component="h5" className={classes.clear}>
        CLEAR
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1 1 50px', }}>
  <div>
    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="subtitle1">Filters</Typography>
      <IconButton aria-label="filter" size="large">
        <FilterListIcon />
      </IconButton>
    </CardContent>
  </div>
  
  <div className={classes.QuickFilters} >
    <Button variant="contained" color="primary" style={{ margin: '0 4px' }}>
      Pending
    </Button>
    <Button variant="contained" color="primary" style={{ margin: '0 4px' }}>
      Today
    </Button>
    <Button variant="contained" color="primary" style={{ margin: '0 4px' }}>
      Week
    </Button>
  </div>
  
  <div className={classes.QuickFilters} >
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="month-select-label">Month</InputLabel>
      <Select
        labelId="month-select-label"
        id="month-select"
        input={<BootstrapInput />}
        className={classes.select}
        name="month"
        value={formValues.month}
        onChange={handleChange}
        label="Month"
      >
        {monthOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    
    <FormControl variant="outlined" className={classes.formControl} >
      <InputLabel id="year-select-label">Year</InputLabel>
      <Select
        labelId="year-select-label"
        id="year-select"
        input={<BootstrapInput />}
        className={classes.select}
        name="date__year"
        value={formValues.date__year}
        onChange={handleChange}
        label="Year"
      >
        {yearOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
  
  <div className={classes.QuickFilters} >
    <TextField
      name="fromDate"
      label="From Date"
      type="date"
      value={formValues.fromDate}
      onChange={handleChange}
      className={classes.formControl}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      InputProps={{
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
          notchedOutline: classes.notchedOutline,
        },
      }}
    />
    
    <TextField
      name="toDate"
      label="To Date"
      type="date"
      value={formValues.toDate}
      onChange={handleChange}
      className={classes.formControl}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      InputProps={{
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
          notchedOutline: classes.notchedOutline,
        },
      }}
      
    />
  </div>
  
  <Button variant="contained" color="primary" >
    Submit
  </Button>
</div>

<div style={{ textAlign: 'center', margin:'20px 0px 0px 0px',padding:'30px 0px 0px 0px'}}>
  <Typography variant="h5">
    20/Jan/2020 to 30/Dec/2021
  </Typography>
</div>

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', flexBasis:'100%' }}>
  {/* Total Payments & Pending Payments */}
  <div style={{ flexBasis: '19.666667%'}}>
    <CardContent className={classes.summaryContainer}>
      <Card className={classes.summaryCard}>
        <Typography variant="subtitle1">Total Payments</Typography>
        <Typography variant="h5">57</Typography>
      </Card>
      <Card className={classes.summaryCard}>
        <Typography variant="subtitle1">Pending Payments</Typography>
        <Typography variant="h5">32</Typography>
      </Card>
    </CardContent>
  </div>

  {/* Other Cards */}
  <div style={{ flexBasis: '19.666667%'}}>
    <CardContent className={classes.summaryCards}>
      <Card className={classes.summaryCard}>
        <Typography variant="subtitle1">Total Fee</Typography>
        <Typography variant="h1">10,000 $</Typography>
      </Card>
    </CardContent>
  </div>

  <div style={{ flexBasis: '19.666667%' }}>
    <CardContent className={classes.summaryCards}>
      <Card className={classes.summaryCard}>
        <Typography variant="subtitle1">Amount Received</Typography>
        <Typography variant="h1">10,000 $</Typography>
      </Card>
    </CardContent>
  </div>

  <div style={{ flexBasis: '19.666667%' }}>
    <CardContent className={classes.summaryCards}>
      <Card className={classes.summaryCard}>
        <Typography variant="subtitle1">Balance</Typography>
        <Typography variant="h1">10,000 $</Typography>
      </Card>
    </CardContent>
  </div>

  <div style={{ flexBasis: '19.666667%' }}>
    <CardContent className={classes.summaryCards}>
      <Card className={classes.summaryCard}>
        <Typography variant="subtitle1">Due</Typography>
        <Typography variant="h1">10,000 $</Typography>
      </Card>
    </CardContent>
  </div>
</div>

<div>
      <Grid container spacing={6}>
        
          <Table
             header={
              <SelectColumns
                   tableColumns={getColumns()}
                   setSelectedColumns={setSelectedColumns}
              />
            }
          columns={filterColumns(getColumns(handleView,handleNotify), selectedColumns)}
          tableDataItems={null}
        />
        </Grid>
      </div>
    </div>
  );
};

export default ViewPayments;
