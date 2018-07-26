var g_tilesX = 20
var g_tilesY = 20
var g_tileSize = 32 // px

var g_color_black = "#000000"
var g_color_red = "#ff0000"
var g_color_green = "#00ff00"
var g_color_blue = "#0000ff"
var g_color_lightgreen = "#7fff7f"

var g_key_left = 37
var g_key_up = 38
var g_key_right = 39
var g_key_down = 40

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
        ctx.drawImage($("#img_player")[0], Player.x * g_tileSize, Player.y * g_tileSize)
    }
}

function drawTile(ctx, x, y, color) {
    ctx.fillStyle = g_color_black
    ctx.beginPath()

    // Draw Frame
    ctx.moveTo(x * g_tileSize, y * g_tileSize)
    ctx.lineTo((x + 1) * g_tileSize, y * g_tileSize)
    ctx.lineTo((x + 1) * g_tileSize, (y + 1) * g_tileSize)
    ctx.lineTo(x * g_tileSize, (y + 1) * g_tileSize)
    ctx.lineTo(x * g_tileSize, y * g_tileSize)
    
    // Draw colored background
    ctx.fillStyle = g_color_lightgreen
    ctx.fillRect(x * g_tileSize, y * g_tileSize, g_tileSize, g_tileSize);
    ctx.stroke()
}

function drawMap(ctx) {
    for (var x = 0; x < g_tilesX; x++) {
        for (var y = 0; y < g_tilesY; y++) {
            drawTile(ctx, x, y, g_color_green)
        }
    }
}

function drawObjects(ctx) {
    g_objects.forEach(function(obj) {
        ctx.drawImage($(obj.image)[0], obj.x * g_tileSize, obj.y * g_tileSize, g_tileSize, g_tileSize)
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
    drawMap(ctx)
    drawObjects(ctx)
    Player.draw(ctx)
}

function setupInputHandler() {
    $(document).keydown(function(e) {
        switch(e.which) {
        case g_key_up:
            Player.move("up")
            break
    
        case g_key_down:
            Player.move("down")
            break
    
        case g_key_left:
            Player.move("left")
            break
    
        case g_key_right:
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