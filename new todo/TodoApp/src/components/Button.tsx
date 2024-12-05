import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {getWidthPercentage} from '../utils/responsive'
import Colors from '../utils/colors'

type ButtonProps = {
  title: string
  onPress?: any
  disabled: boolean
}

function Button(props: ButtonProps) {
  const {onPress, title, disabled} = props
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.6}
      style={styles.container}
      onPress={onPress}>
      <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    marginVertical: getWidthPercentage(1),
    width: getWidthPercentage(90),
    height: getWidthPercentage(12),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getWidthPercentage(25),
    backgroundColor: Colors.themeColor,
  },
  titleStyle: {
    fontSize: getWidthPercentage(3.5),
    color: Colors.White,
  },
})

export default Button
