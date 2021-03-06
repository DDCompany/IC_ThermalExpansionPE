const pulverizerUI = MachineUI({
    tabIcon: "icons.machines.pulverizer",

    drawing: [
        {type: "text", text: "Pulverizer", x: 370, y: 70, font: FONT_GREY},
        {type: "bitmap", x: 550, y: 172, bitmap: "bars.machine.def_empty", scale: 4},
        {type: "bitmap", x: 466, y: 205, bitmap: "bars.machine.pulverizer.speed_empty", scale: 4.5},
        {type: "bitmap", x: 370, y: 100, bitmap: "bars.rf_empty", scale: 5}
    ],

    elements: {
        //@formatter:off
        "progressScale": {type: "scale", x: 550, y: 172, direction: 0, bitmap: "bars.machine.def_full", scale: 4},
        "energyScale": {type: "scale", x: 370, y: 100, direction: 1, bitmap: "bars.rf_full", scale: 5},
        "speedScale": {
            type: "scale",
            x: 466,
            y: 205,
            direction: 1,
            bitmap: "bars.machine.pulverizer.speed_full",
            scale: 4.5
        },

        "slotSource": {type: "slot", x: 461, y: 122, size: 70},
        "slotResult": {type: "slot", x: 657, y: 168, size: 70, isValid: FALSE_PREDICATE},
        "slotSecond": {type: "slot", x: 737, y: 168, size: 70, isValid: FALSE_PREDICATE}
        //@formatter:on
    }
});