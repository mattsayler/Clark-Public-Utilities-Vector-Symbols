function Main(){

  ////browser-dependent css////
  /*$('div.content').css( {
    'columns': '290px 5'
  });*/
  
  
  //set img dimension defaults
  $("img.CPUSymbol").each(function(index, elem){
    $(elem).data("dimensions", {"defaultWidth": $(elem).width(), "defaultHeight": $(elem).height()});
    //console.log($(elem).attr("title"));
    //console.log("defaultWidth: " + $(elem).data('dimensions').defaultWidth);
    //console.log("defaultHeight: " + $(elem).data('dimensions').defaultHeight);
  });
  
  //set startAngle
  $.startDegree = new Object(0);
  $.startDegree.globalVar = 0;
  
  //function for animating rotation
  $.fn.animateRotate = function(startAngle, endAngle, duration, easing, complete){
    return this.each(function(){
      var elem = $(this);

      $({deg: startAngle}).animate({deg: endAngle}, {
        duration: duration,
        easing: easing,
        step: function(now){
          elem.css({
            'transform' : 'rotate('+now+'deg)'
          });
        },
        complete: complete || $.noop
      });
    });
  };
  
  //add label based off img title
  $("img.CPUSymbol").each(function(index, elem){
    $(elem).wrap("<div class='imgDiv'></div>")
  });
  
  $("img.CPUSymbol").each(function(index, elem){
    $(elem).after("<span class='descSpan'>" + $(elem).attr('title') + "</span>");
  });

  ////rotation////
  $("input.RotateButton").click(function(){
    degree = $("input.RotateField").val();
    $("img.r").animateRotate($.startDegree, degree);
    $.startDegree = degree;
  });
  
  $("input.RotateField").keyup(function(event){
    if(event.which == 13){
      $("input.RotateButton").click();
    }
  });
  
  $("input.ResetRotateButton").click(function(){
    $("img.r").animateRotate($.startDegree,0);
    $("input.RotateField").val("0");
    $.startDegree = 0;
  });
  
  ////scaling////
  $("input.ScaleButton").click(function(){
    scale = $("input.ScaleField").val() / 100
    $("img.CPUSymbol").each(function(index){
      scaledWidth = $(this).width() * scale;
      scaledHeight = $(this).height() * scale;
      $(this).animate({
          'width' : scaledWidth,
          'height' : scaledHeight
      }, 400);
    });
  });
  
  $("input.ScaleField").keyup(function(event){
    if(event.which == 13){
      $("input.ScaleButton").click();
    }
  });
  
  $("input.ResetScaleButton").click(function(){
    $("img.CPUSymbol").each(function(index, elem){
      $(elem).animate({
        'width' : $(elem).data('dimensions').defaultWidth,
        'height' : $(elem).data('dimensions').defaultHeight
      }, 400);
    });
    $("input.ScaleField").val("100");
  });
};