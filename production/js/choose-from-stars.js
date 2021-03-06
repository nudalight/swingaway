function Stars(node){
    var that = this;
    this.root = node;
    this.els = $(this.root).find('.stars__star');

    var starred = '.stars__star--red';

    this.colorTo = function(n){
        $(this.els).each(function(i, v, list){
            if (i <= n) {
                $(v).addClass('stars__star--red');
            } else {
                $(v).removeClass('stars__star--red');
            }
        });
    };

    $(this.root).on('mouseover', '.stars__star', function(e){

        var pos = that.getPos(e.target);

        that.colorTo(pos);
    });

    $(this.root).on('mouseout', '.stars__star', function(e){

        var pos = +$(that.root).find('.stars__starred').val();

        that.colorTo(pos);
    });

    $(this.root).on('click', '.stars__star', function(e){

        var pos = that.getPos(e.target);

        $(that.root).find('.stars__starred').val(pos);
        that.colorTo(pos);
    });

    this.getPos = function(tg){
        var pos = 0;
        $(that.els).each(function(i, v, list){
            console.log(i, v);
            if (v == tg) {
                pos = i;
            }
        });
        return pos;
    };

    this.uncolorAll = function(){
        $(this.els).each(function(i, v, list){
            $(v).removeClass('stars__star--red');
       });
    };

    function init(){
        that.uncolorAll();
    }

    init();

}

$('.choose-from-stars').each(function(i, v, list){
    new Stars( $(v).find('.stars') );
});
