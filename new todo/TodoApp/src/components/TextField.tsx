import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'
import {getWidthPercentage} from '../utils/responsive'
import Colors from '../utils/colors'
import Assets from '../utils/assets'

type TextFieldProps = {
  autoCapitalize?: any
  placeholder: string
  value: string
  onChangeText: (value: string) => void
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
  returnKeyType?: 'done'
  maxLength?: number
  disabled?: boolean
  secureTextEntry?: boolean
  prefixIcon?: any
  isVisiblePostfixIcon?: boolean
  handlePasswordOnPress?: any
  passwordInput?: boolean
  validationMessage: string
}

function TextField(props: TextFieldProps) {
  const {
    value,
    placeholder,
    autoCapitalize,
    onChangeText,
    keyboardType,
    returnKeyType,
    maxLength,
    disabled,
    secureTextEntry,
    prefixIcon,
    isVisiblePostfixIcon,
    handlePasswordOnPress,
    passwordInput,
    validationMessage,
  } = props
  return (
    <>
      <View style={styles.input}>
        <View style={styles.mainFlexWrapper}>
          <View style={styles.subFlexWrapper}>
            <Image source={prefixIcon} style={styles.imageStyle} />
            <TextInput
              style={styles.inputWidthWrapper}
              value={value}
              placeholder={placeholder}
              placeholderTextColor={Colors.PlaceholderColor}
              onChangeText={(value: string) => onChangeText(value)}
              secureTextEntry={secureTextEntry}
              autoCapitalize={autoCapitalize}
              keyboardType={keyboardType}
              selectionColor={Colors.Black}
              maxLength={maxLength}
              returnKeyType={returnKeyType}
              editable={disabled}
            />
          </View>
          {passwordInput && (
            <TouchableOpacity
              onPress={handlePasswordOnPress}
              style={styles.postFixIconWrapper}>
              <Image
                source={isVisiblePostfixIcon ? Assets.eye : Assets.hide}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.errorMessage}>{validationMessage}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    marginVertical: getWidthPercentage(2),
    height: getWidthPercentage(12),
    width: getWidthPercentage(90),
    borderRadius: getWidthPercentage(2.0),
    paddingHorizontal: getWidthPercentage(2.5),
    backgroundColor: Colors.White,
    borderColor: Colors.DimGray,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
  },
  mainFlexWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subFlexWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorMessage: {
    color: Colors.Red,
    fontSize: 16,
    fontWeight: '400',
  },
  inputWidthWrapper: {
    width: getWidthPercentage(75),
  },
  imageStyle: {
    height: getWidthPercentage(5),
    width: getWidthPercentage(5),
    tintColor: Colors.PlaceholderColor,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  postFixIconWrapper: {
    alignSelf: 'center',
  },
})

export default TextField
