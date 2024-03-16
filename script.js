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

    function toggleMessagesDisplay() {
        if (textOutput.value.trim() !== "") {
            notFound.style.display = 'none';
            listMessages.style.display = 'block';
        } else {
            notFound.style.display = 'block';
            listMessages.style.display = 'none';
        }
    }

    btnEncrypt.addEventListener('click', function() {
        const text = textInput.value;
        const encryptedText = encryptText(text);
        textOutput.value = encryptedText;
        toggleMessagesDisplay();
        toggleCopyButton();
    });

    btnDecrypt.addEventListener('click', function() {
        const encryptedText = textInput.value;
        const decryptedText = decryptText(encryptedText);
        textOutput.value = decryptedText;
        toggleMessagesDisplay();
        toggleCopyButton();
    });

    btnCopy.addEventListener('click', function() {
        const textToCopy = textOutput.value;
        copyToClipboard(textToCopy);
    });

    function encryptText(text) {
        return text.replace(/e/g, 'enter')
                   .replace(/i/g, 'imes')
                   .replace(/a/g, 'ai')
                   .replace(/o/g, 'ober')
                   .replace(/u/g, 'ufat');
    }

    function decryptText(text) {
        return text.replace(/enter/g, 'e')
                   .replace(/imes/g, 'i')
                   .replace(/ai/g, 'a')
                   .replace(/ober/g, 'o')
                   .replace(/ufat/g, 'u');
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
});
