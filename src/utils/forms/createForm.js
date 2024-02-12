import React from "react";
import { Formik, Field, Form } from "formik";
import styled from "styled-components";

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

export default function createForm({
  initialValues,
  onSubmit = (values) => { console.log(values) },
  formTitle,
  schema,
  fieldGroups,
  options,
  courses,
  setCourses,
  fields,
  hideButton,
}) {
  return function () {
    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
          /* and other goodies */
        }) => (
            <Grid item xs={12}>
              <Card mb={12}>
                <Paper >
                  <Form noValidate>
                    <CardHeader title={formTitle} />
                    <CardContent>
                      <Grid container>
                        {
                          fieldGroups && fieldGroups.map(fieldGroup => {
                            return (
                              <>
                                {fieldGroup.header ? <Typography>{fieldGroup.header}</Typography> : ''}
                                {fieldGroup.fields.map(({ name, type, as, disabled, label, ...props }) => {
                                  return (
                                    <Grid key={name} item xs={12} sm={6} lg={4}>
                                      <Field name={name} as={as} disabled={disabled ? true : false} label={label} m={2} error={errors[name]}
                                        helperText={errors[name]} setFieldValue={setFieldValue} courses={courses} setCourses={setCourses} options={options} {...props} />
                                    </Grid>
                                  )
                                })}
                              </>
                            )
                          })
                        }
                      </Grid>
                    </CardContent>
                    <CardActions>
                      {!hideButton && <Button size="small" color="primary" type="submit">
                        Submit
                        </Button>}
                    </CardActions>
                  </Form>
                </Paper>
              </Card>
            </Grid>
          )}
      </Formik>
    );
  };
}
