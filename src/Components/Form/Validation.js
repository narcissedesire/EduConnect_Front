export const valideInput = (values, rules) => {
  const errors = {};

  for (const field in rules) {
    const value = values[field];
    const rule = rules[field];
    const fieldName = field.replace(/_/g, " ");

    if (rule.required && !value) {
      errors[field] = `${fieldName} est requis`;
    } else if (rule.minLength && value.length < rule.minLength) {
      errors[
        field
      ] = `${fieldName} doit contenir au moins ${rule.minLength} caractères`;
    } else if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = `Le format de ${fieldName} est invalide`;
    } else if (rule.confirm && value !== values[rule.confirm]) {
      errors[field] = `Les mots de passe ne correspondent pas`;
    } else if (
      rule.minAge ||
      rule.maxAge ||
      rule.minDatePasse ||
      rule.maxDatePasse ||
      rule.minDateFutur ||
      rule.maxDateFutur
    ) {
      const today = new Date();
      const inputDate = new Date(value);
      const age = today.getFullYear() - inputDate.getFullYear();
      const monthDiff = today.getMonth() - inputDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < inputDate.getDate())
      ) {
        age--;
      }

      if (rule.minDatePasse && age < rule.minDatePasse) {
        errors[
          field
        ] = `${fieldName} doit être d'au moins ${rule.minDatePasse} ans dans le passé.`;
      } else if (rule.maxDatePasse && age > rule.maxDatePasse) {
        errors[
          field
        ] = `${fieldName} ne peut pas être plus ancien que ${rule.maxDatePasse} ans.`;
      } else if (rule.minDateFutur) {
        const minFutureDate = new Date(
          today.getFullYear() + rule.minDateFutur,
          today.getMonth(),
          today.getDate()
        );
        if (inputDate < minFutureDate) {
          errors[
            field
          ] = `${fieldName} doit être dans au moins ${rule.minDateFutur} ans dans le futur.`;
        }
      } else if (rule.maxDateFutur) {
        const maxFutureDate = new Date(
          today.getFullYear() + rule.maxDateFutur,
          today.getMonth(),
          today.getDate()
        );
        if (inputDate > maxFutureDate) {
          errors[
            field
          ] = `${fieldName} ne peut pas être plus éloigné que ${rule.maxDateFutur} ans dans le futur.`;
        }
      }
    }
  }

  return errors;
};
