import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import { auth } from './firebase';
import { signOut } from "firebase/auth";
import {supabase} from './supabase';

export default function Vote() {
    const useremail = localStorage.getItem('user');
    const voteemail = localStorage.getItem('voteemail');
    const votetitle = localStorage.getItem('votetitle');
    const [suggestion, setSuggestion] = useState("");
    const [vote, setVote] = useState('');
    const [error, setError] = useState('');

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

    const submitvote = async () => {
        if(suggestion === "" || vote === "") {
            setError("All fields are required");
        }else if(vote > 100 || isNaN(vote)) {
            setError("Your vote should be in the range of 0 to 100)");
        }else {
            const { data, error } = await supabase
            .from('uservote')
            .insert([
                { voteby: useremail, vote: vote , suggestion: suggestion , idea: voteemail, title: votetitle }
            ]);
            if(error) {
                console.log(error);
                if(error.code === "23505") {
                    setError("You have already voted for this idea");
                } else {
                    setError("Please check your internet conection");
                }
            }
            if(data[0]) { 
                setError("");
                localStorage.removeItem('voteemail');
                localStorage.removeItem('votetitle');
                navigate("/browse");
            }
        }
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
            <div className='login'>
                <h2>Vote for idea title - {votetitle}</h2>
                <p>posted by user {voteemail}</p>
                <form>
                <p style={{ marginTop: '25px', color: 'red' }}>{error}</p>
                <TextField
                    required
                    id="outlined-required"
                    label="Vote(Enter your rating in the range of 0 to 100)"
                    defaultValue=""
                    className='textip'
                    style={{ marginTop: '20px' }}
                    onChange={(e) => setVote(e.target.value)}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Add your suggestion"
                    multiline
                    maxRows={4}
                    style={{ marginTop: '30px' }}
                    onChange={(e) => setSuggestion(e.target.value)}
                />
                <div style={{marginTop: '20px'}}>
                    <Button onClick={submitvote} variant="contained">Post</Button>
                </div>
                
                </form>
            </div>

    </div>
  )
}
