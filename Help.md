<!-- Typescript check -->
npx tsc

<!-- Prettier check -->
npx prettier --check .

<!-- Prettier write -->
npx prettier --write .

<!-- For specific file types check/write -->
npx prettier --check "**/*.{js,jsx,json,ts,tsx}"
npx prettier --write "**/*.{js,jsx,json,ts,tsx}"

<!-- EsLint initialization -->
npx eslint --init

example:- 
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm     
√ Which framework does your project use? · react        
√ Does your project use TypeScript? · Yes
√ Where does your code run? · node
√ What format do you want your config file to be in? · JavaScript

The config that you've selected requires the following dependencies:
eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
√ Would you like to install them now with npm? · No / Yes

<!-- Eslint check -->
npx eslint App.tsx

<!-- husky -->
it checks all rules before commit by using pre-commit hooks.

<!-- lint-staged -->
it only check all rules of pre commited file (only changes files)
example: under src directory (js,jsx...) filetypes only check before commit
"src/**/*.{js,jsx,json,ts,tsx}": "eslint"

it also woks on prettier
"**/*.{js,jsx,json,ts,tsx}": "prettier --check"
"**/*.{js,jsx,json,ts,tsx}": "prettier --write"