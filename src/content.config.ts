// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const nullableString = () =>
  z.preprocess((val) => (val === null ? undefined : val), z.string().optional());

const nullableNonNegativeNumber = () =>
  z.preprocess((val) => (val === null ? undefined : val), z.number().nonnegative().optional());

const nullablePositiveNumber = () =>
  z.preprocess((val) => (val === null ? undefined : val), z.number().positive().optional());

const priceSchema = z.object({
  quetzales: z.number().positive(),
  dolares: z.number().positive(),
});

const locationSchema = z.object({
  zona: nullableString(),
  municipio: z.string(),
  departamento: z.string().default("Guatemala"),
  direccion: nullableString(),
  lat: nullablePositiveNumber(),
  lng: nullablePositiveNumber(),
});

const propiedades = defineCollection({
  loader: glob({ pattern: "**/*.{md,yaml,yml}", base: "./src/content/propiedades" }),
  schema: z.object({
    titulo: z.string(),
    tipo: z.enum(["venta", "renta"]),
    tipoInmueble: z.enum(["casa", "apartamento", "terreno", "local", "bodega", "oficina"]),
    precio: priceSchema,
    ubicacion: locationSchema,
    descripcion: z.string(),
    habitaciones: nullableNonNegativeNumber(),
    banos: nullableNonNegativeNumber(),
    parqueos: nullableNonNegativeNumber(),
    areaConstruccion: nullablePositiveNumber(),
    areaTerreno: nullablePositiveNumber(),
    amenidades: z.array(z.string()).default([]),
    imagenPortada: z.string(),
    galeria: z.array(z.string()).default([]),
    pdfFicha: nullableString(),
    destacada: z.boolean().default(false),
    fechaPublicacion: z.coerce.date(),
  }),
});

const proyectos = defineCollection({
  loader: glob({ pattern: "**/*.{md,yaml,yml}", base: "./src/content/proyectos" }),
  schema: z.object({
    titulo: z.string(),
    estado: z.enum(["preventa", "en_construccion", "entregado"]),
    ubicacion: locationSchema,
    descripcion: z.string(),
    precioDesde: priceSchema.optional().nullable(),
    unidadesDisponibles: nullableNonNegativeNumber(),
    fechaEntregaEstimada: nullableString(),
    amenidades: z.array(z.string()).default([]),
    imagenPortada: z.string(),
    galeria: z.array(z.string()).default([]),
    pdfFicha: nullableString(),
    destacado: z.boolean().default(false),
    fechaPublicacion: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    imagenPortada: z.string(),
    autor: z.string().default("Estuardo Vásquez"),
    fechaPublicacion: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { propiedades, proyectos, blog };