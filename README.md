# 🐣 commit-pet

[![npm version](https://badge.fury.io/js/%40tesso%2Fcommit-pet.svg)](https://badge.fury.io/js/%40tesso%2Fcommit-pet)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/@tesso/commit-pet.svg)](https://nodejs.org/en/download/)

> Commit-driven Tamagotchi for your terminal

Feed your virtual pet with Git commits and watch it grow! commit-pet gamifies your development workflow by turning your commits into food for a cute terminal pet.

## 🎮 Demo

```
    ╭───╮        ╭◝◜╮         ╭─◜◝─╮        ╭──🔥──╮
    │ ● │   →    │˙◡˙│    →    │ ˙◡˙ │   →    │ ⚡◉◉⚡ │
    ╰───╯        ╰─┬─╯         ├─┬─┬─┤        ├─╫─╫─╫─┤
                  ╱ ╲          │ │ │ │        │ ╫ ╫ ╫ │
                               ╰─┴─┴─╯        ╰─🔥─🔥─╯
     Egg         Chick        Chicken         Dragon
```

## ✨ Features

- 🥚 **4 Evolution Stages**: Watch your pet grow from egg to dragon
- 📊 **Progress Tracking**: Visual progress bars show growth status
- 🎨 **Beautiful Terminal UI**: Built with Ink for a smooth experience
- 💾 **Persistent State**: Your pet remembers you between sessions
- 🚀 **Zero Configuration**: Works out of the box with any Git repository

## 📦 Installation

```bash
# Global installation (recommended)
npm install -g @tesso/commit-pet

# Or use with npx
npx @tesso/commit-pet status
```

## 🚀 Quick Start

1. Navigate to any Git repository:
   ```bash
   cd your-git-project
   ```

2. Check your pet's status:
   ```bash
   commit-pet status
   ```

3. Make some commits and feed your pet:
   ```bash
   git add .
   git commit -m "feat: awesome new feature"
   commit-pet feed
   ```

## 📖 Usage

### Commands

#### `commit-pet status`
Display your pet's current state, experience points, and progress to the next evolution stage.

#### `commit-pet feed`
Feed your pet with commits made since the last feeding. Each commit counts as 1 experience point.

### Growth Stages

| Stage | Experience | Appearance |
|-------|------------|------------|
| 🥚 Egg | 0-4 exp | A simple egg waiting to hatch |
| 🐣 Chick | 5-14 exp | A cute baby chick |
| 🐔 Chicken | 15-29 exp | A grown chicken |
| 🐉 Dragon | 30+ exp | The ultimate evolution! |

## 🛠️ Configuration

commit-pet stores its state in:
- Linux/macOS: `~/.config/commit-pet/state.json`
- Windows: `%APPDATA%/commit-pet/state.json`

The state file is automatically created on first use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔮 Future Plans

- [ ] Multiple pets for different repositories
- [ ] Custom ASCII art themes
- [ ] Git hook integration
- [ ] Pet happiness based on commit quality
- [ ] Multiplayer features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Ink](https://github.com/vadimdemedes/ink) - React for interactive command-line apps
- Inspired by the nostalgia of Tamagotchi and the joy of coding

---

Made with ❤️ by [@tesso](https://github.com/tesso57)