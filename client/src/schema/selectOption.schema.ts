import { z } from "zod";

export function selectOptionSchema<T>() {
  return z.object({
    label: z.string(),
    value: z.custom<T>(),
  });
}
