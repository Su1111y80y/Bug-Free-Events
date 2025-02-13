import { useState } from "react";

const ImpossibleCaptcha = ({ onFailure, onValidityChange }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);

  const questions = [
    "What is the sound of one hand clapping?",
    "How many dreams fit in a teaspoon?",
    "What color is the letter 7?",
    "How tall is love in centimeters?",
    "What's the square root of a rainbow?",
    "How many angels can dance on the head of a semicolon?",
    "What's the weight of your thoughts in kilograms?",
    "How long is forever plus one day?",
    "What's the average speed of dark?",
    "If happiness had corners, how many would it have?",
  ];

  const messages = [
    "Error 404: Meaning not found - Try dividing by zero and try again",
    "Error 418: I'm a teapot - Your answer wasn't steep enough",
    "Error 42: Universal answer rejected - The question wasn't ultimate enough",
    "Error 503: Dreams unavailable - Server is sleeping",
    "Error 201: Created confusion successfully - Task failed successfully",
    "Error 409: Reality conflict - Existence needs rebooting",
    "Error 451: Answer censored - Too philosophical for production",
    "Error 418.1: Teapot overflow - Too much enlightenment",
    "Error 504: Gateway Timeout - Future not responding",
    "Error 422: Unprocessable Entity - Reality validation failed",
  ];

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
    onValidityChange(e.target.value.length > 0);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAttempts((prev) => prev + 1);
    const errorCode = messages[attempts % messages.length];
    onFailure(errorCode);
    setUserAnswer("");
    onValidityChange(false);
  };

  return (
    <div className="bg-base-200 p-4 rounded-lg mt-4">
      <h3 className="font-medium mb-2">Security Verification Required:</h3>
      <p className="mb-2 text-sm opacity-75">
        Please solve this philosophical query:
      </p>
      <p className="mb-2 font-medium text-primary">
        {questions[attempts % questions.length]}
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered flex-1"
          value={userAnswer}
          onChange={handleInputChange}
          placeholder="Your metaphysical answer..."
        />
        <button
          onClick={handleVerify}
          className="btn btn-primary"
          disabled={!userAnswer}
          type="button"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default ImpossibleCaptcha;
