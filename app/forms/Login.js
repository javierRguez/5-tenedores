import React from "react";
import t from "tcomb-form-native";
import formValidations from "../utils/Validation";
import InputTemplate from "./templates/Input";

export const LoginStruct = t.struct({
  email: formValidations.email,
  password: formValidations.password
});

export const LoginOptions = {
  fields: {
    email: {
      label: "Email",
      template: InputTemplate,
      config: {
        placeholder: "Escribe tu email",
        iconType: "material-community",
        iconName: "at"
      }
    },
    password: {
      label: "Contraseña",
      template: InputTemplate,
      config: {
        placeholder: "Escribe tu contraseña",
        iconType: "material-community",
        iconName: "lock-outline",
        password: true,
        secureTextEntry: true
      }
    }
  }
};
