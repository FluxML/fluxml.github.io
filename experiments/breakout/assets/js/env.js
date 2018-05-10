(function(){

  Object.assign(window, {Breakout});

  function Breakout({
    no_of_bricks=10
  }={}){
    // position of ball and speed, position of paddle, position and status of bricks
    

    function state0(){
      return {
        ball: {
          r: new Vec(0, 0),
          v: new Vec(0, 0)
        },
        paddle: {
          r: new Vec(0, 0)
        },
        bricks: (new Array(no_of_bricks)).fill(0).map((_, i) => getBrick(i));
      }
    }

    function getBrick(i){

    }

    this.reset
    this.step
    this.done
    this.config
    this.state
  }

  function Vec(x, y){
    this.x = x;
    this.y = y;

    this.add = function(other){
      this.x += other.x;
      this.y += other.y;
    }

  }



})(window)