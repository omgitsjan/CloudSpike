"use client";

import { useEffect } from "react";

import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("567a4bfe-8019-457d-ac74-866ff30be9cf");
  }, []);

  return null;
};
