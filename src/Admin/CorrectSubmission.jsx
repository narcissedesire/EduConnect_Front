import { useState } from "react";

export default function CorrectSubmission() {
  const submissionId = 1; // Simuler l'identifiant
  const [comments, setComments] = useState({});
  const [grades, setGrades] = useState({});
  const [isCorrected, setIsCorrected] = useState(false);

  // Exemple de données de soumission (données simulées)
  const submission = {
    studentName: "Alice Dupont",
    assignmentTitle: "Devoir de mathématiques",
    dateSubmitted: "2024-11-20",
    fileLink: "#", // Remplacer par le lien réel du fichier
    fileName: "devoir_math_2024.pdf",
    answers: [
      {
        id: 1,
        questionText: "La Terre est ronde.",
        answerType: "vrai/faux",
        correctAnswer: "Vrai",
        studentAnswer: "Vrai",
        isCorrect: true,
        grade: 1, // Note attribuée par le système
        maxGrade: 1, // Note maximale pour cette question
        comment: "Bonne réponse, la Terre est bien ronde.",
      },
      {
        id: 2,
        questionText: "Quel est le résultat de 2 + 2 ?",
        answerType: "QCM",
        options: ["3", "4", "5"],
        correctAnswer: "4",
        studentAnswer: "4",
        isCorrect: true,
        grade: 1, // Note attribuée par le système
        maxGrade: 1, // Note maximale pour cette question
        comment: "Excellente réponse. 2 + 2 donne bien 4.",
      },
      {
        id: 3,
        questionText: "Expliquez la théorie de la relativité.",
        answerType: "texte",
        correctAnswer:
          "La théorie d'Einstein explique que l'espace et le temps sont relatifs.",
        studentAnswer: "L'espace et le temps sont relatifs.",
        isCorrect: true,
        grade: 3, // Note initiale pour la réponse libre
        maxGrade: 5, // Note maximale pour cette question
        comment: "Explication correcte, mais trop générale.",
      },
    ],
  };

  // Fonction pour enregistrer la correction
  const handleSaveCorrection = () => {
    if (
      Object.keys(grades).length === 0 ||
      Object.keys(comments).length === 0
    ) {
      alert(
        "Veuillez ajouter une note et un commentaire pour chaque question."
      );
      return;
    }

    // Simuler l'enregistrement de la correction
    console.log(
      "Correction enregistrée pour l'étudiant :",
      submission.studentName
    );
    console.log("Notes attribuées :", grades);
    console.log("Commentaires :", comments);

    setIsCorrected(true); // Marquer le devoir comme corrigé
  };

  // Calculer la note finale basée sur les réponses correctes et maximales
  const calculateGrade = () => {
    let totalGrades = 0;
    let totalMaxGrades = 0;

    submission.answers.forEach((answer) => {
      // Si la question est de type "texte", l'enseignant peut attribuer une note
      if (answer.answerType === "texte") {
        totalGrades += Math.min(
          grades[answer.id] || answer.grade,
          answer.maxGrade
        );
      } else {
        // Pour les questions de type QCM ou vrai/faux, la note est attribuée par le système
        totalGrades += answer.isCorrect ? answer.maxGrade : 0;
      }
      totalMaxGrades += answer.maxGrade;
    });

    return `${totalGrades}/${totalMaxGrades}`;
  };

  // Mettre à jour les commentaires ou notes pour une question spécifique
  const handleGradeChange = (id, value, maxGrade) => {
    // Si la question est de type "texte", permettre une note modifiable
    if (value > maxGrade) {
      alert(`La note ne peut pas dépasser ${maxGrade} pour cette question.`);
      return;
    }
    setGrades((prev) => ({ ...prev, [id]: value }));
  };

  const handleCommentChange = (id, value) => {
    setComments((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Corriger le devoir</h2>

      <div className="mb-4">
        <p>
          <strong>Étudiant :</strong> {submission.studentName}
        </p>
        <p>
          <strong>Titre du devoir :</strong> {submission.assignmentTitle}
        </p>
        <p>
          <strong>Date de soumission :</strong> {submission.dateSubmitted}
        </p>
      </div>

      {/* Téléchargement du fichier soumis */}
      <div className="mb-4">
        <a
          href={submission.fileLink}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Télécharger le fichier : {submission.fileName}
        </a>
      </div>

      {/* Liste des questions et réponses */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Réponses de l'étudiant :</h3>
        <ul className="list-inside">
          {submission.answers.map((answer) => (
            <li key={answer.id} className="mb-4">
              <p>
                <strong>Question :</strong> {answer.questionText}
              </p>
              <p>
                <strong>Réponse soumise :</strong> {answer.studentAnswer}
              </p>
              <p>
                <strong>Réponse correcte :</strong> {answer.correctAnswer}
              </p>

              {/* Note individuelle pour chaque question */}
              {answer.answerType === "texte" ? (
                <div className="mb-2">
                  <label className="block text-gray-700">
                    Note pour cette question :
                  </label>
                  <input
                    type="number"
                    value={grades[answer.id] || answer.grade}
                    onChange={(e) =>
                      handleGradeChange(
                        answer.id,
                        e.target.value,
                        answer.maxGrade
                      )
                    }
                    className="p-2 w-20 border rounded"
                    min="0"
                    max={answer.maxGrade}
                  />
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Note attribuée :</strong>{" "}
                    {answer.isCorrect ? answer.maxGrade : 0}
                  </p>
                </div>
              )}

              {/* Commentaire spécifique pour chaque question */}
              <div className="mb-2">
                <label className="block text-gray-700">
                  Avis/Commentaire :
                </label>
                <textarea
                  value={comments[answer.id] || answer.comment}
                  onChange={(e) =>
                    handleCommentChange(answer.id, e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Ajouter un commentaire"
                ></textarea>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Note finale calculée et formatée */}
      <div className="mb-4">
        <label className="block text-gray-700">Note finale :</label>
        <input
          type="text"
          value={calculateGrade()}
          className="p-2 w-20 border rounded"
          readOnly
        />
      </div>

      {/* Bouton de soumission */}
      <button
        onClick={handleSaveCorrection}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Enregistrer la correction
      </button>

      {/* Confirmation de la correction */}
      {isCorrected && (
        <div className="mt-4 text-green-500">
          <strong>Correction enregistrée avec succès !</strong>
        </div>
      )}
    </div>
  );
}
