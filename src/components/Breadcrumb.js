import React from "react";
import {
    Breadcrumbs,
    Link,
    Typography
} from "@material-ui/core";
import { branch } from "../routes/index";

const Breadcrumb = ({ history, branchState }) => {
    const branchName = branch.find((route) => {
        return route.path === history.location.pathname
    });

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="textPrimary" href="/">
                Organisation
            </Link>
            {branchName && <Link color="textPrimary" href={history.location.pathname}>
                {branchState.selected_branch && branchState.selected_branch.name}
            </Link>}
            <Typography color="textPrimary">{history.location.pathname.slice(1)}</Typography>
        </Breadcrumbs>
    )
};

export default Breadcrumb;
