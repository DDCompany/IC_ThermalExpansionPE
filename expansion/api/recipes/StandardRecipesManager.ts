interface IStandardRecipe {
    input: IItem,
    result: IItem,
    second?: IChanceItem,
    energy?: number
}

class StandardRecipesManager extends RecipesManager<IStandardRecipe> {
    constructor(uid: string, id: string, speedTexture: string) {
        super(uid);

        this.setShower(id, {
            contents: {
                icon: id,
                drawing: [
                    {type: "bitmap", x: 444, y: 162, bitmap: "bars.machine.def_full", scale: 6},
                    {type: "bitmap", x: 335, y: 225, bitmap: speedTexture, scale: 6},
                    {type: "bitmap", x: 204, y: 80, bitmap: "bars.rf_full", scale: 6}
                ],
                elements: {
                    "textChance": {type: "text", x: 745, y: 268, font: FONT_RECIPE_VIEWER},
                    "textEnergy": {type: "text", x: 240, y: 342, font: FONT_RECIPE_VIEWER},
                    "input0": {type: "slot", x: 325, y: 112, size: 100},
                    "output0": {type: "slot", x: 585, y: 158, size: 100},
                    "output1": {type: "slot", x: 695, y: 158, size: 100}
                }
            },

            onOpen: function (elements, data) {
                elements.get("textChance")
                    .onBindingUpdated("text", data.secondChance ? `${data.secondChance * 100}%` : "");

                elements.get("textEnergy")
                    .onBindingUpdated("text", `${data.energy} RF`);
            }
        });
    }

    add(recipe: IStandardRecipe) {
        if (!recipe)
            return;

        let input = recipe.input;
        if (!input || !input.id)
            return;

        input.data = input.data || 0;
        input.count = input.count || 1;
        recipe.energy = recipe.energy || 1000;

        let second = recipe.second;
        if (second && !second.chance) {
            second.chance = 1;
        }

        this.recipes.push(recipe)
    }

    getRecipe(id: number, data: number = 0, count: number = 1): IStandardRecipe | null {
        if (!id)
            return null;

        const item = {id: id, data: data};
        return this.recipes.find((recipe) => {
            return ContainerHelper.equals(item, recipe.input)
                && (count === -1 || count >= recipe.input.count);
        });
    }

    getRecipesByResult(id: number, data: number = 0): IStandardRecipe[] {
        if (!id)
            return [];

        let item = {id: id, data: data};
        return this.recipes.filter((recipe) => {
            return ContainerHelper.equals(item, recipe.result)
                || recipe.second && ContainerHelper.equals(item, recipe.second);
        });
    }

    getRecipesByInput(id: number, data: number = 0, count: number = 1): IStandardRecipe[] {
        if (!id)
            return [];

        let item = {id: id, data: data};
        return this.recipes.filter((recipe) => {
            return ContainerHelper.equals(item, recipe.input)
                && (count === -1 || count >= recipe.input.count);
        });
    }

    makeForRecipeViewer(recipes: IStandardRecipe[]): IViewerRecipe[] {
        return recipes.map((recipe) => {
            const input = recipe.input;
            const result = recipe.result;
            const second = recipe.second;

            return {
                input: [{
                    id: input.id,
                    data: input.data || 0,
                    count: input.count || 1
                }],
                output: [
                    {
                        id: result.id,
                        data: result.data || 0,
                        count: result.count || 1
                    },
                    {
                        id: second?.id ?? 0,
                        data: second?.data ?? 0,
                        count: second?.count ?? 1
                    }
                ],
                secondChance: second?.chance ?? 0,
                energy: recipe.energy
            };
        });
    }
}