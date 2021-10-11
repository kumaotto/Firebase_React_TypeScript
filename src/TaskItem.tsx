import React, { useState } from 'react';
import { db } from "./firebase";
import taskItemStyles from "./TaskItem.module.css";
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutlineedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

interface PROPS {
  id: string;
  title: string;
}

const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection("tasks").doc(props.id).set({ title: title }, { merge: true });
  };

  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
    console.log(props.id);
  };

  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justifyContent="flex-end">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Edit Task"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
      </Grid>
      <button className={taskItemStyles.taskitem_icon} onClick={editTask}>
        <EditOutlinedIcon/>
      </button>
      <button className={taskItemStyles.taskitem_icon} onClick={deleteTask}>
        <DeleteOutlineedIcon />
      </button>
    </ListItem>
  )
}

export default TaskItem
