# Code a Cuisine

Code a Cuisine is a recipe web app built with Angular. Users can enter ingredients, select preferences such as cuisine, diet, cooking time, people, and portions, and generate recipe suggestions through an n8n AI workflow. The app also includes a cookbook with recipe categories, recipe detail pages, likes, and top recipes from Firebase.

## Main Features

- Generate recipe suggestions from user ingredients and preferences
- Add, edit, and delete ingredients with quantity and unit
- Get ingredient suggestions from TheMealDB
- Display generated recipes, invalid-input errors, and quota errors
- Browse cookbook categories such as Italian, German, Japanese, Gourmet, Indian, and Fusion
- Open recipe detail pages with ingredients, directions, cooking time, nutrition, and likes
- Show top recipes based on Firebase likes

## Requirements

Install these tools before running the project:

- Node.js
- npm
- n8n, if you want to use the AI recipe generation locally

Angular itself does not need to be installed globally. The Angular CLI is included in the project dependencies and is installed with `npm install`.

## Project Setup

Install all project dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm start
```

Open the app in the browser:

```text
http://localhost:4200/
```

## n8n Setup

The recipe generation uses a local n8n webhook.

The frontend sends recipe requests to:

```text
http://localhost:5678/webhook-test/recipe
```

The URL is configured in:

```text
src/app/shared/n8n-api.ts
```

To use recipe generation, n8n must be running locally and the recipe workflow must provide a webhook at this path:

```text
/webhook-test/recipe
```

The n8n workflow also needs access to the AI model credentials used for recipe generation, for example a Gemini API key.

## External Services

### Firebase

The cookbook data is loaded from a Firebase Realtime Database. The Firebase URL is configured in:

```text
src/app/shared/fierbase-cookbook.ts
```

Firebase is used to:

- Load recipes by category
- Load recipe details by name
- Store and update recipe likes
- Load the top recipes

### TheMealDB

Ingredient suggestions are loaded from TheMealDB:

```text
https://www.themealdb.com/api/json/v1/1/list.php?i=list
```

## Useful Commands

Build the project:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Tech Stack

- Angular 21
- TypeScript
- SCSS
- Angular Router
- Angular Signals
- RxJS
- Firebase Realtime Database
- n8n
- TheMealDB API
- Vitest

