// components/TodoDisplay.tsx
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

type Props = {
  title: string // Text of the todo item
  id:string,  // Used to set unique testID for testing
  done: boolean // Whether the todo is completed
  onToggle: () => void  // Callback for toggling todo status
  onEdit: () => void  // Callback for entering edit mode
  onDelete: () => void  // Callback for deleting the todo
}

const TodoDisplay: React.FC<Props> = ({ title, id, done, onToggle, onEdit, onDelete }) => {
  return (
    <View testID={`todo_display_${id}`}>
      <Text
        style={[
          styles.todo_text,
          {
            textDecorationLine: done ? 'line-through' : 'none',
          },
        ]}
      >
        {title}
      </Text>
      <View style={styles.buttons_container}>
        <Button testID={`toggle_button_${id}`} title="Toggle" onPress={onToggle} />
        <Button testID={`edit_button_${id}`} title="Edit" onPress={onEdit} />
        <Button testID={`delete_button_${id}`} title="Delete" onPress={onDelete} />
      </View>
    </View>
  )
}

// to avoid unnecessary re-renders if props haven't changed
export default React.memo(TodoDisplay)

const styles = StyleSheet.create({
  todo_text: {
    fontSize: 20,
    marginBottom: 8,
  },
  buttons_container: {
    flexDirection: 'row',
    gap: 10,
  },
})