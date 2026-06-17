import { Routes } from '@angular/router';
import { StartScreen } from '../app/components/start-screen/start-screen';
import { GenrateRecipe } from '../app/components/genrate-recipe/genrate-recipe';
import { Preferences } from '../app/components/preferences/preferences'
import { Results } from '../app/components/results/results';
import { RecipeDitail } from '../app/components/recipe-ditail/recipe-ditail'
import { Cookbook } from '../app/components/cookbook/cookbook'
import { ITRecipes } from '../app/components/it-recipes/it-recipes'

export const routes: Routes = [
    {
        path: "",
        component: StartScreen
    },
    {
        path: "genrate-recipe",
        component: GenrateRecipe
    },
    {
        path: "Preferences",
        component: Preferences
    },
    {
        path: "Results",
        component: Results
    },
    {
        path: "View/:category/:name",
        component: RecipeDitail
    },
    {
        path: "Cook-Book",
        component: Cookbook
    },
    {
        path: "ITRecipes/:category",
        component: ITRecipes
    }
];
