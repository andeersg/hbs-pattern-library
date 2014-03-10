jQuery(document).ready(function($){
  'use strict';
  $('.pattern').each(function(i, e){
    $('#pattern-select')
      .append('<option value="' +
        $(this).attr('id') + '">' + $(this).attr('id') + '</option>');
  });
  $('#pattern-select').change(function(){
    $(window).scrollTop($('#' + this.value).offset().top);
    window.location.hash = this.value;
  });
});