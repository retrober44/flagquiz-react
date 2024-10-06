import React, { useEffect, useState } from 'react';
import Scoreboard from './scoreboard';
import {
  Box,
  Grid,
  Typography,
  Button,
} from '@mui/material';

interface QuizEnum {
    flag?: string;
    correctAnswer?: string;
    options?: string[];
}

const Quiz = () => {
  const [points, setPoints] = useState(0);

  const [quiz, setQuiz] = useState<QuizEnum>({});
  useEffect(() => {
    const delay = points !== 0 ? 400 : 0;

    const timer = setTimeout(() => {
    fetch('/api/quiz')
      .then(response => response.json())
      .then(data => setQuiz(data))
      .catch(error => console.error('Error fetching quiz data:', error));
    }, delay);
    return () => clearTimeout(timer);
  }, [points]);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleClick = (selectedOption: string) => {
    setSelectedOption(selectedOption); 
    console.log("Selected option:", selectedOption);
  };
  useEffect(() => {
    console.log(points);
    if (selectedOption && selectedOption == quiz.correctAnswer){
      setPoints(points+1);
    }
    if (selectedOption && selectedOption !== quiz.correctAnswer){
      console.log("ist vorbei aller");
      setAyy(true);
    }
    console.log(points);
  }, [selectedOption]);

  const [ayy, setAyy] = useState(false);
 
    
    return (
      <React.Fragment>

      {ayy &&(        
        <Scoreboard
          points={points}
        />
      )}



        <Grid 
          container
          justifyContent="center"
        >
          <Grid
            xs={12} sm={6} md={4}
            sx={{
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              margin: "2rem" 
            }}
          >
            <Box
              component="img"
              sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              border: '2px solid black', 
              borderRadius: '10px',
              }}
              src={quiz.flag}
            />
          </Grid>

          <Grid
            xs={12} sm={6} md={4}
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              margin: "2rem" 
            }}
          >
            <h2>
              Punkte: {points}  
            </h2>
          </Grid>
          
        </Grid>

        <Grid 
          container 
          spacing={1}
          justifyContent="center"
        >
          {
            quiz.options?.map((element, index) => (
              <Grid 
                item 
                xs={12} sm={6} md={4}
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  margin: "2rem" 
                }}
                key={index}
              >
                <Button 
                  variant="contained"
                  onClick={() => handleClick(element)}
                  color={
                    selectedOption === quiz.correctAnswer && selectedOption === element
                      ? 'success'
                      : selectedOption === element
                      ? 'error'
                      : 'primary'
                  }
                  sx={{ 
                    padding: "1rem",
                     display: 'flex', 
                     justifyContent: "center", 
                     width: "100%",  
                     backgroundColor: '#DFDFE1',
                     borderRadius: '3px',   
                     color: 'black'
                  }}
                >
                  <Typography key={index} sx={{ textTransform: 'none' }}>
                    {element}
                  </Typography>
                </Button>
              </Grid>
            ))
          }
        </Grid>


        </React.Fragment>
    )
}

  export default Quiz;