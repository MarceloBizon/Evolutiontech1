// Função para buscar os usuários cadastrados no banco de dados
function fetchUsers() {
  fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => {
      const usersList = document.querySelector('tbody')
      usersList.innerHTML = ''

      // Adiciona os usuários na tabela
      users.forEach(user => {
        const message = user.message.replaceAll('\n', '<br>')
        const tr = document.createElement('tr')
        tr.id = user.id
        tr.innerHTML = `
          <td>${user.name}</td>
          <td>${user.cpf}</td>
          <td>${user.email}</td>
          <td class="text-truncate cursor-pointer" onclick="showMessage('${message}', '${user.name}')">${user.message}</td>
        `
        usersList.appendChild(tr)
      })
    })
}

fetchUsers()


// Função para exibir a mensagem do usuário (util para visualizar mensagens longas)
function showMessage(message, user) {
  const modal = document.querySelector('#modal')
  modal.innerHTML = `
  <button type="button" class="btn-close position-absolute end-0 me-4" aria-label="Close" onclick="closeModal()"></button>
  <h3>Solicitação de orçamento de ${user}</h3>
  <p>${message}</p>
  `
  modal.showModal()
}

// Função para fechar o modal
function closeModal() {
  const modal = document.querySelector('#modal')
  modal.close()
}