import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Grid, Button, makeStyles } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import Table from "../tables/MaterialTable";
import SelectColumns from "../tables/SelectColumns";
import { getColumns } from "../tables/getColumns";
import CasteService from '../../service/casteService';
import {
  fetch_castes_success,
  create_caste_success,
  delete_caste_success,
  update_caste_success
} from '../../redux/reducers/casteReducer';
import { FieldTypes, filterColumns } from "../../utils";
import CasteForm from "./CasteForm";
import AlertDialog from "../Dialogs";

const useStyles = makeStyles((theme) => ({
  modal: {
    left: '50%',
    marginLeft: '30%',
    width: '45%'
  }
}));

function Castes({
  casteState,
  update_castes,
  dispatch_delete_caste,
  dispatch_create_caste,
  dispatch_update_caste
}) {

  const [open, setOpen] = useState(false);
  let [openAlert, setOpenAlert] = useState(false);
  let [casteId, setCasteID] = useState("");
  let [initial, setInitial] = useState({});
  let [onSubmit, setonSubmit] = useState({});
  let [formTitle, setFormTitle] = useState("Create Caste");
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
    name: yup.string().required("caste name is required"),
  })

  const casteService = new CasteService();

  useEffect(() => {
    casteService.getCastes()
      .then(data => data.json())
      .then((data) => {
        update_castes({
          castes: data
        })
      }).catch(() => {

      })
  }, []);

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleEdit = (row) => {
    setValues(row);
    setFormTitle('Update Caste');
    toggleModal();
    setonSubmit({ onSubmit: updateCaste });
  };

  const handleDelete = (row) => {
    openAlertDialog(row.id);
  };
  
  const openAlertDialog = (casteId) => {
    setCasteID(casteId);
    setOpenAlert(true);
  };

  const closeAlertDialog = () => {
    setOpenAlert(false);
    setCasteID("");
  };

  const setValues = (record) => {
    setInitial(record);
  }

  const deleteCaste = () => {
    casteService.deleteCaste(casteId).then(response => {
      dispatch_delete_caste({ casteId });
      setCasteID("");
    });
    closeAlertDialog();
  };

  const createCaste = caste => {
    casteService.createCaste({
      ...caste
    }).then(data => data.json())
      .then(caste => {
        dispatch_create_caste({ caste });
      });
  };

  const updateCaste = caste => {
    casteService.updateCaste({
      "id": caste.id,
      "name": caste.name,
    }).then(data => data.json())
      .then(caste => {
        dispatch_update_caste({ caste });
      });
  };

  const handleSubmit = (caste) => {
    onSubmit.onSubmit(caste);
    toggleModal();
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Button
          align="right"
          onClick={() => {
            setInitial({});
            setFormTitle("Create Caste");
            toggleModal();
            setonSubmit({ onSubmit: createCaste })
          }}
        >
          <AddCircle color="secondary" />
        </Button>
        <SelectColumns
          tableColumns={getColumns()}
          setSelectedColumns={setSelectedColumns}
        />
        <Table
          header="Castes"
          columns={filterColumns(getColumns(handleEdit, handleDelete), selectedColumns)}
          tableDataItems={casteState.castes}
        />
        <CasteForm
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
          header="Caste"
          closeAlertDialog={closeAlertDialog}
          handleSubmit={deleteCaste}
        />
      </Grid>
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => ({
  casteState: state.casteReducer
});

const mapDispatchToProps = (dispatch) => {
  return {
    update_castes: (payload) => {
      dispatch(fetch_castes_success(payload));
    },
    dispatch_delete_caste: payload => {
      dispatch(delete_caste_success(payload));
    },
    dispatch_create_caste: payload => {
      dispatch(create_caste_success(payload));
    },
    dispatch_update_caste: payload => {
      dispatch(update_caste_success(payload));
    }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Castes);
