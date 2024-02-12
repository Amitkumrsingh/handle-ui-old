import React, { useEffect, useState } from "react";
import styled, { withTheme } from "styled-components";

import {
    Breadcrumbs as MuiBreadcrumbs, Button, Card as MuiCard, CardContent,
    Divider as MuiDivider, Grid, Typography
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import FormControl from "@material-ui/core/FormControl";
import { DatePicker } from "@material-ui/pickers";
import { spacing } from "@material-ui/system";
import moment from 'moment';
import { Bar, Line, Pie } from "react-chartjs-2";
import { VectorMap } from "react-jvectormap";
import { NavLink as RouterNavLink } from "react-router-dom";
import BarChart from "../pages/charts/Chartjs/BarChart";
import PieChart from "../pages/charts/Chartjs/PieChart";
import PolarChart from "../pages/charts/Chartjs/PolarChart";
import Stats from "../pages/dashboards/Analytics/Stats";
import EnquiryService from "../service/enquiryService";
import "../vendor/jvectormap.css";
import Actions from "./Actions";

const MapContainer = styled.div`
  height: 600px;
`;

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 300px;
`;
const BarChartWrapper = styled.div`
  height: 318px;
  width: 100%;
`;

function EmptyCard() {
    return (
        <Card mb={6}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Empty card
                </Typography>
                <BarChart />
                <Typography variant="body2" gutterBottom>
                    Empty card
                    <PieChart />
                </Typography>
                <PolarChart />
            </CardContent>
        </Card>
    );
}

const AdminDashboard = ({ theme }) => {
    const enquiryService = new EnquiryService();
    const [total, setTotal] = useState("");
    const [today, setToday] = useState("");
    const [contacted, setContacted] = useState("");
    const [pending, setPending] = useState("");
    const [joined, setJoined] = useState("");
    const [course_data, setCourseData] = useState([]);
    const [course_labels, setCourseLabel] = useState([]);
    const [course_color, setCourseColors] = useState([]);
    const [plat_data, setPlatData] = useState({});
    const [data, setData] = useState({});
    const [status_data, setStatusData] = useState({});
    const [months_data, setMonthsData] = useState({});
    const [months, setMonths] = useState([]);
    const [location, setLocation] = useState([]);
    const [gender, setGender] = useState({});

    const [date, setDate] = useState(null);
    const [idate, setIDate] = useState(null);
    const [to_date, setToDate] = useState(null);
    const [temp_date, setTempDate] = useState(null);
    const [temp_to_date, setTempToDate] = useState(null);
    const [postToDate, setPostToDate] = useState(new Date());
    const [postFromDate, setFromToDate] = useState(new Date(Date.now() - 4 * 365 * 24 * 60 * 60 * 1000));

    var curr = new Date();

    curr.setDate(curr.getDate());
    const mapdata = {
        map: "asia_mill",
        regionStyle: {
            initial: {
                fill: "#e3eaef"
            }
        },
        backgroundColor: "transparent",
        containerStyle: {
            width: "100%",
            height: "100%"
        },
        markerStyle: {
            initial: {
                r: 9,
                fill: theme.palette.secondary.main,
                "fill-opacity": 1,
                stroke: "#fff",
                "stroke-width": 7,
                "stroke-opacity": 0.4
            },
            hover: {
                stroke: "#fff",
                "fill-opacity": 1,
                "stroke-width": 1.5
            }
        },


        zoomOnScroll: false,
        markers: location
    };


    const bardata = {
        labels: course_labels,
        datasets: [
            {
                label: "Courses",
                backgroundColor: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                hoverBackgroundColor: theme.palette.secondary.main,
                hoverBorderColor: theme.palette.secondary.main,
                data: course_data
            },
            // {
            //     label: "Desktop",
            //     backgroundColor: theme.palette.grey["200"],
            //     borderColor: theme.palette.grey["200"],
            //     hoverBackgroundColor: theme.palette.grey["200"],
            //     hoverBorderColor: theme.palette.grey["200"],
            //     data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68]
            // }
        ]
    };

    const enqbardata = {
        labels: status_data.label,
        datasets: [
            {
                label: "Courses",
                backgroundColor: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                hoverBackgroundColor: theme.palette.secondary.main,
                hoverBorderColor: theme.palette.secondary.main,
                data: status_data.values
            },
            // {
            //     label: "Desktop",
            //     backgroundColor: theme.palette.grey["200"],
            //     borderColor: theme.palette.grey["200"],
            //     hoverBackgroundColor: theme.palette.grey["200"],
            //     hoverBorderColor: theme.palette.grey["200"],
            //     data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68]
            // }
        ]
    };

    const monthsbardata = {
        labels: months_data.label,
        datasets: [
            {
                label: "2020",
                backgroundColor: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main,
                hoverBackgroundColor: theme.palette.secondary.main,
                hoverBorderColor: theme.palette.secondary.main,
                data: months_data.values
            },
            {
                label: "2019",
                backgroundColor: theme.palette.grey["200"],
                borderColor: theme.palette.grey["200"],
                hoverBackgroundColor: theme.palette.grey["200"],
                hoverBorderColor: theme.palette.grey["200"],
                data: months
            }
        ]
    };

    const course_pie_data = {
        labels: course_labels,
        datasets: [
            {
                data: course_data,
                backgroundColor: course_color,
                borderColor: "transparent"
            }
        ]
    };

    const plat_pie_data = {
        labels: plat_data.label,
        datasets: [
            {
                data: plat_data.values,
                backgroundColor: plat_data.background,
                borderColor: "transparent"
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        legend: {
            display: true
        },

    };

    const baroptions = {
        maintainAspectRatio: false,
        legend: {
            display: true
        },
        scales: {
            yAxes: [
                {
                    gridLines: {
                        display: true
                    },
                    stacked: false,
                    ticks: {
                        stepSize: 20
                    }
                }
            ],
            xAxes: [
                {
                    barPercentage: 0.75,
                    categoryPercentage: 0.5,
                    stacked: false,
                    gridLines: {
                        color: "transparent"
                    }
                }
            ]
        }
    };


    const linedata = {
        labels: months_data.label,
        datasets: [
            {
                label: "Enquries 2020",
                fill: true,
                backgroundColor: "transparent",
                borderColor: theme.palette.secondary.main,
                data: months_data.values
            },
            {
                label: "Enquries 2019",
                fill: true,
                backgroundColor: "transparent",
                borderColor: theme.palette.grey["500"],
                borderDash: [4, 4],
                data: months
            },


        ]
    };

    const lineoptions = {
        maintainAspectRatio: false,
        legend: {
            display: true
        },
        tooltips: {
            intersect: false
        },
        hover: {
            intersect: true
        },
        plugins: {
            filler: {
                propagate: true
            }
        },
        scales: {
            xAxes: [
                {
                    reverse: true,
                    gridLines: {
                        color: "rgba(0,0,0,0.05)"
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        stepSize: 50
                    },
                    display: true,
                    borderDash: [5, 5],
                    gridLines: {
                        color: "rgba(0,0,0,0)",
                        fontColor: "#fff"
                    }
                }
            ]
        }
    };
    useEffect(() => {
        enquiryService
            .getReports(moment(postFromDate).format("yyyy-MM-DD"), moment(postToDate).format("yyyy-MM-DD")  )
        .then(data => data.json())
        .then((data) => {
            console.log(data);
            // setData(data.months_data_2019);
            setTotal(data.total);
            setToday(data.today);
            setContacted(data.contacted);
            setPending(data.pending);
            setJoined(data.joined);
            setCourseData(data.courses.values);
            setCourseLabel(data.courses.label);
            setCourseColors(data.courses.background);
            setPlatData(data.platform);
            setStatusData(data.status);
            setMonthsData(data.months_data);
            setMonths(data.months.values);
            setLocation(data.location);
            // setGender(data.gender_data);
            // console.log(months_data)
        })
        .catch(() => { })
    }, [postFromDate, postToDate]);

const handleSubmit = () => {
    setPostToDate(new Date());
    setFromToDate(new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000));
};
return (
    <React.Fragment>

        <Grid justify="space-between" container spacing={6}>
            <Grid item>
                <Typography variant="h3" display="inline">
                    Welcome back,
                </Typography>

            </Grid>

            {/* <Grid item>
                <Actions />
            </Grid> */}
        </Grid>

        <Grid container xs={12} spacing={6}>
            <Grid item xs={3} sm={12} md={6} lg={3} xl>
                <FormControl m={2}>

                    <DatePicker
                        label="From Date"
                        format="yyyy-MM-dd"
                        value={postFromDate}
                        name="from_date"
                        maxDate={curr}
                        onChange={(value) => {
                            // const valueOfInput = value.format();
                            console.log(moment(value).format("yyyy-MM-DD"));
                            setIDate(value);
                            setFromToDate(value);
                            setTempDate(moment(value).format("yyyy-MM-DD"));
                        }}
                    />
                </FormControl>

            </Grid>
            <Grid item xs={3} sm={12} md={6} lg={3} xl>
                <FormControl m={2}>

                    <DatePicker
                        label="To Date"
                        format="yyyy-MM-dd"
                        value={postToDate}
                        name="to_date"
                        maxDate={curr}
                        onChange={(value) => {
                            // const valueOfInput = value.format();
                            console.log(moment(value).format("yyyy-MM-DD"));
                            setToDate(value);
                            setPostToDate(value)
                            setTempToDate(moment(value).format("yyyy-MM-DD"));
                        }}
                    />
                </FormControl>

            </Grid>
            <Grid>
                <Button
                    onClick={handleSubmit} variant="contained" color="primary" type="button"> Submit</Button>
            </Grid>
        </Grid>
        <br />
        <br />
        <Divider my={6} />

        <Grid container xs={12} spacing={6}>
            <Grid item xs={3} sm={12} md={6} lg={3} xl>
                <Stats
                    title="Enquiries Total"
                    amount={total}
                    // value={100}
                    color={blue[500]}
                    chip="Total"
                />
            </Grid>
            <Grid item xs={3} sm={12} md={6} lg={3} xl>
                <Stats
                    title="Contacted"
                    amount={contacted}
                    value={100}
                    color={blue[500]}
                    chip="Today"
                />
            </Grid>
            <Grid item xs={3} sm={12} md={6} lg={3} xl>
                <Stats
                    title="Pending"
                    amount={pending}
                    // value={100}
                    color={blue[500]}
                    chip="Total"
                />
            </Grid>
            <Grid item xs={3} sm={12} md={6} lg={3} xl>
                <Stats
                    title="Joined"
                    amount={joined}
                    value={100}
                    color={blue[500]}
                    chip="Today"
                />
            </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <Grid container xs={12} spacing={6}>

            <Grid item xs={6} >
                <Card mb={4}>
                    <CardContent>
                        <Typography align="center"><h1>Courses</h1></Typography>
                        <ChartWrapper><Pie data={course_pie_data} options={options} /> </ChartWrapper>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card mb={4}>
                    <CardContent>
                        <Typography align="center"><h1>Platform</h1></Typography>
                        <ChartWrapper><Pie data={plat_pie_data} options={options} /> </ChartWrapper>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <Grid>
            <Card mb={4}>
                <CardContent>
                    <Typography align="center"><h1>Courses</h1></Typography>

                    <BarChartWrapper>
                        <Bar data={bardata} options={baroptions} />
                    </BarChartWrapper>
                </CardContent>
            </Card>
        </Grid>
        <br></br>

        <Grid>
            <Card mb={4}>
                <CardContent>
                    <Typography align="center"><h1>Enquiry Status</h1></Typography>

                    <BarChartWrapper>
                        <Bar data={enqbardata} options={baroptions} />
                    </BarChartWrapper>
                </CardContent>
            </Card>

        </Grid>
        <br />
        <Grid>
            <Card mb={4}>
                <CardContent>
                    <Typography align="center"><h1>Enquiry Per Month</h1></Typography>
                    <BarChartWrapper>
                        <Bar data={monthsbardata} options={baroptions} />
                    </BarChartWrapper>
                </CardContent>
            </Card>


        </Grid>
        <br />
        <Grid>
            <Card mb={4}>
                <CardContent>
                    <ChartWrapper>
                        <Line data={linedata} options={lineoptions} />
                    </ChartWrapper>
                </CardContent>
            </Card>

        </Grid>
        <Grid>
            <Card mb={4}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Real-Time
                    </Typography>
                    <MapContainer>
                        <VectorMap {...mapdata} />
                    </MapContainer>
                </CardContent>
            </Card>
        </Grid>
    </React.Fragment>
);
};

export default withTheme(AdminDashboard);
