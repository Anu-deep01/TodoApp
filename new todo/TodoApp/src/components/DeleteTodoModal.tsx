import React from 'react'
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native'
import Colors from '../utils/colors'

interface DeleteTodoModalProps {
  visible: boolean
  onClose: any
  onDelete: any
}

const DeleteTodoModal = (props: DeleteTodoModalProps) => {
  const {visible, onClose, onDelete} = props

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Are you sure you want to delete this todo?
          </Text>

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
              onPress={onClose}>
              <Text style={[styles.buttonText, {color: Colors.MutedGray}]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={onDelete}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
    color: Colors.Red,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.GreyColor,
    flex: 1,
    margin: 5,
  },
  deleteButton: {
    backgroundColor: Colors.themeColor,
  },
  buttonText: {
    color: Colors.White,
    textAlign: 'center',
    fontWeight: '500',
  },
})

export default DeleteTodoModal
