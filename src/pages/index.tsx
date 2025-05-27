import Head from "next/head";
import React, { useState } from "react";
import NewTodoInput from "src/components/NewTodoInput";
import TodoFooter from "src/components/TodoFooter";
import TodoList from "src/components/TodoList";
import TodoMarkAll from "src/components/TodoMarkAll";
import { Todo } from "src/models/todo";
import { Filter } from "src/models/filter";

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [nextId, setNextId] = useState(0);
    
    const [filter, setFilter] = useState<Filter>("all");

    /**
     * Adds a new todo item to the list. If the title is empty, it does nothing.
     * @param title The text of the new todo item.
     */
    const handleNewTodo = (title: string) => {
        if (!title.trim()) {
            return;
        }
        const newTodo: Todo = {
            id: nextId,
            title,
            completed: false,
            editing: false,
        };
        setTodos((prev) => [...prev, newTodo]);
        setNextId((prev) => prev + 1);
    };

    /**
     * Puts the todo with the given id into editing mode.
     * @param id The id of the todo to edit.
     */
    const handleEdit = (id: number) => {
        setTodos((prev) =>
            prev.map((t) => ({
                ...t,
                editing: t.id === id,
            }))
        );
    };

    /**
     * Deletes the todo with the specified id from the list.
     * @param id The id of the todo to delete.
     */
    const handleDelete = (id: number) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    /**
     * Toggles the completion status of the todo with the specified id.
     * If the todo is completed, it will be marked as incomplete and vice versa.
     * @param id The id of the todo to toggle completion status.
     */
    const handleToggleComplete = (id: number) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    /**
     * Sets the title of the todo with the specified id to the given title.
     * Also disables editing mode for the todo.
     * @param id The id of the todo to update.
     * @param title The new title of the todo.
     */
    const handleSetTitle = (id: number, title: string) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, title, editing: false } : t
            )
        );
    };

    /**
     * Marks all todos as active.
     * It updates the state of todos by setting the `completed` field to false for each todo.
     */
    const handleMarkAllActive = () => {
        setTodos((prev) => prev.map((t) => ({ ...t, completed: false })));
    };

    /**
     * Marks all todos as completed.
     * It updates the state of todos by setting the `completed` field to true for each todo.
     */
    const handleMarkAllCompleted = () => {
        setTodos((prev) => prev.map((t) => ({ ...t, completed: true })));
    };

    /**
     * Clears all completed todos.
     * It updates the state of todos by removing all todos with the `completed` field set to true.
     */
    const handleClearCompleted = () => {
        setTodos((prev) => prev.filter((t) => !t.completed));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    const numCompletedTodos = todos.filter((t) => t.completed).length;
    const numActiveTodos = todos.length - numCompletedTodos;

    return (
        <>
            <Head>
                <title>TodoMVC</title>
            </Head>

            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTodoInput onNewTodo={handleNewTodo} />
                </header>

                <section className="main">
                    <TodoMarkAll
                        numCompletedTodos={numCompletedTodos}
                        numTodos={todos.length}
                        onMarkAllActive={handleMarkAllActive}
                        onMarkAllCompleted={handleMarkAllCompleted}
                    />
                    <TodoList
                        todos={filteredTodos}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleComplete={handleToggleComplete}
                        onSetTitle={handleSetTitle}
                    />
                </section>

                <TodoFooter
                    filter={filter}
                    setFilter={setFilter}
                    numActiveTodos={numActiveTodos}
                    numTodos={todos.length}
                    onClearCompleted={handleClearCompleted}
                />
            </section>

            <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>
                    Part of <a href="http://todomvc.com">TodoMVC</a>
                </p>
            </footer>
        </>
    );
}
