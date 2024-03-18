document.addEventListener('DOMContentLoaded', function() {
    const btnEncrypt = document.querySelector('.btn-encrypt');
    const btnDecrypt = document.querySelector('.btn-decrypt');
    const textOutput = document.querySelector('.text-output');
    const textInput = document.querySelector('.text-input');
    const btnCopy = document.querySelector('.btn-copy');
    var listMessages = document.querySelector('.list-messages');
    var notFound = document.querySelector('.not-found');

    textOutput.addEventListener('input', toggleMessagesDisplay);

    toggleMessagesDisplay();

    const encryptionRules = [
        { from: /e/g, to: 'enter' },
        { from: /i/g, to: 'imes' },
        { from: /a/g, to: 'ai' },
        { from: /o/g, to: 'ober' },
        { from: /u/g, to: 'ufat' }
    ];

    const decryptionRules = [
        { from: /enter/g, to: 'e' },
        { from: /imes/g, to: 'i' },
        { from: /ai/g, to: 'a' },
        { from: /ober/g, to: 'o' },
        { from: /ufat/g, to: 'u' }
    ];

    btnEncrypt.addEventListener('click', function() {
        const text = textInput.value;
        const encryptedText = applyRules(text, encryptionRules);
        textOutput.value = encryptedText;
        toggleMessagesDisplay();
        toggleCopyButton();
        showAlert('Texto criptografado com sucesso!');
    });

    btnDecrypt.addEventListener('click', function() {
        const encryptedText = textInput.value;
        if (isEncrypted(encryptedText, decryptionRules)) {
            const decryptedText = applyRules(encryptedText, decryptionRules);
            textOutput.value = decryptedText;
            toggleMessagesDisplay();
            toggleCopyButton();
            showAlert('Texto descriptografado com sucesso!');
        } else {
            showAlert('O texto de entrada não está criptografado.');
        }
    });

    btnCopy.addEventListener('click', function() {
        const textToCopy = textOutput.value;
        copyToClipboard(textToCopy);
        showAlert('Texto copiado para a área de transferência!');
    });

    function toggleMessagesDisplay() {
        if (textOutput.value.trim() !== "") {
            notFound.style.display = 'none';
            listMessages.style.display = 'block';
        } else {
            notFound.style.display = 'block';
            listMessages.style.display = 'none';
        }
    }

    function applyRules(text, rules) {
        let result = text;
        rules.forEach(rule => {
            result = result.replace(rule.from, rule.to);
        });
        return result;
    }

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    function toggleCopyButton() {
        if (textOutput.textContent.trim() !== "") {
            btnCopy.classList.add('active');
        } else {
            btnCopy.classList.remove('active');
        }
    }

    function isEncrypted(text, rules) {
        return rules.some(rule => rule.from.test(text));
    }

    function showAlert(message) {
        const alertContainer = document.getElementById('alertContainer');
        alertContainer.textContent = message;
        alertContainer.style.display = 'block';
        setTimeout(function() {
            alertContainer.style.display = 'none';
        }, 2000);
    }
});
