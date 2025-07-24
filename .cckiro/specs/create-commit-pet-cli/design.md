# commit-pet 設計書

## 1. アーキテクチャ概要

### 1.1 技術スタック

- **言語**: TypeScript 5.7.3
- **ランタイム**: Node.js 22+
- **ビルドツール**: tsx（開発）/ esbuild（本番）
- **主要ライブラリ**:
  - `meow` 13.2.0: CLIコマンドルーティング
  - `ink` 5.1.0: ターミナルUI
  - `ink-progress-bar` 3.0.0: プログレスバー表示
  - `execa` 9.5.2: Git コマンド実行
  - `chalk` 5.4.1: カラー出力（ESMモジュール）

### 1.2 ディレクトリ構造

```
commit-pet/
├── src/
│   ├── cli.ts              # エントリーポイント（コマンドルーティング）
│   ├── commands/
│   │   ├── feed.ts         # feedコマンドの実装
│   │   └── status.ts       # statusコマンドの実装
│   ├── components/
│   │   ├── PetDisplay.tsx  # ペット表示コンポーネント
│   │   └── StatusBar.tsx   # ステータスバーコンポーネント
│   ├── services/
│   │   ├── git.ts          # Git操作サービス
│   │   ├── state.ts        # 状態管理サービス
│   │   └── pet.ts          # ペット成長ロジック
│   ├── types/
│   │   └── index.ts        # 型定義
│   └── utils/
│       ├── config.ts       # 設定管理
│       └── ascii-arts.ts   # ASCIIアート定義
├── tests/
├── package.json
├── tsconfig.json
└── README.md
```

## 2. コンポーネント設計

### 2.1 CLIエントリーポイント (`cli.ts`)

```typescript
interface CLIOptions {
  help?: boolean;
  version?: boolean;
}
```

- meowを使用してコマンドラインパースを実装
- サブコマンドに基づいて適切なハンドラーを呼び出し
- グローバルオプション（--help, --version）の処理

### 2.2 コマンドハンドラー

#### Feed Command (`commands/feed.ts`)

```typescript
interface FeedResult {
  previousStage: PetStage;
  currentStage: PetStage;
  commitCount: number;
  experienceGained: number;
}
```

- Git サービスを使用してコミット数を取得
- State サービスを使用して状態を更新
- Pet サービスを使用して成長判定
- 結果をInk UIで表示

#### Status Command (`commands/status.ts`)

- State サービスから現在の状態を読み込み
- PetDisplayコンポーネントで表示

### 2.3 サービス層

#### Git Service (`services/git.ts`)

```typescript
interface GitService {
  isGitRepository(): Promise<boolean>;
  getCommitsSince(sha: string | null): Promise<string[]>;
  getLatestCommitSha(): Promise<string>;
}
```

- execaを使用してgitコマンドを実行
- エラーハンドリング（非gitリポジトリ等）

#### State Service (`services/state.ts`)

```typescript
interface PetState {
  stage: PetStage;
  exp: number;
  lastSha: string | null;
  updatedAt: string;
}

interface StateService {
  load(): Promise<PetState>;
  save(state: PetState): Promise<void>;
  getConfigPath(): string;
}
```

- XDG Base Directory仕様に準拠
- ファイルの自動作成とバリデーション
- 破損時の自動復旧機能

#### Pet Service (`services/pet.ts`)

```typescript
type PetStage = 'egg' | 'chick' | 'chicken' | 'dragon';

interface StageThreshold {
  stage: PetStage;
  minExp: number;
  maxExp: number | null;
}

interface PetService {
  calculateStage(exp: number): PetStage;
  getStageInfo(stage: PetStage): StageInfo;
  getNextStageRequirement(currentExp: number): number | null;
}
```

### 2.4 UIコンポーネント

#### PetDisplay Component (`components/PetDisplay.tsx`)

```typescript
interface PetDisplayProps {
  stage: PetStage;
  exp: number;
  lastUpdated: Date;
}
```

- ASCIIアートの表示
- ステージに応じた色分け
- アニメーション効果（オプション）

#### StatusBar Component (`components/StatusBar.tsx`)

```typescript
interface StatusBarProps {
  currentExp: number;
  nextStageExp: number | null;
  stage: PetStage;
}
```

- ink-progress-barを使用した進捗表示
- 次のステージまでの必要経験値表示

## 3. データフロー

### 3.1 Feed コマンドのフロー

1. Git リポジトリチェック
2. 現在の状態を読み込み
3. 前回のSHA以降のコミット数を取得
4. 経験値を計算・更新
5. ステージ判定
6. 状態を保存
7. 結果をUI表示

### 3.2 Status コマンドのフロー

1. 状態ファイルを読み込み
2. ペット情報をUI表示

## 4. エラーハンドリング設計

### 4.1 エラータイプ

```typescript
enum ErrorType {
  NOT_GIT_REPO = 'NOT_GIT_REPO',
  STATE_FILE_CORRUPTED = 'STATE_FILE_CORRUPTED',
  GIT_COMMAND_FAILED = 'GIT_COMMAND_FAILED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}
```

### 4.2 エラーメッセージ

- ユーザーフレンドリーなメッセージ
- 解決方法の提示
- デバッグ情報は--verboseオプション時のみ

## 5. 設定管理

### 5.1 環境変数

- `COMMIT_PET_HOME`: カスタム設定ディレクトリ
- `NO_COLOR`: カラー出力の無効化
- `DEBUG`: デバッグモード

### 5.2 設定ファイル（将来拡張用）

```json
{
  "theme": "default",
  "animations": true,
  "notificationEnabled": false
}
```

## 6. テスト戦略

### 6.1 ユニットテスト

- 各サービスの個別テスト
- モックを使用したGit操作のテスト
- ステージ計算ロジックのテスト

### 6.2 統合テスト

- CLIコマンドのE2Eテスト
- 状態管理の永続化テスト

## 7. ビルド・配布

### 7.1 ビルド設定

- TypeScriptコンパイル設定（ES2023ターゲット、moduleはESNext）
- esbuildによるバンドル（単一実行ファイル）
- Source map生成（デバッグ用）
- ESMモジュール形式での出力（Chalk 5.x対応）

### 7.2 npm パッケージ構成

```json
{
  "name": "@tesso/commit-pet",
  "type": "module",
  "bin": {
    "commit-pet": "./dist/cli.js"
  },
  "files": ["dist", "README.md", "LICENSE"],
  "engines": {
    "node": ">=22.0.0"
  }
}
```

## 8. セキュリティ考慮事項

- 外部コマンド実行時の入力検証
- ファイルパスのサニタイゼーション
- 状態ファイルの適切なパーミッション設定（600）
