import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import {
  branchService as BranchService,
  globalService as GlobalService
} from "../../service";
import {
  branch_results,
  select_branch,
} from "../../redux/reducers/branchReducer";
import {
  fetch_platforms_success
} from "../../redux/reducers/platformReducer";
import {
  fetch_courses_success
} from "../../redux/reducers/courseReducer";
import { fetch_cities_success } from "../../redux/reducers/globalReducer";
import BranchCard from "./BranchCard";

function Branch({
  dispatch_branch_results = () => { },
  dispatch_select_branch,
  dispatch_cities_success,
  dispatch_courses_success,
  dispatch_platforms_success,
  branches,
  user,
  history
}) {
  const branchService = new BranchService();
  const globalService = new GlobalService();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Token ' + user.token
  }
  useEffect(() => {
    branchService
      .getBranches(headers)
      .then(data => data.json())
      .then(data => {
        dispatch_branch_results({
          branches: data.results
        });
        getGlobalData();
      }).catch(() => {

      })
  }, []);
  const getGlobalData = () => {
    globalService
      .getCities(headers)
      .then(data => data.json())
      .then(data => {
        dispatch_cities_success({
          cities: data
        });
      });
  };
  const selectBranchAndfetchGlobals = branch => {
    dispatch_select_branch(branch);
    branchService.getCourses(headers,branch.branch.id).then(data => data.json())
      .then(data => {
        dispatch_courses_success({
          courses: data
        });
      });

      branchService.getPlatforms(headers,branch.branch.id).then(data => data.json())
      .then(data => {
        dispatch_platforms_success({
          platforms: data
        });
      });
  };
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        {branches.branches && branches.branches.length > 0
          ? branches.branches.map(branch => {
            return (
              <Grid key={branch.id} item xs={12} sm={6} md={4}>
                <BranchCard
                  {...{
                    ...branch,
                    name: branch.name,
                    onEnter: () => {
                      selectBranchAndfetchGlobals({
                        branch
                      });
                      history.push("/admin_dashboard");
                    }
                  }}
                />
              </Grid>
            );
          })
          : "No Branches Available to display"}
      </Grid>
    </React.Fragment>
  );
}

const mapStatetoProps = state => ({
  branches: state.branchReducer,
  courses : state.courseReducer,
  platforms: state.platformReducer,
  user: state.userReducer
});
const mapDispatchToProps = dispatch => {
  return {
    dispatch_branch_results: payload => {
      dispatch(branch_results(payload));
    },
    dispatch_select_branch: payload => {
      dispatch(select_branch(payload));
    },
    dispatch_cities_success: payload => {
      dispatch(fetch_cities_success(payload));
    },
    dispatch_courses_success: payload => {
      dispatch(fetch_courses_success(payload));
    },
    dispatch_platforms_success: payload => {
      dispatch(fetch_platforms_success(payload));
    }
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(Branch);
