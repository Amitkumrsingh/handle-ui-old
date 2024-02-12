import React, { useState } from "react";
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
  TextField as MuiTextField,
  IconButton,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { margin } from "polished";
import AddIcon from "@material-ui/icons/Add";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const TextFieldSpacing = styled(MuiTextField)(spacing);
const TextField = styled(TextFieldSpacing)`
  width: 100px;
  max-width: 250px;
  min-width: 200px;
`;
const ScrollableContainer = styled.div`
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const FieldWrapper = styled.div`
  flex-basis: calc(45% - 10px);
  padding: 0px;
`;
const Heading = styled(Typography)`
  flex-basis: 100%;
`;

const FieldTypes = {
  TEXT: "text",
  FILE: "file",
};

export default function createForm({
  initialValues,
  onSubmit = (values) => {
    console.log(values);
  },
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
    const [additionalFields, setAdditionalFields] = useState([]);

    const handleAddField = (fieldName) => {
      const newField = {
        name: fieldName + "_" + additionalFields.length,
        label: fieldName,
        as: FieldTypes.TEXT,
      };

      setAdditionalFields((prevFields) => [...prevFields, newField]);
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Grid item xs={12}>
            <ScrollableContainer>
              <Card mb={12}>
                <Paper>
                  <Form noValidate>
                    <CardHeader title={formTitle} />
                    <CardContent
                      style={{ margin: "-50px 0px 0px 250px", padding: "5px" }}
                    >
                      <GridContainer>
                        {fieldGroups &&
                          fieldGroups.map((fieldGroup) => (
                            <React.Fragment
                              key={fieldGroup.label}
                            >
                              <Heading
                                variant="subtitle1"
                                style={{
                                  margin: "25px 0px 0px 0px",
                                  padding: "0px 0px 0px 0px",
                                }}
                              >
                                {fieldGroup.label}
                              </Heading>
                              {fieldGroup.fields.map(
                                ({ name, as, label, ...props }) => (
                                  <FieldWrapper key={name}>
                                    <Field
                                      name={name}
                                      as={as}
                                      component={
                                        as === "textarea"
                                          ? TextField
                                          : undefined
                                      }
                                      label={label}
                                      m={2}
                                      fullWidth
                                      error={errors[name]}
                                      helperText={touched[name] && errors[name]}
                                      setFieldValue={setFieldValue}
                                      courses={courses}
                                      setCourses={setCourses}
                                      options={options}
                                      {...props}
                                    />
                                    {name === "phone_number" ||
                                    name === "email" ||
                                      name === "image"||
                                    name === "guardian_phone_number"||
                                    name === "mother_phone_number"||
                                    name === "father_phone_number"
                                      ? (
                                      <IconButton
                                        onClick={() => handleAddField(name)}
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    ) : null}
                                  </FieldWrapper>
                                )
                              )}
                            </React.Fragment>
                          ))}
                        {additionalFields.map((field, index) => (
                          <FieldWrapper key={field.name}>
                            <Field
                              name={field.name}
                              as={TextField}
                              label={field.label}
                              m={2}
                              fullWidth
                              error={errors[field.name]}
                              helperText={
                                touched[field.name] && errors[field.name]
                              }
                            />
                          </FieldWrapper>
                        ))}
                      </GridContainer>
                    </CardContent>
                    <CardActions>
                      {!hideButton && (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Submit
                        </Button>
                      )}
                    </CardActions>
                  </Form>
                </Paper>
              </Card>
            </ScrollableContainer>
          </Grid>
        )}
      </Formik>
    );
  };
}
