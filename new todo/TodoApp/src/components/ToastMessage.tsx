import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Colors from '../utils/colors'

interface ToastMessageProps {
  message: string
  duration: number
  type: string
}
const ToastMessage = (props: ToastMessageProps) => {
  const {type, duration, message} = props
  const [visible, setVisible] = useState<boolean>(true)

  let backgroundColor
  switch (type) {
    case 'success':
      backgroundColor = Colors.Green
      break
    case 'error':
      backgroundColor = Colors.Red
      break
    case 'info':
      backgroundColor = Colors.Blue
      break
    default:
      backgroundColor = Colors.DarkGray
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  return (
    <View style={[styles.toastContainer, {backgroundColor: backgroundColor}]}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 30,
    left: '10%',
    right: '10%',
    borderColor: Colors.GreyColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastText: {
    color: 'white',
    fontSize: 16,
  },
})

export default ToastMessage
