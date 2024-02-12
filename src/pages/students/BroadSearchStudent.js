import React, { useEffect, useState } from "react";
import { makeStyles, withStyles} from "@material-ui/core/styles";

import { connect } from 'react-redux';
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  TextField,
  Tooltip,
  IconButton
} from "@material-ui/core";
import { AddCircle, Delete, Edit } from "@material-ui/icons";
import moment from 'moment';
import Table from "../tables/MaterialTable";
import SelectColumns from "../tables/SelectColumns";
import AlertDialog from "../Dialogs";
import StudentForm from './StudentForm';
import StudentService from '../../service/studentService';
import { FieldTypes, filterColumns } from "../../utils";
import FilterListIcon from '@material-ui/icons/FilterList';

import {
  fetch_students_success,
  dispatch_create_student,
  dispatch_update_student,
  empty_all_infos,
  dispatch_delte_student
} from '../../redux/reducers/studentReducer';
import { Visibility } from "@material-ui/icons";

import ClearAllIcon from '@material-ui/icons/ClearAll';

const infos = ["personal_info", "course_info", "additional_info", "address_info", "fees"];


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



const initialFormValues = {
  date__year: "",
  date__month: "",
  student_id: "",
  course: "",
  selectDates: "",
  fromDate: "",
  toDate: "",
  studentEnquiry: "",
  platform: "",
  tenure: "",
  college: "",
  cast: "",
  InterGroup: "",
  qualification: "",
  city: "",
  Pincode: "",
  Gender: "",
};

