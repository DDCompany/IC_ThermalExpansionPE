const RecipeHelper = {
    addGearRecipes: function (ingotId, gearId) {
        let gearHearts = [265, ItemID.ingotCopper, ItemID.ingotTin, ItemID.ingotBronze];

        for (let i = 0; i < gearHearts.length; i++) {
            Recipes.addShaped({id: gearId, count: 1, data: 0}, [
                " f ",
                "fhf",
                " f ",
            ], ['f', ingotId, -1, 'h', gearHearts[i], -1]);
        }
    },

    addIngotRecipes: function (ingotId, nuggetId) {
        Recipes.addShaped({id: ingotId, count: 1, data: 0}, [
            "fff",
            "fff",
            "fff",
        ], ['f', nuggetId, -1]);
        Recipes.addShapeless({id: nuggetId, count: 9}, [{id: ingotId, data: -1}]);
    }
};