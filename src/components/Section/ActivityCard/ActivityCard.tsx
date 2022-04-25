import React, { useEffect, useState } from 'react';

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import css from './ActivityCard.module.css';
import ActivityModal from './ActivityModal/ActivityModal';

type Props = {
  program: any;
};

const ActivityCard: React.FC<Props> = ({ program }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id, name, photo } = program[0];

  return (
    <>
      <Box onClick={handleOpen}>
        <Card
          className={css.card}
          variant="outlined"
          sx={{ borderColor: 'white' }}
        >
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
      <ActivityModal
        key={id}
        open={open}
        handleClose={handleClose}
        program={program}
      />
    </>
  );
};

export default ActivityCard;
