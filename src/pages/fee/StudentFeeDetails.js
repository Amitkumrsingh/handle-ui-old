import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
  InputLabel
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#efefef',
    padding: '0px 100px 30px 100px',
    margin: '0',
    },
    
    inputSelect: {
    backgroundColor: 'white',
    width: '100%',
    outline: '0.2px solid #efefef',
    display: 'block',
    justifyContent: 'center',
    margin: 'auto',
    },
  
    label: {
        textAlign: 'center',
        padding: '9px',
        color: 'black',
    },
    btn: {
      textAlign: 'center',
      justifyContent: 'center',
      justifyItems: 'center',
    },
    
  viewDetailsBtn: {
    backgroundColor: '#292829',
    color: 'white',
    margin: '10px',
    padding: '5px 10px',
      fontSize: '12px',
    },
  
    section: {
        backgroundColor: '#efefef',
        
    },
    
  sectionCard: {
    backgroundColor: 'white',
    margin: theme.spacing(2),
    padding: '0px 30px 0px 30px',
    borderRadius: '5px',
    },
  
  img:{
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    textAlign: 'center',
    },
  
    sectionCards: {
        backgroundColor: '#efefef',
       borderRadius: '5px',
  },
  
    smallCard: {
        backgroundColor: 'white',
         margin: theme.spacing(2),
         padding: theme.spacing(2),
        borderRadius: '5px',
    },
    black: {
        color: 'black',
        fontWeight: '500',
 },
    table: {
    borderCollapse: 'collapse',
    border: '1px solid black',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    },
  
  tableCell: {
    border: '1px solid black',
    padding: theme.spacing(1),
    },
   editIcon: {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
  },
  deleteIcon: {
     color: theme.palette.error.main,
    },
  addIcon: {
    color: theme.palette.primary.main,
  },
}));

const StudentFeeDetails = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.section}>
        <CardContent>
             <Grid container spacing={2} >
            <Grid item xs={4} >
              <InputLabel className={classes.label}>
                Select Student Name or ID
              </InputLabel>
            </Grid>
            <Grid item xs={6}>
              <Select
                className={classes.inputSelect}
                variant="outlined"
                value=""
              >
                <MenuItem disabled value="">
                  Select Student Name or ID
                </MenuItem>
                {/* Add student names or IDs as menu items */}
              </Select>
            </Grid>
            <Grid item xs={12} className={classes.btn}>
              <Button className={classes.viewDetailsBtn} variant="contained">
                View Details
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
<Card className={classes.sectionCards}>
  <CardContent>
    <Grid container spacing={2}>
      <Grid item xs={6} sm={3}>
        <CardContent className={classes.smallCard}>
        <img src="https://www.indiaonlinepages.com/sports/gifs/sachin-tendulkar.jpg" alt="Sachin Tendulkar" className={classes.img} />
        </CardContent>
      </Grid>
      <Grid item xs={6} sm={3}>
        <CardContent className={classes.smallCard}>
          <Typography>Student Name</Typography>
          <Typography variant="h6">Ram Mohan Rao</Typography>
        </CardContent>
        <CardContent className={classes.smallCard}>
          <Typography>Total Fee</Typography>
          <Typography variant="h4">10,000 $</Typography>
        </CardContent>
        </Grid>
         <Grid item xs={6} sm={3}>
        <CardContent className={classes.smallCard}>
          <Typography>Payment Due</Typography>
          <Typography variant="h6">2,000 $</Typography>
        </CardContent>
        <CardContent className={classes.smallCard}>
          <Typography>Fee Paid</Typography>
          <Typography variant="h4">10,000 $</Typography>
        </CardContent>
        </Grid>
         <Grid item xs={6} sm={3}>              
        <CardContent className={classes.smallCard}>
          <Typography>Due Date</Typography>
          <Typography variant="h6">08/02/2022</Typography>
        </CardContent>
        <CardContent className={classes.smallCard}>
          <Typography>Balance</Typography>
          <Typography variant="h4">10,000 $</Typography>
        </CardContent>
       </Grid>
    </Grid>
  </CardContent>
