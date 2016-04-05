/**
 * Game Name Space
 */
var Game = function(canvas) {

    // Controls the game start
    var STARTED = false,

    // controls setInterval
    INTERVAL_ID = 0,

    /* Log div */
    logDiv,

    that = this;

    /*
     * Game initialization function. Construct all
     * game execution elements.
     */
    this.init = function () {
        // Start the game
        if (!STARTED){

            window.canvasCtx = canvas.ctx;

            logDiv = document.getElementById("log");

            canvas.setDimensions(500, 250);
            canvas.startObjectsOnCanvas();

            // Bind mousemove event to the onMouseMove function
            document.documentElement.onmousemove = canvas.onMouseMove;

            // Create the beforeDraw function interval call
            INTERVAL_ID = setInterval(beforeDraw, 100);
            STARTED = true;
            that.writeLog("Game started");

        } else throw new Error("Game already started!");
    },



    /*
     * Function that triggers messages to players and then redraw the canvas
     */
    beforeDraw = function() {

        if (connection.playerElm.id == 'p1'){
            connection.msg({p1: canvas.player1});
        } else {
            connection.msg({p2: canvas.player2});
        }

        canvas.draw();
    },


    /**
     * Writes log message on log div
     */
    this.writeLog = function (message) {

        var content = document.createTextNode(message);
        var lineBreak = document.createElement("br");

        logDiv.appendChild(content);
        logDiv.appendChild(lineBreak);
    }

    /*
     * Function to end the game
     */
    this.endGame = function() {

        if(STARTED) {
            STARTED = false;
            clearInterval(INTERVAL_ID);

            that.writeLog("End of the game");
            connection.socket.disconnect();
        }
    };


    /**
     * Creates a hash for a game identification. It gets a random number,
     * converts it to a 36 radix string and returns its last 7 characters as
     * this example: 2fz06wghkt9
     */
    createAGameHash = function () {

        return Math.random().toString(36).substring(7);
    };


    startButton = document.getElementById('start');
    startButton.addEventListener('click', function (event) {
        connection.msg('start');
        event.preventDefault();
        event.stopPropagation();
    });


    window.addEventListener('start', this.init, false);
}
