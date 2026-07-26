import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .nonempty("El nombre del producto no puede estar vacio")
    .min(3, "El nombre del producto debe tener al menos 3 caracteres")
    .max(50, "El nombre del producto debe tener 50 caracteres o menos"),

  stock: z
    .string("El precio del producto no puede ser vacío")
    .min(1, "El precio del producto no puede ser vacío")
    .transform((val) => Number(val))
    .pipe(
      z
        .number("Las unidades disponibles del producto deben ser un número")
        .min(
          0,
          "Las unidades disponibles del producto deben ser cero o mayores que cero",
        ),
    ),
  price: z.coerce
    .string("Las unidades disponibles no pueden estar vacías")
    .min(1, "Las unidades disponibles no pueden estar vacías")
    .transform((val) => Number(val))
    .pipe(
      z
        .number("El precio del producto debe ser un número")
        .min(100, "El precio del producto debe ser mayor a 100 pesos"),
    ),
  description: z.preprocess(
    (val) => {
      if (typeof val !== "string") return undefined;
      const trimmed = val.trim();
      return trimmed === "" ? undefined : trimmed;
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
      .optional(),
  ),

  imageUrl: z
    .string()
    .transform((val) => {
      return val.trim() === "" ? undefined : val.trim();
    })
    .refine((val) => !val || z.url().safeParse(val).success, {
      message: "La URL de la imagen no tiene un formato válido",
    })
    .optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
