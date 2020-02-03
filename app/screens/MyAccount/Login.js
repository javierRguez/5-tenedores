import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  Image,
  Button,
  Text,
  SocialIcon,
  Divider
} from "react-native-elements";
import t from "tcomb-form-native";
const Form = t.form.Form;
import { LoginStruct, LoginOptions } from "../../forms/Login";
import * as firebase from "firebase";
import Toast, { DURATION } from "react-native-easy-toast";
import { FacebookApi } from "../../utils/Social";
import * as Facebook from "expo-facebook";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginStruct: LoginStruct,
      loginOptions: LoginOptions,
      formData: {
        email: "",
        password: ""
      },
      formErrorMessage: ""
    };
  }
  login = () => {
    const validate = this.refs.loginForm.getValue();

    if (!validate) {
      this.setState({ formErrorMessage: "Formulario incorrecto" });
    } else {
      this.setState({ formErrorMessage: "" });
      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(result => {
          this.refs.toastLogin.show("Login correcto", 200, () => {
            this.props.navigation.goBack();
          });
        })
        .catch(err => {
          console.error(err);
          this.refs.toastLogin.show("Login incorrecto, revise sus datos", 2500);
        });
    }
  };
  loginFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      { permissions: FacebookApi.permissions }
    );
    if (type === "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credentials)
        .then(result => {
          this.refs.toastLogin.show("Login correcto", 100, () => {
            this.props.navigation.goBack();
          });
        })
        .catch(err => {
          this.refs.toastLogin.show(
            "Error inesperado, intentelo mas tarde",
            300
          );
        });
    } else if (type === "cancel") {
      this.refs.toastLogin.show("Inicio de sesion cancelado", 300);
    } else {
      this.refs.toastLogin.show("Error inesperado, intentelo mas tarde", 300);
    }
  };

  onChangeFormLogin = value => {
    this.setState({ formData: value });
  };
  render() {
    const { loginStruct, loginOptions, formErrorMessage } = this.state;
    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
          containerStyle={styles.containerLogo}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <View style={styles.viewForm}>
          <Form
            ref="loginForm"
            type={loginStruct}
            options={loginOptions}
            value={this.state.formData}
            onChange={value => this.onChangeFormLogin(value)}
          />
          <Button
            buttonStyle={styles.buttonLoginContainer}
            title="Login"
            onPress={() => this.login()}
          />
          <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?{" "}
            <Text
              style={styles.btnRegister}
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            >
              Regístrate
            </Text>
          </Text>
          <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
          <Divider style={styles.divider} />
          <SocialIcon
            title="Sign In With Facebook"
            button
            type="facebook"
            onPress={() => this.loginFacebook()}
          />
        </View>
        <Toast
          ref="toastLogin"
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

    marginLeft: 30,
    marginRight: 30,
    marginTop: 40
  },
  viewForm: {
    marginTop: 50
  },
  logo: {
    width: 300,
    height: 150
  },
  buttonLoginContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  containerLogo: {
    alignItems: "center"
  },
  formErrorMessage: {
    color: "#f00",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },
  divider: {
    backgroundColor: "blue",
    marginBottom: 20
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold"
  }
});
