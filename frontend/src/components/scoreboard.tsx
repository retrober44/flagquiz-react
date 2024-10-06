import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
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

interface ScoreboardProps{
    points: number
}

interface ScoreboardEntry  {
    name?: string;
    score?: number;
}

const Scoreboard = (props:ScoreboardProps) => {

    const [showScoreboard, setShowScoreboard] = React.useState(false);
    const handleScoreboard = () => {
        setShowScoreboard(true);
      };
    const [scoreboard, setScoreboard] = useState<ScoreboardEntry[]>([]);
    useEffect(() => {
        fetch('/api/scoreboard')
          .then(response => response.json())
          .then(data => setScoreboard(data))
          .catch(error => console.error('Error fetching quiz data:', error));
        }, []);
    
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        window.location.reload();
    };


    
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
      '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
      },
      '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
      },
    }));


return(

    <React.Fragment>

        

<BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >

<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Leider falsch. 
        </DialogTitle>


        <DialogContent dividers>


          <Typography gutterBottom>
            Deine Punktzahl: {props.points}
          </Typography>
          <Typography gutterBottom>
          <TextField id="outlined-basic" label="Name" variant="outlined" />
          <Button variant="contained">
            Scoreboard anzeigen
          </Button>
          </Typography>


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
          <Button autoFocus onClick={handleScoreboard}>
            Scoreboard anzeigen
          </Button>
          <Button autoFocus onClick={handleClose}>
          Neuer Versuch
          </Button>
        </DialogActions>


        </BootstrapDialog>



        </React.Fragment>
)



}

export default Scoreboard;