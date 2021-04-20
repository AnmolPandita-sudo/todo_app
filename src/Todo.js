import React, {useState} from 'react'
import './Todo.css'
import { Modal, Button, List, ListItem, ListItemText, } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import db from './firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {


    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));

    const classes = useStyles();
    const[open, setOpen] = useState(false);
    const[input, setInput] = useState();

    const handleOpen=() => {
        setOpen(true);
    };


    const updateTodo = () => {

        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true })

        setOpen(false);
    }

    return (
        <>
        <Modal 
            open={open}
            onClose={e => setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>Edit Your Todo</h1>
                <input placeholder={props.todo.todo} value ={input} onChange={event => setInput(event.target.value)} />
                <Button  onClick={updateTodo}  variant="contained" color="default" className={classes.button} startIcon={<CloudUploadIcon />}> update </Button>
            </div>
        </Modal>
        <List>
            <ListItem>
                <ListItemText primary={props.todo.todo} secondary="" />
            </ListItem>
            
            <Button onClick={e => setOpen(true)} variant="contained" color="secondary" >Edit Me👷</Button>
            <Button   onClick={event => db.collection('todos').doc(props.todo.id).delete()}   variant="contained" color="secondary" classNam = {classes.button} startIcon = {<DeleteIcon />}>Delete</Button>
        
        </List>
        </>
    )
}

export default Todo
