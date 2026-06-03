import { Routes } from '@angular/router';
import { StartScreen } from '../app/components/start-screen/start-screen';
import { GenrateRecipe } from '../app/components/genrate-recipe/genrate-recipe';
import { Preferences} from '../app/components/preferences/preferences'
import { Results } from '../app/components/results/results';

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
    }
];
