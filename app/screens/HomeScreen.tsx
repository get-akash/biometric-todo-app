// screens/HomeScreen.tsx
import authenticateUser from '@/app/hooks/useAuthentication';
import React, { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View } from 'react-native';
import TodoItem from '../components/TodoItem';
import { useTodoStore } from '../store/useTodoStore';

export default function HomeScreen() {
  const todos = useTodoStore((s) => s.todos);
  const addTodo = useTodoStore((s) => s.addTodo);
  const skipAuthentication = useTodoStore((s) => s.skipAuthentication);
  const [title, setTitle] = useState('');

  // Add todo with biometric authentication
  const handleAdd = useCallback(async () => {
    try {
      if (!title.trim()) return;
      
      let ok = true;

      // Only authenticate if user has not chosen to skip
      if (!skipAuthentication) {
        ok = await authenticateUser();
      }
      
      if (ok) {
        addTodo(title.trim());
        setTitle('');
      }
    } catch (error: unknown) {
      // error handling will go here
    }
  }, [title]);

  return (
    <View style={[styles.home_screen]}>
      <TextInput
        testID="home_todo_input"
        placeholder="Enter new task"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
        style={[styles.todo_input]}
      />
      <Button testID="home_add_button" title="Add Todo" onPress={handleAdd} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem todo={item} />}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  home_screen: {
    padding: 20,
  },
  todo_input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    color: "black",
  }
})