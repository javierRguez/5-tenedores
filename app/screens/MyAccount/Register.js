import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import * as firebase from "firebase";
import t from "tcomb-form-native";
const Form = t.form.Form;
import { RegisterStruct, RegisterOptions } from "../../forms/Register";
import Toast, { DURATION } from "react-native-easy-toast";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions,
      formData: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },
      formErrorMessage: ""
    };
  }
  register = () => {
    const { password, passwordConfirmation } = this.state.formData;
    if (password === passwordConfirmation) {
      const validate = this.refs.registerForm.getValue();
      if (validate) {
        this.setState({ formErrorMessage: "" });
        firebase
          .auth()
          .createUserWithEmailAndPassword(validate.email, validate.password)
          .then(result => {
            this.refs.toast.show("Registro correcto", 200, () => {
              this.props.navigation.goBack();
            });
          })
          .catch(err => {
            this.refs.toast.show("El email ya está en uso", 2000);
          });
      } else {
        this.setState({ formErrorMessage: "Formulario inválido" });
      }
    } else {
      this.setState({ formErrorMessage: "Las contraseñas no son iguales" });
    }
  };
  onChangeFormRegister = value => {
    this.setState({ formData: value });
  };
  render() {
    const { registerStruct, registerOptions, formErrorMessage } = this.state;
    return (
      <View style={styles.viewBody}>
        <Form
          ref="registerForm"
          type={registerStruct}
          options={registerOptions}
          value={this.state.formData}
          onChange={value => this.onChangeFormRegister(value)}
        />
        <Button
          buttonStyle={styles.bottonRegisterContainer}
          title="Unirse"
          onPress={() => this.register()}
        />
        <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={250}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: "center"
  },
  bottonRegisterContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10
  },
  formErrorMessage: {
    color: "#f00",
    textAlign: "center",
    marginTop: 30
  }
});
