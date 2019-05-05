import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
    Card,
    CardActionArea,
    CardContent,
    Icon,
    Typography
} from "@material-ui/core";
import styled from "styled-components";
import Overlay from "react-image-overlay";
import lock from "../assets/lock48.png"

const styles = {
    title: {
        textAlign: "center"
    },

    titleText: {
        fontSize: "1.7vw"
    },

    icon: {
        position: "relative",
        transform: "scale(4.2)",
        textAlign: "center",
        marginLeft: "43%"
    }
};

const CardBase = styled.div`
    margin: 5px;
    position: relative;
    display: inline-block;
    //border: dashed 2px #808080;
    border-radius: 5px;
`;

class Magic8Card extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            selected: false
        };
    }

    onClick(e) {
        e.preventDefault();
        const { onClick, numSelected } = this.props;
        onClick(this.state.selected, this.props.title);
        if (this.state.selected) {
            this.setState({ selected: false });
        } else if (numSelected < 1) {
            this.setState({ selected: true });
        }
    }

    render() {
        return (
            <CardBase>
                <Card
                    style={{
                        backgroundColor: this.props.backgroundColor,
                        opacity: this.state.selected ? 0.5 : 1,
                        height: "160px;",
                        boxShadow: "none"
                    }}
                    onClick={this.onClick}
                >
                    <CardActionArea style={{ height: "160px", width: "160px" }}>
                        <Overlay
                            url={this.props.icon} // required
                            overlayUrl={lock} // required
                            imageHeight={160}
                            position={'center'}
                            overlayWidth={180}
                            overlayHeight={140}
                            overlayPadding={10}
                            watermark={true}
                        />
                    </CardActionArea>
                </Card>
            </CardBase>
        );
    }
}

Magic8Card.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Magic8Card);
