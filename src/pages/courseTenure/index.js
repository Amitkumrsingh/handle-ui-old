import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Grid, Button, makeStyles, Tooltip, IconButton } from "@material-ui/core";
import { AddCircle, Edit, Delete } from "@material-ui/icons";
import Table from "../tables/MaterialTable";
import SelectColumns from "../tables/SelectColumns";
import CourseTenureService from '../../service/courseTenureService';
import {
    fetch_courseTenures_success,
    create_courseTenure_success,
    delete_courseTenure_success,
    update_courseTenure_success
} from '../../redux/reducers/courseTenureReducer';
import { FieldTypes, filterColumns } from "../../utils";
import CourseTenureForm from "./CourseTenureForm";
import AlertDialog from "../Dialogs";

const useStyles = makeStyles((theme) => ({
    modal: {
        left: '50%',
        marginLeft: '30%',
        width: '50%'
    }
}));

function CourseTenures({
    courseTenureState,
    update_courseTenures,
    dispatch_delete_courseTenure,
    dispatch_create_courseTenure,
    dispatch_update_courseTenure
}) {

    const [open, setOpen] = useState(false);
    let [openAlert, setOpenAlert] = useState(false);
    let [courseTenureId, setCourseTenureID] = useState("");
    let [initial, setInitial] = useState({});
    let [onSubmit, setonSubmit] = useState({});
    let [formTitle, setFormTitle] = useState("Create Course Tenure");
    let [selectedColumns, setSelectedColumns] = useState([]);

    const classes = useStyles();
    let fieldGroups = [
        {
            fields: [
                {
                    name: "name",
                    label: "Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "period",
                    label: "Period",
                    as: FieldTypes.TEXT
                }
            ]
        }
    ];

    const getColumns = (handleEdit, handleDelete) => {
        return [
            { title: 'Id', field: 'id' },
            { title: 'Name', field: 'name' },
            { title: 'Period', field: 'period' },
            { title: 'Created At', field: 'created_at' },
            {
                title: 'Actions',
                field: 'actions',
                filtering: false,
                export: false,
                render: rowData => {
                    return (
                        <div style={{ display: "flex" }}>
                            <Tooltip title="Edit" onClick={(e) => handleEdit(rowData)} >
                                <IconButton aria-label="edit">
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" onClick={(e) => handleDelete(rowData)} >
                                <IconButton aria-label="delete">
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </div>
                    )
                }
            }
        ]
    };

    const schema = yup.object({
        name: yup.string().required("name is required"),
        period: yup.string().required("period name is required")
    })

    const courseTenureService = new CourseTenureService();

    useEffect(() => {
        courseTenureService.getCourseTenures()
            .then(data => data.json())
            .then((data) => {
                update_courseTenures({
                    courseTenures: data
                })
            }).catch(() => {

            })
    }, []);

    const toggleModal = () => {
        setOpen(!open);
    };

    const handleEdit = (row) => {
        setValues(row);
        setFormTitle('Update Course Tenure');
        toggleModal();
        setonSubmit({ onSubmit: updateCourseTenure });
    };

    const handleDelete = (row) => {
        openAlertDialog(row.id);
    };

    const openAlertDialog = (courseTenureId) => {
        setCourseTenureID(courseTenureId);
        setOpenAlert(true);
    };

    const closeAlertDialog = () => {
        setOpenAlert(false);
        setCourseTenureID("");
    };

    const setValues = (record) => {
        setInitial(record);
    }

    const deleteCourseTenure = () => {
        courseTenureService.deleteCourseTenure(courseTenureId).then(response => {
            dispatch_delete_courseTenure({ courseTenureId });
            setCourseTenureID("");
        });
        closeAlertDialog();
    };

    const createCourseTenure = courseTenure => {
        courseTenureService.createCourseTenure({
            ...courseTenure
        }).then(data => data.json())
            .then(courseTenure => {
                dispatch_create_courseTenure({ courseTenure });
            });
    };

    const updateCourseTenure = courseTenure => {
        courseTenureService.updateCourseTenure({
            "id": courseTenure.id,
            "name": courseTenure.name,
        }).then(data => data.json())
            .then(courseTenure => {
                dispatch_update_courseTenure({ courseTenure });
            });
    };

    const handleSubmit = (courseTenure) => {
        onSubmit.onSubmit(courseTenure);
        toggleModal();
    }

    return (
        <React.Fragment>
            <Grid container spacing={6}>
                <Button
                    align="right"
                    onClick={() => {
                        setInitial({});
                        setFormTitle('Create Course Tenure')
                        toggleModal();
                        setonSubmit({ onSubmit: createCourseTenure })
                    }}
                >
                    <AddCircle color="secondary" />
                </Button>
                <SelectColumns
                    tableColumns={getColumns()}
                    setSelectedColumns={setSelectedColumns}
                />
                <Table
                    header="Course Tenures"
                    columns={filterColumns(getColumns(handleEdit, handleDelete), selectedColumns)}
                    tableDataItems={courseTenureState.courseTenures}
                />
                <CourseTenureForm
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
                    header="Course Tenure"
                    closeAlertDialog={closeAlertDialog}
                    handleSubmit={deleteCourseTenure}
                />
            </Grid>
        </React.Fragment>
    );
}

const mapStatetoProps = (state) => ({
    courseTenureState: state.courseTenureReducer
});

const mapDispatchToProps = (dispatch) => {
    return {
        update_courseTenures: (payload) => {
            dispatch(fetch_courseTenures_success(payload));
        },
        dispatch_delete_courseTenure: payload => {
            dispatch(delete_courseTenure_success(payload));
        },
        dispatch_create_courseTenure: payload => {
            dispatch(create_courseTenure_success(payload));
        },
        dispatch_update_courseTenure: payload => {
            dispatch(update_courseTenure_success(payload));
        }
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(CourseTenures);
