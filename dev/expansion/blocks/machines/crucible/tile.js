MachineRegistry.define(BlockID.thermalMachineCrucible, MachineRegistry.TileEntity({
    defaultValues: {
        progress: 0,
        progressMax: 0,
        basePower: 20
    },

    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },

    tick: function () {
        let slot = this.container.getSlot("slotSource");
        let power = 0;

        if (this.data.progressMax) {
            if (!slot.id) {
                this.data.progress = 0;
                this.data.progressMax = 0;
                return
            }

            if (this.data.progress >= this.data.progressMax) {
                let recipe = MagmaCrucibleRecipes.get(slot.id, slot.data);
                let fluid = this.liquidStorage.getLiquidStored();
                if ((!fluid || fluid === recipe.fluid) && this.liquidStorage.getAmount(fluid) + recipe.fluidAmount <= 10) {
                    this.liquidStorage.addLiquid(recipe.fluid, recipe.fluidAmount);

                    this.data.progress = 0;
                    this.data.progressMax = 0;

                    slot.count--;
                    this.container.validateSlot("slotSource");
                    this.refreshModel();
                }
            } else {
                power = MachineRegistry.calcEnergy(this.data.basePower, this.data.energy);
                this.data.progress += power;
                this.data.energy -= power;
            }
        } else if (slot.id) {
            let recipe = MagmaCrucibleRecipes.get(slot.id, slot.data);
            if (recipe) {
                this.data.progress = 1;
                this.data.progressMax = recipe.energy || 1000;
                this.refreshModel();
            }
        }

        this.liquidStorage.updateUiScale("fluidScale", this.liquidStorage.getLiquidStored());
        this.container.setScale("progressScale", this.data.progress / this.data.progressMax);
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("speedScale", power / this.data.basePower);
    },

    installUpgrade: function (tier) {
        if (tier < 1 || tier > 4)
            return false;

        this.data.tier = tier;
        this.data.basePower = 20 * POWER_SCALING[tier] / 100;
        this.refreshModel();
        return false;
    },

    refreshModel: function () {
        let block = World.getBlock(this.x, this.y, this.z);
        let stored = this.liquidStorage.getLiquidStored();

        ModelHelper.mapMachine(this.x, this.y, this.z, block.id, block.data, this.data.tier,
            [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_crucible" + (stored ? "_" + stored : ""), 0], ["thermal_machine", 2], ["thermal_machine", 2]]);
    },

    getGuiScreen: function () {
        return crucibleUI;
    }
}));

Block.registerPlaceFunction(BlockID.thermalMachineCrucible, MachineRegistry.placeFunc(true));
Block.registerDropFunction(BlockID.thermalMachineCrucible, function () {
    return [];
});
Item.registerNameOverrideFunction(BlockID.thermalMachineCrucible, MachineRegistry.nameOverrideFunc);