"use strict"


// Função para inicializar o formulário de contato
function initContactForm() {
    var contactForm = document.getElementById("contactForm")

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault() // Evita o envio padrão do formulário

            sendEmail(); // Chama a função para enviar o email
        })
    }
}

// Função para enviar o email
function sendEmail() {
    const name = document.querySelector('#name')?.value?.trim()
    const email = document.querySelector('#email')?.value?.trim()
    const message = document.querySelector('#message')?.value?.trim()

    // Verifica se os campos obrigatórios foram preenchidos
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos do formulário.')
        return
    }

    // Inicializa o serviço de emailjs com a chave do usuário
    emailjs.init('hGZHQkdsEc-XQL7pP')
    const params = {
        subject: 'Solicitação de orçamento',
        fromEmail: email,
        fromName: name,
        message: message,
        toEmail: 'evolution.tech.requisicoes@gmail.com',
    }
    const serviceId = 'service_j28i2z4'
    const templateId = 'template_ftsktdp'

    // Envia o email usando o serviço de emailjs
    emailjs.send(serviceId, templateId, params)
        .then(() => {
            alert('Email enviado com sucesso! Obrigado por entrar em contato.')
        })
        .catch(() => {
            alert('Erro ao enviar email!')
        })
}

const intersectionCallback = (entries) => {
    for (const entry of entries) {
        const els = entry.target?.querySelectorAll('.animate__animated')
        els.forEach((el, index) => {
            el.hidden = !entry.isIntersecting
            const classList = el.classList
            const slowClass = `slower-${index+1}`
            
            if (!classList.value.includes('slower')) {
                classList.remove(slowClass)
            } else {
                classList.add(slowClass)
            }
        })
    }
}

/**
 * Create a observer and use the instersectionCallback as 
 * the instructions for what to do when an element enters
 * or leaves the view
 */
const observer = new IntersectionObserver(intersectionCallback)

/**
 * Get all .item elements and loop over them.
 * Observe each individual item.
 */
const items = document.querySelectorAll('.toShow')
for (const item of items) {
    observer.observe(item)
}