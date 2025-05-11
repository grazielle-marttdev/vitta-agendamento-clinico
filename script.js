const dataInput = document.getElementById('data');
const horarioSelect = document.getElementById('horario');
const nomeInput = document.getElementById('nome');
const telefoneInput = document.getElementById('telefone');
const emailInput = document.getElementById('email');
const button = document.querySelector('button');
const resultado = document.getElementById('resultado');
const formulario = document.getElementById('formulario');

const horariosPorTurno = {
    manha: ['08:00', '09:00', '10:00', '11:00'],
    tarde: ['13:00', '14:00', '15:00', '16:00']
};

function carregarHorarios() {
    const dataSelecionada = new Date(dataInput.value);
    horarioSelect.innerHTML = '<option value="">Selecione um horário</option>';

    if (!isNaN(dataSelecionada)) {
        const horarios = [...horariosPorTurno.manha, ...horariosPorTurno.tarde];
        horarios.forEach(horario => {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            horarioSelect.appendChild(option);
        });
    }
}

function corBotaoPorHorario(horario) {
    const hora = parseInt(horario.split(':')[0]);
    if (hora < 12) {
        button.style.backgroundColor = '#69b093'; // manhã
    } else {
        button.style.backgroundColor = '#1F3B73'; // tarde
    }
}

function validarFormulario() {
    const dataValida = dataInput.value !== '';
    const horarioValido = horarioSelect.value !== '';
    const nomeValido = nomeInput.value.trim().length > 2;
    const telefoneValido = /^\d{8,15}$/.test(telefoneInput.value);
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);

    const tudoValido = dataValida && horarioValido && nomeValido && telefoneValido && emailValido;

    button.disabled = !tudoValido;
    button.style.opacity = tudoValido ? '1' : '0.6';
    return tudoValido;
}

function mostrarResultado() {
    resultado.innerHTML = `
    <p><strong>Consulta agendada com sucesso!</strong></p>
    <p>Dia: ${dataInput.value}</p>
    <p>Horário: ${horarioSelect.value}</p>
    <p>Nome: ${nomeInput.value}</p>
    <p>Telefone: ${telefoneInput.value}</p>
    <p>Email: ${emailInput.value}</p>
    `;
    resultado.style.marginTop = '30px';
    resultado.style.background = '#dff0d8';
    resultado.style.padding = '15px';
    resultado.style.borderRadius = '8px';
}

dataInput.addEventListener('change', () => {
    carregarHorarios();
    validarFormulario();
});

horarioSelect.addEventListener('change', () => {
    corBotaoPorHorario(horarioSelect.value);
    validarFormulario();
});

[nomeInput, telefoneInput, emailInput].forEach(input =>
    input.addEventListener('input', validarFormulario)
);

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormulario()) {
        mostrarResultado();
        console.log('Formulário enviado!');
    } else {
        console.log('Formulário inválido.');
    }
});