/* eslint-disable */

"use client";

import { useEffect, useState } from "react";
import { useIsMounted } from "usehooks-ts";

const useOnline = () => {
  const [online, setOnline] = useState<boolean>(true);
  const isMounted = useIsMounted();

  // TODO: this is not good ik, but it works for now
  if(!isMounted) return false;

  useEffect(() => {
    const handler = () => setOnline(window.navigator.onLine);
    window.addEventListener("online", handler);
    window.addEventListener("offline", handler);
    return () => {
      window.removeEventListener("online", handler);
      window.removeEventListener("offline", handler);
    };
  }, []);

  return online;
};

export default useOnline;
