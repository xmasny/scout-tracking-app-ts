import React from 'react';

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import css from './ActivityModal.module.css';
type Props = {
  open: boolean;
  program: any;
  handleClose: () => void;
};

const ActivityModal: React.FC<Props> = ({ handleClose, open, program }) => {
  const { name, photo, ulohy } = program[0];

  console.log(program);

  const programUlohyMap = ulohy.map((uloha: any) => {
    const programPodulohyMap = uloha.podulohy?.map((poduloha: any) => {
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
