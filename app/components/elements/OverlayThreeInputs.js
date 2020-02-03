import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Overlay, Input, Button, Icon } from "react-native-elements";

export default class OverlayThreeInputs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }
  onChangeIputOne = inputData => {
    this.setState({ inputValueOne: inputData });
  };
  onChangeIputTwo = inputData => {
    this.setState({ inputValueTwo: inputData });
  };
  onChangeIputThree = inputData => {
    this.setState({ inputValueThree: inputData });
  };
  update = () => {
    const newValueOne = this.state.inputValueOne;
    const newValueTwo = this.state.inputValueTwo;
    const newValueThree = this.state.inputValueThree;
    this.state.updateFunction(newValueOne, newValueTwo, newValueThree);
    this.setState({ isOverlay: false });
  };
  close = () => {
    this.setState({ isVisibleOverlay: false });
    this.state.updateFunction(null);
  };
  render() {
    const {
      isVisibleOverlay,
      placeholderOne,
      placeholderTwo,
      placeholderThree,
      inputValueOne,
      inputValueTwo,
      inputValueThree,
      isPassword
    } = this.state;
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
            placeholder={placeholderOne}
            onChangeText={value => this.onChangeIputOne(value)}
            value={inputValueOne}
            password={isPassword}
            secureTextEntry={isPassword}
          />
          <Input
            containerStyle={styles.inputContainer}
            placeholder={placeholderTwo}
            onChangeText={value => this.onChangeIputTwo(value)}
            value={inputValueTwo}
            password={isPassword}
            secureTextEntry={isPassword}
          />
          <Input
            containerStyle={styles.inputContainer}
            placeholder={placeholderThree}
            onChangeText={value => this.onChangeIputThree(value)}
            value={inputValueThree}
            password={isPassword}
            secureTextEntry={isPassword}
          />
          <Button
            buttonStyle={styles.buttonUpdate}
            title="Cambiar contraseña"
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
