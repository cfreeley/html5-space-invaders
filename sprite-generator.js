var SpriteGenerator = function() {
    var spaceship = new psg.Mask([
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 1, 1,
                    0, 0, 0, 0, 1,-1,
                    0, 0, 0, 1, 1,-1,
                    0, 0, 0, 1, 1,-1,
                    0, 0, 1, 1, 1,-1,
                    0, 1, 1, 1, 2, 2,
                    0, 1, 1, 1, 2, 2,
                    0, 1, 1, 1, 2, 2,
                    0, 1, 1, 1, 1,-1,
                    0, 0, 0, 1, 1, 1,
                    0, 0, 0, 0, 0, 0
            ], 6, 12, true, false);

    var bullet = new psg.Mask([
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 1,-1,
                    0, 0, 0, 1,-1, 1,
                    0, 0, 1,-1, 1, 1,
                    0, 1,-1, 1, 1, 1,
                    0,-1, 1, 1, 1, 1
            ], 6, 6, true, true); 

    var alien = new psg.Mask([
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 1, 1,
                    0, 0, 1, 1, 1,-1,
                    0, 0, 1, 1, 1,-1,
                    0, 0, 1, 2, 2,-1,
                    0, 1,-1, 2, 2,-1,
                    0, 1,-1, 1, 1,-1,
                    0, 1,-1, 1, 2, 2,
                    0, 1,-1, 1, 2, 2,
                    0, 1, 1, 1, 1,-1,
                    0, 0, 1, 1, 1, 1,
                    0, 0, 0, 0, 0, 0
            ], 6, 12, true, false);

    var star = new psg.Mask([
                    2,-1,-1,
                    -1, 1, 1,
                    -1, 1, 1,
            ], 3, 3, true, true);

    this.generateSprite = function(mask) {
        return new psg.Sprite(mask, {
                    colored         : true
                });
    };

    this.generateShipScaled = function (scale) {
        var s = this.generateSprite(spaceship);
        s.resize(scale);
        return s.canvas;
    };

    this.generateAlienScaled = function (scale) {
        var s = this.generateSprite(alien);
        s.resize(scale);
        return s.canvas;
    };

    this.generateBulletScaled = function (scale) {
        var s = this.generateSprite(bullet);
        s.resize(scale);
        return s.canvas;
    };

    this.generateStar = function () {
        return new psg.Sprite(star, {
                    colored         : false
                }).canvas;
    }
};