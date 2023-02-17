import { useEffect, useState } from 'react';
import { isSafari } from '~/utils';

const useBeforeInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isPWA, setIsPWA] = useState(false);

  const openInstallPrompt = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
  };

  useEffect(() => {
    const displaymode = getPWADisplayMode();
    if (displaymode !== 'browser') {
      setIsPWA(true);
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
    isPWA,
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

export default useBeforeInstallPrompt;
