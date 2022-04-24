import React from 'react';

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import css from './ActivityModal.module.css';
import { Program } from '../../../../models/entities';

type Props = {
  open: boolean;
  program: Program;
  handleClose: () => void;
};

const ActivityModal: React.FC<Props> = ({ handleClose, open, program }) => {
  const { name, photo, ulohy } = program;

  const programUlohyMap = ulohy.map((uloha) => {
    const programPodulohyMap = uloha.podulohy?.map((poduloha) => {
      return <li>{poduloha}</li>;
    });

    return (
      <li>
        {uloha.text_ulohy}
        <ul>{programPodulohyMap}</ul>
      </li>
    );
  });

  return (
    <Box className={css.activityModal}>
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition
        onBackdropClick={handleClose}
      >
        <DialogTitle>
          <Typography>
            <img src={photo} alt={name} />
            {name}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ol>{programUlohyMap}</ol>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ActivityModal;
