import { z } from 'zod';

import { createTool } from '@mastra/core';

// Search by ingredient
export const ingredientSearchTool = createTool({
  id: 'ingredient-search',
  description: 'Search for recipes by ingredient',
  inputSchema: z.object({
    ingredient: z.string().describe('The ingredient to search for'),
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
    console.error('Error fetching recipes by ingredient:', error);
    return [];
  }
}

// Get meal details by ID
export const getMealDetailsTool = createTool({
  id: 'meal-details',
  description: 'Get detailed information about a specific meal by its ID',
  inputSchema: z.object({
    mealId: z.string().describe('The ID of the meal to get details for'),
  }),
  outputSchema: z.object({
    meals: z.array(
      z.object({
        idMeal: z.string(),
        strMeal: z.string(),
        strDrinkAlternate: z.string().nullable(),
        strCategory: z.string(),
        strArea: z.string(),
        strInstructions: z.string(),
        strMealThumb: z.string(),
        strTags: z.string().nullable(),
        strYoutube: z.string().nullable(),
        strIngredient1: z.string().nullable(),
        strIngredient2: z.string().nullable(),
        strIngredient3: z.string().nullable(),
        strIngredient4: z.string().nullable(),
        strIngredient5: z.string().nullable(),
        strMeasure1: z.string().nullable(),
        strMeasure2: z.string().nullable(),
        strMeasure3: z.string().nullable(),
        strMeasure4: z.string().nullable(),
        strMeasure5: z.string().nullable(),
      })
    ),
  }),
  execute: async ({ context }) => {
    return await getMealDetailsFunction(context.mealId);
  },
});

export async function getMealDetailsFunction(mealId: string) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(mealId)}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching meal details:', error);
    return [];
  }
}

// List all meal categories
export const listCategoriesTools = createTool({
  id: 'list-categories',
  description: 'Get a list of all meal categories',
  inputSchema: z.object({}),
  outputSchema: z.object({
    categories: z.array(
      z.object({
        idCategory: z.string(),
        strCategory: z.string(),
        strCategoryThumb: z.string(),
        strCategoryDescription: z.string(),
      })
    ),
  }),
  execute: async () => {
    return await listCategoriesFunction();
  },
});

export async function listCategoriesFunction() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    );
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Filter by category
export const filterByCategoryTool = createTool({
  id: 'filter-by-category',
  description: 'Filter meals by category',
  inputSchema: z.object({
    category: z.string().describe('The category to filter by'),
  }),
  outputSchema: z.object({
    meals: z.array(
      z.object({
        idMeal: z.string(),
        strMeal: z.string(),
        strMealThumb: z.string(),
      })
    ),
  }),
  execute: async ({ context }) => {
    return await filterByCategoryFunction(context.category);
  },
});

export async function filterByCategoryFunction(category: string) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
        category
      )}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error filtering by category:', error);
    return [];
  }
}
