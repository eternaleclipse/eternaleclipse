var Map = {
    width:    20, // tiles
    height:   20, // tiles
    tileSize: 32, // px
    inputEnabled: false,
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
        // Draw tiles
        for (var x = 0; x < Map.width; x++) {
            for (var y = 0; y < Map.height; y++) {
                Map.drawTile(ctx, x, y, Colors.green)
            }
        }

        // Draw objects
        Map.objects.forEach(function(obj) {
            ctx.drawImage($(obj.image)[0], obj.x * Map.tileSize, obj.y * Map.tileSize, Map.tileSize, Map.tileSize)
        })
    },
    load: function(mapUrl) {
        $.getJSON(mapUrl, function(mapData) {
            Map.objects = mapData
            Map.objects.forEach(function(obj) {
                if (setupObjects[obj.type]) {
                    setupObjects[obj.type](obj)
                }
            })

            Map.loading = false
            updateScreen()
        })
    },
    objects: [],
    findObjectByPos: function(x, y) {
        var foundObj
        Map.objects.forEach(function(obj) {
            if (obj.x == x && obj.y == y) {
                foundObj = obj
            }
        })
        return foundObj
    }
}