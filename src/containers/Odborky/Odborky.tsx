import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  TextField,
} from '@mui/material';

import {
  GetVekKatOdborkyQuery,
  GetProgramOdborkyQuery,
} from '../../queries.graphql';
import { VekKat } from '../../models/entities';
import Section from '../../components/Section/Section';
import css from './Odborky.module.css';
import { Search } from '@mui/icons-material';

const Odborky: React.FC = () => {
  const { data: vekKatData, loading: vekKatLoading } = useQuery(
    GetVekKatOdborkyQuery
  );

  if (vekKatLoading) {
    return (
      <Box className={css.spinner}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  const sections = vekKatData.vekovaKat.map((section: VekKat) => {
    return <Section key={section.id} id={section.id} name={section.name} />;
  });

  return (
    <Container className={css.container} sx={{ display: 'grid' }}>
      <Paper className={css.paper}>
        <IconButton>
          <Search className={css.search} />
        </IconButton>
        <TextField
          className={css.textField}
          variant="outlined"
          color="secondary"
          label="Hľadať"
          fullWidth
        />
      </Paper>
      <Box>{sections}</Box>
    </Container>
  );
};

export default Odborky;
