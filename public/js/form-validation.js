const getUserId = () => {
	fetch(`/api/user/current`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			response.json();
		})
		.then((data) => {
			const userId = data.user_id;
			return userId;
		})
		.catch(() => {
			console.error({
				status: 'error',
				message: "It is not possible obtain the user id (client's error)",
			});
		});
};
const userId = getUserId();

const deleteTask = (id) => {
	fetch(`/api/task/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(() => {
			console.log('DELETE TASK');
			const deletedTaskTitle = document.getElementById('deletedTaskTitle');
			const deletedTaskBody = document.getElementById('deletedTaskBody');

			if (deletedTaskTitle && deletedTaskBody) {
				deletedTaskTitle.textContent = 'Tarea eliminada';
				deletedTaskBody.textContent = `La tarea ha sido eliminada correctamente.`;
			}
		})
		.catch(() => {
			console.error({
				status: 'error',
				message: "It is not possible delete the task (client's error)",
			});
		});
};

const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

if (confirmDeleteBtn) {
	confirmDeleteBtn.addEventListener('click', () => {
		// deleteTask()
	});
}

const sendForm = (formAction) => {
	switch (formAction) {
		case '/api/user/login':
			console.log('LOGIN');

			break;

		case '/api/user':
			console.log('REGISTER');

			break;

		case '/api/user/:uid':
			console.log('EDITAR PERFIL');

			break;

		case '/api/task':
			console.log('AGREGAR TAREA');
			break;

		case '/api/task/:id':
			console.log('EDITAR TAREA');

			break;

		default:
			console.error({
				status: 'error',
				message:
					"It is not possible send the form, form's action not valid (client's error)",
			});
			break;
	}
};

const sendMessage = () => {
	const successMessage = document.getElementById('success-message');
	const successMessageUpdateTask = document.getElementById(
		'success-message-update-task'
	);

	if (successMessage) {
		successMessage.classList.remove('d-none');
		successMessage.innerHTML = 'Operación Completada Satisfactoriamente';
		setTimeout(function () {
			successMessage.classList.add('d-none');
			successMessage.innerHTML = '';
		}, 2000);
	}

	if (successMessageUpdateTask) {
		successMessageUpdateTask.classList.remove('d-none');
		successMessageUpdateTask.innerHTML =
			'Operación Completada Satisfactoriamente';
		setTimeout(function () {
			successMessageUpdateTask.classList.add('d-none');
			successMessageUpdateTask.innerHTML = '';
			form.reset();
		}, 2000);
	}
};

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
				let formAction = form.getAttribute('action');

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
					sendForm(formAction);
					sendMessage();
					form.reset();
				}
			});
		});
	});
};

formValidations();
