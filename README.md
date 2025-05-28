# Rainbow - Frontend Take-Home Assignment

This project completes the TodoMVC implementation as part of the Rainbow assessment. It includes:
 - Completed implementation of todo operations (add, edit, delete, complete)
 - Properly filterable views
 - Undo / redo logic through "commit" tracking of state snapshots in index.tsx

State and all handlers are globally managed from `index.tsx` and passed down to children components. 

Each "commit" will store the todo state through the function, which is called during handler CRUD functionality and triggered by undo / redo buttons in the footer: 
```ts
const commit = (newTodos: Todo[]) => {
    setPast((prevPast) => [...prevPast, present]);
    setPresent(newTodos);
    setFuture([]);
};
```