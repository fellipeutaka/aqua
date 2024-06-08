import type { ZodSchema, ZodTypeDef } from "zod";

export function parseZodSchema<Output, Def extends ZodTypeDef, Input = Output>(
  schema: ZodSchema<Output, Def, Input>,
  data: unknown,
) {
  const result = schema.safeParse(data);

  if (result.success) {
    return result.data;
  }

  const errorMessage = Object.entries(result.error.flatten().fieldErrors)
    .map(([key, value]) => {
      return `${key}: ${(value as string[]).join("; ")}`;
    })
    .join("\n");

  throw new Error(errorMessage);
}
