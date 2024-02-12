import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {
    Card,
    CardContent,
    Typography,
    Grid,
} from '@material-ui/core';

import StudentService from '../../service/studentService';
import {
    dispatch_update_student,
    dispatch_empty_Details
} from '../../redux/reducers/studentDetailsReducer';

function StudentDetails({
    dispatch_update_student,
    dispatch_empty_Details,
    studentDetails,
    courseState,
    qualificationState,
    courseTenureState,
    interGroupState,
    casteState,
    globalState,
    toasterState,
    history
}) {
    const [loading, setLoading] = useState(true);
    const studentService = new StudentService();

    useEffect(() => {
        getStudentsDetails();
        dispatch_empty_Details()
    }, []);

    const getStudentsDetails = () => {
        const { state } = history.location;
        state ? setLoading(true) : setLoading(false)
        state && state.id && studentService.getStudentDetails(state.id, "personal_info")
            .then(data => data.json())
            .then((data) => {
                setLoading(false);
                dispatch_update_student({ data })
            }).catch(() => {
        })
    };

    const renderPersonalInfo = () => {
        const { personal_info } = studentDetails;
        return (
            <Card px={6} pt={6}>
                <CardContent>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Typography variant="body2" variant="h2">
                                Personal Info
                            <br />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">Name</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${personal_info.first_name} ${personal_info.last_name}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">Mother Name</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${personal_info.mother_first_name} ${personal_info.mother_last_name}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">Father Name</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${personal_info.father_first_name} ${personal_info.father_last_name}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">Email</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${personal_info.email}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">Phone No</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${personal_info.phone ? personal_info.phone : '--'}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }

    const renderCourseInfo = () => {
        const { student_courses } = studentDetails.personal_info;
        return (
            student_courses[0] && <Card px={6} pt={6}>
                <CardContent>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Typography variant="body2" variant="h2">
                                Course Info
                <br />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">Course Name</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${student_courses[0].course}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">Tenure</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${student_courses[0].tenure}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }

    const renderAdditionalInfo = () => {
        const { additional_info } = studentDetails.personal_info;
        return (
            additional_info && <Card px={6} pt={6}>
                <CardContent>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Typography variant="body2" variant="h2">
                                Additional Info
                <br />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">College Name</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${additional_info.college_name}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">DOB</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${additional_info.dob}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">Percentage</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${additional_info.percentage}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }

    const renderAddressInfo = () => {
        const { student_address } = studentDetails.personal_info;
        return (
            student_address && student_address[0] && <Card px={6} pt={6}>
                <CardContent>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Typography variant="body2" variant="h2">
                                Address Info
                <br />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">Address</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${student_address[0].address_line_1} ${student_address[0].address_line_2}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">City</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${student_address[0].city.name}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">State</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${student_address[0].city.state}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body">Pincode</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="right">
                                {`${student_address[0].pincode}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }

    const renderCard = () => {
        return (
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <Card mb={6}>
                        <CardContent>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card mb={6}>
                        <CardContent>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    const renderCards = () => {
        return (
            <React.Fragment>
                {renderPersonalInfo()}<br />
                {renderCourseInfo()}<br />
                {renderAdditionalInfo()}<br />
                {renderAddressInfo()}
                {renderCard()}
            </React.Fragment>
        )
    }

    const { personal_info } = studentDetails;
    return (
        !loading ? personal_info ? renderCards() : (
            <Typography variant="body" variant="h2">Please select any student in the students tab to view details.</Typography>
        ) : <Typography variant="body" variant="h2">Loading...</Typography>
    );
}

const mapStatetoProps = (state) => ({
    studentDetails: state.studentDetailsReducer,
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
        dispatch_update_student: (payload) => {
            dispatch(dispatch_update_student(payload));
        },
        dispatch_empty_Details: () => {
            dispatch(dispatch_empty_Details());
        },
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(StudentDetails);
