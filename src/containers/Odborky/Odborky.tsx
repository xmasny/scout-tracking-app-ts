import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  CircularProgress,
  Container,
  Fab,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Zoom,
} from '@mui/material';

import {
  GetVekKatOdborkyQuery,
  GetProgramOdborkyQuery,
} from '../../queries.graphql';
import { VekKat } from '../../models/entities';
import Section from '../../components/Section/Section';
import css from './Odborky.module.css';
import {
  AddRounded,
  KeyboardArrowUpRounded,
  Search,
} from '@mui/icons-material';
import { remove } from 'remove-accents';
import ScrollToTop from 'react-scroll-up';
import VytvorNovuOdborkuDialog from '../../components/VytvorNovuOdborkuDialog/VytvorNovuOdborkuDialog';

const Odborky: React.FC = () => {
  const { data: vekKatData, loading: vekKatLoading } = useQuery(
    GetVekKatOdborkyQuery
  );

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchField, setSearchField] = useState<string>('');

  if (vekKatLoading) {
    return (
      <Box className={css.spinner}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }
  const textFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toLowerCase = e.target.value.toLowerCase();

    setSearchField(remove(toLowerCase));
  };

  console.log(vekKatData);

  const sections = vekKatData.vekovaKat.map((section: VekKat) => {
    return (
      <Section
        key={section.id}
        id={section.id}
        name={section.name}
        searchField={searchField}
      />
    );
  });

  return (
    <Box>
      <Container className={css.container} sx={{ display: 'grid' }}>
        <Paper className={css.paper}>
          <IconButton>
            <Search className={css.search} />
          </IconButton>
          <TextField
            variant="outlined"
            color="secondary"
            label="Hľadať"
            fullWidth
            onChange={textFieldHandler}
          />
        </Paper>
        <Box className={css.box}>{sections}</Box>
      </Container>
      <div className={css.fab}>
        <ScrollToTop
          style={{ position: 'static' }}
          showUnder={300}
          duration={2000}
          easing="easeInOutQuint"
        >
          <Box className={css.floatingButton}>
            <Fab>
              <KeyboardArrowUpRounded />
            </Fab>
          </Box>
        </ScrollToTop>
        <Box className={css.floatingButtonLast}>
          <Tooltip title="Vytvoriť novú odborku" placement="left" arrow>
            <Fab onClick={handleOpen} color="primary">
              <AddRounded />
            </Fab>
          </Tooltip>
        </Box>
      </div>
      <VytvorNovuOdborkuDialog open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Odborky;
