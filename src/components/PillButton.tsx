import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface PillButtonProps {
  title: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  textColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const PillButton: React.FC<PillButtonProps> = ({
  title,
  backgroundColor = '#007bff',
  borderColor = '#007bff',
  borderWidth = 1,
  textColor = '#fff',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Makes it pill-shaped
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'montserrat',
    fontSize: 16,
  },
});

export default PillButton;