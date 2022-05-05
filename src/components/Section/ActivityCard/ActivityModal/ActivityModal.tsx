import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';

import css from './ActivityModal.module.css';
import ProgramInfo from './ProgramInfo/ProgramInfo';
import { Program } from '../../../../models/entities';
import { Close } from '@mui/icons-material';
type Props = {
  open: boolean;
  program: any;
  handleClose: () => void;
};

const ActivityModal: React.FC<Props> = ({ handleClose, open, program }) => {
  const [stupenProgram, setStupenProgram] = useState<Program>(program[0]);
  const [stupenButtonName, setStupenButtonName] = useState<string>('červený');

  const { name, photo, ulohy, info, stupen } = stupenProgram;

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

  useEffect(() => {
    if (stupen?.id === 1) setStupenButtonName('Zobraziť červený stupeň');
    if (stupen?.id === 2) setStupenButtonName('Zobraziť zelený stupeň');
  }, [stupen?.id]);

  const handleChangeStupen = () => {
    if (stupen?.id === 1) setStupenProgram(program[1]);
    if (stupen?.id === 2) setStupenProgram(program[0]);
  };

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
        <DialogActions>
          {program.length === 2 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangeStupen}
            >
              {stupenButtonName}
            </Button>
          )}
          <Button variant="contained" color="error" onClick={handleClose}>
            Zavrieť
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActivityModal;
