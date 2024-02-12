import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Grid, Button, Tooltip, IconButton } from '@material-ui/core';
import { AddCircle, Delete, Edit } from "@material-ui/icons";
import moment from 'moment';
import Table from "../tables/MaterialTable";
import SelectColumns from "../tables/SelectColumns";
import AlertDialog from "../Dialogs";
import StudentForm from './StudentForm';
import StudentService from '../../service/studentService';
import {
  fetch_students_success,
  dispatch_create_student,
  dispatch_update_student,
  empty_all_infos,
  dispatch_delte_student
} from '../../redux/reducers/studentReducer';
import { Visibility } from "@material-ui/icons";
import { filterColumns } from "../../utils";
const infos = ["personal_info", "course_info", "additional_info", "address_info", "fees"];

function Student({
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
  globalState,
  toasterState,
  history
}) {

  let [open, setOpen] = useState(false);
  let [courses, setCourses] = useState([]);
  let [initial, setInitial] = useState({});
  let [openAlert, setOpenAlert] = useState(false);
  let [studentId, setStudentId] = useState("");
  let [onSubmit, setonSubmit] = useState({});
  let [formTitle, setFormTitle] = useState("Create Student");
  let [selectedColumns, setSelectedColumns] = useState([]);

  
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

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Button
          align="right"
          onClick={() => {
            setInitial({});
            setFormTitle('Create Student')
            toggleModal();
            setonSubmit({ onSubmit: createStudent })
          }}
        >
          <AddCircle color="secondary" />
        </Button>
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
    </React.Fragment>
  );
}

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
export default connect(mapStatetoProps, mapDispatchToProps)(Student);