function setupInputHandler() {
    $(document).keydown(function(e) {
        if (Map.loading) {
            return
        }
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