document.addEventListener('DOMContentLoaded', () => {
	let userId;
	let taskId;

	// función para saludar al usuario logueado
	const greetingToUser = document.getElementById('greetingToUser');
	const greeting = async () => {
		try {
			const response = await fetch('/api/user/current', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			const loggedUser = data.firstname;

			greetingToUser.innerHTML = '';
			const messageToUser = document.createElement('h1');
			messageToUser.innerHTML = `
		Hola ${loggedUser}!
		`;
			greetingToUser.appendChild(messageToUser);
			greetingToUser.classList.add('mb-5');
			greetingToUser.classList.add('text-center');
		} catch (error) {
			console.error({
				status: 'error',
				message: "It is not possible to get user's firstname  (client's error)",
				error,
			});
		}
	};
	if (greetingToUser) {
		greeting();
	}

	// Muestra el listado de tareas del usuario
	const DisplayTasks = (userId) => {
		fetch(`/api/task/by/${userId}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.length === 0) {
					console.error({
						status: 'error',
						message: "No tasks found (client's error)",
					});
					return null;
				}

				const tasksTableBody = document.querySelector('#taskTable');
				tasksTableBody.innerHTML = '';

				data.forEach((task) => {
					switch (task.task_status) {
						case 'pending':
							task.task_status = 'Pendiente';
							break;
						case 'in progress':
							task.task_status = 'En curso';
							break;
						case 'blocked':
							task.task_status = 'Bloqueada';
							break;
						case 'finished':
							task.task_status = 'Finalizada';
							break;
						default:
							console.error({
								status: 'error',
								message: "Non-existent status (client's error)",
								error,
							});
							break;
					}
					const row = document.createElement('tr');
					row.innerHTML = `
						
				<td>${task.task_title}</td> <!-- Título de la tarea -->
				<td>${task.task_description}</td> <!-- Estado de la tarea -->
				<td>${task.task_status}</td> <!-- Estado de la tarea -->			
				<td>
					<button data-id="${task.task_id}" class="btn btn-primary btn-sm edit-btn" data-bs-toggle="modal" data-bs-target="#confirmUpdateTask" title="Editar la tarea seleccionada" aria-label="Editar la tarea seleccionada">
						Editar
					</button>
					<button type="button" data-id="${task.task_id}" class="btn btn-danger btn-sm del-btn" data-bs-toggle="modal" data-bs-target="#deleteTask" title="Eliminar la tarea seleccionada" aria-label="Eliminar la tarea seleccionada">
						Eliminar
					</button>
				</td>
			`;
					tasksTableBody.appendChild(row);
				});
			})
			.catch((error) => {
				console.error({
					status: 'error',
					message: "It is not possible to fetch tasks (client's error)",
					error,
				});
			});
	};

	// Obtiene la ID del usuario logueado
	const getUserId = async () => {
		try {
			const response = await fetch('/api/user/current', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			userId = data.userid;

			// Llama a la función DisplayTasks solo en user-profile.html
			if (document.getElementById('taskDataTable')) {
				DisplayTasks(userId);

				// Obtiene la ID de la tarea
				document.addEventListener('click', function (event) {
					// Verificar si se hizo clic en un botón de editar
					if (event.target.classList.contains('edit-btn')) {
						taskId = event.target.getAttribute('data-id');

						loadTaskValue(taskId);
					}

					// Verificar si se hizo clic en un botón de eliminar
					if (event.target.classList.contains('del-btn')) {
						taskId = event.target.getAttribute('data-id');
					}
				});
			}
		} catch (error) {
			console.error({
				status: 'error',
				message: "It is not possible to obtain the user id (client's error)",
				error,
			});
		}
	};

	const addNewTaskForm = document.getElementById('addNewTaskForm');
	const editTaskForm = document.getElementById('editTaskForm');
	const editProfileForm = document.getElementById('editProfile');
	const registerForm = document.getElementById('registerForm');
	const taskDataTable = document.getElementById('taskDataTable');
	const togglePassword = document.getElementById('togglePassword');
	const passwordRegisterField = document.getElementById('user_pass_register');
	const passwordLoginField = document.getElementById('user_pass_login');
	const passwordEditProfileField = document.getElementById('user_pass_update');

	// Función para mostrar u ocultar password
	const togglePasswordField = (passwordField) => {
		togglePassword.addEventListener('click', function () {
			const type =
				passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
			passwordField.setAttribute('type', type);

			const icon =
				type === 'password'
					? '<i class="bi bi-eye"></i>'
					: '<i class="bi bi-eye-slash"></i>';
			this.innerHTML = icon;
		});
	};
	if (passwordRegisterField) {
		togglePasswordField(passwordRegisterField);
	}
	if (passwordLoginField) {
		togglePasswordField(passwordLoginField);
	}
	if (passwordEditProfileField) {
		togglePasswordField(passwordEditProfileField);
	}

	// ejecuta función para obtener la ID del usuario
	if (addNewTaskForm || editTaskForm || editProfileForm || taskDataTable) {
		getUserId();
	}

	// función para desloguear usuario
	const userLogOut = (url) => {
		fetch('/api/user/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(() => {
				window.location.href = url;
			})
			.catch((error) => {
				console.error({
					status: 'error',
					message: "It is not possible log out (client's error)",
					error,
				});
			});
	};
	const logOutBtn = document.getElementById('logOutBtn');
	if (logOutBtn) {
		logOutBtn.addEventListener('click', () => {
			userLogOut('/');
		});
	}

	// función para obtener los datos del usuario en editar perfil
	const loadProfileValue = () => {
		const userFirstName = document.getElementById('user_firstname_update');
		const userLastName = document.getElementById('user_lastname_update');
		const username = document.getElementById('user_name_update');
		const userpass = document.getElementById('user_pass_update');

		fetch('/api/user/current', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				userFirstName.value = data.firstname;
				userLastName.value = data.lastname;
				username.value = data.username;
				userpass.value = 'P4ss******';
			})
			.catch((error) => {
				console.error({
					status: 'error',
					message: "It is not possible obtain the user data (client's error)",
					error,
				});
			});
	};
	if (editProfileForm) {
		loadProfileValue();
	}

	// función para obtener los datos de la tarea antes de editarla
	const loadTaskValue = (task_id) => {
		const task_title_update = document.getElementById('task_title_update');
		const task_description_update = document.getElementById(
			'task_description_update'
		);
		const task_status_update = document.getElementById('task_status_update');

		fetch(`/api/task/${task_id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				task_title_update.value = data.task_title;
				task_description_update.value = data.task_description;
				task_status_update.value = data.task_status;
			})
			.catch((error) => {
				console.error({
					status: 'error',
					message:
						"It is not possible to obtain the task data (client's error)",
					error,
				});
			});
	};

	// funciones para mostrar mensaje de envío exitoso
	const saveSuccessMessage = () => {
		localStorage.setItem(
			'successMessage',
			'Operación Completada Satisfactoriamente'
		);
	};
	const sendSuccessMessage = (message) => {
		const successMessage = document.getElementById('successMessage');
		successMessage.classList.remove('d-none');
		successMessage.innerHTML = `${message}`;
		setTimeout(function () {
			successMessage.classList.add('d-none');
			successMessage.innerHTML = '';
		}, 2300);
	};
	const getSuccessMessage = localStorage.getItem('successMessage');
	if (getSuccessMessage) {
		sendSuccessMessage(getSuccessMessage);
		localStorage.removeItem('successMessage');
	} else {
		console.log({
			status: 'warning',
			message:
				"There isn't form submission confirmation message (client's error)",
		});
	}

	// función para mostrar mensaje de envío erróneo
	const saveFailureMessage = () => {
		localStorage.setItem(
			'failureMessage',
			'La operación no se pudo completar. Contacte con su administrador'
		);
	};
	const sendFailureMessage = (message) => {
		const failureMessage = document.getElementById('failureMessage');
		failureMessage.classList.remove('d-none');
		failureMessage.innerHTML = `${message}`;
		setTimeout(function () {
			failureMessage.classList.add('d-none');
			failureMessage.innerHTML = '';
		}, 2300);
	};
	const getFailureMessage = localStorage.getItem('failureMessage');
	if (getFailureMessage) {
		sendFailureMessage(getFailureMessage);
		localStorage.removeItem('failureMessage');
	} else {
		console.log({
			status: 'warning',
			message: "There isn't form submission error message (client's error)",
		});
	}

	// función para validar formularios
	const formValidations = (form) => {
		const inputs = form.querySelectorAll(
			'input[type="text"], input[type="password"]'
		);
		let isValid = true;

		inputs.forEach((input) => {
			const value = input.value.trim();
			const feedback = input.nextElementSibling;

			if (value === '') {
				feedback.textContent = 'El campo no puede estar vacío';
				feedback.classList.remove('valid-feedback');
				feedback.classList.add('invalid-feedback');
				input.classList.add('is-invalid');
				isValid = false;
			} else if (
				input.type === 'text' &&
				input.name !== 'user_name' &&
				/\d/.test(value)
			) {
				feedback.textContent = 'El campo no puede contener números';
				feedback.classList.remove('valid-feedback');
				feedback.classList.add('invalid-feedback');
				input.classList.add('is-invalid');
				isValid = false;
			} else if (
				input.type === 'text' &&
				input.name === 'user_name' &&
				value.length < 8
			) {
				feedback.textContent = 'El username debe tener al menos 8 caracteres';
				feedback.classList.remove('valid-feedback');
				feedback.classList.add('invalid-feedback');
				input.classList.add('is-invalid');
				isValid = false;
			} else if (
				input.type === 'password' &&
				(value.length < 8 ||
					!/[A-Z]/.test(value) ||
					!/\d/.test(value) ||
					!/[!@#$%^&*]/.test(value))
			) {
				feedback.textContent =
					'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un símbolo';
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

		return isValid;
	};

	// función para el envío de formularios
	const sendForm = (formAction) => {
		switch (formAction) {
			// actualizar usuario
			case '/api/user/:uid':
				const userFirstName = document.getElementById(
					'user_firstname_update'
				).value;
				const userLastName = document.getElementById(
					'user_lastname_update'
				).value;
				const username = document.getElementById('user_name_update').value;
				let userpass = document.getElementById('user_pass_update').value;
				if (userpass === 'P4ss******') {
					userpass = '';
				}

				fetch(`/api/user/${userId}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user_firstname: userFirstName,
						user_lastname: userLastName,
						user_name: username,
						user_pass: userpass,
					}),
				})
					.then((response) => {
						if (response.ok) {
							userLogOut('/login');
						} else {
							saveFailureMessage();
							window.location.href = '/editprofile';
						}
					})
					.catch((error) => {
						saveFailureMessage();
						console.error({
							status: 'error',
							message: "It is not possible update user (client's error)",
							error,
						});
					});
				break;

			// crear tarea
			case '/api/task':
				const task_title_add = document.getElementById('task_title_add').value;
				const task_description_add = document.getElementById(
					'task_description_add'
				).value;

				fetch('/api/task', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user_id: userId,
						task_title: task_title_add,
						task_description: task_description_add,
						task_status: 'pending',
					}),
				})
					.then((response) => {
						if (response.ok) {
							saveSuccessMessage();
							window.location.href = '/profile';
						} else {
							saveFailureMessage();
						}
					})
					.catch((error) => {
						saveFailureMessage();
						console.error({
							status: 'error',
							message: "It is not possible create task (client's error)",
							error,
						});
					});
				break;

			// actualizar tarea
			case '/api/task/:id':
				const task_title_update =
					document.getElementById('task_title_update').value;
				const task_description_update = document.getElementById(
					'task_description_update'
				).value;
				const task_status_update =
					document.getElementById('task_status_update').value;

				fetch(`/api/task/${taskId}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user_id: userId,
						task_title: task_title_update,
						task_description: task_description_update,
						task_status: task_status_update,
					}),
				})
					.then((response) => {
						if (response.ok) {
							saveSuccessMessage();
							window.location.href = '/profile';
						} else {
							saveFailureMessage();
						}
					})
					.catch((error) => {
						saveFailureMessage();
						console.error({
							status: 'error',
							message: "It is not possible update task (client's error)",
							error,
						});
					});
				break;

			default:
				console.error({
					status: 'error',
					message: 'It is not possible to determine the form action',
				});
				break;
		}
	};

	// función para eliminar tareas
	const deleteTask = (task_id) => {
		fetch(`/api/task/${task_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.ok) {
					saveSuccessMessage();
					window.location.href = '/profile';
				} else {
					saveFailureMessage();
				}
			})
			.catch((error) => {
				saveFailureMessage();
				console.error({
					status: 'error',
					message: "It is not possible delete the task (client's error)",
					error,
				});
			});
	};
	const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
	if (confirmDeleteBtn) {
		confirmDeleteBtn.addEventListener('click', () => {
			deleteTask(taskId);
		});
	}

	if (addNewTaskForm) {
		addNewTaskForm.addEventListener('submit', (event) => {
			event.preventDefault();
			const isValid = formValidations(addNewTaskForm);
			if (isValid) {
				sendForm('/api/task');
			}
		});
	}

	if (editTaskForm) {
		editTaskForm.addEventListener('submit', (event) => {
			event.preventDefault();
			const isValid = formValidations(editTaskForm);
			if (isValid) {
				sendForm('/api/task/:id');
			}
		});
	}

	if (editProfileForm) {
		editProfileForm.addEventListener('submit', (event) => {
			event.preventDefault();
			const isValid = formValidations(editProfileForm);
			if (isValid) {
				sendForm('/api/user/:uid');
			}
		});
	}

	if (registerForm) {
		registerForm.addEventListener('submit', (event) => {
			event.preventDefault();
			const isValid = formValidations(registerForm);
			if (isValid) {
				registerForm.submit();
			}
		});
	}
});
