import Head from "next/head";
import React, { useState } from "react";
import NewTodoInput from "src/components/NewTodoInput";
import TodoFooter from "src/components/TodoFooter";
import TodoList from "src/components/TodoList";
import TodoMarkAll from "src/components/TodoMarkAll";
import { Todo } from "src/models/todo";
import { Filter } from "src/models/filter";

export default function Home() {
    const [nextId, setNextId] = useState(0);
    
    const [filter, setFilter] = useState<Filter>("all");

    const [past, setPast] = useState<Todo[][]>([]);
    const [present, setPresent] = useState<Todo[]>([]);
    const [future, setFuture] = useState<Todo[][]>([]);

    /**
     * Commits the current list of todos as the new present, and moves the current
     * present into the past. The future is cleared. Allows for undo and redo functionality.
     * @param newTodos The new list of todos to set as the present.
     */
    const commit = (newTodos: Todo[]) => {
        setPast((prevPast) => [...prevPast, present]);
        setPresent(newTodos);
        setFuture([]);
    };

    /**
     * Undoes the last change to the todo list.
     * Moves the current present todos to the future,
     * and sets the previous set of todos from the past
     * as the new present. Does nothing if there is no past history.
     */
    const handleUndo = () => {
        if (past.length === 0) {
            return;
        }
        const previous = past[past.length - 1];
        setPast((prev) => prev.slice(0, prev.length - 1));
        setFuture((f) => [present, ...f]);
        setPresent(previous);
    };

    /**
     * Redoes the last change to the todo list that was undone.
     * Moves the current present todos to the past,
     * and sets the next set of todos from the future
     * as the new present. Does nothing if there is no future history.
     */
    const handleRedo = () => {
        if (future.length === 0) {
            return;
        }
        const next = future[0];
        setFuture((f) => f.slice(1));
        setPast((p) => [...p, present]);
        setPresent(next);
    };

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
        commit([...present, newTodo]);
        setNextId((id) => id + 1);
    };

    /**
     * Puts the todo with the given id into editing mode.
     * @param id The id of the todo to edit.
     */
    const handleEdit = (id: number) => {
        commit(
            present.map((t) => ({
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
        commit(present.filter((t) => t.id !== id));
    };

    /**
     * Toggles the completion status of the todo with the specified id.
     * If the todo is completed, it will be marked as incomplete and vice versa.
     * @param id The id of the todo to toggle completion status.
     */
    const handleToggleComplete = (id: number) => {
        commit(
            present.map((t) =>
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
        commit(
            present.map((t) =>
                t.id === id ? { ...t, title, editing: false } : t
            )
        );
    };

    /**
     * Marks all todos as active.
     * It updates the state of todos by setting the `completed` field to false for each todo.
     */
    const handleMarkAllActive = () => {
        commit(present.map((t) => ({ ...t, completed: false })));
    };

    /**
     * Marks all todos as completed.
     * It updates the state of todos by setting the `completed` field to true for each todo.
     */
    const handleMarkAllCompleted = () => {
        commit(present.map((t) => ({ ...t, completed: true })));
    };

    /**
     * Clears all completed todos.
     * It updates the state of todos by removing all todos with the `completed` field set to true.
     */
    const handleClearCompleted = () => {
        commit(present.filter((t) => !t.completed));
    };

    /**
     * Filters out the active or completed todos based on the given filter.
     * Based on the filter, the function returns either all todos, active todos, or completed todos.
     */
    const filteredTodos = present.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    const numCompletedTodos = present.filter((t) => t.completed).length;
    const numActiveTodos = present.length - numCompletedTodos;

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
                        numTodos={present.length}
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
                    numTodos={present.length}
                    onClearCompleted={handleClearCompleted}
                    onUndo={handleUndo}
                    onRedo={handleRedo}
                    canUndo={past.length > 0}
                    canRedo={future.length > 0}
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
