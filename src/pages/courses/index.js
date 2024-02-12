import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Grid, Button, makeStyles } from "@material-ui/core";
import Table from "../tables/MaterialTable";
import { getColumns } from "../tables/getColumns";
import SelectColumns from "../tables/SelectColumns";
import { AddCircle } from "@material-ui/icons";
import CourseService from '../../service/courseService';
import {
  fetch_courses_success,
  delete_course_success,
  create_course_success,
  update_course_success
} from '../../redux/reducers/courseReducer';
import { FieldTypes, filterColumns } from "../../utils";
import CourseForm from "./CourseForm";
import AlertDialog from "../Dialogs";

const useStyles = makeStyles((theme) => ({
  modal: {
    left: '50%',
    marginLeft: '30%',
    width: '45%'
  }
}));

function Courses({
  courseState,
  update_courses,
  dispatch_delete_course,
  dispatch_create_course,
  dispatch_update_course
}) {

  let [open, setOpen] = useState(false);
  let [openAlert, setOpenAlert] = useState(false);
  let [courseId, setCourseID] = useState("");
  let [initial, setInitial] = useState({});
  let [onSubmit, setonSubmit] = useState({});
  let [formTitle, setFormTitle] = useState("Create Course");
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
    name: yup.string().required("course name is required"),
  })


  const courseService = new CourseService();
  useEffect(() => {
    courseService.getCourses()
      .then(data => data.json())
      .then((data) => {
        update_courses({
          courses: data
        })
      }).catch(() => {

      })
  }, []);

  const toggleModal = () => {
    setOpen(!open);
  };

  const openAlertDialog = (courseId) => {
    setCourseID(courseId);
    setOpenAlert(true);
  };

  const closeAlertDialog = () => {
    setOpenAlert(false);
    setCourseID("");
  };

  const handleEdit = (row) => {
    setValues(row);
    setFormTitle('Update Course');
    toggleModal();
    setonSubmit({ onSubmit: updateCourse });
  };

  const handleDelete = (row) => {
    openAlertDialog(row.id);
  };

  const deleteCourse = () => {
    courseService.deleteCourse(courseId).then(response => {
      dispatch_delete_course({ courseId });
      setCourseID("");
    });
    closeAlertDialog();
  };

  const createCourse = course => {
    courseService.createCourse({
      ...course
    }).then(data => data.json())
      .then(course => {
        dispatch_create_course({ course });
      });
  };

  const updateCourse = course => {
    courseService.updateCourse({
      "id": course.id,
      "name": course.name,
    }).then(data => data.json())
      .then(course => {
        dispatch_update_course({ course });
      });
  };

  const handleSubmit = (course) => {
    onSubmit.onSubmit(course);
    toggleModal();
  }

  const setValues = (record) => {
    setInitial(record);
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Button
          align="right"
          onClick={() => {
            setInitial({});
            setFormTitle('Create Course')
            toggleModal();
            setonSubmit({ onSubmit: createCourse })
          }}
        >
          <AddCircle color="secondary" />
        </Button>
        <SelectColumns
          tableColumns={getColumns()}
          setSelectedColumns={setSelectedColumns}
        />
        <Table
          header="Courses"
          columns={filterColumns(getColumns(handleEdit, handleDelete), selectedColumns)}
          tableDataItems={courseState.courses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <CourseForm
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
          header="Course"
          closeAlertDialog={closeAlertDialog}
          handleSubmit={deleteCourse}
        />
      </Grid>
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => ({
  courseState: state.courseReducer
});
const mapDispatchToProps = (dispatch) => {
  return {
    update_courses: (payload) => {
      dispatch(fetch_courses_success(payload));
    },
    dispatch_delete_course: payload => {
      dispatch(delete_course_success(payload));
    },
    dispatch_create_course: payload => {
      dispatch(create_course_success(payload));
    },
    dispatch_update_course: payload => {
      dispatch(update_course_success(payload));
    }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Courses);
