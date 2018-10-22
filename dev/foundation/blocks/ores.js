IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
    {name: "Copper Ore", texture: [["ore_copper", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone", 1);
Block.setDestroyTime(BlockID.oreCopper, 3);
Block.setDestroyLevel("oreCopper", 1);

IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin", [
    {name: "Tin Ore", texture: [["ore_tin", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone", 1);
Block.setDestroyTime(BlockID.oreTin, 3);
Block.setDestroyLevel("oreTin", 1);

IDRegistry.genBlockID("oreSilver");
Block.createBlock("oreSilver", [
    {name: "Silver Ore", texture: [["ore_silver", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreSilver, "stone", 2);
Block.setDestroyTime(BlockID.oreSilver, 3);
Block.setDestroyLevel("oreSilver", 2);

IDRegistry.genBlockID("oreLead");
Block.createBlock("oreLead", [
    {name: "Lead Ore", texture: [["ore_lead", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreLead, "stone", 2);
Block.setDestroyTime(BlockID.oreLead, 3);
Block.setDestroyLevel("oreLead", 2);

IDRegistry.genBlockID("oreAluminum");
Block.createBlock("oreAluminum", [
    {name: "Aluminum Ore", texture: [["ore_aluminum", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreAluminum, "stone", 1);
Block.setDestroyTime(BlockID.oreAluminum, 3);
Block.setDestroyLevel("oreAluminum", 1);

IDRegistry.genBlockID("oreNickel");
Block.createBlock("oreNickel", [
    {name: "Nickel Ore", texture: [["ore_nickel", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreNickel, "stone", 2);
Block.setDestroyTime(BlockID.oreNickel, 3);
Block.setDestroyLevel("oreNickel", 2);

IDRegistry.genBlockID("orePlatinum");
Block.createBlock("orePlatinum", [
    {name: "Platinum Ore", texture: [["ore_platinum", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.orePlatinum, "stone", 3);
Block.setDestroyTime(BlockID.orePlatinum, 3);
Block.setDestroyLevel("orePlatinum", 3);

IDRegistry.genBlockID("oreIridium");
Block.createBlock("oreIridium", [
    {name: "Iridium Ore", texture: [["ore_iridium", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreIridium, "stone", 3);
Block.setDestroyTime(BlockID.oreIridium, 3);
Block.setDestroyLevel("oreIridium", 3);

IDRegistry.genBlockID("oreMithril");
Block.createBlock("oreMithril", [
    {name: "Mithril Ore", texture: [["ore_mithril", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreMithril, "stone", 3);
Block.setDestroyTime(BlockID.oreMithril, 3);
Block.setDestroyLevel("oreMithril", 3);

Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
    //Mithril и Iridium не генерируются в мире
    let ores = ["copper", "tin", "silver", "lead", "aluminum", "nickel", "platinum"];

    for (let i in ores) {
        let ore = ores[i];

        if (ThermalConfig[ore]) {
            generateOre(BlockID["ore" + ore.charAt(0).toUpperCase() + ore.substr(1)], chunkX, chunkZ, ThermalConfig[ore + "Veins"],
                ThermalConfig[ore + "VeinSize"], ThermalConfig[ore + "MinY"], ThermalConfig[ore + "MaxY"]);
        }
    }
});

