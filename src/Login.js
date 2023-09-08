import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import { auth } from './firebase';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import {supabase} from './supabase';
import './App.css';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const useremail = localStorage.getItem('user');
    const [ideas, setIdeas] = useState([]);

    let navigate = useNavigate();

    const signout = () => {
      signOut(auth).then(() => { 
          localStorage.removeItem('user');
          window.location.reload();
          console.log("signed out");
      });
    }


    useEffect(() => {
        const user = localStorage.getItem('user');
        const fetchdata = async () => {
            
            let { data, error } = await supabase
            .from('useridea')
            .select("*")
            .eq('email', user);
            if(error) {
                console.log(error);
            }
            if(data[0]) {
                console.log(data);
                setIdeas(data);
            }
        }
        if(user) {
            fetchdata();
        }
    }, [useremail]);

    const signin = async () => {
        await signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                setUser(res.user);
                console.log(res.user);
                localStorage.setItem('user', user.email);
                setError("");
            })
            .catch(err => {
            console.log(err);
                if(err.code === "auth/wrong-password") {
                    setError("The password you entered is wrong");
                }else {
                    setError("Please check your internet conection");
                }
            });
    }       

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email === "" || password === "") {
            setError("Email/Password should not be empty");
        }else{
            await createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                setUser(res.user);
                localStorage.setItem('user', user.email);
                setError("");
            })
            .catch(err => {
                console.log(err);
                if(err.code === "auth/email-already-in-use") {
                    signin();
                }else {
                    setError("Please check your internet conection");
                }
            });
        }
    }

    const addideanav = () => {
        navigate('/addidea');
    }

    const browsenav = () => {
        navigate('/browse');
    }

    const routevote = (idea) => {
        localStorage.setItem('votetitle', idea.title)
        navigate('/votings');
    }

    if(useremail != null) {
        return (
        <div className="App">
            <Grid container spacing={4}>
                <Grid item xs={2}>
                    <div id="topbtn">
                        <Button onClick={addideanav} variant="contained" color="primary">Add your idea</Button>
                    </div>
                </Grid>
                <Grid item xs={7.5}>
                    <div>
                    <h2>Hello {useremail}</h2>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div id="topbtn">
                        <Button onClick={browsenav} variant="contained" color="primary">Browse</Button>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div id="topbtn">
                        <Button onClick={signout} variant="contained" color="primary">Logout</Button>
                    </div>
                </Grid>
            </Grid>
            <div>
                <h3>Posted ideas</h3>
            </div>
            <List>
                {ideas.map((idea, index) => {
                    return (
                        <ListItem key={index}>
                            <Card style={{width: '100%', paddingLeft: '10px', paddingRight: '10px'}}>
                                <div>
                                    <h3>{idea.title}</h3>
                                    <p>{idea.category}</p>
                                    <p>{idea.description}</p>
                                    <p style={{fontSize: '10px'}}>Posted on {idea.created_at}</p>
                                </div>
                                <Grid style={{paddingBottom: '20px'}} container spacing={4}>
                                    <Grid item xs={2}>
                                        <div id="topbtn">
                                            <Button onClick={() => routevote(idea)} variant="contained" color="primary">View Votings</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Card>
                        </ListItem>
                    )
                })}
            </List>    

        </div>
        )
    }else {
        return (
        <div className="App">
            <div>
                <h1>Idea</h1>
            </div>
            <header>
            <div className='login'>
                <h3>Login</h3>
                <p style={{ marginTop: '25px', color: 'red' }}>{error}</p>
                <form>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    defaultValue=""
                    className='textip'
                    style={{ marginTop: '20px' }}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    type={"password"}
                    defaultValue=""
                    style={{ marginTop: '20px'}}
                    onChange={(e) => setPassword(e.target.value)}
                />   
                <div style={{marginTop: '20px'}}>
                    <Button onClick={handleSubmit} variant="contained">Login</Button>
                </div>
                </form>
                <div style={{marginTop: '40px', paddingLeft: '30px', paddingRight: '30px'}}>
                    <p style={{fontSize: '15px'}}>Note:- If you don't have account just type your email & your new password & click Login which will automatically create your account & logins to your account</p>
                </div>
            </div>
            </header>
        </div>
        );
    }    
}
