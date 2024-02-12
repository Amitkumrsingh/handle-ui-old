import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Settings from "../components/Settings";
import Toaster from "../pages/toaster";
import Breadcrumb from "../components/Breadcrumb";
import LoadingOverlay from "../pages/loading/LoadingOverlay";

import { spacing } from "@material-ui/system";
import {
  Hidden,
  CssBaseline,
  Paper as MuiPaper,
  withWidth
} from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";

const drawerWidth = 260;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.body.background};
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${props => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${props => props.theme.body.background};
  
  `;

const Wrapper = styled.div`
  margin : 10px 0 0 40px;
`;

class Dashboard extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { children, routes, width, history, user, branchState } = this.props;

    if (user.token == null) {
      history.replace('/auth/sign-in');
    };
    return (
      <Root>
        <CssBaseline />
        <GlobalStyle />
        <Drawer>
          <Hidden mdUp implementation="js">
            <Sidebar
              routes={routes}
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <Sidebar
              routes={routes}
              PaperProps={{ style: { width: drawerWidth } }}
            />
          </Hidden>
        </Drawer>
        <AppContent>
          <Header onDrawerToggle={this.handleDrawerToggle} />
          <Wrapper>
            <Breadcrumb
              history={history}
              branchState={branchState}
            />
          </Wrapper>
          <MainContent p={isWidthUp("lg", width) ? 10 : 8}>
            {children}
          </MainContent>
          <LoadingOverlay />
          <Toaster />
          <Footer />
        </AppContent>
        <Settings />
      </Root>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    branchState: state.branchReducer
  }
}
export default withWidth()(
  withRouter(
    connect(mapStateToProps)(Dashboard)
  )
);
