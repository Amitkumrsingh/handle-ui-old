import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import {
    CardContent,
    CardActions,
    CardHeader,
    Button,
    Typography,
    Grid,
    Card as MuiCard,
    Paper as MuiPaper,
    TextField as MuiTextField
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)`
  width: 200px;
`;

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(6),
        width: 700,
        border: "1px solid black"
    },
    header: {
        margin: theme.spacing(2),
    }
}));

// const TEXT = props => {
//     return <TextField {...props} />;
// };


export default function InstallmentCreateForm({
    onSubmit = (values) => { console.log(values) },
    formTitle,
    schema,
    selectedCourse,
    course_info,
    personal_info
}) {
    let initialValues = {};
    if (formTitle === "Update Student") {
        const student_fees = personal_info.student_courses.length ? personal_info.student_courses[0].student_fees : [];
        if (student_fees.length) {
            let course = student_fees[0].course ? student_fees[0].course : 0;
            let total = student_fees[0].total ? student_fees[0].total : 0;
            let num_installments = student_fees[0].num_installments ? student_fees[0].num_installments : 0;
            let fee_installments = student_fees[0].fee_installments && student_fees[0].fee_installments.length ? student_fees[0].fee_installments.map((installment, i) => {
                return {
                    [`amount-${i + 1}`]: installment.due,
                    [`date-${i + 1}`]: installment.due_date
                }
            }) : null;
            initialValues = {
                course,
                total,
                num_installments,
                fee_installments
            }
        }
    };

    const classes = useStyles();
    const [total, setTotal] = useState(initialValues.total ? initialValues.total : 0);
    const [numInstallments, setNumInstallments] = useState(initialValues.num_installments ? initialValues.num_installments : 0);
    const [course, setCourse] = useState(selectedCourse && selectedCourse[0] && selectedCourse[0].name);
    const [installments, setInstallments] = useState(initialValues.fee_installments ? initialValues.fee_installments : []);
    const [freshValues, setFreshValues] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);

    useEffect(() => {
        const ll = [];
        const kk = [];
        if (numInstallments && total) {
            for (var i = 1; i <= numInstallments; i++) {
                ll.push({});
                kk.push({
                    [`amount-${i}`]: Math.round(total / numInstallments),
                    [`date-${i}`]: moment().format("YYYY-MM-DD")
                });
            }
            setInstallments(kk);
        };
        enableSubmit();
    }, [numInstallments]);

    useEffect(() => {
        enableSubmit();
    }, [installments]);

    const enableSubmit = () => {
        if (total && numInstallments && installments.length) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = [];
        let course;
        if (initialValues.course) {
            course = initialValues.course
        } else {
            course = course_info ? course_info.id : 0
        };
        installments.forEach((installment, i) => {
            data.push(
                {
                    amount: installment[`amount-${i + 1}`],
                    date: installment[`date-${i + 1}`]
                }
            )
        })
        const values = {
            course,
            total: parseInt(total),
            num_installments: parseInt(numInstallments),
            installments: data
        };
        onSubmit(values);
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        name = name.split("-");
        if (name[0].includes("amount")) {
            const remAmount = total - value;
            if (numInstallments && total && value) {
                const ss = installments.map((installment, i) => {
                    if (parseInt(name[1]) === i + 1) {
                        installment[`amount-${i + 1}`] = parseInt(value);
                        return installment
                    } else {
                        installment[`amount-${i + 1}`] = Math.round(remAmount / (numInstallments - 1));
                        return installment
                    }
                })
                setInstallments(ss);
                setFreshValues(!freshValues);
            };
        } else {
            if (numInstallments && total && value) {
                const ss = installments.map((installment, i) => {
                    if (parseInt(name[1]) === i + 1) {
                        installment[`date-${i + 1}`] = value;
                        return installment
                    } else {
                        return installment
                    }
                })
                setInstallments(ss);
                setFreshValues(!freshValues);
            };
        };
        enableSubmit();
    };

    const handleInstallmentsChange = (e) => {
        let { name, value } = e.target;
        if (name === "total") {
            if (value) {
                setTotal(value);
            } else {
                setTotal(value);
                setNumInstallments(0);
                setInstallments([]);
                setFreshValues(!freshValues);
            }
        } else {
            if (value) {
                setNumInstallments(value);
            } else {
                setNumInstallments(value);
                setInstallments([]);
                setFreshValues(!freshValues);
            }
        };
    }

    return (
        <Grid item xs={12}>
            <Card mb={12}>
                <Paper>
                    <form noValidate onSubmit={handleSubmit}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12} sm={6} lg={4}>
                                    <TextField
                                        name="total"
                                        type="text"
                                        label="Total Amount"
                                        defaultValue={total}
                                        value={total}
                                        onChange={handleInstallmentsChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={4}>
                                    <TextField
                                        name="num_installments"
                                        type="text"
                                        label="No of Installments"
                                        value={numInstallments}
                                        onChange={handleInstallmentsChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={4}>
                                    <TextField
                                        name="course"
                                        type="text"
                                        label="Course"
                                        value={course}
                                        disabled
                                    />
                                </Grid>
                                {/* {!freshValues && } */}
                                {!freshValues && <Grid xs={12} sm={6} lg={3}>
                                    <Paper className={classes.paper} elevation={3}>
                                        <Typography variant="h6" className={classes.header}>Installments : -</Typography>
                                        {installments.map((value, i) => {
                                            return (
                                                <div key={i} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Grid item xs={12} sm={6} lg={4}>
                                                        <TextField
                                                            name={`date-${i + 1}`}
                                                            type="date"
                                                            defaultValue={value[`date-${i + 1}`]}
                                                            onChange={handleChange}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} lg={4}>
                                                        <TextField
                                                            name={`amount-${i + 1}`}
                                                            type="text"
                                                            defaultValue={value[`amount-${i + 1}`]}
                                                            onChange={handleChange}
                                                        />
                                                    </Grid>
                                                </div>
                                            )
                                        })}
                                    </Paper>
                                </Grid>}

                                {freshValues && <Grid xs={12} sm={6} lg={4}>
                                    <Paper className={classes.paper} elevation={3}>
                                        <Typography variant="h6" className={classes.header}>Installments : -</Typography>
                                        {installments.map((value, i) => {
                                            return (
                                                <div key={i} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Grid item xs={12} sm={6} lg={4}>
                                                        <TextField
                                                            name={`date-${i + 1}`}
                                                            type="date"
                                                            defaultValue={value[`date-${i + 1}`]}
                                                            onChange={handleChange}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} lg={4}>
                                                        <TextField
                                                            name={`amount-${i + 1}`}
                                                            type="text"
                                                            defaultValue={value[`amount-${i + 1}`]}
                                                            onChange={handleChange}
                                                        />
                                                    </Grid>
                                                </div>
                                            )
                                        })}
                                    </Paper>
                                </Grid>}
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" type="submit" disabled={buttonDisable}>
                                Submit
                            </Button>
                        </CardActions>
                    </form>
                </Paper>
            </Card>
        </Grid>
    )
}