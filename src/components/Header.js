import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Badge,
  Grid,
  Hidden,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import {
  MessageSquare,
  Power
} from "react-feather";

import { userService } from '../service';
import { logout } from '../redux/reducers/userReducer';
import NotificationBell from "./NotificationBell";

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.header.background};
  color: ${props => props.theme.header.color};
  box-shadow: ${props => props.theme.shadows[1]};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${props => props.theme.header.indicator.background};
    color: ${props => props.theme.palette.common.white};
  }
`;


const Flag = styled.img`
  border-radius: 50%;
  width: 22px;
  height: 22px;
`;



class LanguageMenu extends Component {
  state = {
    anchorMenu: null
  };

  toggleMenu = event => {
    this.setState({ anchorMenu: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorMenu: null });
  };

  render() {
    const { anchorMenu } = this.state;
    const open = Boolean(anchorMenu);

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.toggleMenu}
          color="inherit"
        >
          <Flag src="/static/img/flags/us.png" alt="English" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={open}
          onClose={this.closeMenu}
        >
          <MenuItem
            onClick={() => {
              this.closeMenu();
            }}
          >
            English
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.closeMenu();
            }}
          >
            French
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.closeMenu();
            }}
          >
            German
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.closeMenu();
            }}
          >
            Dutch
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

class UserMenu extends Component {
  state = {
    anchorMenu: null
  };

  toggleMenu = event => {
    this.setState({ anchorMenu: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorMenu: null });
  };

  handleLogout = () => {
    const user = new userService();
    const { history, logout } = this.props;
    user.logout(this.props.user.token);
    logout();
    localStorage.clear();
    history.push("/auth/sign-in");
  }

  render() {
    const { anchorMenu } = this.state;
    const { user } = this.props;
    const open = Boolean(anchorMenu);

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.toggleMenu}
          color="inherit"
        >
          <Power />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={open}
          onClose={this.closeMenu}
        >
          <MenuItem
            onClick={() => {
              this.closeMenu();
            }}
          >
            {user && user.user && user.user.name}
          </MenuItem>
          <MenuItem
            onClick={this.handleLogout}
          >
            Sign out
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}





const Header = ({ onDrawerToggle, user, history, logout }) => {
  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <IconButton color="inherit">
                <Indicator badgeContent={3}>
                  <MessageSquare />
                </Indicator>
              </IconButton>
              
              <NotificationBell/>
              <LanguageMenu />
              <UserMenu user={user} history={history} logout={logout}/>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
};

const mapStatetoProps = state => {
  return {
    user: state.userReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    }
  }
};

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(withTheme(Header)));
