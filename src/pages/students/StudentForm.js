
import React, { useState } from 'react';
import { CreateForm, InstallmentCreateForm, CourseCreateForm } from '../../utils/forms';
import { Modal } from '@material-ui/core';
import getFieldGroups from "./fieldGroups";


import Stepper from "./Stepper";
import getSchema from "./schemas";


const infos = ["personal_info", "course_info", "additional_info", "address_info", "fees"];


export default function StudentForm({
    open,
    closeModal,
    initialValues = {},
    onSubmit,
    setStepData,
    formTitle,
    courses,
    qualifications,
    courseTenures,
    interGroupOptions,
    casteOptions,
    cities,
    personal_info,
    course_info,
    successMessage
}) {
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Personal Information', 'Qualifications', 'Documents', 'Courses', 'Installments Information'];
    const selectedCourse = course_info && course_info.course && courses && courses.filter((course) => {
        if (course.id === course_info.course) {
            return course
        }
    });
    const params = [courseTenures, courses, interGroupOptions, qualifications, casteOptions, cities];


    const handleNext = () => {
        if (activeStep === 4) {
            closeModal();
            setActiveStep(0);
            return;
        }
        setActiveStep((prevActiveStep) => {
            setStepData(infos[prevActiveStep + 1]);
            return prevActiveStep + 1
        });
    };


    const handleClose = () => {
        closeModal();
        setActiveStep(0);
    }


    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            setStepData(infos[prevActiveStep - 1]);
            return prevActiveStep - 1
        });
    };


    const handleSubmit = (values) => {
        onSubmit(values, activeStep);
        handleNext();
    };


    const getStepContent = (step) => {
        const defaultValues = {
            initialValues,
            onSubmit: handleSubmit,
            course_info,
            personal_info
        }
        switch (step) {
            case 0:
                let PersonalInfoForm = CreateForm({ fieldGroups: getFieldGroups().personal, schema: getSchema().personalInfoSchema, ...defaultValues });
                return <PersonalInfoForm />
            case 1:
                let CourseInfoForm = CreateForm({ fieldGroups: getFieldGroups(...params).course, schema: getSchema().courseInfoSchema, ...defaultValues });
                return <CourseInfoForm />
            case 2:
                let AdditionalInfoForm = CreateForm({ fieldGroups: getFieldGroups(...params).additional, schema: getSchema().additionalInfoSchema, ...defaultValues });
                return <AdditionalInfoForm />
            case 3:
                return <CourseCreateForm formTitle={formTitle} {...defaultValues}/>;
            case 4:
                return <InstallmentCreateForm selectedCourse={selectedCourse} formTitle={formTitle} {...defaultValues}/>
            default:
                return '';
        }
    }


    return (
        <Modal
            open={open}
        >
            <div style={{ position: 'relative', padding: 5, margin: 5, outline: "none", height: '100vh', overflow: 'auto', msOverflowStyle: 'none' }}>
            <style>
            {`
            ::-webkit-scrollbar {
                display: none;
            }
            `}
            </style>


                <div style={{
                    position: 'absolute',
                    top: 50,
                    right: 180,
                    cursor: 'pointer'
                }} onClick={handleClose}>X</div>
                <Stepper
                    formTitle={formTitle}
                    getStepContent={getStepContent}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    steps={steps}
                    activeStep={activeStep}
                    personal_info={personal_info}
                />
            </div>
        </Modal>
    )
}
