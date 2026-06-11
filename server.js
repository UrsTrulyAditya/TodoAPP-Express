const express = require("express");
const app = express();

app.use(express.json());
let todos = [
    {
        id: 1,
        title: "Learn Express",
        completed: false,
    },
];

app.get("/", (req, res) => {
    res.json(todos);
});

app.get("/about", (req, res) => {
    res.json({ message: "Learning Express bhayya" });
});

app.post("/todos", (req, res) => {

    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            })
        };
        const todo = { id: (todos.length + 1), title, completed: false };

        todos.push(todo);
        console.log(todos, "added new todo");
        res.status(201).json(todo);

    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

app.get("/todos/:id", (req, res) => {
    const todoId = Number(req.params.id);
    const todo = todos.find((e) => e.id === (todoId));
    if (!todo) {
        return res.json({
            message: "Todo not found"
        })
    } else {
        return res.json(todo);
    }
});


app.delete("/todos/:id", (req, res) => {
    const todoId = Number(req.params.id);
    const todo = todos.some(e => e.id === todoId);

    if (todo) {
        todos = todos.filter(e => e.id !== todoId);

        return res.status(200).json({ message: "Todo deleted" });
    } else {
        return res.status(400).json({ message: "Id not found" });
    }
});

app.put("/todos/:id", (req, res) => {
    const todoId = Number(req.params.id);
    const todo = todos.some(e => e.id === todoId);

    if (todo) {
        const body = req.body;
        if (Object.keys(body).length === 0) {
            return res.status(400).json({ message: "Body missing" });
        }
        todos = todos.map(e => {
            return (e.id === todoId) ? { ...e, ...body } : e;
        })
        return res.status(200).json({ message: "Todo Updated" });
    } else {
        return res.status(400).json({ message: "Id not found" });
    }
});







app.listen(3000, () => {
    console.log("server is running happily!!")
});