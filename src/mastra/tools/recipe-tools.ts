import { z } from "zod";

import { createTool } from "@mastra/core";

export const recipeSearchTool = createTool({
  id: "recipe-search",
  description: "Search for recipes by name",
  inputSchema: z.object({
    query: z.string().describe("The name of the recipe to search for"),
  }),
  outputSchema: z.object({
    meals: z.array(
      z.object({
        idMeal: z.string(),
        strMeal: z.string(),
        strMealThumb: z.string(),
        strCategory: z.string(),
        strArea: z.string(),
      })
    ),
  }),
  execute: async ({ context }) => {
    return await recipeSearchToolFunction(context.query);
  },
});

export async function recipeSearchToolFunction(query: string) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

// Search by ingredient
export const ingredientSearchTool = createTool({
  id: "ingredient-search",
  description: "Search for recipes by ingredient",
  inputSchema: z.object({
    ingredient: z.string().describe("The ingredient to search for"),
  }),
  outputSchema: z.object({
    meals: z.array(
      z.object({
        idMeal: z.string(),
        strMeal: z.string(),
        strMealThumb: z.string(),
        strCategory: z.string(),
        strArea: z.string(),
      })
    ),
  }),
  execute: async ({ context }) => {
    return await ingredientSearchToolFunction(context.ingredient);
  },
});

export async function ingredientSearchToolFunction(ingredient: string) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
        ingredient
      )}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes by ingredient:", error);
    return [];
  }
}
