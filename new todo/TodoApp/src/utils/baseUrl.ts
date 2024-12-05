import {Platform} from 'react-native'

export const getBaseUrl = () => {
  if (Platform.OS === 'ios') {
    return `${process.env.Ios_BaseUrl}`
  } else if (Platform.OS === 'android') {
    return `${process.env.Android_BaseUrl}`
  } else if (Platform.OS === 'web') {
    return `${process.env.Web_BaseUrl}`
  }
}

export const API_BASE_URL = getBaseUrl()
