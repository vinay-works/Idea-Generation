import { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import {supabase} from './supabase';

export default function AddIdea() {
    const [ideacategory, setIdeacategory] = useState('');
    const [ideatitle, setIdeatitle] = useState('');
    const [ideades, setIdeades] = useState('');
    const [error, setError] = useState('');

    let navigate = useNavigate();

    const category = [
        {
          value: 'Default',
          label: 'Default',
        },
        {
          value: 'Science',
          label: 'Science',
        },
        {
          value: 'Technology',
          label: 'Technology',
        },
        {
          value: 'Health',
          label: 'Health',
        },
        {
          value: 'Website & Apps',
          label: 'Website & Apps',
        },
        {
          value: 'Electronics',
          label: 'Electronics',
        },
    ];

    const handleChange = (event) => {
        setIdeacategory(event.target.value);
    };

    const submitidea = async () => {
        const usremail = localStorage.getItem('user');
        if(ideatitle === "" || ideades === "" || ideacategory === "Default") {
            setError("All fields are required");
        }else {
            console.log(usremail);
            const { data, error } = await supabase
            .from('useridea')
            .insert([
                { email: usremail, title: ideatitle , category: ideacategory , description: ideades }
            ]);
            if(error) {
                console.log(error);
                setError("Please check your internet conection");
            }
            if(data[0]) { 
                setError("");
                navigate("/");
            }

        }
    }

  return (
    <div className="App">
            <div>
                <h1>Idea Voting</h1>
            </div>
            <header>
            <div className='login'>
                <h3>Add your idea</h3>
                <p style={{ marginTop: '25px', color: 'red' }}>{error}</p>
                <form>
                <TextField
                    required
                    id="outlined-required"
                    label="Idea title"
                    defaultValue=""
                    className='textip'
                    style={{ marginTop: '20px' }}
                    onChange={(e) => setIdeatitle(e.target.value)}
                />
                 <TextField
                    id="outlined-select-currency"
                    select
                    label="Idea Category"
                    value={ideacategory}
                    onChange={handleChange}
                    style={{ marginTop: '30px' }}
                    >
                    {category.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={4}
                    style={{ marginTop: '30px' }}
                    onChange={(e) => setIdeades(e.target.value)}
                />
                <div style={{marginTop: '20px'}}>
                    <Button onClick={submitidea} variant="contained">Post</Button>
                </div>
                
                </form>
            </div>
            </header>
        </div>
  )
}
