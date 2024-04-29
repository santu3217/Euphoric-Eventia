import React, { useState, ChangeEvent } from "react";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";

// initializing data types
interface SearchProps {
    onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = (props) => {
    const [inputValue, setValue] = useState<string>('');

    const search = () => {
        props.onSearch(inputValue);
    }

    // handle change on input change
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value.toLowerCase());
    }

    return (
        <Container style={{ position: 'sticky', top: 100, zIndex: 2, alignContent: "center", textAlign: "center" }}>
            <TextField 
                variant="outlined" 
                size="small" 
                sx={{ mr: 1,'& input': {
                    borderColor: 'white',
                }, }} 
                InputLabelProps={{shrink: true}}
                onChange={handleInputChange}
                placeholder="Search Events..."

            
            />

            <IconButton 
                sx={{ 
                    width: '60px', 
                    height: '40px', 
                    backgroundColor: '#e7005e', 
                    borderRadius: '5px', 
                    boxShadow: '0px 0px 8px rgb(0,0,0,0.6)',

                }} 
                onClick={search}
            >
                <SearchIcon />
            </IconButton>
        </Container>
    );
}

export default Search;
