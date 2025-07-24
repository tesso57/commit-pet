# commit-pet 実装計画書

## 1. 実装フェーズ概要

本プロジェクトは以下の順序で段階的に実装を進めます：

1. **Phase 1**: プロジェクト基盤構築
2. **Phase 2**: コア機能実装
3. **Phase 3**: UI実装
4. **Phase 4**: テスト・品質保証
5. **Phase 5**: ドキュメント・公開準備

## 2. Phase 1: プロジェクト基盤構築

### 2.1 プロジェクト初期化

```bash
# 1. プロジェクトディレクトリ作成
mkdir commit-pet && cd commit-pet

# 2. package.json初期化
npm init -y

# 3. TypeScript設定
npm install -D typescript@5.7.3 @types/node@22 tsx
npx tsc --init
```

### 2.2 必要な依存関係のインストール

```bash
# 本番依存関係
npm install meow@13.2.0 ink@5.1.0 ink-progress-bar@3.0.0 execa@9.5.2 chalk@5.4.1

# 開発依存関係
npm install -D eslint prettier vitest @vitest/ui esbuild
```

### 2.3 基本設定ファイル

- `tsconfig.json`: ESMモジュール対応設定
- `.eslintrc.json`: コード品質設定
- `.prettierrc`: コードフォーマット設定
- `vitest.config.ts`: テスト設定

### 2.4 ディレクトリ構造作成

```bash
mkdir -p src/{commands,components,services,types,utils}
mkdir -p tests/{unit,integration}
```

## 3. Phase 2: コア機能実装

### 3.1 型定義 (`src/types/index.ts`)

```typescript
export type PetStage = 'egg' | 'chick' | 'chicken' | 'dragon';

export interface PetState {
  stage: PetStage;
  exp: number;
  lastSha: string | null;
  updatedAt: string;
}

export interface StageThreshold {
  stage: PetStage;
  minExp: number;
  maxExp: number | null;
  ascii: string;
}
```

### 3.2 設定管理 (`src/utils/config.ts`)

- XDG Base Directory仕様の実装
- 設定ディレクトリの自動作成
- 環境変数のサポート

### 3.3 Git サービス (`src/services/git.ts`)

- リポジトリ検証機能
- コミット履歴取得
- エラーハンドリング

### 3.4 状態管理サービス (`src/services/state.ts`)

- JSONファイルの読み書き
- バリデーション
- 破損時の自動復旧

### 3.5 ペットロジック (`src/services/pet.ts`)

- ステージ計算
- 経験値管理
- 成長判定

### 3.6 CLIエントリーポイント (`src/cli.ts`)

```typescript
#!/usr/bin/env node
import meow from 'meow';
import { feedCommand } from './commands/feed.js';
import { statusCommand } from './commands/status.js';

const cli = meow(
  `
  Usage
    $ commit-pet <command>

  Commands
    feed     Feed your pet with commits
    status   Show pet status

  Examples
    $ commit-pet feed
    $ commit-pet status
`,
  {
    importMeta: import.meta,
    flags: {
      help: {
        type: 'boolean',
        shortFlag: 'h',
      },
      version: {
        type: 'boolean',
        shortFlag: 'v',
      },
    },
  }
);

// コマンドルーティング実装
```

## 4. Phase 3: UI実装

### 4.1 ASCIIアート定義 (`src/utils/ascii-arts.ts`)

```typescript
export const ASCII_ARTS = {
  egg: `
    ╭───╮
    │ ● │
    ╰───╯
  `,
  chick: `
    ╭◝◜╮
    │˙◡˙│
    ╰─┬─╯
     ╱ ╲
  `,
  chicken: `
    ╭─◜◝─╮
    │ ˙◡˙ │
    ├─┬─┬─┤
    │ │ │ │
    ╰─┴─┴─╯
  `,
  dragon: `
    ╭──🔥──╮
    │ ⚡◉◉⚡ │
    ├─╫─╫─╫─┤
    │ ╫ ╫ ╫ │
    ╰─🔥─🔥─╯
  `,
};
```

### 4.2 ペット表示コンポーネント (`src/components/PetDisplay.tsx`)

```typescript
import React from 'react';
import { Box, Text } from 'ink';
import { PetStage } from '../types/index.js';

interface Props {
  stage: PetStage;
  exp: number;
  lastUpdated: Date;
}

export const PetDisplay: React.FC<Props> = ({ stage, exp, lastUpdated }) => {
  // Ink UIでのペット表示実装
};
```

### 4.3 プログレスバー実装 (`src/components/StatusBar.tsx`)

- ink-progress-barを使用
- 次のステージまでの進捗表示
- カラフルな表示

### 4.4 コマンド実装

- `src/commands/feed.ts`: フィード処理とUI表示
- `src/commands/status.ts`: ステータス表示

## 5. Phase 4: テスト・品質保証

### 5.1 ユニットテスト作成

```typescript
// tests/unit/services/pet.test.ts
import { describe, it, expect } from 'vitest';
import { calculateStage } from '../../../src/services/pet.js';

describe('Pet Service', () => {
  it('should calculate correct stage based on exp', () => {
    expect(calculateStage(0)).toBe('egg');
    expect(calculateStage(5)).toBe('chick');
    expect(calculateStage(15)).toBe('chicken');
    expect(calculateStage(30)).toBe('dragon');
  });
});
```

### 5.2 統合テスト

- CLIコマンドのE2Eテスト
- Git操作のモックテスト
- 状態永続化のテスト

### 5.3 リント・フォーマット

```bash
npm run lint
npm run format
npm run typecheck
```

### 5.4 ビルド設定

```javascript
// build.js
import { build } from 'esbuild';

await build({
  entryPoints: ['src/cli.ts'],
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  outfile: 'dist/cli.js',
  banner: {
    js: '#!/usr/bin/env node',
  },
});
```

## 6. Phase 5: ドキュメント・公開準備

### 6.1 README.md作成

- プロジェクト概要
- インストール手順
- 使用例（GIFアニメーション付き）
- バッジ追加

### 6.2 package.json最終調整

```json
{
  "name": "@tesso/commit-pet",
  "version": "0.1.0",
  "description": "Commit-driven Tamagotchi for your terminal",
  "type": "module",
  "bin": {
    "commit-pet": "./dist/cli.js"
  },
  "scripts": {
    "dev": "tsx src/cli.ts",
    "build": "node build.js",
    "test": "vitest",
    "lint": "eslint .",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit"
  }
}
```

### 6.3 GitHub Actions設定

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
```

### 6.4 初回リリース

1. `git init && git add . && git commit -m "Initial commit"`
2. GitHub リポジトリ作成・プッシュ
3. npm パッケージ公開（オプション）

## 7. 実装時の注意事項

### 7.1 エラーハンドリング

- すべての非同期処理でtry-catch実装
- ユーザーフレンドリーなエラーメッセージ
- スタックトレースは--verboseフラグ時のみ

### 7.2 パフォーマンス

- Git履歴取得は必要最小限
- 状態ファイルの同期的な読み書き
- UIレンダリングの最適化

### 7.3 テスト駆動開発

- 各機能実装前にテストを書く
- カバレッジ80%以上を目標
- CI/CDでの自動テスト実行

## 8. 完了基準

- [ ] すべてのコマンドが正常に動作
- [ ] テストがすべてパス
- [ ] リントエラーなし
- [ ] TypeScriptの型エラーなし
- [ ] README.mdが完成
- [ ] デモGIFが作成済み
- [ ] GitHubリポジトリが公開済み
