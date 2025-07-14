// components/TodoEditForm.tsx
import React from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'

type Props = {
  value: string,  // Current input value for the todo
  id:string,  // Used to set unique testID for testing
  onChange: (text: string) => void  // Callback when user changes the text
  onSave: () => void, // Callback when user presses Save button
}

const TodoEditForm: React.FC<Props> = ({ value, id, onChange, onSave }) => {
  return (
    <View testID={`todo_edit_${id}`} style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholder="Edit todo"
      />
      <Button testID={`save_button_${id}`} title="Save" onPress={onSave} />
    </View>
  )
}

//to avoid unnecessary re-renders unless props change
export default React.memo(TodoEditForm)

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
})