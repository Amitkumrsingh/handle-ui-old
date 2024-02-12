import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import { connect } from "react-redux";
import EnquiryService from "../../service/enquiryService";
import {
  fetch_enquiries_success,
  update_enquiry_success,
} from "../../redux/reducers/enquiryReducer";
import { Edit } from "@material-ui/icons";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { Tooltip, IconButton,Select,
  MenuItem, } from "@material-ui/core";
import * as yup from 'yup';
import moment from 'moment';
import { FieldTypes, filterColumns } from "../../utils";
import EnquiryForm from "./EnquiryForm";
import AlertDialog from "../Dialogs";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 820,
    margin: "0 auto",
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  table: {
    marginTop: 16,
  },
  tableRow: {
    '& > *': {
      border: "1.5px solid black",
    },
  },
  update: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
}));

  const initialFormValues = {
  status: "",
};

function ViewEnquiryPage({ dispatchEnquiries, location,
dispatch_enquiries = () => { },
  dispatch_update_enquiry,
  enquiryState,
  branchState,
  courseState,
  platformState,
  globalState,
  history,
}) {
 const classes = useStyles();
  const [enquiry, setEnquiry] = useState(null);
  const enquiryId = location.state.id;
  const enquiryService = new EnquiryService();
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [enquiries, setEnquiries] = useState([]);
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState({});
  const [onSubmit, setonSubmit] = useState({});
  const [formTitle, setFormTitle] = useState("Create Enquiry");
  const [openAlert, setOpenAlert] = useState(false);
  const [OpenEnquiryId, setOpenEnquiryID] = useState("");

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
      name: "Wrong Enquiry"
    },
    {
      id: 5,
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
            as: FieldTypes.TEXT,
            maxLength: 100
          }, {
            name: "address.address_line_2",
            label: "Address Line 2",
            as: FieldTypes.TEXT,
            maxLength: 100
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
            as: FieldTypes.TEXTAREA,
            maxLength: 250
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


  const schema = yup.object({
  name: yup.string().required("Name is required"),
  phone_1: yup.string().required("Phone number is required"),
  notes: yup.string().max(250, "Notes cannot exceed 250 characters").nullable(),
  address: yup.object().shape({
    address_line_1: yup
      .string()
      .max(100, "Address Line 1 cannot exceed 100 characters")
      .nullable(),
    address_line_2: yup
      .string()
      .max(100, "Address Line 2 cannot exceed 100 characters")
      .nullable(),
  }),
  });
  
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


  const handleEdit = (row) => {
  setValues(row);
  setSelectedEnquiry(row);
  setFormTitle('Update Enquiry');
  toggleModal();
  setonSubmit({ onSubmit: updateEnquiry });
};

  
    const toggleModal = () => {
        setOpen(!open);
    };

    const closeModal = () => {
        setOpen(false);
  };
  const openAlertDialog = (OpenEnquiryID) => {
    setOpenEnquiryID(OpenEnquiryId);
    setOpenAlert(true);
  };
  const closeAlertDialog = () => {
    setOpenAlert(false);
   setOpenEnquiryID("");
  };

   const setValues = (record) => {
    setInitial(record);
  }

  const updateEnquiry = (enquiry) => {
  enquiryService
    .updateEnquiry({
      "id": enquiry.id,
      "branch": branchState.selected_branch.id,
      "date": enquiry.date,
      "phone_1": enquiry.address.phone_1,
      "name": enquiry.name,
      "notes": enquiry.notes,
      "call_back": enquiry.call_back,
      "address": {
        "address_line_1": enquiry.address.address_line_1,
        "address_line_2": enquiry.address.address_line_2,
        "city": enquiry.address.city.id,
        "pincode": enquiry.address.pincode,
      },
      "course": enquiry.course,
      "platform": enquiry.platform,
      "email": enquiry.email,
      "gender": enquiry.gender
    })
    .then((data) => data.json())
    .then((updatedEnquiry) => {
      dispatch_update_enquiry({ enquiry: updatedEnquiry });
    });
};

const handleSubmit = (enquiry) => {
  if (selectedEnquiry) {
      updateEnquiry(enquiry);
  } 
  onSubmit.onSubmit(enquiry);
  toggleModal();
};
  
  

  useEffect(() => {
    if (enquiryId) {
      enquiryService
        .getEnquiriesForId(enquiryId)
        .then((data) => data.json())
        .then((data) => {
          dispatchEnquiries({
            enquiries: [data],
          });
          console.log(data.results);
          if (data) {
            setEnquiry(data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatchEnquiries, enquiryId]);

  if (!enquiry && enquiry !== null) {
    return <Typography>Loading...</Typography>;
  }



  // const handleChange = (event) => {
  // const { name, value } = event.target;
  // };

  const handleChange = (event) => {
  const { name, value } = event.target;
  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    [name]: value,
  }));
  };


  return (
    <div className={classes.root}>
      <div className={classes.update}>
      <Typography variant="h4" className={classes.title}>
        View Enquiry
      </Typography>
      
      <div className={classes.edit}>
        <span>Edit</span>
        <Tooltip title="Edit" >
           <IconButton aria-label="edit" onClick={(e) => handleEdit()}>
              <Edit />
          </IconButton>
          </Tooltip>
          <EnquiryForm
          initialValues={selectedEnquiry}
          open={open}
          closeModal={toggleModal}
          fieldGroups={courseState.courses && platformState.platforms && getFields()}
          onSubmit={handleSubmit}
          schema={schema}
          formTitle={formTitle}
          />
          <AlertDialog
          openAlert={openAlert}
          header="Enquiry"
          closeAlertDialog={closeAlertDialog}
        />
      
      
      <span>Change Status</span>
<Tooltip title="Change Status" disableUnderline>
  <Select
    id="status"
    name="status"
    value={formValues.status}
    onChange={handleChange}
    IconComponent={SwapHorizIcon}
  >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    {enquiryOptions.map((option) => (
      <MenuItem key={option.id} value={option.id}>
        {option.name}
      </MenuItem>
    ))}
  </Select>
</Tooltip>

      </div>
      </div>
      
      
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.tableRow}>
            <TableCell>ID</TableCell>
            <TableCell>{enquiry ? enquiry.id : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Name</TableCell>
            <TableCell>{enquiry ? enquiry.name : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Date</TableCell>
            <TableCell>{enquiry ? enquiry.date : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Email</TableCell>
            <TableCell>{enquiry ? enquiry.email : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Phone 1</TableCell>
            <TableCell>{enquiry ? enquiry.phone_1 : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Phone 2</TableCell>
            <TableCell>{enquiry ? enquiry.phone_2 || "-" : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Notes</TableCell>
            <TableCell>{enquiry ? enquiry.notes || "-" : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Call Back</TableCell>
            <TableCell>{enquiry ? enquiry.call_back || "-" : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Status</TableCell>
            <TableCell>{enquiry ? enquiry.status : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>DOB</TableCell>
            <TableCell>{enquiry ? enquiry.dob || "-" : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Visitor Name</TableCell>
            <TableCell>{enquiry ? enquiry.visitor_name || "-" : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Gender</TableCell>
            <TableCell>{enquiry ? enquiry.gender || "-" : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Branch</TableCell>
            <TableCell>{enquiry ? enquiry.branch : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Course</TableCell>
            <TableCell>{enquiry ? enquiry.course : ""}</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow}>
            <TableCell>Platform</TableCell>
            <TableCell>{enquiry ? enquiry.platform : ""}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}


const mapStatetoProps = state => {
  return {
    enquiryState: state.enquiryReducer,
    branchState: state.branchReducer,
    courseState: state.courseReducer,
    platformState: state.platformReducer,
    globalState: state.globalReducer,
    enquiries: state.enquiryReducer.enquiries, 

  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchEnquiries: fetch_enquiries_success,
    dispatch_enquiries: payload => {
      dispatch(fetch_enquiries_success(payload));
    },
    dispatch_update_enquiry: payload => {
      dispatch(update_enquiry_success(payload));
    }
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(ViewEnquiryPage)