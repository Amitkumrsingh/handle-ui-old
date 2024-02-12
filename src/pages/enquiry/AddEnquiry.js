import {
    Breadcrumbs as MuiBreadcrumbs, Button, Card as MuiCard, CardContent, Divider as MuiDivider, Grid,
    Link, Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";
import * as yup from 'yup';

import { AddCircle } from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import moment from 'moment';
import {
    create_enquiry_success, delete_enquiry_success, fetch_enquiries_success, update_enquiry_success
} from "../../redux/reducers/enquiryReducer";
import EnquiryService from "../../service/enquiryService";
import { FieldTypes } from "../../utils";
import EnquiryForm from "./EnquiryForm";

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);


function AddEnquiry({ dispatch_enquiries = () => { },
    dispatch_delete_enquiry,
    dispatch_create_enquiry,
    dispatch_update_enquiry,
    enquiryState,
    branchState,
    courseState,
    platformState,
    globalState
}) {
    let [open, setOpen] = useState(false);
    let [error, setError] = useState(false);
    let [openAlert, setOpenAlert] = useState(false);
    let [enquiryId, setEnquiryID] = useState("");
    let [initial, setInitial] = useState({});
    let [onSubmit, setonSubmit] = useState({});
    let [formTitle, setFormTitle] = useState("Create Enquiry");
    let [selectedColumns, setSelectedColumns] = useState([]);
    const genderOptions = [
        {
            id: 1,
            name: "Male"
        },
        {
            id: 2,
            name: "Female"
        },
        {
            id: 3,
            name: "Not Specified"
        }
    ]

    const enquiryOptions = [

        {
            id: 0,
            name: "Pending"
        },
        {
            id: 1,
            name: "Joined"
        },
        {
            id: 2,
            name: "Joined Elsewhere"
        },

        {
            id: 3,
            name: "Contacted"
        },
        {
            id: 4,
            name:"Joining Later"
        },
        {
            id: 5,
            name: "Wrong Enquiry"
        },
        {
            id: 6,
            name: "Suspicious"
        }
    ]

    const getFields = () => {
        return [
            {
                fields: [
                    {
                        name: "date",
                        label: "Date",
                        as: FieldTypes.DATE
                    },
                    {
                        name: "name",
                        label: "Name",
                        as: FieldTypes.TEXT
                    },
                    {
                        name: "phone_1",
                        label: "Phone Number",
                        as: FieldTypes.TEXT
                    },
                    {
                        name: "email",
                        label: "Email",
                        as: FieldTypes.TEXT
                    }, {
                        name: "address.address_line_1",
                        label: "Address Line 1",
                        as: FieldTypes.TEXT
                    }, {
                        name: "address.address_line_2",
                        label: "Address Line 2",
                        as: FieldTypes.TEXT
                    },
                    {
                        name: "address.city",
                        label: "City",
                        as: FieldTypes.SELECT,
                        options: globalState.cities.map((city) => {
                            return {
                                name: city.name,
                                value: city.id
                            }
                        })
                    }, {
                        name: "address.pincode",
                        label: "PinCode",
                        as: FieldTypes.TEXT
                    },
                    {
                        name: "course",
                        label: "Course",
                        as: FieldTypes.SELECT,
                        options: courseState.courses.map((course) => {
                            return {
                                name: course.name,
                                value: course.id
                            }
                        })
                    },
                    {
                        name: "platform",
                        label: "Platform",
                        as: FieldTypes.SELECT,
                        options: platformState.platforms.map((platform) => {
                            return {
                                name: platform.name,
                                value: platform.id
                            }
                        })
                    },
                    {
                        name: "notes",
                        label: "Notes",
                        as: FieldTypes.TEXTAREA
                    },
                    {
                        name: "call_back",
                        label: "Call Back Date",
                        as: FieldTypes.DATE,
                        disableFuture: false
                    },
                    {
                        name: "status",
                        label: "Status",
                        as: FieldTypes.SELECT,
                        options: enquiryOptions.map((option) => {
                            return {
                                name: option.name,
                                value: option.id
                            }
                        })
                    },
                    {
                        name: "gender",
                        label: "Gender",
                        as: FieldTypes.SELECT,
                        options: genderOptions.map((option) => {
                            return {
                                name: option.name,
                                value: option.id
                            }
                        })
                    },
                    {
                        name: "date_of_birth",
                        label: "Date Of Birth",
                        as: FieldTypes.DATE
                    },
                    {
                        name: "visitor_name",
                        label: "Visitor Name",
                        as: FieldTypes.TEXT
                    },
                    {
                        name: "appointment_date",
                        label: "Appointment Date",
                        as: FieldTypes.DATE,
                        disableFuture: false
                    },
                ]
            }
        ];
    };

    const toggleModal = () => {
        setOpen(!open);
    };

    const closeModal = () => {
        setOpen(false);
    };


    const handleSubmit = (enquiry) => {
        onSubmit.onSubmit(enquiry);
        // toggleModal();
    }

    const schema = yup.object({
        name: yup.string().required("name is required"),
        phone_1: yup.string().required("phone number is required")
    })
    const createEnquiry = enquiry => {
        enquiryService.createEnquiry({
            ...enquiry,
            branch: branchState.selected_branch.id,
        }).then(data => data.json())
            .then(enquiry => {
                dispatch_create_enquiry({ enquiry });
                // toggleModal();
                closeModal();
            }).catch((error) => {
                // toggleModal();
            })
    };
    const setInitialValues = {
        date: new moment().format('YYYY-MM-DD'),
        call_back: new moment().format('YYYY-MM-DD'),
        appointment_date: "",
        date_of_birth: ""

    }
    const enquiryService = new EnquiryService();
    useEffect(() => {
        enquiryService
            .getEnquiriesForBranch(branchState.selected_branch.id)
            .then(data => data.json())
            .then(data => {
                dispatch_enquiries({
                    enquiries: data.results
                });
            }).catch(() => { })
    }, []);

    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom display="inline">
                Blank
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/">
                    Dashboard
                </Link>
                <Link component={NavLink} exact to="/">
                    Pages
                </Link>
                <Typography>Blank</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Button
                align="right"
                onClick={() => {
                    setInitial(setInitialValues);
                    setFormTitle('Create Enquiry')
                    toggleModal();
                    setonSubmit({ onSubmit: createEnquiry })
                }}
            >
                <AddCircle color="secondary" /> click to add new enquiry
            </Button>

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <EnquiryForm
                        initialValues={initial}
                        open={open}
                        closeModal={toggleModal}
                        fieldGroups={courseState.courses && platformState.platforms && getFields()}
                        onSubmit={handleSubmit}
                        schema={schema}
                        formTitle={formTitle}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
const mapStatetoProps = state => {
    return {
        enquiryState: state.enquiryReducer,
        branchState: state.branchReducer,
        courseState: state.courseReducer,
        platformState: state.platformReducer,
        globalState: state.globalReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch_enquiries: payload => {
            dispatch(fetch_enquiries_success(payload));
        },
        dispatch_delete_enquiry: payload => {
            dispatch(delete_enquiry_success(payload));
        },
        dispatch_create_enquiry: payload => {
            dispatch(create_enquiry_success(payload));
        },
        dispatch_update_enquiry: payload => {
            dispatch(update_enquiry_success(payload));
        }
    };
};
export default connect(mapStatetoProps, mapDispatchToProps)(AddEnquiry);