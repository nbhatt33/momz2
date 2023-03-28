import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export default function PromptButtom({ title, modeValue, ...rest }) {
  return (
      <Button
          mode={modeValue}
          {...rest}
          style={styles.button}
          contentStyle={styles.buttonContainer}
      >
        {title}
      </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    marginHorizontal: 25,
  },
  buttonContainer: {
    fontSize: 10,
  },
});