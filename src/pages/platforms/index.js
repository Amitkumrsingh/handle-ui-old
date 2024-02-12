import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Grid, Button, makeStyles } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import PlatformService from '../../service/platformService';
import Table from "../tables/MaterialTable";
import { getColumns } from "../tables/getColumns";
import SelectColumns from "../tables/SelectColumns";
import {
  fetch_platforms_success,
  create_platform_success,
  delete_platform_success,
  update_platform_success
} from '../../redux/reducers/platformReducer';
import { FieldTypes, filterColumns } from "../../utils";
import PlatformForm from "./PlatformForm";
import AlertDialog from "../Dialogs";

const useStyles = makeStyles((theme) => ({
  modal: {
    left: '50%',
    marginLeft: '30%',
    width: '45%'
  }
}));

function Platforms({
  platformState,
  update_platforms,
  dispatch_delete_platform,
  dispatch_create_platform,
  dispatch_update_platform
}) {

  const [open, setOpen] = useState(false);
  let [openAlert, setOpenAlert] = useState(false);
  let [platformId, setPlatformID] = useState("");
  let [initial, setInitial] = useState({});
  let [onSubmit, setonSubmit] = useState({});
  let [formTitle, setFormTitle] = useState("Create Platform");
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
    name: yup.string().required("platform name is required"),
  })

  const platformService = new PlatformService();

  useEffect(() => {
    platformService.getPlatforms()
      .then(data => data.json())
      .then((data) => {
        update_platforms({
          platforms: data
        })
      }).catch(() => {

      })
  }, []);

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleEdit = (row) => {
    setValues(row);
    setFormTitle('Update Platform');
    toggleModal();
    setonSubmit({ onSubmit: updatePlatform });
  };

  const handleDelete = (row) => {
    openAlertDialog(row.id);
  };

  const openAlertDialog = (platformId) => {
    setPlatformID(platformId);
    setOpenAlert(true);
  };

  const closeAlertDialog = () => {
    setOpenAlert(false);
    setPlatformID("");
  };

  const setValues = (record) => {
    setInitial(record);
  }

  const deletePlatform = () => {
    platformService.deletePlatform(platformId).then(response => {
      dispatch_delete_platform({ platformId });
      setPlatformID("");
    });
    closeAlertDialog();
  };

  const createPlatform = platform => {
    platformService.createPlatform({
      ...platform
    }).then(data => data.json())
      .then(platform => {
        dispatch_create_platform({ platform });
      });
  };

  const updatePlatform = platform => {
    platformService.updatePlatform({
      "id": platform.id,
      "name": platform.name,
    }).then(data => data.json())
      .then(platform => {
        dispatch_update_platform({ platform });
      });
  };

  const handleSubmit = (platform) => {
    onSubmit.onSubmit(platform);
    toggleModal();
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Button
          align="right"
          onClick={() => {
            setInitial({});
            setFormTitle('Create Platform')
            toggleModal();
            setonSubmit({ onSubmit: createPlatform })
          }}
        >
          <AddCircle color="secondary" />
        </Button>
        <SelectColumns
          tableColumns={getColumns()}
          setSelectedColumns={setSelectedColumns}
        />
        <Table
          header="Platforms"
          columns={filterColumns(getColumns(handleEdit, handleDelete), selectedColumns)}
          tableDataItems={platformState.platforms}
        />
        <PlatformForm
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
          header="Platform"
          closeAlertDialog={closeAlertDialog}
          handleSubmit={deletePlatform}
        />
      </Grid>
    </React.Fragment>
  );
}


const mapStatetoProps = (state) => ({
  platformState: state.platformReducer
});
const mapDispatchToProps = (dispatch) => {
  return {
    update_platforms: (payload) => {
      dispatch(fetch_platforms_success(payload));
    },
    dispatch_delete_platform: payload => {
      dispatch(delete_platform_success(payload));
    },
    dispatch_create_platform: payload => {
      dispatch(create_platform_success(payload));
    },
    dispatch_update_platform: payload => {
      dispatch(update_platform_success(payload));
    }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Platforms);
