// Rive Animation Variables
let riveInstance;
let isHandsUpInput;
let trigSuccessInput;
let trigFailInput;
let lookInput;

// Initialize Rive  Bear Animation
function initRive() {
  const canvas = document.getElementById('teddyCanvas');

  // IMPORTANT: Replace this path with your actual .riv file location
  // Download from: https://rive.app/community/2244-4437-animated-login-screen/
  const rivFilePath = 'assets/login-teddy.riv'; // Change this to your path

  riveInstance = new rive.Rive({
    src: rivFilePath,
    canvas: canvas,
    autoplay: true,
    stateMachines: 'Login Machine', // State machine name from Rive file
    onLoad: () => {
      riveInstance.resizeDrawingSurfaceToCanvas();

      // Get state machine inputs
      const inputs = riveInstance.stateMachineInputs('Login Machine');
      if (inputs) {
        isHandsUpInput = inputs.find(i => i.name === 'isHandsUp');
        trigSuccessInput = inputs.find(i => i.name === 'trigSuccess');
        trigFailInput = inputs.find(i => i.name === 'trigFail');
        lookInput = inputs.find(i => i.name === 'Look');
      }

      console.log('✅ Bear loaded successfully!');
      console.log('Available inputs:', inputs ? inputs.map(i => i.name) : 'none');
    },
    onLoadError: (err) => {
      console.error('❌ Rive loading error:', err);
      console.log('Make sure the .riv file is in the correct path:', rivFilePath);
    }
  });
}

// Bear Animation Controls
function teddyCoverEyes() {
  if (isHandsUpInput) {
    isHandsUpInput.value = true;
    console.log('🙈 Bear covering eyes');
  }
}

function teddyUncoverEyes() {
  if (isHandsUpInput) {
    isHandsUpInput.value = false;
    console.log('👀 Bear uncovering eyes');
  }
}

function teddySuccess() {
  if (trigSuccessInput) {
    trigSuccessInput.fire();
    console.log('😊 Bear success animation');
  }
}

function teddyFail() {
  if (trigFailInput) {
    trigFailInput.fire();
    console.log('😢 Bear fail animation');
  }
}

function teddyLook(value) {
  if (lookInput) {
    lookInput.value = value; // Range: -1 to 1
  }
}

// Generate Password Function
function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const upper = document.getElementById('uppercase').checked;
  const lower = document.getElementById('lowercase').checked;
  const nums = document.getElementById('numbers').checked;
  const syms = document.getElementById('symbols').checked;

  let chars = '';
  if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (nums) chars += '0123456789';
  if (syms) chars += '!@#$%^&*()_-+=[]{}|:<>?/';

  if (!chars) {
    alert('Please select at least one option!');
    teddyFail();
    return;
  }

  // Generate random password
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // BEAR COVERS EYES ANIMATION
  teddyCoverEyes();

  // Password display animation
  const display = document.getElementById('passwordDisplay');
  display.classList.add('generating');
  setTimeout(() => display.classList.remove('generating'), 600);

  // Type password with animation
  const result = document.getElementById('result');
  result.value = '';
  let i = 0;
  const typingInterval = setInterval(() => {
    if (i < password.length) {
      result.value += password[i];
      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, 30);

  // Calculate password strength
  calculateStrength(password);

  //  BEAR uncovers eyes after 2 seconds
  setTimeout(() => {
    teddyUncoverEyes();

    // Show success if password is strong
    const strength = getPasswordStrength(password);
    if (strength >= 60) {
      setTimeout(() => teddySuccess(), 300);
    }
  }, 2000);
}

// Calculate and display password strength
function calculateStrength(password) {
  let strength = 0;

  // Length checks
  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 20;
  if (password.length >= 16) strength += 10;

  // Character variety
  if (/[a-z]/.test(password)) strength += 15;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 10;

  // Determine strength level
  let color, text;
  if (strength < 40) {
    color = '#ef4444';
    text = 'Weak';
  } else if (strength < 60) {
    color = '#f59e0b';
    text = 'Medium';
  } else if (strength < 80) {
    color = '#10b981';
    text = 'Good';
  } else {
    color = '#06b6d4';
    text = 'Strong';
  }

  // Update strength meter
  const bar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');

  setTimeout(() => {
    bar.style.width = strength + '%';
    bar.style.background = color;
    strengthText.textContent = 'Strength: ' + text;
    strengthText.style.color = color;
  }, 100);

  return strength;
}

// Get password strength (helper function)
function getPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 20;
  if (password.length >= 16) strength += 10;
  if (/[a-z]/.test(password)) strength += 15;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
  return strength;
}

// Copy password to clipboard
function copyPassword() {
  const result = document.getElementById('result');

  if (!result.value) {
    alert('Generate a password first!');
    teddyFail();
    return;
  }

  navigator.clipboard.writeText(result.value).then(() => {
    const btn = document.getElementById('copyBtn');
    const originalText = btn.textContent;

    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');

    // Bear success animation
    teddySuccess();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Copy failed:', err);

    // Fallback for older browsers
    result.select();
    result.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('Password copied to clipboard!');
    teddySuccess();
  });
}

// Initialize on page load
window.addEventListener('load', () => {
  console.log('🚀 PassCraft initializing...');

  // Initialize Rive animation
  initRive();

  // Generate initial password after delay
  setTimeout(() => {
    generatePassword();
  }, 1500);
});

// Optional: Track mouse movement for bear to look around
document.addEventListener('mousemove', (e) => {
  if (!lookInput) return;

  const canvas = document.getElementById('teddyCanvas');
  const rect = canvas.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const mouseX = e.clientX;

  // Calculate look value (-1 to 1)
  const lookValue = Math.max(-1, Math.min(1, (mouseX - centerX) / (rect.width / 2)));
  teddyLook(lookValue);
});