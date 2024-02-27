import {useEffect, useState} from "react";
import './App.css';
import {TextField, Grid, Button, } from "@mui/material"
import styled from "@emotion/styled";
import TaskItem from "./components/TaskItem";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [tasks, setTasks] = useLocalStorage("tasks", []); 

  const [taskName, setTaskName] = useState("");

  const valueChange = (event) => {
    const newValue = event.target.value;
    setTaskName(newValue);
  }

  const fetchTasks = async () => {
    const response = await fetch("http://my-craft-project.ddev.site/tasks.json");
    const tasks = await response.json();

    if (tasks?.data) {
      setTasks(tasks.data);
    }
    console.log("TASKS FORM API", tasks);
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  const handleAddTask = (e, task) => {
    e.preventDefault();
    const newTasks = [...tasks];

    newTasks.unshift({
      id: uuidv4(),
      name: task,
    });

    setTasks(newTasks);
    setTaskName("");
  }

  return (
    <div id="todo-app">
        <form>
        <Grid container 
        justifyContent={"center"} 
        alignItems={"center"}
        margin={"1rem"}
        >
          <h1>Tasks To DO</h1>
            <Grid item>
                <TextField
                  type="text"
                  id="new-task"
                  placeholder="New Task"
                  size="small"
                  value={taskName}
                  onChange={valueChange} 
                  />
            </Grid>
            <Grid item>
                <Button 
                id="add-task" 
                variant="contained"
                size="medium"
                onClick={(e) => handleAddTask(e, taskName)}
                >+</Button>
               
             </Grid>
          </Grid>
        </form>

      <ul id="task-list">
        {tasks.map((task, index) => {
          return (
            <TaskItem 
            key={`task-${task.id}-${index}`} 
            task={task} 
            tasks={tasks}
            setTasks={setTasks} 
            index={index} />
          )
        })}
      </ul>
    </div>
    
  );
}

export default App;

const StyledButton = styled(Button)`
 border-color: green; 
`;
