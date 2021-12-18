import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useHistory} from 'react-router-dom';
import { useState } from 'react';

export default function SearchComponent() {
  const history = useHistory();
  const [key, setKey] = useState("");

  const handleSearch = ()=>{
      console.log(key);
    history.push({
        pathname:'/search/',
        search:'?search='+key,
      });
      window.location.reload();
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by Video Title"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={key} 
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        onChange={(e) => setKey(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
}
