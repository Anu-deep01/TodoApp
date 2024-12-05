import React, {useEffect} from 'react'
import {SafeAreaView, StyleSheet, Image} from 'react-native'
import {getHeightPercentage, getWidthPercentage} from '../utils/responsive'
import {saveToStorage} from '../storage/AsyncStorageUtils'
import {ProtectedRoute} from '../utils/services/service'
import Assets from '../utils/assets'
import Colors from '../utils/colors'

const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    fetchUserDetails()
  })

  const fetchUserDetails = async () => {
    try {
      const response = await ProtectedRoute()
      if (response.success == true) {
        await saveToStorage('user_details', response.user)
        setTimeout(() => {
          navigation.navigate('todoScreen')
        }, 200)
      } else {
        handleLoginNavigation()
      }
    } catch (error) {
      handleLoginNavigation()
    }
  }

  const handleLoginNavigation = () => {
    setTimeout(() => {
      navigation.navigate('loginScreen')
    }, 2000)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logoWraaper}
        source={Assets.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWraaper: {
    width: getWidthPercentage(40),
    height: getHeightPercentage(40),
  },
})
