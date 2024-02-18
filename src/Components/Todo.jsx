import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoItems from "./TodoItems";


const Todo = () => {
  const initvalues = {
    title: "",
    status: false,
  };
  const [values, setValues] = useState(initvalues);
  const [todos, setTodos] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    const payload = {
      ...values,
      [name]: value,
    };
    setValues(payload);
  };

  const postTodos = (values) => {
    axios.post("http://localhost:8080/todo", values)
      .then((res) => {
          setTodos(prev=>{
            return [...prev,res.data]
          })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(todos, "todo");

  const getTodos = () => {
    axios.get(`http://localhost:8080/todo?_sort=status`)
      .then((res) => {
        setTodos(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postTodos(values);
  };

  return (
    <div style={{marginTop:"20px"}}>
      <form onSubmit={handleSubmit}>
        <input
          style={{border:"3px solid black",
          padding:"15px 40px",
          borderRadius:"13px",
        }}
          value={values.title}
          name="title"
          onChange={handleChange}
          type="text"
          placeholder="enter task"
        />
        <button style={{
          marginLeft:"20px",
          padding:"15px 50px",
          backgroundColor:"black",
          color:"white",
          borderRadius:"12px",
          border:"3px solid black"
        }}>Add</button>
      </form>
        <TodoItems  setTodos={setTodos} todos={todos} />
    </div>
  );
};

export default Todo;
