# 🚀 Getting Started with commit-pet

Welcome to commit-pet! This guide will walk you through everything you need to know to start raising your own Git-powered virtual pet.

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js 22+** installed ([Download here](https://nodejs.org/))
- **Git** installed on your system
- A terminal or command prompt

You can verify your installations:
```bash
node --version  # Should show v22.x.x or higher
git --version   # Should show git version 2.x.x or higher
```

## 🎯 Installation

### Global Installation (Recommended)

Install commit-pet globally to use it in any project:

```bash
npm install -g @tesso/commit-pet
```

Verify the installation:
```bash
commit-pet --version
```

### Local Installation

If you prefer to install it in a specific project:

```bash
npm install --save-dev @tesso/commit-pet
```

Then use it with npx:
```bash
npx commit-pet status
```

## 🐣 Your First Pet

### Step 1: Navigate to a Git Repository

commit-pet works inside Git repositories. Navigate to any existing project:

```bash
cd my-awesome-project
```

Or create a new one:
```bash
mkdir my-new-project
cd my-new-project
git init
```

### Step 2: Check Your Pet's Status

Run the status command to meet your pet for the first time:

```bash
commit-pet status
```

You'll see your pet as an egg:
```
╭──────────────────────────────────────────────────────────────────────────╮
│ Commit Pet Status                                                        │
╰──────────────────────────────────────────────────────────────────────────╯

                                   ╭───╮
                                   │ ● │
                                   ╰───╯
                                   
                               Egg • 0 EXP
                           Last fed: just now

Progress to next stage: 0%
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
5 more commits to evolve!
```

### Step 3: Make Your First Commit

Your pet grows by eating commits! Let's make one:

```bash
# Create a file
echo "# My Project" > README.md

# Stage and commit
git add README.md
git commit -m "Initial commit"
```

### Step 4: Feed Your Pet

Now feed your pet with the commit you just made:

```bash
commit-pet feed
```

You'll see:
```
Fed your pet with 1 commit!

                                   ╭───╮
                                   │ ● │
                                   ╰───╯
                                   
                               Egg • 1 EXP
                           Last fed: just now

Total EXP: 1
```

## 📈 Growing Your Pet

### Experience System

- Each commit = 1 experience point (EXP)
- Your pet evolves at specific EXP thresholds:
  - **Egg** 🥚: 0-4 EXP
  - **Chick** 🐣: 5-14 EXP
  - **Chicken** 🐔: 15-29 EXP
  - **Dragon** 🐉: 30+ EXP

### Feeding Strategy

commit-pet counts ALL commits since the last feeding, so you can:

1. **Feed after each commit** (immediate gratification)
   ```bash
   git commit -m "Add feature"
   commit-pet feed
   ```

2. **Feed after multiple commits** (bulk feeding)
   ```bash
   git commit -m "Add feature A"
   git commit -m "Add feature B"
   git commit -m "Fix bug"
   commit-pet feed  # Feeds 3 commits at once!
   ```

### Evolution Example

When your pet evolves, you'll see a special message:

```bash
commit-pet feed

Fed your pet with 4 commits!

🎉 Your pet evolved from egg to chick! 🎉

                                   ╭◝◜╮
                                   │˙◡˙│
                                   ╰─┬─╯
                                    ╱ ╲
                                    
                               Chick • 5 EXP
                           Last fed: just now

Total EXP: 5
```

## 💡 Tips & Tricks

### 1. Check Progress Anytime

Use `commit-pet status` to check your pet without feeding:
```bash
commit-pet status
```

### 2. Multiple Repositories

Each repository has its own pet! You can raise different pets in different projects:
```bash
cd project-a
commit-pet status  # Shows project-a's pet

cd ../project-b
commit-pet status  # Shows project-b's pet
```

### 3. Commit Quality

While each commit counts as 1 EXP regardless of size, maintaining good commit practices helps both your code and your pet:
- Make meaningful commits
- Use clear commit messages
- Commit regularly to keep your pet happy!

### 4. Pet State Location

Your pet's state is saved in:
- **macOS/Linux**: `~/.config/commit-pet/state.json`
- **Windows**: `%APPDATA%\commit-pet\state.json`

Each repository's pet is tracked by its Git repository path.

## 🎮 Advanced Usage

### Command Aliases

Add aliases to your shell for quicker access:

```bash
# Add to ~/.bashrc or ~/.zshrc
alias cpf="commit-pet feed"
alias cps="commit-pet status"
```

### Git Hooks Integration

Automatically feed your pet after each commit by adding a Git hook:

```bash
# In your repository's .git/hooks/post-commit file:
#!/bin/sh
commit-pet feed
```

Make it executable:
```bash
chmod +x .git/hooks/post-commit
```

## 🐛 Troubleshooting

### "Not in a git repository!"

Make sure you're in a Git repository:
```bash
git init  # Initialize a new repository
```

### "No commits found in this repository!"

Your repository needs at least one commit:
```bash
git add .
git commit -m "Initial commit"
```

### Pet State Reset

If you want to start over with a new pet:
```bash
# Remove the state file
rm ~/.config/commit-pet/state.json
```

## 🎯 Next Steps

Now that you know the basics:

1. **Set a goal**: Try to evolve your pet to Dragon status!
2. **Share your pet**: Show your team members your pet's progress
3. **Contribute**: Found a bug or have an idea? Check our [GitHub repository](https://github.com/tesso57/commit-pet)

## 🤝 Need Help?

- Check the main [README](../README.md) for more information
- Open an issue on [GitHub](https://github.com/tesso57/commit-pet/issues)
- Share your pet screenshots on social media with #commitpet

Happy coding and pet raising! 🎉