# 🐣 commit-pet

Gitコミットで育つバーチャルペット CLI

## 概要

commit-petは、Gitコミットを「餌」として成長するバーチャルペットです。コミットするたびにペットが経験値を獲得し、卵から雛、鶏、そして最終的にはドラゴンへと進化します！

```
    ╭───╮        ╭◝◜╮         ╭─◜◝─╮        ╭──🔥──╮
    │ ● │   →    │˙◡˙│    →    │ ˙◡˙ │   →    │ ⚡◉◉⚡ │
    ╰───╯        ╰─┬─╯         ├─┬─┬─┤        ├─╫─╫─╫─┤
                  ╱ ╲          │ │ │ │        │ ╫ ╫ ╫ │
                               ╰─┴─┴─╯        ╰─🔥─🔥─╯
     Egg         Chick        Chicken         Dragon
```

## 特徴

- 🥚 4段階の進化システム（卵 → 雛 → 鶏 → ドラゴン）
- 🎨 美しいターミナルUI（Inkを使用）
- 📊 進化の進捗表示
- 🗂️ リポジトリごとの状態管理
- 💾 永続的な状態保存

## インストール

### ローカルインストール（現在の方法）

```bash
# リポジトリをクローン
git clone https://github.com/tesso57/commit-pet.git
cd commit-pet

# 依存関係をインストール
npm install

# グローバルにリンク
npm link
```

これで、どこからでも `commit-pet` コマンドが使えるようになります。

### アンインストール

```bash
npm unlink -g @tesso/commit-pet
```

## 使い方

### ペットの状態を確認

```bash
commit-pet status
```

現在のペットの状態、経験値、進化段階を表示します。

### ペットに餌をあげる

```bash
commit-pet feed
```

前回の餌やりから新しいコミットがあれば、その分の経験値をペットに与えます。

## 進化システム

| 段階 | 必要経験値 | 見た目 |
|------|-----------|--------|
| 卵 | 0-4 | 🥚 |
| 雛 | 5-14 | 🐤 |
| 鶏 | 15-29 | 🐔 |
| ドラゴン | 30+ | 🐲 |

1コミット = 1経験値

## 設定

commit-petの状態は以下の場所に保存されます：
- Linux/macOS: `~/.config/commit-pet/state.json`
- Windows: `%APPDATA%/commit-pet/state.json`

## 技術スタック

- Node.js 22+
- TypeScript 5.7
- Ink 5.1（React for CLIs）
- Vitest（テスティング）

## 開発

```bash
# 開発モードで実行
npm run dev

# テストを実行
npm test

# 型チェック
npm run typecheck

# リント
npm run lint

# フォーマット
npm run format
```

### プロジェクト構成

```
commit-pet/
├── src/
│   ├── cli.ts              # CLIエントリーポイント
│   ├── commands/           # コマンド実装
│   ├── components/         # UIコンポーネント
│   ├── services/           # ビジネスロジック
│   ├── types/              # 型定義
│   └── utils/              # ユーティリティ
├── tests/                  # テスト
├── docs/                   # ドキュメント
└── package.json
```

## ライセンス

MIT

---

🤖 Built with [Claude Code](https://claude.ai/code)