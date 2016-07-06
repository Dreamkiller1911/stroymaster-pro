    /**
 * Created by User3D on 24.03.2016.
 */
function Snake(matrix)
{
    var _this = this;
    this.body;
    this.x;
    this.y;
    this.route;
    this.headCell;
    this.posFood;
    const red = 'rgb(255, 0, 0)';

    _this.startSnake = function(){
        _this.getStartPos();
        setInterval(_this.moveSnake, 200)
    };
    var getCoords = function(b){
        return (b.x * 20) + b.y;
    };

    _this.getKeyCode = function(){
        var e = event.which;
        if(e != 0){
            switch (e){
                case 38: _this.route = 'up'; break;
                case 40: _this.route = 'down'; break;
                case 39: _this.route = 'right'; break;
                case 37: _this.route = 'left'; break;
                case 32: _this.route = 'stop'; break;
            }
        }
};
    _this.moveSnake = function() {

        switch (_this.route) {
            case 'right':
                _this.y += 1;
                break;
            case 'left':
                _this.y -= 1;
                break;
            case 'up':
                _this.x -= 1;
                break;
            case  'down':
                _this.x += 1;
                break;
        }

        if ((_this.y < 0 || _this.y > 19) || (_this.x < 0 || _this.x > 19)) {
            $('.snakeBody').attr('class', 'deadSnake');
            alert('GameOver');
            $('.deadSnake').attr('class', 'cell');
            _this.getStartPos();
        }

        if(_this.posFood){
            if(getCoords(_this.posFood) == getCoords(_this.body[0])){
                _this.body.push(_this.posFood);
                matrix.find('*').eq(getCoords(_this.posFood)).attr('class', 'snakeBody');
                CreateFood();
            }
        }else {
            CreateFood();
        }

        _this.body.unshift({x:_this.x, y:_this.y});

        var c = _this.body.length;

        var lastCell = _this.body.pop();

        matrix.find('*').eq(getCoords(lastCell)).attr('class', 'cell');

        for (var i = 0; i < c-1; i++){
            if(i == 0){
                _this.headCell = matrix.find('*').eq(getCoords(_this.body[i]));
            }
            matrix.find('*').eq(getCoords(_this.body[i])).attr('class', 'snakeBody');

        }

    };


    _this.getStartPos = function(){
        _this.x = Math.floor(Math.random() * 20 );
        _this.y = Math.floor(Math.random() * 20 );
        if(_this.y <=9){
            _this.route = 'right';
        }else _this.route = 'left';
        _this.body = [{x:_this.x, y:_this.y}];
        _this.posFood = null;
        $('#snake div').attr('class', 'cell');

        _this.headCell = matrix.find('*').eq(getCoords(_this.body[0]));

        _this.headCell.attr('class', 'snakeBody');
    };
    function CreateFood(){
        var x, y;
        x = Math.floor(Math.random() * 20 );
        y = Math.floor(Math.random() * 20 );
        _this.posFood = {x:x, y:y};
        matrix.find('*').eq(getCoords(_this.posFood)).attr('class', 'foodCell')
    }


}