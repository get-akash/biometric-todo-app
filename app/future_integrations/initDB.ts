import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('todo.db');

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        done INTEGER NOT NULL DEFAULT 0
      );
    `);
    console.log('Table created or already exists');
  } catch (error) {
    console.error('DB Init Error:', error);
  }
};

export const insertTodo = async (title: string, done: boolean) => {
  try {
    await db.runAsync(
        'INSERT INTO todos (title, done) VALUES (?, ?);',
        [title, done ? 1 : 0]
      );
    console.log('Inserted todo');
  } catch (error) {
    console.error('Insert Error:', error);
  }
};

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const result = await db.getAllAsync<{ id: number; title: string; done: number }>(
      'SELECT * FROM todos ORDER BY id DESC;'
    );
    return result.map(({ id, title, done }) => ({
      id,
      title,
      done: !!done, // convert 0/1 to boolean
    }));
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
};