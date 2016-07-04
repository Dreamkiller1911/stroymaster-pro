$(document).ready(function(){
    var example = document.getElementById("example");
    var ctx = example.getContext('2d');
    var btnAT = $('#add_text');
    var text = $('input[name="text"]');


    btnAT.click(function(){
       var val = $.trim(text.val());
        if(val === '' || val === undefined){
            console.log('Ощиюка');
            return false;
        }
        addText(val);
        return true;
    });

    var addText = function(text){
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.fillText(text, 200/2, 180/2);
    };

    example.onclick = function(e){
        console.log(e);
    };
    example.width = 200;
    example.height = 180;
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0 , 200, 180);

   /* cellSize = 32;
    // Массив карты поля боя
    var map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
        [2, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    example.width = 16*cellSize;
    example.height = 15*cellSize;
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, example.width, example.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(cellSize, cellSize, 13*cellSize, 13*cellSize)
    // Цикл обрабатывающий массив в котором содержатся значения элементов карты
    // если попадается 1 то рисуется кирпичный блок
    // если 2, то бетонная стена
    for (var j=0; j<26; j++)
        for (var i=0; i<26; i++) {
            switch (map[j][i]) {
                case 1:
                    DrawBrick(i*cellSize/2 + cellSize, j*cellSize/2 + cellSize);
                    break;
                case 2:
                    DrawHardBrick(i*cellSize/2 + cellSize, j*cellSize/2 + cellSize);
                    break;
            }
        }
    // Рисуем часть кирпичной стены
    function DrawBrick(x, y) {
        // Отрисовка основного цвета кирпича
        ctx.fillStyle = '#FFA500';
        ctx.fillRect(x, y, cellSize/2, cellSize/2);
        // Отрисовка теней
        ctx.fillStyle = '#CD8500';
        ctx.fillRect(x, y, cellSize/2, cellSize/16);
        ctx.fillRect(x, y+cellSize/4, cellSize/2, cellSize/16);
        ctx.fillRect(x+cellSize/4, y, cellSize/16, cellSize/4);
        ctx.fillRect(x+cellSize/16, y+cellSize/4, cellSize/16, cellSize/4);
        // Отрисовка раствора между кирпичами
        ctx.fillStyle = '#D3D3D3';
        ctx.fillRect(x, y+cellSize/4-cellSize/16, cellSize/2, cellSize/16);
        ctx.fillRect(x, y+cellSize/2-cellSize/16, cellSize/2, cellSize/16);
        ctx.fillRect(x+cellSize/4-cellSize/16, y, cellSize/16, cellSize/4);
        ctx.fillRect(x, y+cellSize/4-cellSize/16, cellSize/16, cellSize/4);
    }
    // Рисуем часть бутонного блока
    function DrawHardBrick(x, y) {
        // Отрисовка основного фона
        ctx.fillStyle = '#cccccc';
        ctx.fillRect(x, y, cellSize/2, cellSize/2);
        // Отрисовка Тени
        ctx.fillStyle = '#909090';
        ctx.beginPath();
        ctx.moveTo(x,y+cellSize/2);
        ctx.lineTo(x+cellSize/2,y+cellSize/2);
        ctx.lineTo(x+cellSize/2,y);
        ctx.fill();
        // Отрисовка белого прямоугольника сверху
        ctx.fillStyle = '#eeeeee';
        ctx.fillRect(x+cellSize/8, y+cellSize/8, cellSize/4, cellSize/4);
    }*/
});

