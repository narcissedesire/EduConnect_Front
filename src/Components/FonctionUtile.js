import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const formatCreatedAt = (createdAt) => {
  const createdDate = new Date(createdAt);

  // Vérifier si createdDate est une date valide
  if (isNaN(createdDate)) {
    return "À l'instant";
  }

  const now = new Date();
  const differenceInSeconds = Math.floor((now - createdDate) / 1000);
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInMinutes / 1440);
  const differenceInYears = Math.floor(differenceInDays / 365);

  if (differenceInSeconds < 10) {
    return "À l'instant";
  } else if (differenceInSeconds < 60) {
    return `${differenceInSeconds} seconde${
      differenceInSeconds > 1 ? "s" : ""
    }`;
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minute${differenceInMinutes > 1 ? "s" : ""}`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours} heure${differenceInHours > 1 ? "s" : ""}`;
  } else if (differenceInDays < 5) {
    return `${differenceInDays} jour${differenceInDays > 1 ? "s" : ""}`;
  } else if (differenceInDays < 365) {
    return format(createdDate, "d MMM", { locale: fr });
  } else {
    return format(createdDate, "d MMM yyyy", { locale: fr });
  }
};

export const calculateProgression = (modules) => {
  const totalModules = modules.length;
  const completedModules = modules.filter((module) => module.termine).length;

  const progression =
    totalModules === 0 ? 0 : (completedModules / totalModules) * 100;
  return progression;
};
