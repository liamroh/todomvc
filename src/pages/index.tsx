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

    const handleEdit = () => {
        console.log("onEdit was called");
    };

    const handleDelete = () => {
        console.log("onDelete was called");
    };

    const handleToggleComplete = () => {
        console.log("onToggleComplete was called");
    };

    const handleSetTitle = () => {
        console.log("onSetTitle was called");
    };

    const onMarkAllActive = () => {
        console.log("onMarkAllActive was called");
    };

    const onMarkAllCompleted = () => {
        console.log("onMarkAllCompleted was called");
    };

    const onClearCompleted = () => {
        console.log("onClearCompleted was called");
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
                        numCompletedTodos={0}
                        numTodos={0}
                        onMarkAllActive={onMarkAllActive}
                        onMarkAllCompleted={onMarkAllCompleted}
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
                    onClearCompleted={onClearCompleted}
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
