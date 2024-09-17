const formValidations = () => {
	document.addEventListener('DOMContentLoaded', function () {
		const forms = document.querySelectorAll('form');

		forms.forEach((form) => {
			form.addEventListener('submit', function (event) {
				event.preventDefault();

				const inputs = form.querySelectorAll(
					'input[type="text"], input[type="password"]'
				);
				let isValid = true;

				inputs.forEach((input) => {
					const value = input.value.trim();
					const feedback = input.nextElementSibling;

					if (value === '') {
						feedback.textContent = 'El campo no puede estar vacío.';
						feedback.classList.remove('valid-feedback');
						feedback.classList.add('invalid-feedback');
						input.classList.add('is-invalid');
						isValid = false;
					} else if (input.type === 'text' && /\d/.test(value)) {
						feedback.textContent = 'El campo no puede contener números.';
						feedback.classList.remove('valid-feedback');
						feedback.classList.add('invalid-feedback');
						input.classList.add('is-invalid');
						isValid = false;
					} else {
						feedback.textContent = 'Válido.';
						feedback.classList.remove('invalid-feedback');
						feedback.classList.add('valid-feedback');
						input.classList.remove('is-invalid');
						input.classList.add('is-valid');
					}
				});

				if (isValid) {
					const successMessage = document.getElementById('success-message');

					successMessage.classList.remove('d-none');
					successMessage.innerHTML = 'Formulario enviado correctamente.';

					setTimeout(function () {
						successMessage.classList.add('d-none');
						successMessage.innerHTML = '';
					}, 2000);
				}
			});
		});
	});
};

formValidations();