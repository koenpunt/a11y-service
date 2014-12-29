/*! Copyright (c) 2014 Koen Punt <koen@koenpunt.nl> */
var form;

if(form = document.querySelector('.js-audit-form')){
  form.addEventListener('submit', function(event){
    event.preventDefault();
    window.location = '/report/' + this.domain.value;
  }, false);
}