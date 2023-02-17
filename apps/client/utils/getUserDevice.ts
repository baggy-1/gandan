const getUserDevice = () => {
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const android = /Android/.test(navigator.userAgent);

  if (!ios && !android) {
    return 'desktop';
  }

  return ios ? 'ios' : 'android';
};

export default getUserDevice;
