'use client';
import React from "react";

import type { init, validate_base } from "@openttd/nile-library";

export interface LanguageConfig {
  dialect: string;
  cases: string[];
  genders: string[];
  plural_count: number;
}

interface ValidationError {
  severity: string;
  pos_begin?: number;
  pos_end?: number;
  message: string;
  suggestion?: string;
}

interface ValidationResult {
  errors: ValidationError[];
  normalized?: string;
}

interface WasmValidator {
  init: typeof init;
  validate_base: typeof validate_base;
  validate_translation: (js_config: LanguageConfig, base: string, _case: string, translation: string) => ValidationResult;
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
