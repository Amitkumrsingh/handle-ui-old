import React from "react";
import {
  BookOpen,
  CheckSquare,
  Grid,
  Heart,
  Layout, Map,
  PieChart,
  Sliders,
  Users
} from "react-feather";
import async from "../components/Async";



// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Components components
const Avatars = async(() => import("../pages/components/Avatars"));
const Badges = async(() => import("../pages/components/Badges"));
const Buttons = async(() => import("../pages/components/Buttons"));
const Cards = async(() => import("../pages/components/Cards"));
const Chips = async(() => import("../pages/components/Chips"));
const Dialogs = async(() => import("../pages/components/Dialogs"));
const ExpPanels = async(() => import("../pages/components/ExpansionPanels"));
const Lists = async(() => import("../pages/components/Lists"));
const Menus = async(() => import("../pages/components/Menus"));
const Progress = async(() => import("../pages/components/Progress"));
const Snackbars = async(() => import("../pages/components/Snackbars"));
const Tooltips = async(() => import("../pages/components/Tooltips"));

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));

// Forms components
const Pickers = async(() => import("../pages/forms/Pickers"));
const SelectionCtrls = async(() => import("../pages/forms/SelectionControls"));
const Selects = async(() => import("../pages/forms/Selects"));
const TextFields = async(() => import("../pages/forms/TextFields"));