function BroadSearchStudent({
   students,
  dispatch_create_student,
  dispatch_update_student,
  dispatch_empty_all_infos,
  dispatch_delte_student,
  studentState,
  courseState,
  qualificationState,
  courseTenureState,
  interGroupState,
    casteState,
  platformState,
  globalState,
  toasterState,
  history
}) {

  const [modelOpen, setModelOpen] = useState(false);
  const classes = useStyles();
  const [formValues, setFormValues] = React.useState(initialFormValues);
  let [selectedColumns, setSelectedColumns] = useState([]);
  let [open, setOpen] = useState(false);
  let [openAlert, setOpenAlert] = useState(false);
  let [initial, setInitial] = useState({});
  let [onSubmit, setonSubmit] = useState({});
  let [studentId, setStudentId] = useState("");
  let [courses, setCourses] = useState([]);
  let [formTitle, setFormTitle] = useState("Create Student");
  const [enquiries, setEnquiries] = useState([]);

//  handleChange = (event) => {
//   const { name, value } = event.target;
//   setFormValues((prevFormValues) => ({
//     ...prevFormValues,
//     [name]: value,
//   }));
//   };
  
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

   const getColumns = (handleEdit, handleDelete, handleView) => {
    return [
      { title: 'Id', field: 'id' },
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      // { title: 'Phone', field: 'phone' },
      // { title: 'Notes', field: 'notes' },
      {
        title: 'Father Name',
        field: 'father_first_name',
        render: rowData => `${rowData.father_first_name} ${rowData.father_last_name}`
      },
      {
        title: 'Mother Name',
        field: 'mother_first_name',
        render: rowData => `${rowData.mother_first_name} ${rowData.mother_last_name}`
      },
      { title: 'Created At', field: 'created_at' },
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
    
    const studentService = new StudentService();

  useEffect(() => {
    getStudents();
    dispatch_empty_all_infos();
  }, []);

  const getStudents = () => {
    studentService.getStudents()
      .then(data => data.json())
      .then((data) => {
        students({
          students: data.results
        })
      }).catch(() => {

      })
  }

  const getStudentsAndcloseModal = () => {
    dispatch_empty_all_infos();
    toggleModal();
  }

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleEdit = (row) => {
    setStudentId(row.id);
    infos.forEach((info, i) => {
      if (info !== "fees") {
        studentService.getStudentDetails(row.id, info)
          .then(data => data.json())
          .then((data) => {
            data.step = i;
            dispatch_update_student({ data })
            info === "personal_info" && setValues(data);
            setFormTitle('Update Student');
            toggleModal();
            setonSubmit({ onSubmit: updateStudent });
          }).catch(() => {

          })
      }
    })
  };

  const handleView = (row) => {
    history.push({
      pathname: "/student-details",
      state: { id: row.id }
    });
  };

  const setStepData = (step) => {
    if (step === "address_info") {
      // let data = Object.assign({}, studentState[step], {
      //   city: studentState[step].city.id
      // })
      // setValues(data);
      return;
    }
    if (step !== "fees") {
      setValues(studentState[step]);
    }
  };

  const handleDelete = (row) => {
    openAlertDialog(row.id);
  };

  const openAlertDialog = (studentId) => {
    setStudentId(studentId);
    setOpenAlert(true);
  };

  const closeAlertDialog = () => {
    setOpenAlert(false);
    setStudentId("");
  };

  const handleSubmit = (values, step) => {
    onSubmit.onSubmit(values, step)
  }

  const setValues = (record) => {
    setInitial(record);
  }

  const deleteStudent = () => {
    studentService.deleteStudent(studentId).then(response => {
      dispatch_delte_student({ studentId });
      setStudentId("");
    });
    dispatch_empty_all_infos();
    closeAlertDialog();
  };

  const createStudent = (student, activeStep) => {
    const { personal_info } = JSON.parse(localStorage.getItem("reduxState")).studentReducer;
    if (infos[activeStep] !== "personal_info") {
      student.student = personal_info.id;
      if (infos[activeStep] === "course_info") {
        student.doj = new moment().format('DD-MM-YYYY');
        student.end_date = new moment().format('DD-MM-YYYY');
      }
      if (infos[activeStep] === "additional_info" && !student.dob) {
        student.dob = new moment().format('DD-MM-YYYY')
      }
    }
    studentService.createStudent(student, infos[activeStep])
      .then(data => data.json())
      .then(student => {
        student.step = activeStep
        dispatch_create_student({ student });
        infos[activeStep] === "personal_info" && getStudents();
      }).catch((err) => {
        console.log(err);
      })
  };

  const updateStudent = (student, activeStep) => {
    const { personal_info } = JSON.parse(localStorage.getItem("reduxState")).studentReducer;
    if (infos[activeStep] !== "personal_info") {
      student.student = personal_info.id;
    }
    studentService.updateStudent(student, personal_info.id, infos[activeStep])
      .then(data => data.json())
      .then(data => {
        data.step = activeStep;
        dispatch_update_student({ data })
      }).catch((err) => {
        //console.log(err);
      })
  };
  
  
//   const handleSubmit = (event) => {
//   event.preventDefault();
//   const date__year = formValues.date__year;
//   const date__month = formValues.date__month;
//   const student_id = formValues.student_id;
//   const courses = formValues.course;
//   const start_date = formValues.fromDate;
//   const end_date = formValues.toDate;
//   const branchId = branchState.selected_branch.id;
//   const platform = formValues.platform;

//     studentService
    
//     .getEnquiriesForBroadSearch(courses, start_date, end_date, branchId, status, platform,date__year,date__month,student_id)
//     .then((data) => data.json())
//     .then((data) => {
//       dispatch_enquiries({
//         enquiries: data.results,
//       });
//       setEnquiries(data.results);
//     })
//     .catch(() => {});
// };


//   useEffect(() => {
//   const date__year = formValues.date__year;
//   const date__month = formValues.date__month;
//   const student_id = formValues.student_id;
//   const courses = formValues.course;
//   const start_date = formValues.fromDate;
//   const end_date = formValues.toDate;
//   const branchId = branchState.selected_branch.id;
//   const platform = formValues.platform;

//     enquiryService
//     .getEnquiriesForBroadSearch(courses, start_date, end_date, branchId, status, platform,date__year,date__month,student_id)
//     .then((data) => data.json())
//     .then((data) => {
//       dispatch_enquiries({
//         enquiries: data.results,
//       });
//       setEnquiries(data.results);
//     })
//       .catch(() => { });
    
// }, [formValues.course, formValues.fromDate, formValues.toDate, formValues.status, formValues.platform, branchState.selected_branch.id, formValues.date__year, formValues.date__month, formValues.student_id]);




  return (
    <form>
       {/* Filter Icon */}
      <div style={{ display: "flex",gap:"42rem" }}>
        <div>
          <span>Filters</span>
          <IconButton onClick={() => setModelOpen(!modelOpen)}>
            {modelOpen ? <FilterListIcon /> : <FilterListIcon />}
          </IconButton>
        </div>
        <div>
          <span>Clear Filters</span>
          <IconButton>
            <ClearAllIcon/>
          </IconButton>
        </div>
      </div>
      
      
      {/* Model Open: Show Form and Select Dropdown */}
      {modelOpen && (
        <div>
          
<Grid container justify="center" spacing={3} className={classes.marginTop}>
  <Grid item xs={12} sm={4}>
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel shrink className={classes.inputLabel}>
        Select Year
      </InputLabel>
      <Select
        name="date__year"
        value={formValues.date__year}
        // onChange={handleChange}
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
  </Grid>

  <Grid item xs={12} sm={4}>
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel shrink className={classes.inputLabel}>
        Select Month
      </InputLabel>
      <Select
        name="date__month"
        value={formValues.date__month}
        // onChange={handleChange}
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
  </Grid>

  <Grid item xs={12} sm={4}>
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel shrink htmlFor="student-select" className={classes.inputLabel}>
        Select Student
      </InputLabel>
      <Select
        name="student_id"
        value={formValues.student_id}
        // onChange={handleChange}
        input={<BootstrapInput />}
        inputProps={{
          id: 'student-select',
        }}
        className={classes.select}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {enquiries.map((student) => (
          <MenuItem key={student.id} value={student.id}>
            {`${student.id} - ${student.name}`}
          </MenuItem>
        ))}
      </Select>
                
    
    </FormControl>
  </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl  variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel shrink id="tenures-label" className={classes.inputLabel}>
              Course Tenures
            </InputLabel>
            <Select
              labelId="tenures-label"
              id="course-tenures"
              name="course-tenures"
              value={formValues.status}
            //   onChange={handleChange}
              className={classes.select}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {/* {enquiryOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>  
        </Grid>

        <Grid item xs={12} sm={4} className={classes.marginDate}>
          <TextField
            name="fromDate"
            label="From Date"
            type="date"
            value={formValues.fromDate}
            // onChange={handleChange}
            className={classes.formControl}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            InputProps={{
              classes: {
                root: classes.inputRoot,
                input: classes.inputInput,
                notchedOutline: classes.notchedOutline,
              },
             }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4} className={classes.marginDate}>
          <TextField
            name="toDate"
            label="To Date"
            type="date"
            value={formValues.toDate}
            // onChange={handleChange}
            className={classes.formControl}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            InputProps={{
              classes: {
                  root: classes.inputRoot,
                  input: classes.inputInput,
                  notchedOutline: classes.notchedOutline,
              },
          }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel shrink className={classes.inputLabel}>
              Course
            </InputLabel>
            <Select
              name="course"
              value={formValues.course}
            //   onChange={handleChange}
              className={classes.select}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {courseState.courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
            

        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel shrink className={classes.inputLabel}>
              Platform
            </InputLabel>
            <Select
              name="platform"
              value={formValues.platform}
            //   onChange={handleChange}
              className={classes.select}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {/* {platformState.platforms.map((platform) => (
                <MenuItem key={platform.id} value={platform.id}>
                  {platform.name}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
        </Grid>

<Grid item xs={12} sm={4}>
  <FormControl variant="outlined" className={classes.formControl} fullWidth>
    <InputLabel shrink className={classes.inputLabel}>
      College
    </InputLabel>
    <Select
      name="college"
      value={formValues.college}
      // onChange={handleChange}
      className={classes.select}
      input={<BootstrapInput />}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {/* {collegeState.colleges.map((college) => (
        <MenuItem key={college.id} value={college.id}>
          {college.name}
        </MenuItem>
      ))} */}
    </Select>
  </FormControl>
</Grid>

<Grid item xs={12} sm={4}>
  <FormControl variant="outlined" className={classes.formControl} fullWidth>
    <InputLabel shrink className={classes.inputLabel}>
      Cast
    </InputLabel>
    <Select
      name="cast"
      value={formValues.cast}
      // onChange={handleChange}
      className={classes.select}
      input={<BootstrapInput />}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {/* {castState.casts.map((cast) => (
        <MenuItem key={cast.id} value={cast.id}>
          {cast.name}
        </MenuItem>
      ))} */}
    </Select>
  </FormControl>
</Grid>
     
                      
                
<Grid item xs={12} sm={4}>
  <FormControl variant="outlined" className={classes.formControl} fullWidth>
    <InputLabel shrink className={classes.inputLabel}>
      InterGroup
    </InputLabel>
    <Select
      name="interGroup"
      value={formValues.interGroup}
      // onChange={handleChange}
      className={classes.select}
      input={<BootstrapInput />}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {/* {interGroupState.interGroups.map((group) => (
        <MenuItem key={group.id} value={group.id}>
          {group.name}
        </MenuItem>
      ))} */}
    </Select>
  </FormControl>
</Grid>

                      <Grid item xs={12} sm={4}>
  <FormControl variant="outlined" className={classes.formControl} fullWidth>
    <InputLabel shrink className={classes.inputLabel}>
      Qualification
    </InputLabel>
    <Select
      name="qualification"
      value={formValues.qualification}
      // onChange={handleChange}
      className={classes.select}
      input={<BootstrapInput />}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {/* {qualificationState.qualifications.map((qualification) => (
        <MenuItem key={qualification.id} value={qualification.id}>
          {qualification.name}
        </MenuItem>
      ))} */}
    </Select>
  </FormControl>
</Grid>

<Grid item xs={12} sm={4}>
  <FormControl variant="outlined" className={classes.formControl} fullWidth>
    <InputLabel shrink className={classes.inputLabel}>
      City
    </InputLabel>
    <Select
      name="city"
      value={formValues.city}
      // onChange={handleChange}
      className={classes.select}
      input={<BootstrapInput />}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {/* {cityState.cities.map((city) => (
        <MenuItem key={city.id} value={city.id}>
          {city.name}
        </MenuItem>
      ))} */}
    </Select>
  </FormControl>
</Grid>

                      
<Grid item xs={12} sm={4}>
  <FormControl variant="outlined" className={classes.formControl} fullWidth>
    <InputLabel shrink className={classes.inputLabel}>
      Pincode
    </InputLabel>
    <Select
      name="pincode"
      value={formValues.pincode}
      // onChange={handleChange}
      className={classes.select}
      input={<BootstrapInput />}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {/* {pincodeState.pincodes.map((pincode) => (
        <MenuItem key={pincode.id} value={pincode.id}>
          {pincode.code}
        </MenuItem>
      ))} */}
    </Select>
  </FormControl>
</Grid>
                      

<Grid item xs={12} sm={4}>
  <FormControl variant="outlined" className={classes.formControl} fullWidth>
    <InputLabel shrink className={classes.inputLabel}>
      Gender
    </InputLabel>
    <Select
      name="gender"
      value={formValues.gender}
      // onChange={handleChange}
      className={classes.select}
      input={<BootstrapInput />}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {/* {genderState.genders.map((gender) => (
        <MenuItem key={gender.id} value={gender.id}>
          {gender.name}
        </MenuItem>
      ))} */}
    </Select>
  </FormControl>
</Grid>





        <Grid container item xs={12} spacing={2} justify="center">
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              View Details
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              View Graph
            </Button>
          </Grid>
        </Grid>
          </Grid>

          <div>
      <Grid container spacing={6}>
        <SelectColumns
          tableColumns={getColumns()}
          setSelectedColumns={setSelectedColumns}
        />
        <Table
          header="Students"
          columns={filterColumns(getColumns(handleEdit, handleDelete, handleView), selectedColumns)}
          tableDataItems={studentState.students}
        />
        <StudentForm
          initialValues={initial}
          setStepData={setStepData}
          formTitle={formTitle}
          open={open}
          closeModal={getStudentsAndcloseModal}
          setCourses={(event) => setCourses([...event.target.value])}
          courses={courseState.courses}
          qualifications={qualificationState.qualifications}
          courseTenures={courseTenureState.courseTenures}
          interGroupOptions={interGroupState.interGroups}
          casteOptions={casteState.castes}
          cities={globalState.cities}
          onSubmit={handleSubmit}
          personal_info={studentState.personal_info}
          course_info={studentState.course_info}
          successMessage={toasterState.successMessage}
        />
        <AlertDialog
          openAlert={openAlert}
          header="Student"
          closeAlertDialog={closeAlertDialog}
          handleSubmit={deleteStudent}
        />
          </Grid>
        </div>
        </div>
        
      )}
      {!modelOpen && (
              <div>
                  
      <SelectColumns
          tableColumns={getColumns()}
          setSelectedColumns={setSelectedColumns}
        />
        <Table
          header="Students"
          columns={filterColumns(getColumns(handleEdit, handleDelete, handleView), selectedColumns)}
          tableDataItems={studentState.students}
        />
        <StudentForm
          initialValues={initial}
          setStepData={setStepData}
          formTitle={formTitle}
          open={open}
          closeModal={getStudentsAndcloseModal}
          setCourses={(event) => setCourses([...event.target.value])}
          courses={courseState.courses}
          qualifications={qualificationState.qualifications}
          courseTenures={courseTenureState.courseTenures}
          interGroupOptions={interGroupState.interGroups}
          casteOptions={casteState.castes}
          cities={globalState.cities}
          onSubmit={handleSubmit}
          personal_info={studentState.personal_info}
          course_info={studentState.course_info}
          successMessage={toasterState.successMessage}
        />
        <AlertDialog
          openAlert={openAlert}
          header="Student"
          closeAlertDialog={closeAlertDialog}
          handleSubmit={deleteStudent}
        />
          
        </div>
      )}
    </form>
  );
};


const mapStatetoProps = (state) => ({
  studentState: state.studentReducer,
  courseState: state.courseReducer,
  qualificationState: state.qualificationReducer,
  courseTenureState: state.courseTenureReducer,
  interGroupState: state.interGroupReducer,
  casteState: state.casteReducer,
  globalState: state.globalReducer,
  toasterState: state.toasterReducer
});
const mapDispatchToProps = (dispatch) => {
  return {
    students: (payload) => {
      dispatch(fetch_students_success(payload));
    },
    dispatch_delte_student: (payload) => {
      dispatch(dispatch_delte_student(payload));
    },
    dispatch_create_student: (payload) => {
      dispatch(dispatch_create_student(payload));
    },
    dispatch_update_student: (payload) => {
      dispatch(dispatch_update_student(payload));
    },
    dispatch_empty_all_infos: () => {
      dispatch(empty_all_infos());
    },
  }
}
export default connect(
 mapStatetoProps, mapDispatchToProps
)(BroadSearchStudent);
