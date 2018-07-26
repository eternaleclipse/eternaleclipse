function updateScreen() {
    if (Map.loading) {
        return
    }
    
    var ctx = $("#gameCanvas")[0].getContext("2d")
    Map.draw(ctx)
    Player.draw(ctx)
}