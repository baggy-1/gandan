const getParamsInPath = (path: string) => {
  const parseParams = path.split('#')[1]?.split('&') ?? [];

  return Object.fromEntries(parseParams.map(param => param.split('=')));
};

export default getParamsInPath;
