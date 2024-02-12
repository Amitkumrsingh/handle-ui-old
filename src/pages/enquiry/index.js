import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as yup from 'yup';
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  TextField
} from "@material-ui/core";
import { AddCircle, Delete, Edit,Visibility } from "@material-ui/icons";
import moment from 'moment';
import Table from "../tables/MaterialTable";
import SelectColumns from "../tables/SelectColumns";
import EnquiryService from "../../service/enquiryService";
import {
  fetch_enquiries_success,
  delete_enquiry_success,
  create_enquiry_success,
  update_enquiry_success
} from "../../redux/reducers/enquiryReducer";
import AlertDialog from "../Dialogs";
import EnquiryForm from "./EnquiryForm";
import { FieldTypes, filterColumns } from "../../utils";
import { makeStyles, withStyles} from "@material-ui/core/styles";
import { Tooltip, IconButton } from "@material-ui/core";


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(6), 
  },
  marginDate: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 250,
  },
  inputLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'black',
  },
  select: {
    border: '1.2px solid black',
    borderRadius: 4,
  },
  button: { 
    margin: theme.spacing(1),
  },
  inputRoot: {
    "& .MuiOutlinedInput-notchedOutline": {
      border: '1.2px solid black', 
    },
  },
  inputInput: {
    padding: theme.spacing(3), 
  },
  notchedOutline: {
    borderWidth: "1px",
  },
}));

// const initialFormValues = {
//   selectDates: "",
//   date__year: "",
//   date__month: ""
// };

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; 

const initialFormValues = {
  selectDates: "",
  date__year: currentYear.toString(),
  date__month: currentMonth.toString()
};

