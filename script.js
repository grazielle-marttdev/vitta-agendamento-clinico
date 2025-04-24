// Simulando horários disponíveis
const horariosDisponiveis = [
    "08:00", "09:00", "10:00", "11:00",
    "13:00", "14:00", "15:00", "16:00"
];

// Elementos principais
const dataInput = document.getElementById('data');
const horarioSelect = document.getElementById('horario');
const formulario = document.querySelector('form');
const nomeInput = document.getElementById('nome');
const telefoneInput = document.getElementById('telefone');
const emailInput = document.getElementById('email');

// Ao carregar a página, adiciona a animação de entrada no formulário
window.addEventListener('DOMContentLoaded', () => {
    formulario.classList.add('loaded');
});

// Atualiza os horários disponíveis ao escolher a data
dataInput.addEventListener('change', () => {
    horarioSelect.innerHTML = '<option value="">Selecione um horário</option>';
    horariosDisponiveis.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario;
        option.textContent = horario;
        horarioSelect.appendChild(option);
    });
});

// Validação em tempo real
function validarCampo(campo, condicao, mensagem) {
    campo.addEventListener('input', () => {
        if (!condicao(campo.value)) {
            campo.setCustomValidity(mensagem);
        } else {
            campo.setCustomValidity('');
        }
    });
}

validarCampo(nomeInput, valor => valor.trim().length >= 3, 'Nome muito curto.');
validarCampo(telefoneInput, valor => /^[0-9]{10,11}$/.test(valor), 'Digite um telefone válido com DDD.');
validarCampo(emailInput, valor => valor.includes('@') && valor.includes('.'), 'E-mail inválido.');

// Envio do formulário
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const data = dataInput.value;
    const horario = horarioSelect.value;
    const nome = nomeInput.value;
    const telefone = telefoneInput.value;
    const email = emailInput.value;

    if (!data || !horario || !nome || !telefone || !email) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    let resumo = document.getElementById('resumoAgendamento');

    if (!resumo) {
        resumo = document.createElement('div');
        resumo.id = 'resumoAgendamento';
        formulario.appendChild(resumo);
    }

    resumo.innerHTML = `
        <h2>Agendamento Confirmado</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Data:</strong> ${data}</p>
        <p><strong>Horário:</strong> ${horario}</p>
    `;

    resumo.style.display = 'block';
    resumo.scrollIntoView({ behavior: 'smooth' });

    formulario.reset();
});
