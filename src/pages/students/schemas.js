import * as yup from 'yup';

export default function getSchema() {
    const personalInfoSchema = yup.object({
        mother_first_name: yup.string().required("Mother First Name is Required"),
        father_first_name: yup.string().required("Father First Name is Required"),
        mother_occupation: yup.string().required("Mother Occupation is Required"),
        father_occupation: yup.string().required("Father Occupation is Required"),
        email: yup.string().required("email is Required"),
    });

    const courseInfoSchema = yup.object({
        course: yup.number().required("Course is Required"),
        doj: yup.date().required("Date Of Joining is Required"),
        tenure: yup.number().required("Tenure is Required"),
        end_date: yup.date().required("End date is Required")
    });

    const additionalInfoSchema = yup.object({
        dob: yup.date().required("Date of Birth is Required"),
        caste: yup.number().required("Caste is Required"),
        college_address: yup.string().required("College Address is Required"),
        college_name: yup.string().required("College Name is Required"),
        percentage: yup.number().min(0).max(100).required("College Name is Required"),
        qualification: yup.number().required("Qualification is Required"),
        reach: yup.string().required("Reach  is Required"),
    });

    const addressInfoSchema = yup.object({
        city: yup.number().required("City is Required"),
        address_line_1: yup.string().required("Address is Required"),
    });

    return {
        personalInfoSchema,
        courseInfoSchema,
        additionalInfoSchema,
        addressInfoSchema
    }

};