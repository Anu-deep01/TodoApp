import React, {useEffect, useState} from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native'
import Colors from '../utils/colors'
import Assets from '../utils/assets'
import {
  DeleteTodo,
  GetTodosByUserId,
  UpdateTodo,
} from '../utils/services/service'
import {getFromStorage} from '../storage/AsyncStorageUtils'
import {getHeightPercentage, getWidthPercentage} from '../utils/responsive'
import DeleteTodoModal from '../components/DeleteTodoModal'
import CompleteTodoModal from '../components/CompleteTodoModal'
import AddTodo from '../components/AddTodo'
import Toast from 'react-native-toast-message'
import ToastMessage from '../components/ToastMessage'

const TodoScreen = () => {
  const [todo, setTodo] = useState<any>({todoId: 0, title: '', description: ''})
  const [todoList, setTodoList] = useState<any>([])
  const [isTodoModalVisible, setTodoModalVisible] = useState<boolean>(false)
  const [isDeleteTodoModalVisible, setDeleteTodoModalVisible] =
    useState<boolean>(false)
  const [isTodoCompleteModal, setTodoCompleteModal] = useState<boolean>(false)
  const [heading, setHeading] = useState<string>('Add Todo')
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
    getTodosList()
  }, [])

  const getTodosList = async () => {
    try {
      const userDetails = await getFromStorage('user_details')
      const response = await GetTodosByUserId(userDetails.userId)
      if (response != null) {
        setTodoList(response.data)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleOpenTodoModal = (value: string, todo?: any) => {
    if (value == 'edit') {
      setTodo(todo)
      setHeading('Edit Todo')
    } else {
      setTodo({todoId: 0, title: '', description: ''})
      setHeading('Add Todo')
    }
    setTodoModalVisible(true)
  }

  const handleCloseTodoModal = () => {
    setTodoModalVisible(false)
    setHeading('Add Todo')
    setTodo({todoId: 0, title: '', description: ''})
  }

  // Delete todo
  const handleDeleteTodo = async (todo: any) => {
    try {
      const response = await DeleteTodo(todo.todoId)
      if (response.success == true) {
        setErrorMessage({type: 'success', message: response.message})
        handleShowToast()
        getTodosList()
      } else {
        setErrorMessage({type: 'error', message: response.message})
        handleShowToast()
      }
      setDeleteTodoModalVisible(false)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Update todo
  const handleTodoConfirm = async () => {
    const data = {
      todoId: todo.todoId,
      title: todo.title,
      description: todo.description,
      isCompleted: !todo.isCompleted,
    }

    try {
      const response = await UpdateTodo(data)
      if (response.success == true) {
        setErrorMessage({type: 'success', message: response.message})
        handleShowToast()
        getTodosList()
      } else {
        setErrorMessage({type: 'error', message: response.message})
        handleShowToast()
      }
      setTodoCompleteModal(false)
    } catch (error) {
      console.error('Error:', error)
      setTodoCompleteModal(false)
    }
  }

  const handleSetTodoItem = (todo: any) => {
    setTodo(todo)
    setDeleteTodoModalVisible(true)
  }

  const handleTodoCompleted = (todo: any) => {
    setTodo(todo)
    setTodoCompleteModal(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBarWrapper}>
        <Text style={styles.headingWrapper}>Todo-List</Text>
        <TouchableOpacity
          style={styles.todoButtonWrapper}
          onPress={() => {
            handleOpenTodoModal('add')
          }}>
          <Text style={styles.todoTextWrapper}>Add</Text>
        </TouchableOpacity>
      </View>
      {todoList.length != 0 ? (
        <FlatList
          contentContainerStyle={{
            paddingTop: getWidthPercentage(4),
            paddingBottom: getWidthPercentage(4),
          }}
          style={styles.listMainWrapper}
          showsVerticalScrollIndicator={false}
          data={todoList}
          renderItem={({item}) => {
            return (
              <View style={styles.todoMainWraaper}>
                <View style={styles.titleWrapper}>
                  <View>
                    <Text style={styles.titleHeading}>{item.title}</Text>
                    <Text style={styles.titleDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.todoDateTimeWrapper}>
                  <View style={styles.alginSelfWrapper}>
                    <Text style={styles.todoCreateTimeWrapper}>
                      {item.createdAt}
                    </Text>
                  </View>
                  <View style={styles.todoEditIconWrapper}>
                    {!item.isCompleted && (
                      <TouchableOpacity
                        style={styles.buttonWrapper}
                        onPress={() => {
                          handleOpenTodoModal('edit', item)
                        }}>
                        <Image
                          source={Assets.editIcon}
                          style={styles.deleteIconWrapper}
                        />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        handleSetTodoItem(item)
                      }}
                      style={styles.buttonWrapper}>
                      <Image
                        source={Assets.deleteIcon}
                        style={styles.deleteIconWrapper}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonWrapper}
                      onPress={() => {
                        if (item.isCompleted == false) {
                          handleTodoCompleted(item)
                        }
                      }}>
                      <Image
                        source={
                          item.isCompleted
                            ? Assets.checkedIcon
                            : Assets.unCheckedIcon
                        }
                        style={styles.deleteIconWrapper}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          }}
        />
      ) : (
        <View style={styles.noTodosFound}>
          <Text style={styles.noTodoFoundWrapper}>No Todos Found</Text>
        </View>
      )}
      <AddTodo
        todoId={todo.todoId}
        heading={heading}
        visible={isTodoModalVisible}
        todolTitle={todo.title}
        todoDescription={todo.description}
        onClose={handleCloseTodoModal}
        onSave={(todo: any) => {
          handleCloseTodoModal()
          getTodosList()
        }}
      />
      <DeleteTodoModal
        visible={isDeleteTodoModalVisible}
        onClose={() => {
          setDeleteTodoModalVisible(false)
        }}
        onDelete={() => {
          handleDeleteTodo(todo)
        }}
      />
      <CompleteTodoModal
        visible={isTodoCompleteModal}
        onClose={() => {
          setTodoCompleteModal(false)
        }}
        onConfirm={() => {
          handleTodoConfirm()
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

export default TodoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    alignItems: 'center',
  },
  appBarWrapper: {
    width: getWidthPercentage(100),
    height: getWidthPercentage(15),
    paddingVertical: getWidthPercentage(3.5),
    paddingHorizontal: getWidthPercentage(5),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.GreyColor,
    backgroundColor: Colors.White,
    shadowColor: Colors.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  titleWrapper: {
    justifyContent: 'space-between',
    width: getWidthPercentage(70),
  },
  titleHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.themeColor,
    textDecorationLine: 'underline',
  },
  titleDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.DimGray,
  },
  alginSelfWrapper: {alignSelf: 'center'},
  todoDateTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerWrapper: {
    alignSelf: 'center',
  },
  todoEditIconWrapper: {flexDirection: 'row'},
  headingWrapper: {
    fontSize: getWidthPercentage(5),
    color: Colors.themeColor,
    fontWeight: '500',
  },
  todoCreateTimeWrapper: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.DimGray,
  },
  todoButtonWrapper: {
    width: getWidthPercentage(20),
    height: getWidthPercentage(8),
    justifyContent: 'center',
    backgroundColor: Colors.themeColor,
    borderRadius: getWidthPercentage(1),
  },
  todoTextWrapper: {
    color: Colors.White,
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500',
  },
  listMainWrapper: {
    width: getWidthPercentage(95),
    alignSelf: 'center',
  },
  item: {
    padding: 10,
  },
  image: {
    width: getWidthPercentage(7),
    height: getWidthPercentage(7),
    alignSelf: 'center',
  },
  buttonWrapper: {
    width: getWidthPercentage(8),
    height: getWidthPercentage(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconStyle: {
    width: getWidthPercentage(6),
    height: getWidthPercentage(6),
    alignSelf: 'center',
    marginRight: getWidthPercentage(2),
  },
  deleteIconStyle: {
    width: getWidthPercentage(6),
    height: getWidthPercentage(6),
    alignSelf: 'center',
    marginRight: getWidthPercentage(2),
  },

  todoMainWraaper: {
    marginVertical: getWidthPercentage(1),
    width: getWidthPercentage(90),
    alignSelf: 'center',
    borderColor: Colors.themeColor,
    borderWidth: getWidthPercentage(0.2),
    borderRadius: getWidthPercentage(2),
    padding: getWidthPercentage(2),
  },
  deleteIconWrapper: {
    width: getWidthPercentage(5),
    height: getWidthPercentage(5),
  },
  noTodosFound: {
    width: getWidthPercentage(100),
    height: getHeightPercentage(95),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTodoFoundWrapper: {
    fontSize: 20,
    fontWeight: '500',
  },
})
