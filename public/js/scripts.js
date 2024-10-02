// función para obtener el Id del usuario
document.addEventListener('DOMContentLoaded', () => {
	let userId;
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

			// Llama a DisplayTasks solo si estamos en la página correcta
			if (document.getElementById('taskDataTable')) {
				DisplayTasks(userId);
			}
		} catch (error) {
			console.error({
				status: 'error',
				message: "It is not possible to obtain the user id (client's error)",
			});
		}
	};

	// ejecuta función para obtener id
	const addNewTaskForm = document.getElementById('addNewTaskForm');
	const editTaskForm = document.getElementById('editTaskForm');
	const editProfileForm = document.getElementById('editProfile');
	const taskDataTable = document.getElementById('taskDataTable');
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
			.catch(() => {
				console.error({
					status: 'error',
					message: "It is not possible log out (client's error)",
				});
			});
	};
	const logOutBtn = document.getElementById('logOutBtn');
	if (logOutBtn) {
		logOutBtn.addEventListener('click', () => {
			userLogOut('/');
		});
	}

	// función para cargar los datos del usuario en el formulario de editar perfil
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
				userpass.value = '********';
			})
			.catch(() => {
				console.error({
					status: 'error',
					message: "It is not possible obtain the user data (client's error)",
				});
			});
	};
	if (editProfileForm) {
		loadProfileValue();
	}

	// función para el envío de formularios
	const sendForm = (formAction) => {
		switch (formAction) {
			case '/api/user/login':
				const user_name = document.getElementById('user_name').value;
				const user_pass = document.getElementById('user_pass').value;

				fetch('/api/user/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user_name: user_name,
						user_pass: user_pass,
					}),
				})
					.then(() => {
						console.info({
							status: 'success',
							message: "Login successful (client's message)",
						});
					})
					.catch(() => {
						console.error({
							status: 'error',
							message: "It is not possible log in (client's error)",
						});
					});

				break;

			case '/api/user':
				const user_firstname = document.getElementById('user_firstname').value;
				const user_lastname = document.getElementById('user_lastname').value;
				const userName = document.getElementById('user_name').value;
				const userPass = document.getElementById('user_pass').value;

				fetch('/api/user/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user_firstname: user_firstname,
						user_lastname: user_lastname,
						user_name: userName,
						user_pass: userPass,
					}),
				})
					.then(() => {
						console.info({
							status: 'success',
							message: "User created successfully (client's message)",
						});
					})
					.catch(() => {
						console.error({
							status: 'error',
							message: "It is not possible register (client's error)",
						});
					});
				break;

			case '/api/user/:uid':
				const userFirstName = document.getElementById(
					'user_firstname_update'
				).value;
				const userLastName = document.getElementById(
					'user_lastname_update'
				).value;
				const username = document.getElementById('user_name_update').value;
				let userpass = document.getElementById('user_pass_update').value;
				if (userpass === '********') {
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
					.then(() => {
						userLogOut('/login');
					})
					.catch(() => {
						console.error({
							status: 'error',
							message: "It is not possible update user (client's error)",
						});
					});
				break;

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
						user_id: `${userId}`,
						task_title: task_title_add,
						task_description: task_description_add,
						task_status: 'pending',
					}),
				})
					.then(() => {
						window.location.href = '/profile';
					})
					.catch(() => {
						console.error({
							status: 'error',
							message: "It is not possible add task (client's error)",
						});
					});

				break;

			// ## FALTA OBTENER LA ID DE LA TAREA
			case '/api/task/:id':
				const task_title_update =
					document.getElementById('task_title_update').value;
				const task_description_update = document.getElementById(
					'task_description_update'
				).value;
				const task_status_update =
					document.getElementById('task_status_update').value;

				if (
					task_title_update != '' ||
					task_description_update != '' ||
					task_status_update != ''
				) {
					fetch(`/api/task/${taskId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							user_id: `${userId}`,
							task_title: task_title_update,
							task_description: task_description_update,
							task_status: task_status_update,
						}),
					})
						.then(() => {
							window.location.href = '/profile';
						})
						.catch(() => {
							console.error({
								status: 'error',
								message: "It is not possible edit task (client's error)",
							});
						});
				}
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

	// función del botón para eliminar una tarea
	// ## FALTA OBTENER LA ID DE LA TAREA
	const deleteTask = (taskId) => {
		fetch(`/api/task/${taskId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(() => {
				window.location.href = '/profile';
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
			deleteTask();
		});
	}

	// función para el envío de confirmación del formulario
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

	// función para validar formularios
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

	// Administración de DataTable

	const DisplayTasks = async (user_id) => {
		try {
			const response = await fetch(`/api/task/by/${user_id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();

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
				const row = document.createElement('tr');
				row.innerHTML = `
			<td>${task.task_id}</td> <!-- ID de la tarea -->			
			<td>${task.task_title}</td> <!-- Título de la tarea -->
			<td>${task.task_description}</td> <!-- Estado de la tarea -->
			<td>${task.task_status}</td> <!-- Estado de la tarea -->			
			<td>
				<button data-id="${task.task_id}" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#confirmUpdateTask" >
					Editar
				</button>
				<button type="button" data-id="${task.task_id}" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteTask" >
					Eliminar
				</button>
			</td>
		`;
				tasksTableBody.appendChild(row);
			});
		} catch (error) {
			console.error({
				status: 'error',
				message: "Error fetching tasks (client's error)",
				error,
			});
		}
	};

	if (taskDataTable) {
		const dataTableOptions = {
			columnDefs: [
				{ className: 'centered', targets: [0, 1, 2, 3, 4, 5] },
				{ orderable: false, targets: [5] },
			],
			language: {
				decimal: '',
				emptyTable: 'No hay datos disponibles en la tabla',
				info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
				infoEmpty: 'Mostrando 0 a 0 de 0 registros',
				infoFiltered: '(filtrado de _MAX_ registros totales)',
				infoPostFix: '',
				thousands: ',',
				lengthMenu: 'Mostrar _MENU_ registros',
				loadingRecords: 'Cargando...',
				processing: 'Procesando...',
				search: 'Buscar:',
				zeroRecords: 'No se encontraron registros coincidentes',
				paginate: {
					first: 'Primero',
					last: 'Último',
					next: 'Siguiente',
					previous: 'Anterior',
				},
				aria: {
					sortAscending: ': activar para ordenar la columna ascendente',
					sortDescending: ': activar para ordenar la columna descendente',
				},
			},
		};

		$(document).ready(function () {
			$('#taskTableDetail').DataTable(dataTableOptions);
		});
	}
});
