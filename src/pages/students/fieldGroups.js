import { FieldTypes } from "../../utils/forms";
export default function getFieldGroups(courseTenures, courses, interGroupOptions, qualifications, casteOptions, cities) { 

    
    let personal = [
        {
            label: "Student Details",
            
            fields: [
                
                {
                    name: "first_name",
                    label: "First Name",
                    as: FieldTypes.TEXT,
                    color: "red"
                },
                {
                    name: "last_name",
                    label: "Last Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "gender",
                    label: "Gender",
                    as: FieldTypes.TEXT
                },
                {
                    name: "phone_number",
                    label: "Phone Number",
                    as: FieldTypes.TEXT
                },
                {
                    name: "email",
                    label: "Email",
                    as: FieldTypes.TEXT
                },
            ]
        },
        {
            label: "Profile Photo",
            fields: [
                {
                    name: "image",
                    label: "Image",
                    as: FieldTypes.FILE,
                    helperText: "Upload your image"
                },
            ]
        },

        {
            label: "Father Details",
            fields: [
                {
                    name: "father_first_name",
                    label: "Father First Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "father_last_name",
                    label: "Father Last Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "father_occupation",
                    label: "Father's Occupation",
                    as: FieldTypes.TEXT
                },
                {
                    name: "father_phone",
                    label: "Father Phone Number",
                    as: FieldTypes.TEXT
                },
            ]
        },
        {
            label: "Mother Details",
            fields: [
                {
                    name: "mother_first_name",
                    label: "Mother First Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "mother_last_name",
                    label: "Mother Last Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "mother_occupation",
                    label: "Mother's Occupation",
                    as: FieldTypes.TEXT
                },
                {
                    name: "mother_phone",
                    label: "Mother Phone Number",
                    as: FieldTypes.TEXT
                },
            ]
        },

        {
            label: "Guardian's Details",
            fields: [
                {
                    name: "guardian_first_name",
                    label: "Guardian First Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "guardian_last_name",
                    label: "Guardian Last Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "guardian_occupation",
                    label: "Guardian's Occupation",
                    as: FieldTypes.TEXT
                },
                {
                    name: "guardian_phone",
                    label: "Guardian Phone Number",
                    as: FieldTypes.TEXT
                },
            ]
        },

        {
            label: "Home Address",
            fields: [
                {
                    name: "pin_code",
                    label: "Pin Code",
                    as: FieldTypes.TEXT
                },
                {
                    name: "country",
                    label: "Country",
                    as: FieldTypes.TEXT
                },
                {
                    name: "state",
                    label: "State",
                    as: FieldTypes.TEXT
                },
                {
                    name: "city",
                    label: "City",
                    as: FieldTypes.TEXT
                },
                {
                    name: "district",
                    label: "District",
                    as: FieldTypes.TEXT
                },
                {
                    name: "area",
                    label: "Area",
                    as: FieldTypes.TEXT
                },
                {
                    name: "colony",
                    label: "Colony",
                    as: FieldTypes.TEXT
                },
                {
                    name: "apartment",
                    label: "House.no/Flat.no/Apartment",
                    as: FieldTypes.TEXT
                },
            ]
        }
    ];

     const course = [
        {
            fields: [
                {
                    name: "school_type",
                    label: "School Type",
                    as: FieldTypes.SELECT,
                    options: [
                        { name: "7th Class", value: "7th" },
                        { name: "8th Class", value: "8th" },
                        { name: "9th Class", value: "9th" },
                        { name: "10th Class", value: "10th" }
                    ]
                },
                {
                    name: "school_passout_year",
                    label: "School Passout Year",
                    as: FieldTypes.TEXT
                },
                {
                name: "school_education_board",
                label: "School Education Board",
                as: FieldTypes.SELECT,
                options: [
                { name: "CBSE", value: "cbse" },
                { name: "IGSE", value: "igse" },
                { name: "State Board", value: "state_board" },
                { name: "ICSE", value: "icse" }
                ]
                },
                {
                    name: "school_address_name",
                    label: "School Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "school_address_pin_code",
                    label: "School Pin Code",
                    as: FieldTypes.TEXT
                },
                {
                    name: "school_address_branch_area",
                    label: "School Branch Area",
                    as: FieldTypes.TEXT
                },
                {
                    name: "school_address_country",
                    label: "School Country",
                    as: FieldTypes.TEXT
                },
                {
                    name: "school_address_state",
                    label: "School State",
                    as: FieldTypes.TEXT
                },
                {
                    name: "school_address_city",
                    label: "School City",
                    as: FieldTypes.TEXT
                },
                {
                    name: "school_address_district",
                    label: "School District",
                    as: FieldTypes.TEXT
                }
                ]
                },
                {
                fields: [
                {
                    name: "intermediate_type",
                    label: "Intermediate Type",
                    as: FieldTypes.SELECT,
                    options: [
                        { name: "11th Class", value: "11th" },
                        { name: "12th Class", value: "12th" }
                    ]
                },
                {
                    name: "intermediate_passout_year",
                    label: "Intermediate Passout Year",
                    as: FieldTypes.TEXT
                },
                {
                name: "intermediate_education_board",
                label: "Intermediate Education Board",
                as: FieldTypes.SELECT,
                options: [
                         { name: "CBSE", value: "cbse" },
                         { name: "IGSE", value: "igse" },
                         { name: "State Board", value: "state_board" },
                         { name: "ICSE", value: "icse" },
                  ]
                },
                {
                    name: "intermediate_address_name",
                    label: "Intermediate Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "intermediate_address_pin_code",
                    label: "Intermediate Pin Code",
                    as: FieldTypes.TEXT
                },
                {
                    name: "intermediate_address_branch_area",
                    label: "Intermediate Branch Area",
                    as: FieldTypes.TEXT
                },
                {
                    name: "intermediate_address_country",
                    label: "Intermediate Country",
                    as: FieldTypes.TEXT
                },
                {
                    name: "intermediate_address_state",
                    label: "Intermediate State",
                    as: FieldTypes.TEXT
                },
                {
                    name: "intermediate_address_city",
                    label: "Intermediate City",
                    as: FieldTypes.TEXT
                },
                {
                    name: "intermediate_address_district",
                    label: "Intermediate District",
                    as: FieldTypes.TEXT
                }
                ]
                },
                {
            fields: [
                {
                    name: "college_type",
                    label: "College Type",
                    as: FieldTypes.SELECT,
                    options: [
                        { name: "Degree", value: "degree" },
                        { name: "Master", value: "master" },
                        { name: "Other", value: "other" }
                    ]
                },
                {
                    name: "college_passout_year",
                    label: "College Passout Year",
                    as: FieldTypes.TEXT
                },
                {
                    name: "college_address_name",
                    label: "College Name",
                    as: FieldTypes.TEXT
                },
                {
                    name: "college_address_pin_code",
                    label: "College Pin Code",
                    as: FieldTypes.TEXT
                },
                {
                    name: "college_address_branch_area",
                    label: "College Branch Area",
                    as: FieldTypes.TEXT
                },
                {
                    name: "college_address_country",
                    label: "College Country",
                    as: FieldTypes.TEXT
                },
                {
                    name: "college_address_state",
                    label: "College State",
                    as: FieldTypes.TEXT
                },
                {
                    name: "college_address_city",
                    label: "College City",
                    as: FieldTypes.TEXT
                },
                {
                    name: "college_address_district",
                    label: "College District",
                    as: FieldTypes.TEXT
                }
            ]
        },
        {
            fields: [
                {
                    name: "skills",
                    label: "Skills",
                    as: FieldTypes.TEXT
                },
                {
                    name: "hobbies",
                    label: "Hobbies",
                    as: FieldTypes.TEXT
                }
            ]
        }
    ];

   

    const additional = [
        {
            fields: [
               
                {
                    name: "Type",
                    label: "Address Proof etc.",
                    as: FieldTypes.TEXT,
                },
                {
                    name: "doc_1",
                    label: "File Name",
                    as: FieldTypes.FILE,
                    helperText: "Upload Aadhar card, Passport, etc."
                },
            ]
        }
    ];

    const address = [
        {
            fields: [
                {
                    name: "address_line_1",
                    label: "Address 1",
                    as: FieldTypes.TEXTAREA
                },
                {
                    name: "address_line_2",
                    label: "Address 2",
                    as: FieldTypes.TEXTAREA
                },
                {
                    name: "city",
                    label: "City",
                    as: FieldTypes.SELECT,
                    options: cities && cities.map((city) => {
                        return {
                            name: city.name,
                            value: city.id
                        };
                    })
                },
                {
                    name: "pincode",
                    label: "Pincode",
                    as: FieldTypes.TEXT
                },
            ]
        }
    ];

    return {
        personal,
        course,
        additional,
        address,
    };
}
