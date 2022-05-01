import React from 'react';

import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';

import css from './ActivityModal.module.css';
import ProgramInfo from './ProgramInfo/ProgramInfo';
type Props = {
  open: boolean;
  program: any;
  handleClose: () => void;
};

const ActivityModal: React.FC<Props> = ({ handleClose, open, program }) => {
  const { name, photo, ulohy, info } = program[0];

  // console.log(program);

  const programUlohyMap = ulohy.map((uloha: any) => {
    const programPodulohyMap = uloha.podulohy?.map((poduloha: any) => {
      return <li className={css.spaceBetween}>{poduloha}</li>;
    });

    return (
      <li className={css.spaceBetween}>
        {uloha.text_ulohy}
        <ul>{programPodulohyMap}</ul>
      </li>
    );
  });

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition
        onBackdropClick={handleClose}
      >
        <DialogTitle className={css.dialogTitle}>
          <img className={css.image} src={photo} alt={name} />
          {name}
        </DialogTitle>
        <DialogContent>
          <ol>{programUlohyMap}</ol>
          {info && <ProgramInfo info={info} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ActivityModal;