</Card>

      

      <Card className={classes.sectionCard}>
        <CardContent>
          <Typography variant="h6">PERSONAL INFORMATION</Typography>
          <Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
    <CardContent>
      <Typography>Student ID</Typography>
      <Typography className={classes.black}>00214062019-MAD</Typography>
    </CardContent>
    <CardContent>
      <Typography>Student's Number</Typography>
      <Typography className={classes.black}>9090997878</Typography>
    </CardContent>
    <CardContent>
      <Typography>Email ID</Typography>
      <Typography className={classes.black}>email@gmail.com</Typography>
    </CardContent>
    <CardContent>
      <Typography>Tenure</Typography>
      <Typography className={classes.black}>Short term</Typography>
    </CardContent>
  </Grid>
  <Grid item xs={12} sm={6}>
    <CardContent>
      <Typography>Student Name</Typography>
      <Typography className={classes.black}>Ram Mohan Rao</Typography>
    </CardContent>
    <CardContent>
      <Typography>Batch</Typography>
      <Typography className={classes.black}>2022-23</Typography>
    </CardContent>
    <CardContent>
      <Typography>Course</Typography>
      <Typography className={classes.black}>NATA, NID</Typography>
    </CardContent>
    <CardContent>
      <Typography>Date of Joining</Typography>
      <Typography className={classes.black}>10/10/2022</Typography>
    </CardContent>
  </Grid>
</Grid>

        </CardContent>
      </Card>

      <Card className={classes.sectionCard}>
        <CardContent>
          <Typography variant="h6">FEE DETAILS</Typography>
          <Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
    <CardContent>
      <Typography>Course Fee</Typography>
      <Typography className={classes.black}>10,000 $</Typography>
    </CardContent>
    <CardContent>
      <Typography>Total Fee</Typography>
      <Typography className={classes.black}>12,000 $</Typography>
    </CardContent>
    <CardContent>
      <Typography>Balance Amount</Typography>
      <Typography className={classes.black}>12,000 $</Typography>
    </CardContent>
  </Grid>
  <Grid item xs={12} sm={6}>
    <CardContent>
      <Typography>Tax</Typography>
      <Typography className={classes.black}>18% (1,800 $)</Typography>
    </CardContent>
    <CardContent>
      <Typography>Amount Paid</Typography>
      <Typography className={classes.black}>4,000 $</Typography>
    </CardContent>
    <CardContent>
      <Typography>Due Amount</Typography>
      <Typography className={classes.black}>2,000 $</Typography>
    </CardContent>
  </Grid>
</Grid>

        </CardContent>
      </Card>

      <Card className={classes.sectionCard}>
        <CardContent>
          <Typography variant="h6">PAID INSTALLMENTS</Typography>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td className={classes.tableCell}>No of Installments paid</td>
                <td className={classes.tableCell}>2</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>
                  1-installment Date & Amount:
                </td>
                <td className={classes.tableCell}>14/062019 & Rs.2500</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>
                  2-lnstallment Date & Amount:
                </td>
                <td className={classes.tableCell}>14/0612019 & Rs.2000</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>1-installment Amount Paid:</td>
                <td className={classes.tableCell}>
                  Date: 14/06/2019 Mode: Cash Amount:2500 Notes:
                </td>
              </tr>
              <tr>
                <td className={classes.tableCell}>2-lnstallment Amount Paid:</td>
                <td className={classes.tableCell}>
                  Date: 28/06/2019 Mode: Cash Amount:2000 Notes:500
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className={classes.sectionCard}>
        <CardContent>
          <Typography variant="h6">DUE INSTALLMENTS</Typography>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td className={classes.tableCell}>Due Fee</td>
                <td className={classes.tableCell}>5000</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>No of Installments</td>
                <td className={classes.tableCell}>2</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>
                  1-lnstallment Date & Amount:
                </td>
                <td className={classes.tableCell}>14/06/2019 & Rs.2500</td>
                    <IconButton size="small" className={classes.editIcon}>
                    <EditIcon />
                   </IconButton>
              </tr>
              <tr>
                <td className={classes.tableCell}>
                  2-lnstallment Date & Amount:
                </td>
                <td className={classes.tableCell}>14/06/2019 & Rs.2000</td>
                 <IconButton size="small" className={classes.editIcon}>
                    <EditIcon />
                  </IconButton>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className={classes.sectionCard}>
        <CardContent>
          <Typography variant="h6">FUTURE INSTALLMENTS</Typography>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td className={classes.tableCell}>Balance Fee</td>
                <td className={classes.tableCell}>500</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>No of Installments</td>
                <td className={classes.tableCell}>2</td>
              </tr>
              <tr>
                <td className={classes.tableCell}>
                  1-Installment Date & Amount:
                </td>
                <td className={classes.tableCell}>14/06/2019 & Rs.2500</td>
                <IconButton size="small" className={classes.editIcon}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" className={classes.deleteIcon}>
                    <DeleteIcon />
                  </IconButton>
              </tr>
              
              <tr>
                <td className={classes.tableCell}>
                  2-lnstallment Date & Amount:
                </td>
             <td className={classes.tableCell}>14/06/2019 & Rs.2000</td>
                <IconButton size="small" className={classes.editIcon}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" className={classes.deleteIcon}>
                    <DeleteIcon />
                  </IconButton>
                 <IconButton size="small" className={classes.addIcon}>
                    <AddIcon />
                  </IconButton>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentFeeDetails;
