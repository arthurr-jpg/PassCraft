# 🔐 PassCraft

Password generator with animated  Bear using Rive.

![Version](https://img.shields.io/badge/Version-1.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)


##  Features

- **Animated  Bear** - Covers eyes when generating passwords
-  **Customizable Passwords** - Length 4-32, multiple character types
-  **Strength Meter** - Real-time password strength analysis
-  **One-Click Copy** - Easy clipboard integration
-  **Modern UI** - Clean, responsive design
- 👁️ **Mouse Tracking** - Bear follows your cursor

---

##  Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/PassCraft.git
cd PassCraft
```

### 2. Get the Bear animation
- Download from: https://rive.app/community/2244-4437-animated-login-screen/
- Save as: `js/assets/login-teddy.riv`

### 3. Run locally
```bash
python3 -m http.server 8000
```
Open: http://localhost:8000

**Important:** Must use a local server (not `file://`)

---

## 📁 Project Structure

```
PassCraft/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── assets/
│       └── login-teddy.riv
├── screenshots/
│   └── PassCraftScreenShot.png
└── README.md
```

---

##  Troubleshooting

### Bear doesn't appear?
- ✅ Check file path: `js/assets/login-teddy.riv`
- ✅ Use local server (not `file://`)
- ✅ Open console (F12) and check for errors

### Animations don't work?
- ✅ Verify Rive CDN is loading
- ✅ Check state machine name in console
- ✅ Confirm `.riv` file exists

---

## Customization

**Change colors** - Edit `css/style.css`:
```css
/* Line 7 - Background */
background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);

/* Line 281 - Button */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Adjust password settings** - Edit `js/script.js`:
```javascript
// Character sets (lines 51-54)
if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
if (nums) chars += '0123456789';
if (syms) chars += '!@#$%^&*()_-+=[]{}|:<>?/';
```

---

##  Password Strength

| Criteria | Points |
|----------|--------|
| Length ≥ 8 | +20 |
| Length ≥ 12 | +20 |
| Length ≥ 16 | +10 |
| Has lowercase | +15 |
| Has uppercase | +15 |
| Has numbers | +10 |
| Has symbols | +10 |

**Score:** 0-39 (Weak) | 40-59 (Medium) | 60-79 (Good) | 80+ (Strong)

---

##  Tech Stack

- HTML5 / CSS3 / JavaScript ES6+
- [Rive](https://rive.app) - Character animation
- CDN: `@rive-app/canvas@2.23.7`

---

##  License

MIT License - See [LICENSE](LICENSE) file

---

##  Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## ⭐ Support

If you found this helpful, give it a star on GitHub!

Made with ❤️