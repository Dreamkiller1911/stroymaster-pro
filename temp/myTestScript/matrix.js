/**
 * Created by User3D on 24.03.2016.
 */
function Matrix(divId, rows, cols)
{
    this.numRows = rows;
    this.numCols = cols;
    this.place = $('#' + divId);


    var _this = this;

    _this.createNew = function(){

        var n = _this.numCols * _this.numRows;
        _this.place.css('width', n + 'px').css('height', n + 'px');

        for (var i = 0; i <  n; i++ ){
            _this.place.append('<div class="cell"/>');
        }

    }
}