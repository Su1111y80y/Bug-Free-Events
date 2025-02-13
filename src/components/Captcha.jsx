import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const Captcha = ({ onFailure, onValidityChange }) => {
  // State management for CAPTCHA
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  // Initialize with random question
  const [currentQuestion, setCurrentQuestion] = useState(() =>
    generateQuestion()
  );

  /**
   * Generates a random question from the predefined set
   * @returns {Object} Question object with question text, answer, and hint
   */
  function generateQuestion() {
    const questions = [
      {
        question: "What is 2 + 2 - 1 (quick maths)?",
        answer: "3",
        hint: "Big Shaq knows this one",
      },
      {
        question: "How many developers does it take to change a light bulb?",
        answer: "0",
        hint: "It's a hardware problem",
      },
      {
        question: "Complete the sequence: 2, 4, 6, ...",
        answer: "8",
        hint: "Not that complicated, just +2",
      },
      {
        question: "How many cups of coffee make one programmer?",
        answer: "42",
        hint: "It's the answer to everything",
      },
      {
        question:
          "If a tree falls in the forest and no one logs it, is it still a bug?",
        answer: "yes",
        hint: "Always log your errors",
      },
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }

  const handleInputChange = (e) => {
    if (isVerified) return;
    setUserAnswer(e.target.value);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase()
    ) {
      setIsVerified(true);
      onValidityChange(true);
      return;
    }

    setAttempts((prev) => prev + 1);
    const message = `Wrong answer! Hint: ${currentQuestion.hint}`;
    onFailure(message);
    setUserAnswer("");
    setCurrentQuestion(generateQuestion());
  };

  return (
    <div className="bg-base-200 p-4 rounded-lg mt-4">
      <h3 className="font-medium mb-2">Quick Verification:</h3>
      <p className="mb-2 font-medium text-primary">
        {currentQuestion.question}
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          className={`input input-bordered flex-1 ${
            isVerified ? "input-success" : ""
          }`}
          value={userAnswer}
          onChange={handleInputChange}
          placeholder="Your answer..."
          disabled={isVerified}
        />
        {isVerified ? (
          <div className="btn btn-success">
            <FaCheck className="text-xl" />
          </div>
        ) : (
          <button
            onClick={handleVerify}
            className="btn btn-primary"
            disabled={!userAnswer}
            type="button"
          >
            Verify
          </button>
        )}
      </div>
      <p className="text-xs mt-2 text-base-content/70">
        {isVerified
          ? "Verification complete! ✨"
          : "Answer the question to complete registration"}
      </p>
    </div>
  );
};

export default Captcha;
