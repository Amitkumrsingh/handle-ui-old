import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Grid, Button, makeStyles } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import Table from "../tables/MaterialTable";
import SelectColumns from "../tables/SelectColumns";
import { getColumns } from "../tables/getColumns";
import QualificationService from '../../service/qualificationService';
import {
  fetch_qualifications_success,
  create_qualification_success,
  delete_qualification_success,
  update_qualification_success
} from '../../redux/reducers/qualificationReducer';
import { FieldTypes, filterColumns } from "../../utils";
import QualificationForm from "./QualificationForm";
import AlertDialog from "../Dialogs";

const useStyles = makeStyles((theme) => ({
  modal: {
    left: '50%',
    marginLeft: '30%',
    width: '45%'
  }
}));

function Qualifications({
  qualificationState,
  update_qualifications,
  dispatch_delete_qualification,
  dispatch_create_qualification,
  dispatch_update_qualification
}) {

  const [open, setOpen] = useState(false);
  let [openAlert, setOpenAlert] = useState(false);
  let [qualificationId, setQualificationID] = useState("");
  let [initial, setInitial] = useState({});
  let [onSubmit, setonSubmit] = useState({});
  let [formTitle, setFormTitle] = useState("Create Qualification");
  let [selectedColumns, setSelectedColumns] = useState([]);

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
    name: yup.string().required("qualification name is required"),
  })

  const qualificationService = new QualificationService();

  useEffect(() => {
    qualificationService.getQualifications()
      .then(data => data.json())
      .then((data) => {
        update_qualifications({
          qualifications: data
        })
      }).catch(() => {

      })
  }, []);

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleEdit = (row) => {
    setValues(row);
    setFormTitle('Update Qualification');
    toggleModal();
    setonSubmit({ onSubmit: updateQualification });
  };

  const handleDelete = (row) => {
    openAlertDialog(row.id);
  };
  
  const openAlertDialog = (qualificationId) => {
    setQualificationID(qualificationId);
    setOpenAlert(true);
  };

  const closeAlertDialog = () => {
    setOpenAlert(false);
    setQualificationID("");
  };

  const setValues = (record) => {
    setInitial(record);
  }

  const deleteQualification = () => {
    qualificationService.deleteQualification(qualificationId).then(response => {
      dispatch_delete_qualification({ qualificationId });
      setQualificationID("");
    });
    closeAlertDialog();
  };

  const createQualification = qualification => {
    qualificationService.createQualification({
      ...qualification
    }).then(data => data.json())
      .then(qualification => {
        dispatch_create_qualification({ qualification });
      });
  };

  const updateQualification = qualification => {
    qualificationService.updateQualification({
      "id": qualification.id,
      "name": qualification.name,
    }).then(data => data.json())
      .then(qualification => {
        dispatch_update_qualification({ qualification });
      });
  };

  const handleSubmit = (qualification) => {
    onSubmit.onSubmit(qualification);
    toggleModal();
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Button
          align="right"
          onClick={() => {
            setInitial({});
            setFormTitle("Create Qualification");
            toggleModal();
            setonSubmit({ onSubmit: createQualification })
          }}
        >
          <AddCircle color="secondary" />
        </Button>
        <SelectColumns
          tableColumns={getColumns()}
          setSelectedColumns={setSelectedColumns}
        />
        <Table
          header="Qualifications"
          columns={filterColumns(getColumns(handleEdit, handleDelete), selectedColumns)}
          tableDataItems={qualificationState.qualifications}
        />
        <QualificationForm
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
          header="Qualification"
          closeAlertDialog={closeAlertDialog}
          handleSubmit={deleteQualification}
        />
      </Grid>
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => ({
  qualificationState: state.qualificationReducer
});

const mapDispatchToProps = (dispatch) => {
  return {
    update_qualifications: (payload) => {
      dispatch(fetch_qualifications_success(payload));
    },
    dispatch_delete_qualification: payload => {
      dispatch(delete_qualification_success(payload));
    },
    dispatch_create_qualification: payload => {
      dispatch(create_qualification_success(payload));
    },
    dispatch_update_qualification: payload => {
      dispatch(update_qualification_success(payload));
    }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Qualifications);
