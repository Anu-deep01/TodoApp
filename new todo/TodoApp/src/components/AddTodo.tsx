import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Colors from '../utils/colors'
import {getWidthPercentage} from '../utils/responsive'
import {CreateTodo, UpdateTodo} from '../utils/services/service'
import {getFromStorage} from '../storage/AsyncStorageUtils'
import ToastMessage from './ToastMessage'

interface TodoItemProps {
  heading: string
  todoId?: number
  todolTitle: string
  todoDescription: string
  visible: boolean
  onClose: any
  onSave: any
}

const AddTodo = (props: TodoItemProps) => {
  const {
    heading,
    todoId,
    todolTitle,
    todoDescription,
    visible,
    onClose,
    onSave,
  } = props

  const [title, setTitle] = useState<string | undefined>('')
  const [description, setDescription] = useState<string | undefined>('')

  const [errorMessage, setErrorMessage] = useState({
    type: '',
    message: '',
  })
  const [showToast, setShowToast] = useState(false)

  const handleShowToast = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  useEffect(() => {
    if (heading === 'Edit Todo') {
      setDescription(todoDescription)
      setTitle(todolTitle)
    }

    return () => {
      setDescription('')
      setTitle('')
    }
  }, [heading, todolTitle, todoDescription])

  const isSaveButtonDisable = !title || !description

  const handleSave = async () => {
    if (title && description) {
      const userDetails = await getFromStorage('user_details')
      if (todoId != 0) {
        const data = {
          todoId: todoId,
          title: title?.trim(),
          description: description?.trim(),
          isCompleted: false,
        }
        try {
          const response = await UpdateTodo(data)
          if (response.success == true) {
            setErrorMessage({type: 'success', message: response.message})
            handleShowToast()
            onSave(data)
            handleCancel()
          } else {
            setErrorMessage({type: 'error', message: response.message})
            handleShowToast()
            handleCancel()
          }
        } catch (error) {
          console.error('Error:', error)
        }
      } else {
        const data = {
          title: title?.trim(),
          description: description?.trim(),
          userId: userDetails.userId,
        }
        try {
          const response = await CreateTodo(data)

          if (response.success == true) {
            setErrorMessage({type: 'success', message: response.message})
            handleShowToast()
            onSave(data)
            handleCancel()
          } else {
            setErrorMessage({type: 'error', message: response.message})
            handleShowToast()
            handleCancel()
          }
        } catch (error) {
          console.error('Error:', error)
        }
      }
    }
  }

  const handleCancel = () => {
    setDescription('')
    setTitle('')
    onClose()
  }

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{heading}</Text>

          <TextInput
            style={styles.input}
            placeholder={'Title'}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.discriptionTextInputWrapper}
            value={description}
            placeholder={'Description'}
            multiline
            numberOfLines={4}
            maxLength={250}
            onChangeText={setDescription}
            textAlignVertical="top"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderColor: Colors.themeColor,
                  backgroundColor: Colors.White,
                  borderWidth: 1,
                },
              ]}
              onPress={handleCancel}>
              <Text style={[styles.buttonText, {color: Colors.MutedGray}]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isSaveButtonDisable}
              style={[
                styles.button,
                styles.saveButton,
                {backgroundColor: Colors.themeColor},
              ]}
              onPress={handleSave}>
              <Text style={[styles.buttonText]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showToast && (
        <ToastMessage
          type={errorMessage.type}
          message={errorMessage.message}
          duration={3000}
        />
      )}
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  editButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.themeColor,
    borderRadius: 8,
  },
  discriptionTextInputWrapper: {
    height: getWidthPercentage(30),
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  editButtonText: {
    color: Colors.White,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.BlackShadow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.White,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    color: Colors.themeColor,
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.LightGray,
    flex: 1,
    margin: 5,
  },
  saveButton: {
    backgroundColor: Colors.themeColor,
  },
  buttonText: {
    color: Colors.White,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

export default AddTodo
