export const CHARACTERS = {
  JANE: "jane" as const, 
  OSCAR: "oscar" as const,
}

export type Character = typeof CHARACTERS[keyof typeof CHARACTERS];

export const GENDERS = {
  MALE: "male",
  FEMALE: "female",
}

export type Gender = typeof GENDERS[keyof typeof GENDERS];


