import React, {useState} from 'react'
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import Assets from '../utils/assets'
import Colors from '../utils/colors'
import TextField from '../components/TextField'
import Button from '../components/Button'
import {getWidthPercentage} from '../utils/responsive'
import BorderButton from '../components/BorderButton'
import {LogIn} from '../utils/services/service'
import {saveToStorage} from '../storage/AsyncStorageUtils'
import ToastMessage from '../components/ToastMessage'

const LoginScreen = ({navigation}: any) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(true)
  const [errorMessage, setErrorMessage] = useState({
    type: '',
    message: '',
  })
  const [showToast, setShowToast] = useState(false)

  const handleShowToast = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleLogin = async () => {
    if (userName && password) {
      const data = {
        userName: userName,
        password: password,
      }

      try {
        const response = await LogIn(data)
        if (response.success == true) {
          await saveToStorage('user_details', response.user)
          setErrorMessage({type: 'success', message: response.message})
          handleShowToast()
          setTimeout(() => {
            navigation.navigate('todoScreen')
          }, 300)
        } else {
          setErrorMessage({type: 'error', message: response.message})
          handleShowToast()
          setUserName('')
          setPassword('')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const isLoginButtonDisable = !userName || !password

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image source={Assets.logo} style={styles.logoStyle} />
      </View>
      <View style={styles.loginTextWrapper}>
        <Text style={styles.loginTextStyle}>Log in</Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextField
          value={userName}
          prefixIcon={Assets.user}
          maxLength={30}
          onChangeText={setUserName}
          placeholder={'Username'}
          keyboardType={'default'}
          validationMessage={''}
        />
        <TextField
          value={password}
          prefixIcon={Assets.password}
          passwordInput={true}
          isVisiblePostfixIcon={isPasswordVisible}
          secureTextEntry={isPasswordVisible}
          maxLength={10}
          onChangeText={setPassword}
          placeholder={'Password'}
          keyboardType={'default'}
          handlePasswordOnPress={() => {
            setIsPasswordVisible(!isPasswordVisible)
          }}
          validationMessage={''}
        />
      </View>
      <View style={styles.loginButtonWrapper}>
        <Button
          title="Login"
          onPress={() => {
            handleLogin()
          }}
          disabled={isLoginButtonDisable}
        />
      </View>
      <Text style={styles.accountWrapper}>{"Don't have an account ?"}</Text>
      <BorderButton
        title={'SignUp'}
        customStyle={{
          width: getWidthPercentage(90),
        }}
        onPress={() => {
          navigation.navigate('signupScreen')
        }}
      />
      {showToast && (
        <ToastMessage
          type={errorMessage.type}
          message={errorMessage.message}
          duration={3000}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.White,
    alignItems: 'center',
    paddingHorizontal: getWidthPercentage(30),
  },
  logoWrapper: {
    alignItems: 'center',
    paddingTop: 70,
  },
  logoStyle: {
    width: getWidthPercentage(16),
    height: getWidthPercentage(16),
    resizeMode: 'contain',
  },
  loginTextWrapper: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 40,
  },
  loginTextStyle: {
    color: Colors.Blue,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputWrapper: {
    paddingBottom: 10,
  },
  forgotPasswordText: {
    marginTop: getWidthPercentage(2.5),
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    color: Colors.Blue,
  },
  loginButtonWrapper: {
    marginTop: getWidthPercentage(8),
  },
  borderLineWrapper: {
    width: getWidthPercentage(25),
    height: getWidthPercentage(0.4),
    alignSelf: 'center',
    backgroundColor: Colors.BorderLineColor,
  },
  borderLineTextWrapper: {
    color: Colors.PlaceholderColor,
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: getWidthPercentage(4),
  },
  accountWrapper: {
    marginTop: getWidthPercentage(5),
    marginBottom: getWidthPercentage(6),
    alignSelf: 'center',
    color: Colors.GreyColor,
    fontSize: 14,
    fontWeight: '600',
  },
})
export default LoginScreen
