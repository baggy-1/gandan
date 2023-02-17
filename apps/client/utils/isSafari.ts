const isSafari = (
  navigator: Navigator
): navigator is Navigator & { standalone: boolean } => {
  return navigator.userAgent.toLowerCase().includes('safari');
};

export default isSafari;