function Enquiry({
  dispatch_enquiries = () => { },
  dispatch_delete_enquiry,
  dispatch_create_enquiry,
  dispatch_update_enquiry,
  enquiryState,
  branchState,
  courseState,
  platformState,
  globalState,
  history
}) {
  const [enquiries, setEnquiries] = useState([]);
  let [open, setOpen] = useState(false);
  let [openAlert, setOpenAlert] = useState(false);
  let [enquiryId, setEnquiryID] = useState("");
  let [initial, setInitial] = useState({});
  let [onSubmit, setonSubmit] = useState({});
  let [formTitle, setFormTitle] = useState("Create Enquiry");
  let [selectedColumns, setSelectedColumns] = useState([]);
  const classes = useStyles();
  const [formValues, setFormValues] = React.useState(initialFormValues);

  
  const handleChange = (event) => {
  const { name, value } = event.target;
  setFormValues((prevFormValues) => ({
    ...prevFormValues,
    [name]: value,
  }));
  };

  
const yearOptions = [
  {
    id: 1,
    name: "2023",
  },
  {
    id: 2,
    name: "2022",
  },
  {
    id: 3,
    name: "2021",
  },
  {
    id: 4,
    name: "2020",
  },
  {
    id: 5,
    name: "2019",
  },
];

  
const monthOptions = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

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
            name: "date__year",
            label: "Select Year",
            as: FieldTypes.SELECT,
            options: yearOptions.map((option) => ({
            name: option.name,
            value: option.id,
          })),
        },

            {
              name: "date__month",
              label: "Select Month",
              as: FieldTypes.SELECT,
              options: monthOptions.map((option) => ({
              name: option.name,
              value: option.id,
            })),
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

  const getColumns = () => {
    return [
      { title: 'Enquiry ID', field: 'id' },
      { title: 'Name', field: 'name'},
      {
        title: 'Course',
        field: 'course',
        render: rowData => {
          const course = courseState.courses.filter((course) => {
            if (course.id === rowData.course) {
              return course
            }
          })
          return course && course[0] && course[0].name
        }
      },
      {
        title: 'Platform',
        field: 'platform',
        render: rowData => {
          const platform = platformState.platforms.filter((platform) => {
            if (platform.id === rowData.platform) {
              return platform
            }
          })
          return platform && platform[0] && platform[0].name
        }
      },
      { title: 'Date', field: 'date' },
      { title: 'Callback', field: 'call_back' },
      { title: 'Status',
       field: 'status',
         render: rowData => {
          const status = enquiryOptions.filter((status) => {
            if (status.id === rowData.status) {
              return status
            }
          })
          return status && status[0] && status[0].name
        }
    },
      {
        title: 'Gender',
        field: 'gender',
        render: rowData => {
          const gender = genderOptions.filter((gender) => {
            if (gender.id === rowData.gender) {
              return gender
            }
          })
          return gender && gender[0] && gender[0].name
        }
      },
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
              <Tooltip title="Edit" onClick={(e) => handleEdit(rowData)}>
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

  const setInitialValues = {
    date: new moment().format('YYYY-MM-DD'),
    call_back: new moment().format('YYYY-MM-DD'),
    appointment_date: "",
    date_of_birth: ""

  }

  const handleEdit = (row) => {
    let data = Object.assign({}, row, {
      address : row.location
    });
    setValues(data);
    setFormTitle('Update Enquiry');
    toggleModal();
    setonSubmit({ onSubmit: updateEnquiry });
  };

  const handleDelete = (row) => {
    openAlertDialog(row.id);
  };

  const toggleModal = () => {
    setOpen(!open);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const handleView = (row) => {
    history.push({
       pathname: "/viewEnquiry",
       state: { id: row.id },
   });
};

  const openAlertDialog = (enquiryId) => {
    setEnquiryID(enquiryId);
    setOpenAlert(true);
  };

  const closeAlertDialog = () => {
    setOpenAlert(false);
    setEnquiryID("");
  };

  const deleteEnquiry = () => {
    enquiryService.deleteEnquiry(enquiryId).then(response => {
      dispatch_delete_enquiry({ enquiryId });
      setEnquiryID("");
    });
    closeAlertDialog();
  };

  const createEnquiry = enquiry => {
    enquiryService.createEnquiry({
      ...enquiry,
      branch: branchState.selected_branch.id,
    }).then(data => data.json())
      .then(enquiry => {
        dispatch_create_enquiry({ enquiry });
        closeModal();
      }).catch((error) => {

      })
  };

  const setValues = (record) => {
    setInitial(record);
  }

  const updateEnquiry = enquiry => {
    enquiryService.updateEnquiry({
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
      "gender": enquiry.gender,
    }).then(data => data.json())
      .then((enquiry) => {
        dispatch_update_enquiry({ enquiry })
      })
  };

  const handleSubmit = (enquiry) => {
    onSubmit.onSubmit(enquiry);
    toggleModal();
  }


const handleDate = (event) => {
  event.preventDefault();
  const date__year = formValues.date__year;
  const date__month = formValues.date__month;
  const branchId = branchState.selected_branch.id;

  enquiryService
    .getEnquiriesForBroadSearch("", "", "", branchId,"", "",date__year, date__month, "")
    .then((data) => data.json())
    .then((data) => {
      dispatch_enquiries({
        enquiries: data.results,
      });
      setEnquiries(data.results);
    })
    .catch(() => {});
};

useEffect(() => {
  const date__year = formValues.date__year;
  const date__month = formValues.date__month;
  const branchId = branchState.selected_branch.id;

  enquiryService
    .getEnquiriesForBroadSearch("", "", "", branchId,"", "",  date__year, date__month, "")
    .then((data) => data.json())
    .then((data) => {
      dispatch_enquiries({
        enquiries: data.results,
      });
      setEnquiries(data.results);
    })
    .catch(() => {});
}, [formValues.date__year, formValues.date__month,branchState.selected_branch.id]);


  return (
    <React.Fragment>
      <form onSubmit={handleDate}>
      <Grid container spacing={6}>
        <Button
          align="right"
          onClick={() => {
            setInitial(setInitialValues);
            setFormTitle('Create Enquiry')
            toggleModal();
            setonSubmit({ onSubmit: createEnquiry })
          }}
        >
          <AddCircle color="secondary" />
        </Button>
        <SelectColumns
          tableColumns={getColumns()}
          setSelectedColumns={setSelectedColumns}
        />
    
        
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel shrink className={classes.inputLabel}>
        Select Year
      </InputLabel>
      <Select
        name="date__year"
        value={formValues.date__year}
        onChange={handleChange}
        className={classes.select}
        input={<BootstrapInput />}
        placeholder="Select year"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {yearOptions.map((option) => (
          <MenuItem key={option.id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  

    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel shrink className={classes.inputLabel}>
        Select Month
      </InputLabel>
      <Select
        name="date__month"
        value={formValues.date__month}
        onChange={handleChange}
        className={classes.select}
        input={<BootstrapInput />}
        placeholder="Select month"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {monthOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>


        <Table
          header="Enquires"
          columns={filterColumns(getColumns(), selectedColumns)}
          tableDataItems={enquiryState.enquiries}
        />
        <EnquiryForm
          initialValues={initial}
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
          handleSubmit={deleteEnquiry}
        />
        </Grid>
        </form>
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
export default connect(mapStatetoProps, mapDispatchToProps)(Enquiry);
