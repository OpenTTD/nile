'use client';
import React from "react";

import type { init, validate_base, validate_translation } from "@openttd/nile-library";

interface WasmValidator {
  init: typeof init;
  validate_base: typeof validate_base;
  validate_translation: typeof validate_translation;
}

interface Validator {
  validator?: WasmValidator;
}

export const ValidatorContext = React.createContext<Validator>({});

export const ValidatorProvider = ({ children } : { children: React.ReactNode }) => {
  const [validator, setValidator] = React.useState<Validator>({});

  React.useEffect(() => {
    import("@openttd/nile-library").then((newValidator) => {
      newValidator.init();

      setValidator({
        validator: newValidator,
      });
    });
  }, []);

  return <ValidatorContext.Provider value={validator}>{children}</ValidatorContext.Provider>;
};
