import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { lessonsData } from "../Components/Data";
import CourseInfo from "../Components/DetailCours/CourseInfo";
import Modules from "../Components/DetailCours/Modules";
import PdfFiles from "../Components/DetailCours/PdfFiles";
import Videos from "../Components/DetailCours/Videos";
import CommentSection from "../Components/DetailCours/CommentSection";
import { checkTokenExpiration } from "../Components/TokenExpire";

export default function CourseDetail() {
  useEffect(() => {
    checkTokenExpiration();
  });

  const [detailCours, setDetailCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchCoursId = async () => {
    try {
      const response = await fetch(`/api/cours/detail/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        setError("Erreur lors de la récupération des données");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setDetailCours(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursId();
  }, [id]);
  // const lesson = lessonsData.find((lesson) => lesson.id === parseInt(id));

  if (!detailCours) {
    return (
      <div className="text-center text-red-500 mt-20">
        Le cours demandé est introuvable.
      </div>
    );
  }

  // Initialisation des réactions avec des valeurs par défaut
  const [reactions, setReactions] = useState(
    detailCours.reviews.map((review) => ({
      ...review,
      likes: 0,
      hearts: 0,
      supports: 0,
      dislikes: 0,
    }))
  );

  // Information du cours
  // Calcul de la progression
  const totalModules = detailCours.modules.length;
  const completedModules = detailCours.completedModules;
  const progress = (completedModules / totalModules) * 100;

  // Gérer les réactions
  const handleReaction = (index, type) => {
    const newReactions = [...reactions];
    if (type === "like") newReactions[index].likes += 1;
    else if (type === "heart") newReactions[index].hearts += 1;
    else if (type === "support") newReactions[index].supports += 1;
    else if (type === "dislike") newReactions[index].dislikes += 1;
    setReactions(newReactions);
  };

  // Initialisation des commentaires
  const [comments, setComments] = useState(lesson.videos[0].comments || []);
  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [replyToIndex, setReplyToIndex] = useState(-1);
  const [replyingToUser, setReplyingToUser] = useState(""); // Nom de la personne à qui on répond
  const [editingCommentIndex, setEditingCommentIndex] = useState(-1);
  const [editingReplyIndex, setEditingReplyIndex] = useState(-1);
  const [editingText, setEditingText] = useState(""); // Nouveau texte à éditer

  // Ajouter un nouveau commentaire
  const handleCommentSubmitFonc = () => {
    const commentData = {
      userImage: "/images/user1.png",
      userName: "Nouvel Utilisateur",
      comment: newComment,
      date: new Date().toISOString().split("T")[0],
      replies: [],
    };
    setComments([...comments, commentData]);
    setNewComment("");
  };

  // Ajouter une réponse à un commentaire
  const handleReplySubmitFonc = (index) => {
    const replyData = {
      userImage: "/images/user1.png",
      userName: "Utilisateur répond",
      comment: `${replyingToUser ? `@${replyingToUser}` : ""} ${replyComment}`, // Inclure le nom de la personne répondue
      date: new Date().toISOString().split("T")[0],
    };

    const newComments = [...comments];
    newComments[index].replies.push(replyData);
    setComments(newComments);
    setReplyComment("");
    setReplyToIndex(-1);
    setReplyingToUser(""); // Réinitialiser le nom après réponse
  };

  // Répondre à un commentaire spécifique
  const handleReply = (index, userName) => {
    setReplyToIndex(index);
    setReplyingToUser(userName); // Pré-remplir le champ avec le nom de la personne à qui on répond
    setReplyComment(`@${userName} `); // Pré-remplir la réponse
  };

  // Modification du commentaire
  const handleEditComment = (index, updatedComment) => {
    const newComments = [...comments];
    newComments[index].comment = updatedComment;
    setComments(newComments);
    setEditingCommentIndex(-1); // Réinitialiser après modification
    setEditingText(""); // Réinitialiser le texte d'édition
  };

  // Modification de la réponse
  const handleEditReply = (commentIndex, replyIndex, updatedReply) => {
    const newComments = [...comments];
    newComments[commentIndex].replies[replyIndex].comment = updatedReply;
    setComments(newComments);
    setEditingReplyIndex(-1); // Réinitialiser après modification
    setEditingText(""); // Réinitialiser le texte d'édition
  };

  // Suppression du commentaire
  const handleDeleteComment = (index) => {
    const newComments = comments.filter(
      (_, commentIndex) => commentIndex !== index
    );
    setComments(newComments);
  };

  // Suppression de la réponse
  const handleDeleteReply = (commentIndex, replyIndex) => {
    const newComments = [...comments];
    newComments[commentIndex].replies = newComments[
      commentIndex
    ].replies.filter((_, index) => index !== replyIndex);
    setComments(newComments);
  };

  return (
    <div className="bg-gray-100 py-10 mt-20">
      <CourseInfo
        lesson={detailCours}
        progress={progress}
        completedModules={completedModules}
        totalModules={totalModules}
      />

      {/* Modules/Chapitres */}
      <Modules lesson={detailCours} />

      {/* Section PDF */}
      <PdfFiles lesson={detailCours} />

      <Videos
        lesson={detailCours}
        handleCommentSubmit={handleCommentSubmitFonc}
        comments={comments}
        reactions={reactions}
        handleReaction={handleReaction}
        setNewComment={setNewComment}
        newComment={newComment}
        replyToIndex={replyToIndex}
        setReplyToIndex={setReplyToIndex}
        setReplyComment={setReplyComment}
        replyComment={replyComment}
        handleReplySubmit={handleReplySubmitFonc}
        handleReply={handleReply} // Gérer la réponse
        replyingToUser={replyingToUser} // Nom de la personne à qui on répond
        handleEditComment={handleEditComment}
        handleEditReply={handleEditReply}
        handleDeleteComment={handleDeleteComment}
        handleDeleteReply={handleDeleteReply}
        editingCommentIndex={editingCommentIndex}
        setEditingCommentIndex={setEditingCommentIndex}
        editingReplyIndex={editingReplyIndex}
        setEditingReplyIndex={setEditingReplyIndex}
        editingText={editingText} // Texte édité
        setEditingText={setEditingText} // Définir le texte édité
      />

      {/* Section des avis */}
      <CommentSection reactions={reactions} handleReaction={handleReaction} />
    </div>
  );
}
