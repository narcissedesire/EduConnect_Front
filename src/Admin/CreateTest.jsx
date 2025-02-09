import { useState } from "react";
import { evaluate } from "mathjs"; // Importer math.js

export default function CreateTest() {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("QCM");
  const [timeLimit, setTimeLimit] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionScore, setQuestionScore] = useState(1);
  const [error, setError] = useState("");
  const [mathAnswer, setMathAnswer] = useState(""); // Pour la réponse mathématique

  // Ajouter une option pour QCM
  const handleAddOption = () => {
    if (correctOption.trim() === "") {
      setError("L'option ne peut pas être vide.");
      return;
    }
    if (options.includes(correctOption)) {
      setError("L'option existe déjà.");
      return;
    }
    setOptions((prev) => [...prev, correctOption]);
<<<<<<< HEAD
    setCorrectAnswer(correctOption);
=======
>>>>>>> 43782f211814fc1f1c5fa758825db6ea406efb73
    setCorrectOption("");
    setError("");
  };

  // Supprimer une option
  const handleDeleteOption = (option) => {
    setOptions((prev) => prev.filter((opt) => opt !== option));
    if (correctAnswer === option) {
      setCorrectAnswer(""); // Si la réponse correcte est supprimée, on la réinitialise.
    }
  };

  // Ajouter une question
  const handleAddQuestion = () => {
    if (questionText.trim() === "") {
      setError("La question ne peut pas être vide.");
      return;
    }
    if (questionType === "QCM" && options.length < 2) {
      setError("Les questions QCM doivent avoir au moins deux options.");
      return;
    }
    if (questionType === "QCM" && !correctAnswer) {
      setError("Veuillez définir la bonne réponse pour la question QCM.");
      return;
    }
<<<<<<< HEAD
    if (questionType === "vrai/faux" && !correctAnswer) {
      setError("Veuillez définir la bonne réponse pour la question vrai/faux.");
      return;
    }
=======
>>>>>>> 43782f211814fc1f1c5fa758825db6ea406efb73
    if (questionType === "math" && !mathAnswer) {
      setError("Veuillez définir la bonne réponse mathématique.");
      return;
    }

    const newQuestion = {
      id: Date.now(),
      text: questionText,
      type: questionType,
      options: questionType === "QCM" ? options : null,
      correctAnswer: questionType === "math" ? mathAnswer : correctAnswer,
      score: questionScore,
    };

    setQuestions((prev) => [...prev, newQuestion]);
    setQuestionText("");
    setQuestionType("QCM");
    setOptions([]);
    setCorrectOption("");
    setCorrectAnswer("");
    setMathAnswer("");
    setQuestionScore(1);
    setError("");
  };
<<<<<<< HEAD
  console.log(questions);
  console.log(options);
  console.log(correctAnswer);
=======
>>>>>>> 43782f211814fc1f1c5fa758825db6ea406efb73

  // Supprimer une question
  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Vérification de la réponse mathématique
  const checkMathAnswer = (userAnswer) => {
    try {
      const result = evaluate(userAnswer); // Utilisation de mathjs pour évaluer la réponse mathématique
      return result === parseFloat(mathAnswer); // Compare les réponses après évaluation
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Créer un test</h2>

      {/* Erreur */}
      {error && <div className="mb-4 text-red-500">{error}</div>}

      {/* Formulaire pour ajouter une question */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Question :</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="p-2 w-full border rounded mb-2"
          placeholder="Entrez votre question"
        />
        <label className="block text-gray-700 mb-2">Type de question :</label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="p-2 w-full border rounded mb-4"
        >
          <option value="QCM">QCM</option>
          <option value="texte">Texte libre</option>
          <option value="vrai/faux">Vrai/Faux</option>
          <option value="math">Mathématiques</option>
        </select>

        {/* Options pour QCM */}
        {questionType === "QCM" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Options :</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
                className="p-2 border rounded flex-1"
                placeholder="Entrez une option"
              />
              <button
                onClick={handleAddOption}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Ajouter
              </button>
            </div>
            {options.length > 0 && (
              <ul className="list-disc list-inside mt-2 space-y-1">
                {options.map((option, index) => (
                  <li key={index} className="flex justify-between">
                    {option}
                    <button
                      onClick={() => handleDeleteOption(option)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Supprimer
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

<<<<<<< HEAD
        {/* Réponse correcte pour QCM */}
=======
        {/* Réponse correcte pour QCM ou Vrai/Faux */}
>>>>>>> 43782f211814fc1f1c5fa758825db6ea406efb73
        {questionType === "QCM" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Réponse correcte :
            </label>
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="p-2 w-full border rounded"
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

<<<<<<< HEAD
        {/* Réponse correcte pour Vrai/Faux */}
        {questionType === "vrai/faux" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Réponse correcte :
            </label>
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="p-2 w-full border rounded"
            >
              <option value={1}>Vrai</option>
              <option value={0}>Faux</option>
            </select>
          </div>
        )}

=======
>>>>>>> 43782f211814fc1f1c5fa758825db6ea406efb73
        {/* Réponse correcte pour Mathématique */}
        {questionType === "math" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Réponse correcte :
            </label>
            <input
              type="text"
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              className="p-2 w-full border rounded"
              placeholder="Entrez la réponse mathématique correcte"
            />
          </div>
        )}

        {/* Score de la question */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Note pour la question :
          </label>
          <input
            type="number"
            value={questionScore}
            onChange={(e) => setQuestionScore(e.target.value)}
            className="p-2 w-full border rounded"
            min="1"
            placeholder="1"
          />
        </div>

        <button
          onClick={handleAddQuestion}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ajouter la question
        </button>
      </div>

      {/* Définir un temps limite pour le test */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          Temps limite (en minutes) :
        </label>
        <input
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          className="p-2 w-full border rounded"
        />
      </div>

      {/* Aperçu des questions */}
      {questions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Aperçu des questions :</h3>
          <ul className="list-disc list-inside space-y-4">
            {questions.map((q) => (
              <li key={q.id} className="p-4 bg-gray-100 rounded shadow">
                <strong>{q.type} :</strong> {q.text}
                {q.options && (
                  <ul className="list-inside mt-2 space-y-1">
                    {q.options.map((option, index) => (
                      <li key={index}>
                        {option}{" "}
                        <button
                          onClick={() => handleDeleteOption(option)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Supprimer
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <p>
                  <strong>Réponse correcte :</strong> {q.correctAnswer}
                </p>
                <p>
                  <strong>Note :</strong> {q.score}
                </p>
                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
