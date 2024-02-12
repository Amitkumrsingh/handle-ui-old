import React, { useState, useEffect } from 'react';
import { IconButton, Modal, Typography, Badge, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { connect } from "react-redux";
import { Bell } from 'react-feather';
import EnquiryService from '../service/enquiryService';
import styled from "styled-components";
import {
  fetch_enquiries_success,
} from "../redux/reducers/enquiryReducer";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "inherit",
  },
  modalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "4px",
    maxWidth: "720px",
    width: "100%",
    maxHeight: "80vh",
    overflowY: "auto",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "60vh",
    },
  },
  table: {
    minWidth: 650,
  },
}));

function NotificationBell({
  dispatch_enquiries,
  branchState,
}) {
  const [open, setOpen] = useState(false);
  const [enquiries, setEnquiries] = useState([]);

  const enquiryService = new EnquiryService();

  useEffect(() => {
  if (branchState.selected_branch && branchState.selected_branch.id) {
    enquiryService
      .getEnquiriesForBranch(branchState.selected_branch.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error retrieving enquiries');
        }
      })
      .then((data) => {
        dispatch_enquiries({
          enquiries: data.results,
        });
        setEnquiries(data.results.slice(0, 20));
      })
      .catch((error) => console.error(error));
  }
}, [branchState.selected_branch, dispatch_enquiries]);


  const classes = useStyles();

  const Indicator = styled(Badge)`
    .MuiBadge-badge {
      background: ${(props) => props.theme.header.indicator.background};
      color: ${(props) => props.theme.palette.common.white};
    }
    &:hover {
      cursor: pointer;
    }
  `;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton className={classes.button} color="inherit" onClick={handleOpen}>
        <Indicator badgeContent={20}>
          <Bell />
        </Indicator>
      </IconButton>
      <Modal className={classes.modalContainer} open={open} onClose={handleClose}>
        <div className={classes.modalContent}>
          <Typography variant="h4">Notifications</Typography>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell>{enquiry.name}</TableCell>
                  <TableCell>{enquiry.email}</TableCell>
                  <TableCell>{enquiry.phone_1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Modal>
    </>
  );
}

const mapStatetoProps = (state) => {
  return {
    enquiryState: state.enquiryReducer,
    branchState: state.branchReducer,
    globalState: state.globalReducer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch_enquiries: payload => {
      dispatch(fetch_enquiries_success(payload));
    },
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(NotificationBell);
