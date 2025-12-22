"use client";

import { useCallback, useEffect, useState } from "react";

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enter = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  }, []);

  const exit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, []);

  const toggle = useCallback(() => {
    document.fullscreenElement ? exit() : enter();
  }, [enter, exit]);

  useEffect(() => {
    function onChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    document.addEventListener("fullscreenchange", onChange);
    return () =>
      document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return {
    isFullscreen,
    enter,
    exit,
    toggle,
  };
}
