import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function RadioButtons({ options, selectedOption, onSelect }) {
  return (
    <View style={{flexDirection: 'row'}}>
      {options.map((item) => {
        return (
          <View key={item.key} style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => {
                onSelect(item);
              }}>
              {selectedOption && selectedOption.key === item.key && (
                <View style={styles.checkedCircle} />
              )}
            </TouchableOpacity>
            <Text style={{marginLeft: 5, marginRight: 10, fontSize: 13, color: 'black'}} >{item.text}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },

  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#228B22',
  },
});