import { z } from "zod";

export const newProductSchema = z.object({
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

  description: z
    .string()
    .max(100, "La descripción del producto no puede superar los 100 caracteres")
    .optional(),
  imageUrl: z.url(),
});

export type NewProductFormData = z.infer<typeof newProductSchema>;
