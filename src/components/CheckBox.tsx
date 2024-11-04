import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CheckboxProps {
  title: string;
  onCheck: (isChecked: boolean) => void; // Callback function prop
}

const Checkbox: React.FC<CheckboxProps> = ({ title, onCheck }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onCheck(newCheckedState); // Send the new state to the parent
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleCheckbox}
    >
      <View style={[styles.checkbox]}>
        {isChecked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },

  checkmark: {
    color: '#848484',
  },
  label: {
    marginLeft: 20,
    fontFamily: 'montserrat',
    fontSize: 13
  },
});

export default Checkbox;