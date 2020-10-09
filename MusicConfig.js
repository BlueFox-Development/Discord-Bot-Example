module.exports = {
    customFilters: {
        speedup: "atempo=1.3",
        jazz: [
            "equalizer=f=250:width_type=h:w=100:g=5,",
            "equalizer=f=500:width_type=h:w=100:g=-5,equalizer=f=1000:width_type=h:w=100:g=-2,",
            "equalizer=f=2000:width_type=h:w=100:g=2,equalizer=f=4000:width_type=h:w=100:g=-1,",
            "equalizer=f=8000:width_type=h:w=100:g=-1,equalizer=f=16000:width_type=h:w=100:g=-1"
        ].join(""),
        classical: [
            "equalizer=f=250:width_type=h:w=100:g=-6,",
            "equalizer=f=1000:width_type=h:w=100:g=1,",
            "equalizer=f=4000:width_type=h:w=100:g=6,",
            "equalizer=f=8000:width_type=h:w=100:g=6,",
            "equalizer=f=16000:width_type=h:w=100:g=6"
        ].join(""),
        rock: [
            "equalizer=f=250:width_type=h:w=100:g=3,",
            "equalizer=f=500:width_type=h:w=100:g=-9,equalizer=f=1000:width_type=h:w=100:g=-1,",
            "equalizer=f=2000:width_type=h:w=100:g=3,equalizer=f=4000:width_type=h:w=100:g=3,",
            "equalizer=f=8000:width_type=h:w=100:g=3,equalizer=f=16000:width_type=h:w=100:g=3"
        ].join("")
    }
};
