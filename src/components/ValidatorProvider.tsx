'use client';
import React from "react";

import type { init, validate } from "nile-validator";

interface WasmValidator {
  init: typeof init;
  validate: typeof validate;
}

interface Validator {
  validator?: WasmValidator;
}

export const ValidatorContext = React.createContext<Validator>({});

export const ValidatorProvider = ({ children } : { children: React.ReactNode }) => {
  const [validator, setValidator] = React.useState<Validator>({});

  React.useEffect(() => {
    import("nile-validator").then((newValidator) => {
      newValidator.init();

      setValidator((prev) => {
        return {
          ...prev,
          validator: newValidator,
        };
      });
    });
  }, []);

  return <ValidatorContext.Provider value={validator}>{children}</ValidatorContext.Provider>;
};
