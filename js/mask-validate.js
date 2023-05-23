  var tel = document.querySelector('input[type="tel"]');

  var telMask = new Inputmask('+7 (999) 999-99-99');
  telMask.mask(tel);

  const validator = new JustValidate('.contacts__form', {
    focusInvalidField: true,
    lockForm: true,
    errorFieldCssClass: 'is-invalid',
  });



  
  validator
    .addField('.contacts__form-name', [
      {
        rule: 'required',
        errorMessage: 'Пожалуйста, заполните это поле',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Имя должно состоять минимум из трёх букв',
      },
      {
        validator: (value) => {
          return !/[^A-Za-zА-Яа-я \s]/.test(value);
        },
        errorMessage: 'Недопустимый формат',
      }
      ])
    .addField('.contacts__form-tel', [
      {
        rule: 'required',
        errorMessage: 'Пожалуйста, заполните это поле',
      },
      {
        validator: () => {
          const phone = tel.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        },
        errorMessage: 'Недопустимый формат',
      },
    ]);

    let contactsInputs = this.querySelectorAll('.contacts__form-input');

    contactsInputs.forEach((input) => {
      input.addEventListener('input', function() {
        this.style.backgroundColor = 'white';
      });
      input.addEventListener('blur', function() {
        this.style.backgroundColor = '';
      });
    });
