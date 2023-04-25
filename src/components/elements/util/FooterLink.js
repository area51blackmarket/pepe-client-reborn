import React from "react";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from 'classnames/bind';

const styles = (theme) => ({
    root: {
        textDecoration: "none",
        color: "inherit",
        display: "inline-block"
    },
    withSidePadding: {
        paddingLeft: "0.75em",
        paddingRight: "0.75em",
    },
    inheritColor: {
        color: "inherit"
    }
});


const FooterLink = (props) => {
    const {to, classes, external, newTab, disableLinkPadding, ...remainingProps} = props;

    const classData = disableLinkPadding ? classes.root
        : classNames(classes.root, classes.withSidePadding);

    if (!!to) {
        if(!!external) {
            if (!!newTab) {
                return (
                    <a href={to} className={classData} target="_blank">
                        <Typography component="span" className={classes.inheritColor} {...remainingProps}/>
                    </a>
                );
            } else {
                return (
                    <a href={to} className={classData}>
                        <Typography component="span" className={classes.inheritColor} {...remainingProps}/>
                    </a>
                );
            }
        } else {
          return (
              <Link to={to} className={classData}>
                  <Typography component="span" className={classes.inheritColor} {...remainingProps}/>
              </Link>
          );
        }
    } else {
        return (
            <span className={classData}>
                <Typography component="span" className={classes.inheritColor} {...remainingProps}/>
            </span>
        );
    }
};

FooterLink.defaultProps = {
    variant: "button",
    external: false,
    newTab: false,
    disableLinkPadding: false
};

FooterLink.propTypes = {
    variant: PropTypes.string,
    to: PropTypes.string,
    external: PropTypes.bool,
    //Note: only when external = true
    newTab: PropTypes.bool,
    disableLinkPadding: PropTypes.bool
};

export default withStyles(styles)(FooterLink);
