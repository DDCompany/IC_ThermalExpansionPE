IDRegistry.genBlockID("sandOil");
Block.createBlock("sandOil", [
    {name: "Oil Sand", texture: [["ore_oil_sand", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.sandOil, "dirt", 0);
Block.setDestroyTime(BlockID.sandOil, 0.5);
Block.setDestroyLevel("sandOil", 0);

IDRegistry.genBlockID("oreDestabilizedRedstone");
Block.createBlock("oreDestabilizedRedstone", [
    {name: "Destabilized Redstone Ore", texture: [["ore_fluid_redstone", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreDestabilizedRedstone, "stone", 1);
Block.setDestroyTime(BlockID.oreDestabilizedRedstone, 5);
Block.setDestroyLevel("oreDestabilizedRedstone", 1);

IDRegistry.genBlockID("oreNetherrackEnergized");
Block.createBlock("oreNetherrackEnergized", [
    {name: "Energized Netherrack", texture: [["ore_fluid_glowstone", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreNetherrackEnergized, "stone", 1);
Block.setDestroyTime(BlockID.oreNetherrackEnergized, 5);
Block.setDestroyLevel("oreNetherrackEnergized", 1);

IDRegistry.genBlockID("oreEndStoneResonant");
Block.createBlock("oreEndStoneResonant", [
    {name: "Resonant End Stone", texture: [["ore_fluid_ender", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreEndStoneResonant, "stone", 1);
Block.setDestroyTime(BlockID.oreEndStoneResonant, 5);
Block.setDestroyLevel("oreEndStoneResonant", 1);

Block.registerDropFunction("sandOil", function () {
    let extra = Player.getCarriedItem().extra;
    return [[ItemID.crystalCrudeOil, 1 + randomInt(0, (extra ? extra.getEnchantLevel(18) : 0) + 1), 0]];
});

Block.registerDropFunction("oreDestabilizedRedstone", function (coords, id, data, level) {
    if (level > 0) {
        let extra = Player.getCarriedItem().extra;
        return [[ItemID.crystalRedstone, 1 + randomInt(0, (extra ? extra.getEnchantLevel(18) : 0) + 1), 0]];
    }

    return [];
});

Block.registerDropFunction("oreNetherrackEnergized", function (coords, id, data, level) {
    if (level > 0) {
        let extra = Player.getCarriedItem().extra;
        return [[ItemID.crystalGlowstone, 1 + randomInt(0, (extra ? extra.getEnchantLevel(18) : 0) + 1), 0]];
    }

    return [];
});

Block.registerDropFunction("oreEndStoneResonant", function (coords, id, data, level) {
    if (level > 0) {
        let extra = Player.getCarriedItem().extra;
        return [[ItemID.crystalEnder, 1 + randomInt(0, (extra ? extra.getEnchantLevel(18) : 0) + 1), 0]];
    }

    return [];
});

Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
    if (ThermalConfig.oilSand && Math.random() <= ThermalConfig.oilSandChance) {
        generateSandOre(BlockID.sandOil, chunkX, chunkZ, ThermalConfig.oilSandVeinSize);
    }

    if (ThermalConfig.oreDestabilizedRedstone && Math.random() <= ThermalConfig.redstoneChance) {
        generateOre(BlockID.sandOil, chunkX, chunkZ, ThermalConfig.redstoneVeins, ThermalConfig.redstoneVeinSize,
            ThermalConfig.redstoneMinY, ThermalConfig.redstoneMaxY);
    }
});

if (ThermalConfig.ender) {
    Callback.addCallback("GenerateEndChunk", function (chunkX, chunkZ) {
        if (Math.random() <= ThermalConfig.enderChance) {
            generateOre(BlockID.oreEndStoneResonant, chunkX, chunkZ, ThermalConfig.enderVeins, ThermalConfig.enderVeinSize,
                ThermalConfig.enderMinY, ThermalConfig.enderMaxY);
        }
    });
}