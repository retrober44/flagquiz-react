import React, { useEffect, useState } from 'react';

function App() {
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    fetch('/api/quiz')
      .then(response => response.json())
      .then(data => setQuiz(data));
  }, []);

  return (
    <div className="App">
      <h1>Flaggenquiz</h1>
      <p>Frage: {quiz.question}</p>
      <p>Antwort: {quiz.answer}</p>
    </div>
  );
}

export default App;
