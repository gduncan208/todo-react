
import React, { useState } from "react"
import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import styled from "@emotion/styled";
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';


const TaskItem = (props) => {
    const {task, tasks, setTasks, index} = props;

    const [taskName, setTaskName] = useState(task.name);

    const [editState, setEditState] = useState(false);

    const updateTasks = async () => {
        const response = await fetch(`http://my-craft-project.ddev.site/${tasks.id}tasks.json`, {method: "POST"});
        const tasks = await response.json();

        // if (tasks?.data) {
        //     setTasks(tasks.data);
        // }
        console.log("TASKS FORM API", tasks);
    }

    const deleteItem = (e) => {
        e.preventDefault();
        const newTasks = [...tasks];
        
        newTasks.splice(index, 1);
        setTasks(newTasks);
        console.log("I am deleting");

    }

    const saveItem = (e) => {
        e.preventDefault();
        const newTasks = [...tasks];
        const newTask = {...newTasks[index]};
        newTask.name = taskName;
        newTasks[index] = newTask;

        setTasks(newTasks);
        setEditState(false);

        console.log("I am saving");

    }

    const editItem = (e) => {
        e.preventDefault();
        setTaskName(task.name);
        setEditState(true);
    }

    const cancelItem = (e) => {
        e.preventDefault();
        setEditState(false);
    }

    const handleTaskNameOnChange = (e) => {
        const newTask = e.target.value;
        setTaskName(newTask);
    }

    if (!task) {
        return null;
    }

    return (
         <li className="ListSection">
            
            {editState ? (
                <>
                    <EditTaskName  type="text" value={taskName} onChange={(e) => handleTaskNameOnChange(e)}/>
                    <ActionsButtons>
                        <IconButton onClick={(e) => cancelItem(e)}>
                            <CloseIcon
                                color="error" />
                        </IconButton>

                        <IconButton onClick={(e) => saveItem(e)}>
                            <DoneAllIcon
                                color="success" />
                        </IconButton>
                    </ActionsButtons>
                </>

            ) : (

                <>
                    <TaskName>{task.name}</TaskName>
                        <ActionsButtons>
                            <IconButton onClick={(e) => deleteItem(e)}>
                                <DeleteForeverIcon
                                    color="error" />

                            </IconButton>
                            <IconButton onClick={(e) => editItem(e)}>
                                <EditNoteIcon
                                    color="info" />
                            </IconButton>
                        </ActionsButtons>
                </>
            
            )}
        </li> 
    );
}


export default TaskItem;

const TaskName = styled.div`
    font-size: 14px;
`

const EditTaskName = styled.input`
    font-size: 14px;
`

const ActionsButtons = styled.div`
    display: flex;
    justify-content: evenly;

`



// const ListSection = styled.li`
//     display: flex;
//     flex-direciton: column;
// `


