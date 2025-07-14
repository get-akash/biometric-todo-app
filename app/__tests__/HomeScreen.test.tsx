import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import authenticateUser from '../hooks/useAuthentication';
import HomeScreen from '../screens/HomeScreen';
import { useTodoStore } from '../store/useTodoStore';

// Mock the biometric authentication module
jest.mock('../hooks/useAuthentication');

describe('HomeScreen', () => {
  // Reset the Zustand store before each test
  beforeEach(() => {
    useTodoStore.setState({ todos: [], skipAuthentication: false}); // reset Zustand store
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<HomeScreen />);

    // Assert input field and add button are rendered
    expect(getByTestId('home_todo_input')).toBeTruthy(); // input field
    expect(getByTestId('home_add_button')).toBeTruthy(); // add button
  });

  it('adds a new todo when user types and presses Add', async () => {
    // Simulate successful biometric authentication
    (authenticateUser as jest.Mock).mockResolvedValue(true);
    
    const { getByTestId, queryByText } = render(<HomeScreen />);

    const input = getByTestId('home_todo_input');
    const addButton = getByTestId('home_add_button');

    // Ensure the new todo is not present initially
    expect(queryByText('Test Todo')).toBeNull();

    // Simulate typing into the input field
    fireEvent.changeText(input, 'Test Todo');
    fireEvent.press(addButton);

    // Wait and assert that the new todo is displayed
    await waitFor(() => {
      expect(queryByText('Test Todo')).toBeTruthy(); // Confirm it shows up
    });
  });
});