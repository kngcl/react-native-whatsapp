import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const chartdata = () => {
  return (
    <View style={styles.container}>
      <Text>chartdata</Text>
    </View>
  )
}

export default chartdata

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
