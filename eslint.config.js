import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  rules: {
    'no-console': 'off',
    'no-useless-return': 'off',
    'antfu/no-top-level-await': 'off',
    'node/prefer-global/process': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'unused-imports/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'off',
    'ts/no-use-before-define': 'off',
    'ts/explicit-function-return-type': 'warn',
    'antfu/if-newline': 'off',
    'style/brace-style': 'off',
    'prefer-const': 'off',
  },
})
