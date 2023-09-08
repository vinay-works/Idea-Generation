import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import { auth } from './firebase';
import { signOut } from "firebase/auth";
import {supabase} from './supabase';

export default function Browse() {
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

    const addideanav = () => {
        navigate('/addidea');
    }

    useEffect(() => {
        const user = localStorage.getItem('user');

        const fetchdata = async () => {
            
            let { data, error } = await supabase
            .from('useridea')
            .select("*")
            .neq('email', user);
            if(error) {
                console.log(error);
            }
            if(data[0]) {
                console.log(data);
                setIdeas(data);
            }
        }
        fetchdata();
    },[])


    const handleClick = (data) => {
        console.log(data);
        localStorage.setItem('voteemail', data.email);
        localStorage.setItem('votetitle', data.title);
        navigate('/vote');
    }

  return (
    <div className="App">
            <Grid container spacing={4}>
                <Grid item xs={2}>
                    <div id="topbtn">
                        <Button onClick={addideanav} variant="contained" color="primary">Add your idea</Button>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div>
                    <h2>{useremail}</h2>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div id="topbtn">
                        <Button onClick={signout} variant="contained" color="primary">Logout</Button>
                    </div>
                </Grid>
            </Grid>
            <List>
                {ideas.map((idea, index) => {
                    return (
                        <ListItem key={index}>
                            <Card style={{width: '100%', paddingLeft: '10px', paddingRight: '10px'}}>
                                <div>
                                    <h3>{idea.title}</h3>
                                    <i style={{fontSize: '15px'}}>posted by {idea.email}</i>
                                    <p>{idea.category}</p>
                                    <p>{idea.description}</p>
                                    <p style={{fontSize: '10px'}}>Posted on {idea.created_at}</p>
                                </div>
                                <div id="topbtn" style={{marginBottom: '15px'}}>
                                    <Button onClick={() => handleClick(idea)} variant="contained" color="primary">Vote</Button>
                                </div>
                            </Card>
                        </ListItem>
                    )
                })}

            </List>    

    </div>
  )
}
