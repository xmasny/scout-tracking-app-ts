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
  Zoom,
} from '@mui/material';

import {
  GetVekKatOdborkyQuery,
  GetProgramOdborkyQuery,
} from '../../queries.graphql';
import { VekKat } from '../../models/entities';
import Section from '../../components/Section/Section';
import css from './Odborky.module.css';
import { KeyboardArrowUpRounded, Search } from '@mui/icons-material';
import { remove } from 'remove-accents';
import ScrollToTop from 'react-scroll-up';

const Odborky: React.FC = () => {
  const { data: vekKatData, loading: vekKatLoading } = useQuery(
    GetVekKatOdborkyQuery
  );

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

      <ScrollToTop showUnder={300} duration={1000}>
        <Fab className={css.fab} color="primary">
          <KeyboardArrowUpRounded />
        </Fab>
      </ScrollToTop>
    </Box>
  );
};

export default Odborky;
