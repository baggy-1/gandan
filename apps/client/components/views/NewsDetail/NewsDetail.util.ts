export const isValidId = (id: string): id is News['id'] => {
  const _id = id.split('-@-news')[0];

  return _id !== id;
};
