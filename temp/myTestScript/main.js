/**
 * Created by User3D on 24.03.2016.
 */
window.onload = function()
{
    var mt = new Matrix('snake', 20, 20);
    mt.createNew();

    var snake = new Snake(mt.place);
    snake.startSnake();
    window.onkeydown = function()
    {
        snake.getKeyCode();
    }
}