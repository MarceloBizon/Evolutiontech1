"use strict"

// Função para inicializar o formulário de contato
function initContactForm() {
    var contactForm = document.getElementById("contactForm")

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault() // Evita o envio padrão do formulário

            saveUser() // Chama a função para enviar o email
        })
    }
}

initContactForm() // Inicializa o formulário de contato
const toastSuccess = document.getElementById('success')
const toastError = document.getElementById('error')
const toastWarning = document.getElementById('warning')

// Função para cadastrar usuário
function saveUser() {
    const name = document.querySelector('#name')?.value?.trim()
    const cpf = document.querySelector('#cpf')?.value?.trim()
    const email = document.querySelector('#email')?.value?.trim()
    const message = document.querySelector('#message')?.value?.trim()

    // Verifica se os campos obrigatórios foram preenchidos
    if (!name || !cpf || !email || !message) {
        const warning = bootstrap.Toast.getOrCreateInstance(toastWarning)
        warning.show()
        return
    }

    // Envia os dados do usuário para o backend
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, cpf, email, message })
    }).then(response => {
        if (response.ok) {
            const success = bootstrap.Toast.getOrCreateInstance(toastSuccess)
            success.show()

            sendEmail(name, email)
        }
    }).catch(() => {
        const error = bootstrap.Toast.getOrCreateInstance(toastError)
        error.show()
    })
}

// Função para enviar email
function sendEmail(name, email) {
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, to: email })
    })
}

const intersectionCallback = (entries) => {
    for (const entry of entries) {
        const els = entry.target?.querySelectorAll('.animate__animated')
        els.forEach((el, index) => {
            el.hidden = !entry.isIntersecting
            const classList = el.classList
            const slowClass = `slower-${index + 1}`

            if (!classList.value.includes('slower')) {
                classList.remove(slowClass)
            } else {
                classList.add(slowClass)
            }
        })
    }
}

const observer = new IntersectionObserver(intersectionCallback)
const items = document.querySelectorAll('.toShow')
for (const item of items) {
    observer.observe(item)
}

const cpfInput = document.getElementById('cpf');
cpfInput.addEventListener('input', () => {
  let value = cpfInput.value.replace(/\D/g, ''); // Remove qualquer caracter que não seja número
  if (value.length > 11) value = value.slice(0, 11);

  // Formata o valor para XXX.XXX.XXX-XX
  cpfInput.value = value
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{2})$/, '$1-$2');
});