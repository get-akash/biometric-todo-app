import authenticateUser from '@/app/hooks/useAuthentication';
import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Todo, useTodoStore } from '../store/useTodoStore';
import TodoDisplay from './TodoDisplay';
import TodoEdit from './TodoEdit';

const TodoItem = ({ todo }: { todo: Todo }) => {
    const toggleTodo = useTodoStore((s) => s.toggleTodo);
    const deleteTodo = useTodoStore((s) => s.deleteTodo);
    const updateTodo = useTodoStore((s) => s.updateTodo);
    const skipAuthentication = useTodoStore((s) => s.skipAuthentication);

    const [editing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(todo.title)

    // Handle toggle with biometric auth
    const onToggle = useCallback(async () => {
        try {
            toggleTodo(todo.id);
        } catch (error: unknown) {
            // error handling will go here
        }
    }, [todo.id]);

    // Handle delete with biometric auth
    const onDelete = useCallback(async () => {
        try {
            if (skipAuthentication || await authenticateUser()) deleteTodo(todo.id);
        } catch (error: unknown) {
            // error handling will go here
        }
    }, [todo.id, skipAuthentication]);

    // Handle update with biometric auth
    const handleUpdate = useCallback(async () => {
        try {
            if (skipAuthentication || await authenticateUser()) {
                updateTodo(todo.id, newTitle);
                setEditing(false);
            }
        } catch (error: unknown) {
            // error handling will go here
        }
    }, [todo.id, newTitle, skipAuthentication]);

    return (
        <View style={[styles.todo_item]}>
            {editing ?
                (<TodoEdit
                    value={newTitle}
                    id={todo.id}
                    onChange={setNewTitle}
                    onSave={handleUpdate} />) :
                (<TodoDisplay
                    title={todo.title}
                    id={todo.id}
                    done={todo.done}
                    onToggle={onToggle}
                    onEdit={() => setEditing(true)}
                    onDelete={onDelete}
                />
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    todo_item: {
        padding: 12,
        margin: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
})

export default memo(TodoItem); // to prevent unnecessary re-renders