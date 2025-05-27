import TodoItem from "./TodoItem";
import { Todo } from "src/models/todo";
import React from "react";

type Props = {
    todos: Todo[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
    onSetTitle: (id: number, title: string) => void;
};

export default function TodoList({
    todos,
    onEdit,
    onDelete,
    onToggleComplete,
    onSetTitle,
}: Props) {
    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onEdit={() => onEdit(todo.id)}
                    onToggleComplete={() => onToggleComplete(todo.id)}
                    onDelete={() => onDelete(todo.id)}
                    onSetTitle={(title) => onSetTitle(todo.id, title)}
                />
            ))}
        </ul>
    );
}