import Head from "next/head";
import React, { useState } from "react";
import NewTodoInput from "src/components/NewTodoInput";
import TodoFooter from "src/components/TodoFooter";
import TodoList from "src/components/TodoList";
import TodoMarkAll from "src/components/TodoMarkAll";
import { Todo } from "src/models/todo";

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [nextId, setNextId] = useState(0);

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

    const handleEdit = (id: number) => {
        setTodos((prev) =>
            prev.map((t) => ({
                ...t,
                editing: t.id === id,
            }))
        );
    };

    const handleDelete = (id: number) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    const handleToggleComplete = (id: number) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const handleSetTitle = (id: number, title: string) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, title, editing: false } : t
            )
        );
    };

    const handleMarkAllActive = () => {
        setTodos((prev) => prev.map((t) => ({ ...t, completed: false })));
    };

    const handleMarkAllCompleted = () => {
        setTodos((prev) => prev.map((t) => ({ ...t, completed: true })));
    };

    const handleClearCompleted = () => {
        setTodos((prev) => prev.filter((t) => !t.completed));
    };

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
                        todos={todos}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleComplete={handleToggleComplete}
                        onSetTitle={handleSetTitle}
                    />
                </section>

                <TodoFooter
                    filter="all"
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
