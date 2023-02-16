import { useEffect, useState } from 'react';

const useBeforeInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  const openInstallPrompt = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
  };

  useEffect(() => {
    const displaymode = getPWADisplayMode();
    if (displaymode !== 'browser') {
      setIsInstalled(true);
      return;
    }

    const eventBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const eventAppInstalled = () => {
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', eventBeforeInstallPrompt);
    window.addEventListener('appinstalled', eventAppInstalled);

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        eventBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', eventAppInstalled);
    };
  }, []);

  return {
    installable: !isInstalled && !!deferredPrompt,
    openInstallPrompt,
  };
};

const getPWADisplayMode = () => {
  const isStandAlone = window.matchMedia('(display-mode: standalone)').matches;

  if (document.referrer.startsWith('android-app://')) {
    return 'twa';
  }

  const _navigator = navigator;
  // ios safari에서만 navigator.standalone 속성이 존재 -> boolean 값 반환
  if ((isSafari(_navigator) && _navigator.standalone) || isStandAlone) {
    return 'standalone';
  }

  return 'browser';
};

const isSafari = (
  navigator: Navigator
): navigator is Navigator & { standalone: boolean } => {
  return navigator.userAgent.toLowerCase().includes('safari');
};

export default useBeforeInstallPrompt;
