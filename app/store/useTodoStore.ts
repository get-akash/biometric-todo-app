// store/useTodoStore.ts
import { create } from 'zustand';

// Define the shape of a todo
export type Todo = {
    id: string;
    title: string;
    done: boolean;
};

// Define store shape
type TodoStore = {
    todos: Todo[];
    lastAuthenticatedAt: number | null;
    skipAuthentication: boolean;
    setLastAuthenticatedAt: (timestamp: number) => void;
    setSkipAuthentication: (value: boolean) => void;
    addTodo: (title: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    updateTodo: (id: string, newTitle: string) => void
};

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    lastAuthenticatedAt: null,
    skipAuthentication: false,

    setLastAuthenticatedAt: (timestamp) => set(() => ({ lastAuthenticatedAt: timestamp })),
    setSkipAuthentication: (value) => set(() => ({ skipAuthentication: value })),

    // Add a new todo
    addTodo: (title) =>
        set((state) => ({
            todos: [
                ...state.todos,
                { id: Date.now().toString(), title, done: false },
            ],
        })),

    // Toggle done state
    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((t) =>
                t.id === id ? { ...t, done: !t.done } : t
            ),
        })),

    // Remove todo
    deleteTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
        })),

    // Update todo
    updateTodo: (id, newTitle) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, title: newTitle } : todo
            ),
        })),
}));