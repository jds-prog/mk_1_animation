"use strict";

window.onload = function() {
    let can = document.getElementById("can");
    let paper = can.getContext("2d");

    function drawBackground() {
        paper.clearRect(0, 0, 800, 600);
        paper.fillStyle = "#0000FF";
        paper.fillRect(0, 0, 800, 600);
    }

    drawBackground();

    let bombsArray = [];

    function createBomb(posX, posY) {
        let bomb = {
            xx: posX,
            yy: posY,
        };
        bombsArray.push(bomb);
    }

    createBomb(100, 100);
    createBomb(100, 450);
    createBomb(400, 100);
    createBomb(400, 450);
    createBomb(550, 270);

    function drawBomb(posX, posY) {
        paper.fillStyle = "#CCCCCC";
        paper.fillRect(posX, posY, 80, 80);
    }

    function drawAllBombs() {
        for(let i = 0; i < bombsArray.length; i++) {
            let bomb = bombsArray[i];
            drawBomb(bomb.xx, bomb.yy);
        }
    }

    drawAllBombs();

    let shardsArray = [];

    function createShard(posX, posY, speedX, speedY) {
        let shard = {
            xx: posX,
            yy: posY,
            spX: speedX,
            spY: speedY,
        };
        shardsArray.push(shard);
    }

    function drawShard(posX, posY) {
        paper.fillStyle = "#FF0000";
        paper.fillRect(posX, posY, 40, 40);
    }

    function drawAllShards() {
        for(let i = 0; i < shardsArray.length; i++) {
            let shard = shardsArray[i];
            drawShard(shard.xx, shard.yy);
        }
    }

    function makeExplosion(bomb) {
        // save position of the bomb
        let xx = bomb.xx;
        let yy = bomb.yy;

        // remove the bomb from the screen
        bomb.xx = -10000;
        bomb.yy = -10000;

        // set speed of shards
        let speedModule = 4;

        // create four shards
        createShard(xx, yy, -speedModule, -speedModule);
        createShard(xx + 40, yy, speedModule, -speedModule);
        createShard(xx, yy + 40, -speedModule, speedModule);
        createShard(xx + 40, yy + 40, speedModule, speedModule);
    }

    function moveAllShards() {
        for(let i = 0; i < shardsArray.length; i++) {
            let shard = shardsArray[i];
            shard.xx += shard.spX;
            shard.yy += shard.spY;
        }
    }

    function hitShardWithBomb(bomb) {
        for(let i = 0; i < shardsArray.length; i++) {
            let shard = shardsArray[i];
            // middle position of shard
            let middleX = shard.xx + 20;
            let middleY = shard.yy + 20;
            if(bomb.xx <= middleX && middleX <= bomb.xx + 80) {
                if(bomb.yy <= middleY && middleY <= bomb.yy + 80) {
                    // remove shard
                    shard.xx = 10000;
                    shard.yy = 10000;
                    // make explosion of bomb
                    makeExplosion(bomb);
                }
            }
        }
    }

    function controlHitOfAllBombs() {
        for(let i = 0; i < bombsArray.length; i++) {
            let bomb = bombsArray[i];
            hitShardWithBomb(bomb);
        }
    }

    let btn = document.getElementById("btn");
    btn.onclick = function() {
        let indexOfLastBomb = bombsArray.length - 1;
        makeExplosion(bombsArray[indexOfLastBomb]);
        btn.hidden = true;
    }

    let interval = setInterval(function() {
        drawBackground();
        drawAllBombs();
        moveAllShards();
        drawAllShards();
        controlHitOfAllBombs();
    }, 50);
}

