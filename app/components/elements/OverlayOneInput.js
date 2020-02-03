import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Overlay, Input, Button, Icon } from "react-native-elements";

export default class OverlayOneInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }
  onChangeIput = inputData => {
    this.setState({ inputValue: inputData });
  };
  update = () => {
    const newValue = this.state.inputValue;
    this.state.updateFunction(newValue);
    this.setState({ isOverlay: false });
  };
  close = () => {
    this.setState({ isVisibleOverlay: false });
    this.state.updateFunction(null);
  };
  render() {
    const { isVisibleOverlay, placeholder, inputValue } = this.state;
    return (
      <Overlay
        isVisible={isVisibleOverlay}
        fullScreen={true}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.ViewOverlay}>
          <Input
            containerStyle={styles.inputContainer}
            placeholder={placeholder}
            onChangeText={value => this.onChangeIput(value)}
            value={inputValue}
          />
          <Button
            buttonStyle={styles.buttonUpdate}
            title="Cambiar nombre"
            onPress={() => this.update()}
          />
          <Icon
            type="material-community"
            name="close-circle-outline"
            size={30}
            containerStyle={styles.containerIconCLose}
            onPress={() => this.close()}
          />
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  ViewOverlay: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderColor: "#00a680",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  inputContainer: {
    marginBottom: 20
  },
  buttonUpdate: {
    backgroundColor: "#00a680"
  },
  containerIconCLose: {
    position: "absolute",
    right: -16,
    top: -16
  }
});
