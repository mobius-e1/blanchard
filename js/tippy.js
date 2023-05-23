  tippy(document.querySelectorAll('.projects-descr-tooltip'), {
    trigger: 'click',
    onTrigger(instance, event) {
      instance.reference.classList.add('projects-descr-tooltip--active');
    },
    onHide(instance) {
      instance.reference.classList.remove('projects-descr-tooltip--active');
    },
    content: (reference) => reference.getAttribute('data-tooltip-content'),
  })

  


 
  
  



