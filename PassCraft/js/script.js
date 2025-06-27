// Generate a random password based on selected options
function generatePassword() {
  const length = document.getElementById('length').value;
  const includeUppercase = document.getElementById('uppercase').checked;
  const includeLowercase = document.getElementById('lowercase').checked;
  const includeNumbers = document.getElementById('numbers').checked;
  const includeSymbols = document.getElementById('symbols').checked;

  let characters = '';
  if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) characters += '0123456789';
  if (includeSymbols) characters += '!@#$%&*()_-+=[]{}|:<>?/';

  if (characters === '') {
    alert('Please select at least one character type.');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  document.getElementById('result').value = password;
}

// Copy the generated password to the clipboard
function copyPassword() {
  const input = document.getElementById('result');
  input.select();
  input.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand('copy');
  alert('Password copied to clipboard!');
}
