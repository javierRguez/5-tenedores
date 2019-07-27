import React from "react";
import t from "tcomb-form-native";
import formValidations from "../utils/Validation";
import InputTemplate from "./templates/Input";

export const RegisterStruct = t.struct({
  name: t.String,
  email: formValidations.email,
  password: formValidations.password,
  passwordConfirmation: formValidations.password
});

export const RegisterOptions = {
  fields: {
    name: {
      label: "Nombre (*)",
      error: "Nombre invalido",
      template: InputTemplate,
      config: {
        placeholder: "Escribe tu nombre y apellidos",
        iconType: "material-community",
        iconName: "account-outline"
      }
    },
    email: {
      label: "Email (*)",
      error: "Email invalido",
      template: InputTemplate,
      config: {
        placeholder: "Escribe tu email",
        iconType: "material-community",
        iconName: "at"
      }
    },
    password: {
      label: "Contraseña (*)",
      error: "Contraseña invalida",
      template: InputTemplate,
      config: {
        placeholder: "Escribe tu contraseña",
        iconType: "material-community",
        iconName: "lock-outline",
        password: true,
        secureTextEntry: true
      }
    },
    passwordConfirmation: {
      label: "Repetir contraseña (*)",
      error: "Contraseña invalida",
      template: InputTemplate,
      config: {
        placeholder: "Repite tu contraseña",
        iconType: "material-community",
        iconName: "lock-reset",
        password: true,
        secureTextEntry: true
      }
    }
  }
};
