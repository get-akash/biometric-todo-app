import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import TodoItem from '../components/TodoItem';
import authenticateUser from '../hooks/useAuthentication';
import { useTodoStore } from '../store/useTodoStore';

// Mock the biometric authentication module
jest.mock('../hooks/useAuthentication');

describe('TodoItem', () => {
  // Define a sample todo item for all test cases
  const mockTodo = {
    id: '1',
    title: 'Test Todo',
    done: false,
  };

  // Reset Zustand store with mock functions before each test
  beforeEach(() => {
    useTodoStore.setState({
      todos: [mockTodo],
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
      updateTodo: jest.fn(),
      skipAuthentication: false,
    });
  });

  it('calls deleteTodo after biometric auth succeeds', async () => {
    // Simulate successful biometric authentication
    (authenticateUser as jest.Mock).mockResolvedValue(true);

    const { getByTestId } = render(<TodoItem todo={mockTodo} />);
    const deleteButton = getByTestId(`delete_button_${mockTodo.id}`);

    // Simulate pressing the delete button
    fireEvent.press(deleteButton);

    // Expect deleteTodo to have been called with the correct todo ID
    await waitFor(() => {
      const store = useTodoStore.getState();
      expect(store.deleteTodo).toHaveBeenCalledWith(mockTodo.id);
    });
  });

  it('does not call deleteTodo if biometric auth fails', async () => {
    // Simulate failed biometric authentication
    (authenticateUser as jest.Mock).mockResolvedValue(false);

    const { getByTestId } = render(<TodoItem todo={mockTodo} />);
    const deleteButton = getByTestId(`delete_button_${mockTodo.id}`);

    // Simulate pressing the delete button
    fireEvent.press(deleteButton);

    // Expect deleteTodo NOT to have been called
    await waitFor(() => {
      const store = useTodoStore.getState();
      expect(store.deleteTodo).not.toHaveBeenCalled();
    });
  });

  it('updates todo title after biometric auth succeeds', async () => {
    // Simulate successful biometric authentication
    (authenticateUser as jest.Mock).mockResolvedValue(true);

    const { getByTestId, getByDisplayValue } = render(<TodoItem todo={mockTodo} />);
    const editButton = getByTestId(`edit_button_${mockTodo.id}`);

    // Switch to editing mode
    fireEvent.press(editButton);

    // Find the input and change the text
    const input = getByDisplayValue(mockTodo.title);
    fireEvent.changeText(input, 'Updated Todo');

    // Save the updated title
    const saveButton = getByTestId(`save_button_${mockTodo.id}`);
    fireEvent.press(saveButton);

    // Expect updateTodo to be called with new title
    await waitFor(() => {
      const store = useTodoStore.getState();
      expect(store.updateTodo).toHaveBeenCalledWith(mockTodo.id, 'Updated Todo');
    });
  });
});