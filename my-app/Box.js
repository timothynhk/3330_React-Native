import React, { Component } from "react";
import { View } from "react-native";
import { array, object, string } from 'prop-types';

export default class Box extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const xPos = this.props.body.position.x - width / 2;
        const yPos = this.props.body.position.y - height / 2;
        return (
            <View
                style={
                    {position: "absolute",
                    left: xPos,
                    top: yPos,
                    width: width,
                    height: height,
                    backgroundColor: this.props.color || "yellow"}
                }
            />
        );
    }
}

Box.propTypes = {
size: array,
body: object,
color: string
}