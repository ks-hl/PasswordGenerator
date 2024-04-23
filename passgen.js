function updateLengthDisplay() {
    const length = document.getElementById("length").value;
    document.getElementById("lengthDisplay").textContent = length;
}

function generatePassword() {
    updateLengthDisplay();
    const length = document.getElementById("length").value;
    const includeSymbols = document.getElementById("includeSymbols").checked;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" +
        (includeSymbols ? "!@#$%^&*()_+-=[]{}|;':,.<>?/" : "");
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    document.getElementById("output").textContent = password;
}

function copyPassword() {
    const password = document.getElementById("output").textContent;
    navigator.clipboard.writeText(password).catch(err => {
        console.error('Error in copying text: ', err);
    });
}

// Initialize the password on page load
window.onload = generatePassword;