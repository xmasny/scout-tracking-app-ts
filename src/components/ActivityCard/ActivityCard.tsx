import React, { useState } from 'react';

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import css from './ActivityCard.module.css';
import { Program } from '../../models/entities';

type Props = {
  program: Program;
};

const ActivityCard: React.FC<Props> = ({ program }) => {
  console.log(program);
  const { name, photo } = program;

  return (
    <Box>
      <Card className={css.card}>
        <CardMedia
          className={css.image}
          component="img"
          image={photo}
          alt={name}
        />
        <CardContent>
          <Typography
            sx={{ fontWeight: 'bold' }}
            className={css.topic}
            variant="h6"
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivityCard;
