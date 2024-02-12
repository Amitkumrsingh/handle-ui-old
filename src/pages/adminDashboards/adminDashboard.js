import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import BarChart from "../pages/charts/Chartjs/BarChart";
import PieChart from "../pages/charts/Chartjs/PieChart";
import PolarChart from "../pages/charts/Chartjs/PolarChart";
import {
    CardContent,
    Grid,
    Link,
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    Divider as MuiDivider,
    Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

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

function adminDashboard() {
    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom display="inline">
                Blank
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/">
                    Dashboard
                </Link>
                <Link component={NavLink} exact to="/">
                    Pages
                </Link>
                <Typography>Blank</Typography>
            </Breadcrumbs>

            <Divider my={6} />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <EmptyCard />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default adminDashboard;
