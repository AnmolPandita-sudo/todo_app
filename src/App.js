import React, { useState, useEffect } from 'react';
import './App.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Todo from './Todo';
import db, { auth, googleAuth } from './firebase';
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


function App() {

        const useStyles = makeStyles((theme) => ({
          root: {
            flexGrow: 1,
          },
          menuButton: {
            marginRight: theme.spacing(2),
          },
          title: {
            flexGrow: 1,
          },
        }));

        const [user, setUser] = useState(null);
        const [todos, setTodos] = useState(['']);
        const[input, setInput] = useState('');
        const classes = useStyles();
        const [Auth, setAuth] = useState(true);
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);

        
          const handleMenu = (event) => {
            setAnchorEl(event.currentTarget);
        };
      
        
        const handleClose = () => {
          setAnchorEl(null);
        };
        
        useEffect(() => {
          db.collection('todos').orderBy('timestamp' , 'desc').onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({id: doc.id , todo: doc.data().todo})))
          })
        },
        []);

        const addTodo = (event) => {
          event.preventDefault();
        
          db.collection('todos').add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })

          setInput('');
        }

        return (
          <div className="App">
            
            <div className={classes.root}>

            <AppBar position="static">
              <Toolbar>
                
                <Typography variant="h6" className={classes.title}> Your Tasks for everyday life </Typography>
                
              </Toolbar>
            </AppBar>
          </div>

          <h1>Todo App</h1>
            
            <form>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField   Input value = {input} onChange={event => setInput(event.target.value)}  id="outlined-basic" label="Tasks" variant="outlined" />
              </form>
              <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add Todo</Button>
            </form>
          <ul>
            {todos.map(todo => (
              <Todo todo={todo}/>
              //<li>{todo}</li>
            ))}
          </ul>

          </div>
        );
      }

export default App;
