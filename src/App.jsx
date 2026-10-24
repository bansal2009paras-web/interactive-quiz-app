import { useState } from "react";
import "./App.css";
const questions =[
  {
    question: "What does HTML stand for ? ",
    options: [
      "Hyper Text Machine Language",
      "Hyper Text Markup Language",
      "Hyperlinks Text Machine Language",
      "Hyper Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which language is used to style web pages ? ",
    options: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
    ],
    answer: "CSS",
  },
  {
    question: "Which language makes websites interactive? ",
    options: [
      "HTML",
      "CSS",
      "JavaScript",
      "SQL",
    ],
    answer: "JavaScript",
  },
  {
    question: "Which React hook is used to manage state? ",
    options: [
      "useEffect",
      "useState",
      "useProps",
      "useComponent",
    ],
    answer: "useState",
  },
  {
    question: "Which symbol is used for a single-line comment in JavaScript ? ",
    options: [
      "#",
      "//",
      "<!__ __>",
      "**",
    ],
    answer: "//",
  },
  {
    question: "Who developed React ? ",
    options: [
      "Google",
      "Microsoft",
      "Meta",
      "Amazon",
    ],
    answer: "Meta",
  },
  {
    question: "What does CSS stand for ? ",
    options: [
      "Computer Style Sheets ",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which method prints a message in the browser console ? ",
    options: [
      "console.write()",
      "print()",
      "display()",
      "console.log()",
    ],
    answer: "console.log()",
  },
  {
    question: "Which file extension is commonly used for React components ? ",
    options: [
      ".html",
      ".css",
      ".jsx",
      ".java",
    ],
    answer: ".jsx",
  },
  {
    question: "Which HTML tag  creates a hyperlink? ",
    options: [
      "<p>",
      "<a>",
      "<link>",
      "<href>",
    ],
    answer: "<a>",
  },

];
function QuestionCard({question,selectedAnswer,onAnswer}){
  return(
    <div className="question-card">
      <h2>
        {question.question}
      </h2>
      <div className="options">
        {question.options.map((option)=>(
          <button key={option} className={selectedAnswer === option ? "selected":""} onClick={()=>onAnswer(option)}>
            {option}</button>
            ))}
      </div>
    </div>
  )
}
function Result({score,total,onRestart}){
  const percentage = Math.round((score/total)*100);
  return (
    <div className="result-card">
      <h1>QUIZ COMPLETED </h1>
      <p className="score-text">
        your score
      </p>
      <div className="score">
        {score}/{total}
      </div>
      <p className="percentage">
        {percentage}%
      </p>
      <p className="message">
        {percentage>=80?"Excellent work!":percentage>=50?"Good job! keep practicing!":"keep learning and try again!"}
     </p>
     <button className="restart-btn" onClick={onRestart}>RESTART QUIZ</button>
    </div>
  )
}
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      alert("Please select an answer first!");
      return;
    }

    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore((previousScore) => previousScore + 1);
    }

    if (currentQuestion === questions.length - 1) {
      setQuizFinished(true);
    } else {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer("");
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <div className="app">
        <Result
          score={score}
          total={questions.length}
          onRestart={restartQuiz}
        />
      </div>
    );
  }

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="app">
      <div className="quiz-container">
        <div className="header">
          <div className="quiz-icon">🧠</div>
          <h1>Interactive Quiz</h1>
          <p>Test your web development knowledge</p>
        </div>

        <div className="question-info">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width:`${progress}%`}}
          ></div>
        </div>

        <QuestionCard
          question={questions[currentQuestion]}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
        />

        <button className="next-btn" onClick={handleNext}>
          {currentQuestion === questions.length - 1
            ? "Finish Quiz ✓"
            : "Next Question →"}
        </button>
      </div>
    </div>
  );
}
export default App;