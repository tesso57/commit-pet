# 🚀 commit-pet スタートガイド

commit-petへようこそ！このガイドでは、Gitコミットで育てるバーチャルペットの始め方を詳しく説明します。

## 📋 必要な環境

始める前に、以下がインストールされていることを確認してください：

- **Node.js 22以上** ([ダウンロードはこちら](https://nodejs.org/))
- **Git** がシステムにインストールされていること
- ターミナルまたはコマンドプロンプト

インストールの確認方法：
```bash
node --version  # v22.x.x 以上が表示されるはず
git --version   # git version 2.x.x 以上が表示されるはず
```

## 🎯 インストール方法

### グローバルインストール（推奨）

どのプロジェクトでも使えるようにグローバルインストール：

```bash
npm install -g @tesso/commit-pet
```

インストールの確認：
```bash
commit-pet --version
```

### ローカルインストール（開発中のこのプロジェクトを試す場合）

このリポジトリをクローンして、ローカルで開発版を試す場合：

```bash
# リポジトリをクローン
git clone https://github.com/tesso57/commit-pet.git
cd commit-pet

# 依存関係をインストール
npm install

# 開発モードで実行（推奨）
npm run dev -- status
npm run dev -- feed

# グローバルにリンクする場合
npm link

# リンク後は通常のコマンドとして使用可能
commit-pet status
commit-pet feed
```

**注意**: 現在、ビルドされたバージョンはInkのESMモジュール互換性の問題により動作しません。開発モード（`npm run dev`）または`npm link`を使用してください。

### 特定のプロジェクトにインストール

特定のプロジェクトだけで使いたい場合：

```bash
npm install --save-dev @tesso/commit-pet
```

npxで実行：
```bash
npx commit-pet status
```

## 🐣 はじめてのペット

### ステップ1: Gitリポジトリに移動

commit-petはGitリポジトリ内で動作します。既存のプロジェクトに移動：

```bash
cd my-awesome-project
```

または新しいプロジェクトを作成：
```bash
mkdir my-new-project
cd my-new-project
git init
```

### ステップ2: ペットの状態を確認

statusコマンドを実行して、初めてペットに会いましょう：

```bash
commit-pet status
```

最初は卵の状態で表示されます：
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

### ステップ3: 最初のコミットを作成

ペットはコミットを食べて成長します！コミットを作ってみましょう：

```bash
# ファイルを作成
echo "# My Project" > README.md

# ステージングしてコミット
git add README.md
git commit -m "Initial commit"
```

### ステップ4: ペットにエサをあげる

作成したコミットでペットにエサをあげます：

```bash
commit-pet feed
```

次のように表示されます：
```
Fed your pet with 1 commit!

                                   ╭───╮
                                   │ ● │
                                   ╰───╯
                                   
                               Egg • 1 EXP
                           Last fed: just now

Total EXP: 1
```

## 📈 ペットの育て方

### 経験値システム

- 1コミット = 1経験値（EXP）
- 特定の経験値で進化します：
  - **卵（Egg）** 🥚: 0-4 EXP
  - **ヒヨコ（Chick）** 🐣: 5-14 EXP
  - **ニワトリ（Chicken）** 🐔: 15-29 EXP
  - **ドラゴン（Dragon）** 🐉: 30+ EXP

### エサやりの戦略

commit-petは前回のエサやり以降のすべてのコミットを数えるので：

1. **コミットごとにエサをあげる**（即座に満足感）
   ```bash
   git commit -m "Add feature"
   commit-pet feed
   ```

2. **複数コミット後にまとめてエサをあげる**（まとめてエサやり）
   ```bash
   git commit -m "Add feature A"
   git commit -m "Add feature B"
   git commit -m "Fix bug"
   commit-pet feed  # 3コミット分を一度にあげる！
   ```

### 進化の例

ペットが進化すると特別なメッセージが表示されます：

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

## 💡 便利な使い方

### 1. いつでも進捗確認

`commit-pet status`でエサをあげずにペットの状態を確認：
```bash
commit-pet status
```

### 2. 複数のリポジトリ

各リポジトリごとに別々のペットを育てられます！
```bash
cd project-a
commit-pet status  # project-aのペットを表示

cd ../project-b
commit-pet status  # project-bのペットを表示
```

### 3. コミットの質

各コミットは大きさに関係なく1 EXPですが、良いコミット習慣はコードとペットの両方に役立ちます：
- 意味のあるコミットを作る
- 明確なコミットメッセージを使う
- 定期的にコミットしてペットを幸せに！

### 4. ペットの状態の保存場所

ペットの状態は以下に保存されます：
- **macOS/Linux**: `~/.config/commit-pet/state.json`
- **Windows**: `%APPDATA%\commit-pet\state.json`

各リポジトリのペットはGitリポジトリのパスで管理されます。

## 🎮 高度な使い方

### コマンドエイリアス

シェルにエイリアスを追加して素早くアクセス：

```bash
# ~/.bashrc または ~/.zshrc に追加
alias cpf="commit-pet feed"
alias cps="commit-pet status"
```

### Gitフック連携

Gitフックを追加して、コミット後に自動でペットにエサをあげる：

```bash
# リポジトリの .git/hooks/post-commit ファイルに：
#!/bin/sh
commit-pet feed
```

実行可能にする：
```bash
chmod +x .git/hooks/post-commit
```

## 🐛 トラブルシューティング

### "Not in a git repository!"

Gitリポジトリ内にいることを確認：
```bash
git init  # 新しいリポジトリを初期化
```

### "No commits found in this repository!"

リポジトリに最低1つのコミットが必要です：
```bash
git add .
git commit -m "Initial commit"
```

### ペットの状態をリセット

新しいペットで最初からやり直したい場合：
```bash
# 状態ファイルを削除
rm ~/.config/commit-pet/state.json
```

## 🎯 次のステップ

基本がわかったら：

1. **目標を設定**: ドラゴンまで進化させてみよう！
2. **ペットをシェア**: チームメンバーにペットの進捗を見せよう
3. **貢献**: バグを見つけたり、アイデアがある？[GitHubリポジトリ](https://github.com/tesso57/commit-pet)をチェック

## 🤝 ヘルプが必要？

- メインの[README](../README.md)で詳細情報を確認
- [GitHub](https://github.com/tesso57/commit-pet/issues)でissueを開く
- ソーシャルメディアでペットのスクリーンショットを #commitpet でシェア

楽しいコーディングとペット育成を！ 🎉