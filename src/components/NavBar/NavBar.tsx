import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import css from './NavBar.module.css';
import { useHistory } from 'react-router-dom';

const NavBar: React.FC = () => {
  const history = useHistory();

  const [alignment, setAlignment] = useState('odborky');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar className={css.navbar}>
          <Box>
            <Typography variant="h6">Slovensky skauting - odborky</Typography>
          </Box>
          <Box>
            <ToggleButtonGroup
              color="standard"
              exclusive
              value={alignment}
              onChange={handleChange}
            >
              <ToggleButton
                onClick={() => history.push({ pathname: '/odborky' })}
                value="odborky"
              >
                Odborky
              </ToggleButton>
              <ToggleButton
                onClick={() => history.push({ pathname: '/vyzvy' })}
                value="vyzvy"
              >
                Vyzvy
              </ToggleButton>
              <ToggleButton
                onClick={() => history.push({ pathname: '/moje-aktivity' })}
                value="moje-aktivity"
              >
                Moje aktivity
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
