export const generateProfileLogo = (name: string, surname: string): string => {
  const firstInitial = name.charAt(0);
  const lastInitial = surname.charAt(0);

  return `${firstInitial}${lastInitial}`;
};
