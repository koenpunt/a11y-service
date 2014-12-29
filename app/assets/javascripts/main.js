var form;

if(form = document.querySelector('.js-audit-form')){
  form.addEventListener('submit', function(event){
    event.preventDefault();
    window.location = '/report/' + this.url.value;
  }, false);
}