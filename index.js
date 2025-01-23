document.addEventListener('DOMContentLoaded', () => {
    const passwordBox = document.getElementById('password');
    const generateBtn = document.getElementById('generate-btn');
    const lengthInput = document.getElementById('length');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');

    const CHARACTER_SETS = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()-_=+[]{}<>?/|',
    };

    // Função para gerar senha sem repetição dentro de cada seção
    function generatePassword() {
        const length = parseInt(lengthInput.value, 10);
        if (length < 6 || length > 32) {
            showCustomAlert('O comprimento da senha deve estar entre 6 e 32 caracteres.');
            return '';
        }

        let availableCharacters = CHARACTER_SETS.lowercase.split('');
        if (includeUppercase.checked) {
            availableCharacters = availableCharacters.concat(CHARACTER_SETS.uppercase.split(''));
        }
        if (includeNumbers.checked) {
            availableCharacters = availableCharacters.concat(CHARACTER_SETS.numbers.split(''));
        }
        if (includeSymbols.checked) {
            availableCharacters = availableCharacters.concat(CHARACTER_SETS.symbols.split(''));
        }

        if (availableCharacters.length < length) {
            showCustomAlert('Comprimento da senha excede os caracteres únicos disponíveis!');
            return '';
        }

        let password = '';
        const usedCharacters = new Set();

        while (password.length < length) {
            const randomIndex = Math.floor(Math.random() * availableCharacters.length);
            const selectedChar = availableCharacters[randomIndex];

            // Adiciona o caractere apenas se ainda não foi usado
            if (!usedCharacters.has(selectedChar)) {
                password += selectedChar;
                usedCharacters.add(selectedChar);
            }

            // Se todos os caracteres disponíveis forem usados, reinicia
            if (usedCharacters.size === availableCharacters.length) {
                usedCharacters.clear();
            }
        }
        return password;
    }

    // Função para copiar a senha para a área de transferência
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showCustomAlert('Senha copiada para a área de transferência!');
        }).catch(() => {
            showCustomAlert('Erro ao copiar para a área de transferência.');
        });
    }

    // Evento para gerar a senha
    generateBtn.addEventListener('click', () => {
        const newPassword = generatePassword();
        if (newPassword) {
            passwordBox.textContent = newPassword;
            passwordBox.style.cursor = 'pointer';
        }
    });

    // Evento para copiar a senha ao clicar nela
    passwordBox.addEventListener('click', () => {
        if (passwordBox.textContent) {
            copyToClipboard(passwordBox.textContent);
        }
    });
});
