import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import { Grid, Button, makeStyles } from '@material-ui/core';
import * as yup from 'yup';
import { AddCircle } from "@material-ui/icons";

import Table from "../tables/MaterialTable";
import { getColumns } from "../tables/getColumns";
import FeeService from "../../service/feeService";
import { fetch_fees_success } from '../../redux/reducers/feeReducer';
import { FieldTypes } from "../../utils/forms";
import FeeForm from "./FeeForm";
import AlertDialog from "../Dialogs";

const useStyles = makeStyles((theme) => ({
  modal: {
    left: '50%',
    marginLeft: '30%',
    width: '45%'
  }
}));

function Fee({
  update_fees=()=>{},
  feeState
}) {


  let [open, setOpen] = useState(false);
  let [openAlert, setOpenAlert] = useState(false);
  let [feeId, setFeeID] = useState("");
  let [initial, setInitial] = useState({});
  let [onSubmit, setonSubmit] = useState({});
  let [formTitle, setFormTitle] = useState("Create Fee");

  const classes = useStyles();
  let fieldGroups = [
    {
      fields: [
        {
          name: "name",
          label: "Name",
          as: FieldTypes.TEXT
        }
      ]
    }
  ];

  const schema = yup.object({
    name: yup.string().required("fee name is required"),
  })

  const feeService = new FeeService();

  useEffect(() => {
    feeService.getFees()
      .then(data => data.json())
      .then((data)=>{
        update_fees({
          fees: data.results
        })
      }).catch(() =>{
        
      })
  }, [])

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleEdit = (row) => {
    setValues(row);
    setFormTitle('Update Fee');
    toggleModal();
    setonSubmit({onSubmit: updateFee});
  };

  const handleDelete = (row) => {
    openAlertDialog(row.id);
  };

  const openAlertDialog = (feeId) => {
    setFeeID(feeId);
    setOpenAlert(true);
  };

  const closeAlertDialog = () => {
    setOpenAlert(false);
    setFeeID("");
  };

  const deleteFee = () => {
    closeAlertDialog();
  };

  const createFee = fee => {
  };

  const updateFee = fee => {
  };

  const handleSubmit = (fee) => {
    onSubmit.onSubmit(fee);
    toggleModal();
  }

  const setValues = (record) => {
    setInitial(record);
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Button
          align="right"
          onClick={() => {
            setInitial({});
            setFormTitle('Create Fee')
            toggleModal();
            setonSubmit({ onSubmit: createFee })
          }}
        >
          <AddCircle color="secondary" />
        </Button>
        <Table
          header="Fees"
          columns={getColumns(handleEdit, handleDelete)}
          tableDataItems={[]}
        />
        <FeeForm
          initialValues={initial}
          open={open}
          closeModal={toggleModal}
          fieldGroups={fieldGroups}
          onSubmit={handleSubmit}
          schema={schema}
          classes={classes}
          formTitle={formTitle}
        />
        <AlertDialog
          openAlert={openAlert}
          header="Course"
          closeAlertDialog={closeAlertDialog}
          handleSubmit={deleteFee}
        />
      </Grid>
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => ({
  feeState: state.feeReducer
});
const mapDispatchToProps = (dispatch)=> {
  return {
    update_fees: (payload) => {
      dispatch(fetch_fees_success(payload));
    }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Fee);
