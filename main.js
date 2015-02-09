enchant();

// Global Vars
var canvasWidth = 560;
var canvasHeight = 400;
var pixelGenerator = new SpriteGenerator();
var score = 0;
var showStars = false; // Makes things laggy
var hero;
var aliens = [];  
var alienDelay = 10;
var alienTimer = 0;  

var Player = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this,48,48);
        var surface = new Surface(48,48);
        var sprite = pixelGenerator.generateShipScaled(4);
        surface.context.drawImage(sprite,0,0);
        this.image = surface; //game.assets['images/yeoman.png'];
        this.x = (canvasWidth - 48) / 2;
        this.y = canvasHeight - 48 - 10;
        this.reload = 0;
        this.reloadDelay = 5;
        this.moveSpeed = 15;
    },

    onenterframe: function() {    
        if(game.input.left && !game.input.right && this.x > 10){
            this.x -= this.moveSpeed;
        }
        else if(game.input.right && !game.input.left && this.x < canvasWidth - 58){
            this.x += this.moveSpeed;
        }

        if (game.input.a && this.reload == 0) {
            var b = new Bullet();
            game.rootScene.addChild(b);
            b.x = this.x + 24 - 12;
            b.y = this.y;
            this.reload = this.reloadDelay;
        }
        else if (this.reload > 0) this.reload--;

    }
});

var Alien = Class.create(Sprite, {
    //this.speed = 5;
    initialize: function() {
        Sprite.call(this,48,48);
        this.rotate(180);
        var surface = new Surface(48,48);
        var sprite = pixelGenerator.generateAlienScaled(4);
        surface.context.drawImage(sprite,0,0);
        this.image = surface;
    },

    onenterframe: function() {    
        this.y += 6;
        if (this.y >= canvasHeight - 48) {
            var gameOver = new Label("Game Over");
            gameOver.font = "32px cursive";
            gameOver.color = "white";
            gameOver.x = canvasWidth / 2 - 80;
            gameOver.y = canvasHeight / 2 - 80;
            game.rootScene.addChild(gameOver);
            game.stop();
        }
    }
});

var Bullet = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this,24,24);
        var surface = new Surface(24,24);
        var sprite = pixelGenerator.generateBulletScaled(2);
        surface.context.drawImage(sprite,0,0);
        this.image = surface;
        // this.image.width = 26; this.image.height = 22;
        // this.scale(1.25, 1.25);
    },
    onenterframe: function() {
        this.y -= 15;
        if (this.y <= -89)
            game.rootScene.removeChild(this);
        var self = this; // inside the foreach, 'this' becomes undefined. Anyone know why?
        aliens.forEach(function(alien){ 
            if (self.intersect(alien)) {
                game.rootScene.removeChild(alien);
                aliens.splice(aliens.indexOf(alien), 1); // Removes alien from array
                game.rootScene.removeChild(self);
                score++;
            }
        });
    }
});

var Star = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 6, 6);
        var surface = new Surface(6, 6);
        var sprite = pixelGenerator.generateStar();
        surface.context.drawImage(sprite,0,0);
        this.image = surface;
    },
    onenterframe: function() {
        this.y += 2;
        if (this.y > canvasHeight)
            game.rootScene.removeChild(this);
        var self = this; // inside the foreach, 'this' becomes undefined. Anyone know why?
    }
});

var PauseButton = Class.create(Label, {
    initialize: function() {
        Label.call(this, "Pause");
        this.font = "18px cursive";
        this.color = "white";
        this.paused = false;
        this.x = canvasWidth - 70;
        this.y = 15;
    },
    onclick: function() {
        if (this.paused) {
            game.resume();
            this.text = "Pause";
        }
        else {
            game.pause();
            this.text = "Play";
        }
        this.paused = !this.paused;
    }
});

window.onload = function() {
    console.log("test");
    game = new Core(canvasWidth, canvasHeight);
    game.keybind(32, 'a'); // Making 'a' be space

    var scoreLabel = new Label("Score: 0");
    scoreLabel.font = "32px cursive";
    scoreLabel.color = "white";
    scoreLabel.x = 10;
    scoreLabel.y = 5;
    var pause = new PauseButton();
    game.rootScene.addChild(pause);
    pause.addEventListener('touchend', pause.onclick);

    // var bullets = [];
    game.onload = function () {
        hero = new Player();
        game.rootScene.addChild(hero);
        game.rootScene.addChild(scoreLabel);
        //addAliens();
        game.rootScene.backgroundColor = 'rgb(20, 20, 50)';
        //sprite.draw(game.assets['images/yeoman.png']);
    };
    game.onenterframe = function () {
        if (showStars && Math.random() > .9) {
            var star = new Star();
            game.rootScene.addChild(star);
            star.x = Math.random() * (canvasWidth -6);
            star.y = -12;
        }
        if (Math.random() > .95 && alienTimer <= 0) {
            var alien = new Alien();
            aliens.push(alien);
            game.rootScene.addChild(alien);
            alien.x = Math.random() * (canvasWidth - 48);
            alienTimer = alienDelay;
        } 
        else if (alienTimer > 0)
            alienTimer--;
        scoreLabel.text = "Score: " + score;
    };
    game.start();
};
