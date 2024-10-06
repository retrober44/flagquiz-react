import React, { useEffect, useState, useRef  } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';

interface ScoreboardProps {
  points: number;
}

interface ScoreboardEntry {
  name?: string;
  score?: number;
}

const Scoreboard = (props: ScoreboardProps) => {

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [scoreboard, setScoreboard] = useState<ScoreboardEntry[]>([]);
  const loadScoreboard = () => {
    fetch('/api/scoreboard')
      .then((response) => response.json())
      .then((data) => setScoreboard(data))
      .catch((error) => console.error('Error fetching quiz data:', error));
  };
  useEffect(() => {
    loadScoreboard();
  }, []);

  const handleCloseScoreboard = () => {
    setShowScoreboard(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleSendScore = () => {
    const name = inputRef.current?.value || '';

    const data = { name: name, score: props.points };

    fetch('/api/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Successfully sent:', result);
        loadScoreboard()
        setShowScoreboard(true);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  const handleClose = () => {
    window.location.reload();
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={() => {}}
        aria-labelledby="customized-dialog-title"
        open={true}
        disableEscapeKeyDown
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Leider falsch.
        </DialogTitle>

        <DialogContent dividers>
          {!showScoreboard && (
            <>
              <Typography gutterBottom>Deine Punktzahl: {props.points}</Typography>
              <Typography gutterBottom>
                <TextField 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                  inputRef={inputRef}
                />
                <Button variant="contained" onClick={handleSendScore}>
                  Senden
                </Button>
              </Typography>
            </>
          )}

          {showScoreboard && (
            <List>
              {scoreboard
                .sort((a, b) => (b.score ?? 0) - (a.score ?? 0)) // Sortiere nach 'score', wobei 'undefined' als 0 behandelt wird
                .map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${index + 1}. ${item.name}`}
                      secondary={`Score: ${item.score ?? 'No Score'}`}
                    />
                  </ListItem>
                ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          {!showScoreboard && (
            <Button autoFocus onClick={() => setShowScoreboard(true)}>
              Scoreboard anzeigen
            </Button>
          )}
          {showScoreboard && (
            <Button autoFocus onClick={handleCloseScoreboard}>
              Scoreboard ausblenden
            </Button>
          )}
          <Button autoFocus onClick={handleClose}>Neuer Versuch</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default Scoreboard;
