"use strict";

var Splat = require("splatjs");
var canvas = document.getElementById("canvas");

var manifest = {
	"images": {
	},
	"sounds": {
	},
	"fonts": {
	},
	"animations": {
		"background": {
            "strip": "animations/board.png",
            "frames": 1,
            "msPerFrame": 100
        }
	}
};

var game = new Splat.Game(canvas, manifest);

function centerText(context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var x = offsetX + (canvas.width / 2) - (w / 2) | 0;
	var y = offsetY | 0;
	context.fillText(text, x, y);
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
	// initialization

}, function() {
	// simulation
	if(game.mouse.consumePressed(0)){
		game.scenes.switchTo("main");
	}
	// this.buttons.push( new Splat.Button(game.mouse,canvas.width/2 - playBtnImage.width/2,220 + canvas.height/2 - playBtnImage.height/2, { normal: playBtnImage, pressed: playBtnImage }, function(state) {
	// 	if (state === "pressed"){
	// 	}
	// }));
}, function(context) {
	// draw
	context.fillStyle = "#092227";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#fff";
	context.font = "25px helvetica";
	centerText(context, "Hello Splat", 0, canvas.height / 2 - 13);
}));

game.scenes.add("main", new Splat.Scene(canvas, function() {
	// initialization
	var bgImage = game.animations.get("background");
	this.bg = new Splat.AnimatedEntity(0,0,canvas.width,canvas.height,bgImage,0,0);
	this.upperbound = 100;
	this.lowerbound = canvas.height - 100;
	this.player1 = {
		x:100,
		y:this.canvas.height/2 -10,
		width:20,
		height:20,
		arsenal:[{
			weapon:"weapon1"
		},
		{
			weapon:"weapon2"
		},
		{
			weapon:"weapon3"
		}],
		selectedWeapon:0
	};
	this.player2 = {
		x:canvas.width - 120,
		y:this.canvas.height/2 -10,
		width:20,
		height:20,
		arsenal:[{
			weapon:"weapon1"
		},
		{
			weapon:"weapon2"
		},
		{
			weapon:"weapon3"
		}],
		selectedWeapon:0
	};
	this.playerSpeed = 2;
}, function() {
	// simulation

	///////player 1 controls
	if (game.keyboard.isPressed("w")  && this.player1.y > this.upperbound){
		this.player1.y -= this.playerSpeed;
	}
	if (game.keyboard.isPressed("s") && this.player1.y+this.player1.height < this.lowerbound){
		this.player1.y += this.playerSpeed;
	}
	if (game.keyboard.consumePressed("d")){
		console.log("fire1");
		//TODO:fire projectile
	}
	if (game.keyboard.consumePressed("a")){
		console.log("switch");
		this.player1.selectedWeapon +=1;
		if(this.player1.selectedWeapon > 2){
			this.player1.selectedWeapon = 0;
		}
		console.log(this.player1.arsenal[this.player1.selectedWeapon].weapon);
	}
	//////player 2 controls
	if (game.keyboard.isPressed("up")  && this.player2.y > this.upperbound){
		this.player2.y -= this.playerSpeed;
	}
	if (game.keyboard.isPressed("down") && this.player2.y + this.player2.height < this.lowerbound){
		this.player2.y += this.playerSpeed;
	}
	if (game.keyboard.consumePressed("left")){
		console.log("fire2");
		//TODO:fire projectile
	}
	if (game.keyboard.consumePressed("right")){
		console.log("switch");
		this.player2.selectedWeapon +=1;
		if(this.player2.selectedWeapon > 2){
			this.player2.selectedWeapon = 0;
		}
		console.log(this.player2.arsenal[this.player2.selectedWeapon].weapon);
	}
}, function(context) {
	// draw
	context.fillStyle = "#092fff";
	this.bg.draw(context);

	context.fillStyle = "#ff0000";
	context.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height);
	context.fillRect(this.player2.x, this.player2.y, this.player2.width, this.player2.height);
	//context.font = "25px helvetica";
	//centerText(context, "Blank SplatJS Project", 0, canvas.height / 2 - 13);
}));


game.scenes.switchTo("loading");