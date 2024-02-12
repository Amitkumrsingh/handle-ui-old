import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Grid, Button, makeStyles } from "@material-ui/core";
import Table from "../tables/MaterialTable";
import { getColumns } from "../tables/getColumns";
import SelectColumns from "../tables/SelectColumns";
import { AddCircle } from "@material-ui/icons";
import InterGroupService from '../../service/interGroupService';
import {
  fetch_interGroups_success,
  create_interGroup_success,
  delete_interGroup_success,
  update_interGroup_success
} from '../../redux/reducers/interGroupReducer';
import { FieldTypes, filterColumns } from "../../utils";
import InterGroupForm from "./InterGroupForm";
import AlertDialog from "../Dialogs";

const useStyles = makeStyles((theme) => ({
  modal: {
    left: '50%',
    marginLeft: '30%',
    width: '45%'
  }
}));

function InterGroups({
  interGroupState,
  update_interGroups,
  dispatch_delete_interGroup,
  dispatch_create_interGroup,
  dispatch_update_interGroup
}) {

  const [open, setOpen] = useState(false);
  let [openAlert, setOpenAlert] = useState(false);
  let [interGroupId, setInterGroupID] = useState("");
  let [initial, setInitial] = useState({});
  let [onSubmit, setonSubmit] = useState({});
  let [formTitle, setFormTitle] = useState("Create Inter Group");
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
    name: yup.string().required("inter group name is required"),
  })

  const interGroupService = new InterGroupService();

  useEffect(() => {
    interGroupService.getInterGroups()
      .then(data => data.json())
      .then((data) => {
        update_interGroups({
          interGroups: data
        })
      }).catch(() => {

      })
  }, []);

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleEdit = (row) => {
    setValues(row);
    setFormTitle('Update Inter Group');
    toggleModal();
    setonSubmit({onSubmit: updateInterGroup});
  };

  const handleDelete = (row) => {
    openAlertDialog(row.id);
  };
  
  const openAlertDialog = (interGroupId) => {
    setInterGroupID(interGroupId);
    setOpenAlert(true);
  };

  const closeAlertDialog = () => {
    setOpenAlert(false);
    setInterGroupID("");
  };

  const setValues = (record) => {
    setInitial(record);
  }

  const deleteInterGroup = () => {
    interGroupService.deleteInterGroup(interGroupId).then(response => {
      dispatch_delete_interGroup({ interGroupId });
      setInterGroupID("");
    });
    closeAlertDialog();
  };

  const createInterGroup = interGroup => {
    interGroupService.createInterGroup({
      ...interGroup
    }).then(data => data.json())
      .then(interGroup => {
        dispatch_create_interGroup({ interGroup });
      });
  };

  const updateInterGroup = interGroup => {
    interGroupService.updateInterGroup({
      "id": interGroup.id,
      "name": interGroup.name,
    }).then(data => data.json())
      .then(interGroup => {
        dispatch_update_interGroup({ interGroup });
      });
  };

  const handleSubmit = (interGroup) => {
    onSubmit.onSubmit(interGroup);
    toggleModal();
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Button
          align="right"
          onClick={() => {
            setInitial({});
            setFormTitle('Create Inter Group')
            toggleModal();
            setonSubmit({ onSubmit: createInterGroup })
          }}
        >
          <AddCircle color="secondary" />
        </Button>
        <SelectColumns
          tableColumns={getColumns()}
          setSelectedColumns={setSelectedColumns}
        />
        <Table
          header="Inter Groups"
          columns={filterColumns(getColumns(handleEdit, handleDelete), selectedColumns)}
          tableDataItems={interGroupState.interGroups}
        />
        <InterGroupForm
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
          header="Inter Group"
          closeAlertDialog={closeAlertDialog}
          handleSubmit={deleteInterGroup}
        />
      </Grid>
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => ({
    interGroupState: state.interGroupReducer
});

const mapDispatchToProps = (dispatch) => {
  return {
    update_interGroups: (payload) => {
      dispatch(fetch_interGroups_success(payload));
    },
    dispatch_delete_interGroup: payload => {
      dispatch(delete_interGroup_success(payload));
    },
    dispatch_create_interGroup: payload => {
      dispatch(create_interGroup_success(payload));
    },
    dispatch_update_interGroup: payload => {
      dispatch(update_interGroup_success(payload));
    }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(InterGroups);
