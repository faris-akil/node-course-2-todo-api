const _ = require('lodash')
const express = require("express");
const bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo.js");
var {User} = require("./models/user.js");
var {ObjectID} = require("mongodb");

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post("/api/todos", (req,res) => {
    // console.log(req.body);
    var todo = new Todo({
      text: req.body.text
    });

    todo.save().then((doc) => {
      res.send(doc);
    },(e) => {
      res.status(400).send(e);
    });
});

app.get("/api/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos: todos})
  }, (e)=> {
    res.status(400).send(e);
  })
});


app.get("/api/todos/:id", (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send({message: "Id not Valid"});
  }

  Todo.findById(id).then((todo) => {
    if (!todo){
      return res.status(404).send({message: "Todo not found"});
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send({message: "Error occured"});
  });
});

app.delete("/api/todos/:id", (req,res) => {
  var id=req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send({message: "id not valid"});
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send({message: "todo not found"});
    }
    if(todo === null){
      return res.status(400).send({message: "todo already deleted"});
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.patch('/api/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send({message: "id not valid"});
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo){
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send({message: "An error occured"});
  })
});

app.post("/api/users", (req,res) => {
  var user_info = _.pick(req.body, ["email", "password"]);
  console.log(user_info);
  var user = new User(user_info);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header("x-auth", token).send(user);
  }).catch((e)  => {
    res.status(400).send({message: "User not added. An error occured", error: e});
  })
});

app.listen(port, () => {
  console.log(`Start on port number ${port}`);
})
