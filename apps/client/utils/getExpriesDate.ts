const getExpriesDate = (expiresIn: number) =>
  new Date(new Date().getTime() + expiresIn);

export default getExpriesDate;
