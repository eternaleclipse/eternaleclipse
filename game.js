
var Map = {
    width:    20, // tiles
    height:   20, // tiles
    tileSize: 32, // px
    drawTile: function(ctx, x, y, color) {
        ctx.fillStyle = Colors.black
        ctx.beginPath()
    
        // Draw Frame
        ctx.moveTo(x * Map.tileSize, y * Map.tileSize)
        ctx.lineTo((x + 1) * Map.tileSize, y * Map.tileSize)
        ctx.lineTo((x + 1) * Map.tileSize, (y + 1) * Map.tileSize)
        ctx.lineTo(x * Map.tileSize, (y + 1) * Map.tileSize)
        ctx.lineTo(x * Map.tileSize, y * Map.tileSize)
        
        // Draw colored background
        ctx.fillStyle = Colors.lightGreen
        ctx.fillRect(x * Map.tileSize, y * Map.tileSize, Map.tileSize, Map.tileSize);
        ctx.stroke()
    },
    draw: function(ctx) {
        for (var x = 0; x < Map.width; x++) {
            for (var y = 0; y < Map.height; y++) {
                Map.drawTile(ctx, x, y, Colors.green)
            }
        }
    }
}

var Colors = {
    black:      "#000000",
    red:        "#ff0000",
    green:      "#00ff00",
    blue:       "#0000ff",
    lightGreen: "#7fff7f"
}

var Keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
}

var g_objects = [{
    image: "#img_tree",
    x: 7,
    y: 9,
    onCollide: function() {
        console.log("ouch!")
    }
},
{
    image: "#img_tree",
    x: 12,
    y: 7,
    onCollide: function() {
        console.log("ouch!")
    }
},
{
    image: "#img_house",
    x: 12,
    y: 18
}]

var Player = {
    x: 10,
    y: 18,
    move: function(direction) {
        var destX = Player.x
        var destY = Player.y

        switch (direction) {
        case "up":
            destY = Math.max(0, Player.y - 1)
            break
    
        case "down":
            destY = Math.min(19, Player.y + 1)
            break
    
        case "left":
            destX = Math.max(0, Player.x - 1)
            break
    
        case "right":
            destX = Math.min(19, Player.x + 1)
            break
        }

        collidedObj = findObjectByPos(destX, destY)
        if (collidedObj) {
            if (collidedObj.onCollide) {
                collidedObj.onCollide()
            }
        }
        else {
            Player.x = destX
            Player.y = destY
        }
    },
    draw: function (ctx) {
        ctx.drawImage($("#img_player")[0], Player.x * Map.tileSize, Player.y * Map.tileSize)
    }
}

function drawObjects(ctx) {
    g_objects.forEach(function(obj) {
        ctx.drawImage($(obj.image)[0], obj.x * Map.tileSize, obj.y * Map.tileSize, Map.tileSize, Map.tileSize)
    })
}

function findObjectByPos(x, y) {
    var foundObj
    g_objects.forEach(function(obj) {
        if (obj.x == x && obj.y == y) {
            foundObj = obj
        }
    })
    return foundObj
}

function updateScreen() {
    var ctx = $("#gameCanvas")[0].getContext("2d")
    Map.draw(ctx)
    drawObjects(ctx)
    Player.draw(ctx)
}

function setupInputHandler() {
    $(document).keydown(function(e) {
        switch(e.which) {
        case Keys.up:
            Player.move("up")
            break
    
        case Keys.down:
            Player.move("down")
            break
    
        case Keys.left:
            Player.move("left")
            break
    
        case Keys.right:
            Player.move("right")
            break
    
        default:
            return
        }
        e.preventDefault()
        updateScreen()
    });
}

$(document).ready(function() {
    setupInputHandler()
    updateScreen()
})