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

			return loggedUser;
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

	const getUsersList = async () => {
		try {
			const response = await fetch('/api/user', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			return data;
		} catch (error) {
			console.error({
				status: 'error',
				message: "It is not possible to obtain users list (client's error)",
				error,
			});
			return [];
		}
	};

	// Muestra el listado de tareas de los usuarios
	const DisplayTasks = async () => {
		try {
			const userList = await getUsersList();

			const response = await fetch(`/api/task`);
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
						});
						break;
				}

				const currentUser = userList.find(
					(user) => user.user_id === task.user_id
				);

				const row = document.createElement('tr');
				row.innerHTML = `
               
                <td>${task.task_title}</td> <!-- Título de la tarea -->
                <td>${
									task.task_description
								}</td> <!-- Descripción de la tarea -->             
                <td>${
									currentUser ? currentUser.user_firstname : 'N/A'
								}</td> <!-- Nombre -->
                <td>${
									currentUser ? currentUser.user_lastname : 'N/A'
								}</td> <!-- Apellido -->
                <td>${task.task_status}</td> <!-- Estado de la tarea -->			
                <td>
                    <button data-id="${
											task.task_id
										}" class="btn btn-primary btn-sm edit-btn" data-bs-toggle="modal" data-bs-target="#confirmUpdateTask" title="Editar la tarea seleccionada" aria-label="Editar la tarea seleccionada">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" data-id="${
											task.task_id
										}" class="btn btn-danger btn-sm del-btn" data-bs-toggle="modal" data-bs-target="#deleteTask" title="Eliminar la tarea seleccionada" aria-label="Eliminar la tarea seleccionada">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
				tasksTableBody.appendChild(row);
			});
		} catch (error) {
			console.error({
				status: 'error',
				message: "It is not possible to obtain tasks list (client's error)",
				error,
			});
		}
	};

	// Muestra el listado de usuarios
	const DisplayUsers = async () => {
		try {
			const userList = await getUsersList();
			const response = await fetch('/api/user/current');
			const data = await response.json();

			// Evita que el usuario se elimine asimismo
			const userListWithoutCurrentUser = userList.filter((user) => {
				return user.user_id !== data.userid;
			});

			const usersTableBody = document.querySelector('#userTable');
			usersTableBody.innerHTML = '';

			userListWithoutCurrentUser.forEach((user) => {
				const row = document.createElement('tr');
				row.innerHTML = `
                <td>${user.user_id}</td> <!-- ID de usuario -->
                <td>${user.user_firstname}</td> <!-- Nombre -->
                <td>${user.user_lastname}</td> <!-- Apellido -->
                <td>${user.user_name}</td> <!-- Username -->
                		
                <td>
                                        <button type="button" data-id="${user.user_id}" class="btn btn-danger btn-sm del-user-btn" data-bs-toggle="modal" data-bs-target="#deleteUser" title="Eliminar el usuario seleccionado" aria-label="Eliminar el usuario seleccionado">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
				usersTableBody.appendChild(row);
			});
		} catch (error) {
			console.error({
				status: 'error',
				message:
					"It is not possible to obtain users list for table (client's error)",
				error,
			});
		}
	};

	// Función para inicializar task datatable
	const initializeDataTable = () => {
		if ($('#taskTableDetail').length) {
			// Se asegura que solo haya una instancia de datatable para tareas
			if ($.fn.DataTable.isDataTable('#taskTableDetail')) {
				$('#taskTableDetail').DataTable().destroy();
			}

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

			$('#taskTableDetail').DataTable(dataTableOptions);
		}
	};

	// Función para inicializar user datatable
	const initializeUserDataTable = () => {
		if ($('#userTableDetail').length) {
			// Se asegura que solo haya una instancia de datatable para usuarios
			if ($.fn.DataTable.isDataTable('#userTableDetail')) {
				$('#userTableDetail').DataTable().destroy();
			}

			const dataTableOptionsUsers = {
				columnDefs: [
					{ className: 'centered', targets: [0, 1, 2, 3, 4] },
					{ orderable: false, targets: [4] },
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

			$('#userTableDetail').DataTable(dataTableOptionsUsers);
		}
	};

	// renderiza las tablas y le da funcionalidad a los botones en ella
	const tableButtons = async () => {
		try {
			// tablas
			if (
				document.getElementById('taskDataTable') ||
				document.getElementById('userDataTable')
			) {
				await DisplayTasks();
				await DisplayUsers();
				initializeDataTable();
				initializeUserDataTable();

				// botones de las tablas
				document.addEventListener('click', function (event) {
					const editButton = event.target.closest('.edit-btn');
					const delButton = event.target.closest('.del-btn');
					const delUserButton = event.target.closest('.del-user-btn');

					// obtiene el id de la tarea donde se hizo clic
					if (editButton) {
						taskId = editButton.getAttribute('data-id');
						loadTaskValue(taskId);
					}
					if (delButton) {
						taskId = delButton.getAttribute('data-id');
					}

					// obtiene el id del usuario donde se hizo clic
					if (delUserButton) {
						userId = delUserButton.getAttribute('data-id');
					}
				});
			}
		} catch (error) {
			console.error({
				status: 'error',
				message: "Unable to configure table buttons (client's error)",
				error,
			});
		}
	};

	// ejecuta la función para el renderizado de tablas y sus botones
	const addNewTaskForm = document.getElementById('addNewTaskForm');
	const editTaskForm = document.getElementById('editTaskForm');
	const taskDataTable = document.getElementById('taskDataTable');
	const userDataTable = document.getElementById('userDataTable');
	if (addNewTaskForm || editTaskForm || taskDataTable || userDataTable) {
		tableButtons();
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

	// función para obtener los datos de la tarea antes de editarla
	const loadTaskValue = (task_id) => {
		const task_title_update = document.getElementById('task_title_update');
		const task_description_update = document.getElementById(
			'task_description_update'
		);
		const task_status_update = document.getElementById('task_status_update');
		const user_id_update = document.getElementById('user_id_update');

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
				user_id_update.value = data.user_id;
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

	// funciones para mostrar mensaje de envío fallido
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
			'input[type="text"], input[type="password"], input[type="number"]'
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
			} else if (input.type === 'number' && /\D/.test(value)) {
				feedback.textContent = 'El campo solo puede contener números';
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
			// crear tarea
			case '/api/task':
				const user_id_add = document.getElementById('user_id_add').value;
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
						user_id: user_id_add,
						task_title: task_title_add,
						task_description: task_description_add,
						task_status: 'pending',
					}),
				})
					.then((response) => {
						if (response.ok) {
							saveSuccessMessage();
							window.location.href = '/adminprofile';
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
				const user_id_update = document.getElementById('user_id_update').value;
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
						user_id: user_id_update,
						task_title: task_title_update,
						task_description: task_description_update,
						task_status: task_status_update,
					}),
				})
					.then((response) => {
						if (response.ok) {
							saveSuccessMessage();
							window.location.href = '/adminprofile';
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
					window.location.href = '/adminprofile';
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

	// función para eliminar usuarios
	const deleteUser = (user_id) => {
		fetch(`/api/user/${user_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.ok) {
					saveSuccessMessage();
					window.location.href = '/adminprofile';
				} else {
					saveFailureMessage();
				}
			})
			.catch((error) => {
				saveFailureMessage();
				console.error({
					status: 'error',
					message: "It is not possible delete the user (client's error)",
					error,
				});
			});
	};
	const confirmDeleteUserBtn = document.getElementById('confirmDeleteUserBtn');
	if (confirmDeleteUserBtn) {
		confirmDeleteUserBtn.addEventListener('click', async () => {
			deleteUser(userId);
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
});
