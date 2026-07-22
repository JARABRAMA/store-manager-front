import { z } from "zod";

export const productSchema = z.object({
  id: z.uuid("El ID del producto tiene formato inválido").nullable(),
  name: z
    .string("El nombre del producto no puede estar vacio")
    .nonempty("El nombre del producto no puede estar vacio")
    .min(3, "El nombre del producto debe tener al menos 3 caracteres")
    .max(50, "El nombre del producto debe tener 50 caracteres o menos"),

  stock: z
    .number("Las unidades disponibles del producto deben ser un número")
    .min(
      0,
      "Las unidades disponibles del producto deben ser cero o mayores que cero",
    ),

  price: z
    .number("El precio del producto debe ser un número")
    .min(100, "El precio del producto debe ser mayor o igual a 100 pesos"),

  description: z.preprocess(
    (val) => {
      if (typeof val !== "string") return null;
      const trimmed = val.trim();
      return trimmed === "" ? null : trimmed;
    },
    z
      .string()
      .max(
        100,
        "La descripción del producto no puede superar los 100 caracteres",
      )
      .refine((val) => val.split(/\s+/).length >= 5, {
        message:
          "La descripción del producto debe contener al menos 5 palabras",
      })
      .nullable(),
  ),

  imageUrl: z.preprocess((val) => {
    if (typeof val !== "string") return null;
    const trimmed = val.trim();
    return trimmed === "" ? null : trimmed;
  }, z.url("La URL de la imagen no tiene un formato válido").nullable()),

  categories: z
    .array(
      z.string().transform((val) => (val.trim() === "" ? null : val.trim())),
    )
    .transform((val) => val.filter((string) => string !== null))
    .nullable(),
});
