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

        collidedObj = Map.findObjectByPos(destX, destY)
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