// Icons components
const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
const Blank = async(() => import("../pages/pages/Blank"));
const Invoice = async(() => import("../pages/pages/Invoice"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Profile = async(() => import("../pages/pages/Profile"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Projects = async(() => import("../pages/pages/Projects"));

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// Documentation
const Docs = async(() => import("../pages/docs/Documentation"));

// Org Pages

const Branch = async(() => import("../pages/branch"));

// Branch Pages
    

const Enquiry = async(() => import("../pages/enquiry"));
const AddEnquiry = async(() => import("../pages/enquiry/AddEnquiry"));
const ViewEnquiry = async(() => import("../pages/enquiry/ViewEnquiry"));
const BroadSearchEnquiry = async(() => import("../pages/enquiry/BroadSearchEnquiry"));


const Students = async(() => import("../pages/students"));
// const AddStudent = async () => import("../pages/students/AddStudent");
// const ViewStudent = async () => import("../pages/students/ViewStudent");

const BroadSearchStudent = async (() => import("../pages/students/BroadSearchStudent"));


const Fee = async(() => import("../pages/fee"));
const AddFee = async(() => import("../pages/fee/AddFee"));
const StudentFeeDetails = async(() => import("../pages/fee/StudentFeeDetails"));
const ViewPayments = async(() => import("../pages/fee/ViewPayments"));

const Courses = async(() => import("../pages/courses"));
const Platforms = async(() => import("../pages/platforms"));
const Qualifications = async(() => import("../pages/qualification"));
const InterGroup = async(() => import("../pages/interGroup"));
const courseTenure = async(() => import("../pages/courseTenure"));
const castes = async(() => import("../pages/caste"));
const studentDetails = async(() => import("../pages/studentDetails"));


// Admin Dashboard routes

const adminDashboard = async(() => import("../pages/adminDashboard"))

// org routes
const branchRoutes = {
  id: "Branch",
  path: "/",
  header: "Organisation",
  component: Branch
}

const userRoutes = {
  id: "Users",
  path: "/users",
  containsHome: true,
  children: [
    {
      path: "/add",
      name: "addUser",
      component: Default
    },
    {
      path: "/update",
      name: "updateUser",
      component: Default
    },
    {
      path: "/delete",
      name: "deleteUser",
      component: Default
    },
  ]
};

// page routes

const enquiryRoutes = {
  id: "Enquiry",
  path: "/enquiry",
  name: "Enquiry",
  component: Enquiry,

  children: [
    {
       path: "/admin_dashboard",
       name: "Dashboard",
      component: adminDashboard
    },
    {
      path: "/enquiry",
      name: "Lead Dashboard",
      component: Enquiry
    },
    {
      path: "/addEnquiry",
      name: "Add Leads",
      component: AddEnquiry
    },
    {
      path: "/viewEnquiry",
      name: "View Leads",
      component: ViewEnquiry,
    },
    {
       path: "/broadSearchEnquiry",
      name: "BroadSearch Enquiry",
      component: BroadSearchEnquiry
    },
  ]
}




const studentsRoutes = {
  id: "Students",
  path: "/students",
  component: Students,

  children: [
    {
      path: "/students",
      name: "Students",
      component: Students
    },
    // {
    //   path: "/addStudent",
    //   name: "Add Student",
    //   component: AddStudent
    // },
    {
       path: "/broadSearchStudent",
       name: " BroadSearch Student",
      component: BroadSearchStudent
    },
  ]
};


const coursesRoutes = {
  id: "Courses",
  path: "/courses",
  component: Courses
}

const platformsRoutes = {
  id: "Platforms",
  path: "/platforms",
  component: Platforms
}

const qualificationsRoutes = {
  id: "Qualifications",
  path: "/qualifications",
  component: Qualifications
}

const feeRoutes = {
  id: "Fee",
  path: "/fee",
  component: Fee,
  children: [
    {
      name: "Fee",
      path: "/fee",
      component: Fee,
    },
    {
       name: "Add Fee",
      path: "/addFee",
      component: AddFee,
    },
     {
       name: "Student Fee details",
      path: "/studentFeeDetails",
      component: StudentFeeDetails,
    },
     {
       name: "View Payments",
      path: "/viewPayments",
      component: ViewPayments,
    },
  ]
}

const interGroupRoutes = {
  id: "Inter Group",
  path: "/inter-group",
  component: InterGroup
}

const courseTenureRoutes = {
  id: "Course Tenure",
  path: "/course-tenure",
  component: courseTenure
}

const casteRoutes = {
  id: "Caste",
  path: "/caste",
  component: castes
}

const studentDetailsRoutes = {
  id: "studentDetails",
  path: "/student-details",
  component: studentDetails
}

const dashboardsRoutes = {
  id: "Dashboard",
  path: "/dashboard",
  header: "Main",
  icon: <Sliders />,
  containsHome: true,
  children: [
    {
      path: "/dashboard",
      name: "Default",
      component: Default
    },
    {
      path: "/dashboard/analytics",
      name: "Analytics",
      component: Analytics
    }
  ]
};

const pagesRoutes = {
  id: "Pages",
  path: "/pages",
  icon: <Layout />,
  children: [
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/pages/settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/pages/projects",
      name: "Projects",
      component: Projects,
      badge: "New"
    },
    {
      path: "/pages/invoice",
      name: "Invoice",
      component: Invoice
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      component: Pricing
    },
    {
      path: "/pages/tasks",
      name: "Tasks",
      component: Tasks,
      badge: "New"
    },
    {
      path: "/pages/blank",
      name: "Blank Page",
      component: Blank
    }
  ]
};

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};

const documentationRoutes = {
  id: "Documentation",
  path: "/documentation",
  icon: <BookOpen />,
  component: Docs,
  children: null
};

const componentsRoutes = {
  id: "Components",
  path: "/components",
  header: "Elements",
  icon: <Grid />,
  children: [
    {
      path: "/components/avatars",
      name: "Avatars",
      component: Avatars
    },
    {
      path: "/components/badges",
      name: "Badges",
      component: Badges
    },
    {
      path: "/components/buttons",
      name: "Buttons",
      component: Buttons
    },
    {
      path: "/components/cards",
      name: "Cards",
      component: Cards
    },
    {
      path: "/components/chips",
      name: "Chips",
      component: Chips
    },
    {
      path: "/components/dialogs",
      name: "Dialogs",
      component: Dialogs
    },
    {
      path: "/components/expansion-panels",
      name: "Expansion Panels",
      component: ExpPanels
    },
    {
      path: "/components/lists",
      name: "Lists",
      component: Lists
    },
    {
      path: "/components/menus",
      name: "Menus",
      component: Menus
    },
    {
      path: "/components/progress",
      name: "Progress",
      component: Progress
    },
    {
      path: "/components/snackbars",
      name: "Snackbars",
      component: Snackbars
    },
    {
      path: "/components/tooltips",
      name: "Tooltips",
      component: Tooltips
    }
  ]
};

const formsRoutes = {
  id: "Forms",
  path: "/forms",
  icon: <CheckSquare />,
  children: [
    {
      path: "/forms/pickers",
      name: "Pickers",
      component: Pickers
    },
    {
      path: "/forms/selection-controls",
      name: "Selection Controls",
      component: SelectionCtrls
    },
    {
      path: "/forms/selects",
      name: "Selects",
      component: Selects
    },
    {
      path: "/forms/text-fields",
      name: "Text Fields",
      component: TextFields
    }
  ]
};

const iconsRoutes = {
  id: "Icons",
  path: "/icons",
  icon: <Heart />,
  children: [
    {
      path: "/icons/material-icons",
      name: "Material Icons",
      component: MaterialIcons
    },
    {
      path: "/icons/feather-icons",
      name: "Feather Icons",
      component: FeatherIcons
    }
  ]
};

const chartRoutes = {
  id: "Charts",
  path: "/charts",
  icon: <PieChart />,
  component: Chartjs,
  children: null
};

const mapsRoutes = {
  id: "Maps",
  path: "/maps",
  icon: <Map />,
  children: [
    {
      path: "/maps/google-maps",
      name: "Google Maps",
      component: GoogleMaps
    },
    {
      path: "/maps/vector-maps",
      name: "Vector Maps",
      component: VectorMaps
    }
  ]
};

// export const privateRoutes =["/fee"]

// This route is not visible in the sidebar
// const privateRoutes = {
//   id: "Private",
//   path: "/private",
//   component: Blank,
//   children: null
// };

export const dashboard = [
  dashboardsRoutes,
  pagesRoutes,
  documentationRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  iconsRoutes,
  mapsRoutes,
  //privateRoutes
];

export const auth = [authRoutes];

export const organisation = [branchRoutes, userRoutes]

export const branch = [enquiryRoutes, studentsRoutes, feeRoutes, coursesRoutes, platformsRoutes, qualificationsRoutes, interGroupRoutes, courseTenureRoutes, casteRoutes, studentDetailsRoutes]

// export const branch = [enquiryRoutes, studentsRoutes, feeRoutes, coursesRoutes, platformsRoutes, qualificationsRoutes, interGroupRoutes, courseTenureRoutes, casteRoutes, studentDetailsRoutes]


export default [
  branchRoutes,
  userRoutes,
  enquiryRoutes,
  studentsRoutes,
  feeRoutes,
  coursesRoutes,
  platformsRoutes,
  qualificationsRoutes,
  interGroupRoutes,
  courseTenureRoutes,
  casteRoutes,
  studentDetailsRoutes,
  dashboardsRoutes,
  pagesRoutes,
  authRoutes,
  documentationRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  iconsRoutes,
  mapsRoutes
];
