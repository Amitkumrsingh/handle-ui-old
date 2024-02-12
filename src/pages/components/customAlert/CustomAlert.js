import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { IconButton, Paper } from '@material-ui/core';
import SuccessOutlinedIcon from './svg-icons/SuccessOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

export const styles = theme => {

    return {
        /* Styles applied to the root element. */
        root: {
            ...theme.typography.body2,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: 'transparent',
            display: 'flex',
            padding: '6px 16px',
        },

        /* Styles applied to the root element if `variant="filled"` and `color="success"`. */
        filledSuccess: {
            color: '#fff',
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: '#4caf50',
        },
        /* Styles applied to the root element if `variant="filled"` and `color="info"`. */

        /* Styles applied to the root element if `variant="filled"` and `color="error"`. */
        filledError: {
            color: '#fff',
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: theme.palette.error.main,
        },
        /* Styles applied to the icon wrapper element. */
        icon: {
            marginRight: 12,
            padding: '7px 0',
            display: 'flex',
            fontSize: 22,
            opacity: 0.9,
        },
        /* Styles applied to the message wrapper element. */
        message: {
            padding: '8px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        /* Styles applied to the action wrapper element if `action` is provided. */
        action: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            paddingLeft: 16,
            marginRight: -8,
        },
    };
};

const defaultIconMapping = {
    success: <SuccessOutlinedIcon fontSize="inherit" />,
    error: <ErrorOutlineIcon fontSize="inherit" />,
};

const CustomAlert = React.forwardRef(function Alert(props, ref) {
    const {
        action,
        children,
        classes,
        className,
        closeText = 'Close',
        color,
        icon,
        iconMapping = defaultIconMapping,
        onClose,
        role = 'alert',
        severity = 'success',
        variant = 'standard',
        ...other
    } = props;

    return (
        <Paper
            role={role}
            square
            elevation={0}
            className={clsx(
                classes.root,
                classes[`${variant}${capitalize(color || severity)}`],
                className,
            )}
            ref={ref}
            {...other}
        >
            {icon !== false ? (
                <div className={classes.icon}>
                    {icon || iconMapping[severity] || defaultIconMapping[severity]}
                </div>
            ) : null}
            <div className={classes.message}>{children}</div>
            {action != null ? <div className={classes.action}>{action}</div> : null}
            {action == null && onClose ? (
                <div className={classes.action}>
                    <IconButton
                        size="small"
                        aria-label={closeText}
                        title={closeText} 
                        color="inherit"
                        onClick={onClose}
                    >
                        <CloseOutlinedIcon fontSize="small" />
                    </IconButton>
                </div>
            ) : null}
        </Paper>
    );
});

export default withStyles(styles, { name: 'MuiAlert' })(CustomAlert);
