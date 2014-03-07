'use strict';

jQuery(document).ready(function($){
  $('.pattern').each(function(i, e){
    $('#pattern-select')
      .append('<option value="' +
        $(this).attr('id') + '">' + $(this).attr('id') + '</option>');
  });
  $('#pattern-select').change(function(){
    $('body').scrollTop($('#' + this.value).offsetTop);
  });
});