module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "react-app", // https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app
    "react-app/jest",
    "airbnb", // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
    "airbnb/hooks",
    "plugin:import/errors", // https://github.com/benmosher/eslint-plugin-import
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended", // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    "plugin:react/recommended", // https://github.com/yannickcr/eslint-plugin-react
    "plugin:react-hooks/recommended", // https://www.npmjs.com/package/eslint-plugin-react-hooks
    "plugin:jest/recommended", // https://github.com/jest-community/eslint-plugin-jest
    "plugin:jsx-a11y/recommended", // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
    "plugin:prettier/recommended", // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
    "prettier" // https://github.com/prettier/eslint-config-prettier
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: "module"
  },
  parserOptions: {
    ecmaVersion: 2020,
    project: ["tsconfig.json"],
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "import/no-extraneous-dependencies": [
      // storybook, tests の package は development でしか使わないので
      "error",
      {
        devDependencies: [
          "**/*.stories.*",
          "**/__tests__/**",
          "**/__mocks__/**"
        ]
      }
    ],
    "react/jsx-filename-extension": [
      // tsx で jsx を書くため
      "error",
      {
        extensions: ["tsx"]
      }
    ],
    "react/prop-types": "off", // JSで記載する時は props の型の validation があったほうが良さそうだが、typescript は props の型指定を明示的に行うので必須では無い
    "no-use-before-define": "off"
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off", // function の戻り値の型を指定する or not は自由にしたい
        "@typescript-eslint/no-unused-vars": [
          "warn", // 基本的に使用していない変数があれば警告する
          {
            args: "none" // 引数に関しては、使用しないケースが存在するのでこちらは警告は出さない
          }
        ]
      }
    },
    {
      files: ["**/*.stories.tsx", "src/stories/*.tsx"], // storybookが立ち上がらないためeslintを適応しないようにする(本番でやるときは考える)))
      rules: {
        "react/jsx-props-no-spreading": "off", // 利便性のため、Storybook ではスプレッド演算子 OK とする
        "import/extensions": "off", // 拡張子が違う同じファイル名のコンポーネントを import することがあるため
        "prettier/prettier": "off",
        "react/require-default-props": "off",
        "react/no-unescaped-entities": "off",
        "import/prefer-default-export": "off",
        "@typescript-eslint/ban-types": "off"
      }
    }
  ]
};
