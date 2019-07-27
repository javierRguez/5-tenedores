import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon } from "react-native-elements";

export default (InputTemplate = props => {
  return (
    <View style={styles.viewContainer}>
      <Input
        placeholder={props.config.placeholder}
        password={props.config.password}
        secureTextEntry={props.config.secureTextEntry}
        onChangeText={value => props.onChange(value)}
        rightIcon={
          <Icon
            type={props.config.iconType}
            name={props.config.iconName}
            color="#b3b3b3"
            size={24}
          />
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 12,
    marginBottom: 12
  }
});
