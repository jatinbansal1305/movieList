import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ParabolicText = ({ text, curvature = 0.1, fontSize = 24 }) => {
  const characters = text.split('');
  const length = characters.length;

  return (
    <View style={styles.container}>
      {characters.map((char, index) => {
       
        const x = (index / (length - 1)) * 2 - 1;
        
        const y = curvature * Math.pow(x, 2) ;
        
        return (
          <Text
            key={index}
            style={[
              styles.character,
              { 
                fontSize,
                transform: [{ translateY: y * fontSize * 5 }]
              }
            ]}
          >
            {char}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  character: {
    textAlign: 'center',
    color: '#FF4136',
  },
});

export default ParabolicText;