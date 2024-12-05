import React from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {getWidthPercentage} from '../utils/responsive'
import Colors from '../utils/colors'

type BorderButtonProps = {
  title: string
  onPress?: any
  customStyle?: StyleProp<ViewStyle>
  icon?: any
}

function BorderButton(props: BorderButtonProps) {
  const {onPress, title, customStyle, icon} = props
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, customStyle]}
      onPress={onPress}>
      {icon && <Image source={icon} style={styles.imageStyle} />}
      <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    marginVertical: getWidthPercentage(1),
    flexDirection: 'row',
    height: getWidthPercentage(12),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getWidthPercentage(25),
    borderColor: Colors.themeColor,
    borderWidth: 1,
    backgroundColor: Colors.White,
  },
  titleStyle: {
    fontSize: getWidthPercentage(3.5),
    color: Colors.Blue,
  },
  imageStyle: {
    height: getWidthPercentage(5),
    alignSelf: 'center',
    resizeMode: 'contain',
    width: getWidthPercentage(5),
    marginRight: getWidthPercentage(3),
  },
})

export default BorderButton
