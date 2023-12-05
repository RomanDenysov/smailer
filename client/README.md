# React + TypeScript + Vite STARTER

This is my template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Also I added my options for better import organize:

```
/* Aliases for absolute paths */
    "baseUrl": "src",
    "paths": {
      "@modules/*": ["modules/*"],
      "@common/*": ["modules/common/*"],
      "@dashboard/*": ["modules/dashboard/*"],
      "@details/*": ["modules/details/*"],
      // ADD OTHER ALIASES IF YOU NEED
    }
```

## Getting Started

Follow these steps to get started with this React + TypeScript + Vite starter:

**Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-starter.git
   
   ```

1. Navigate to the Project Directory:

   ```bash
   cd your-starter

   ```
2. Install Dependencies:

   ```bash
   npm install

   ```
3. Run the Development Server:
   ```bash
   npm run dev

   ```
   
This will start the development server, and you can view your React application at 

http://localhost:3000

```markdown
## TIPS and TRICKS 

 **If you have some tips or tricks, feel free to reach out:**

- **Email:** romandenysovsk@gmail.com
- **Telegram:** [@roman_piu](https://t.me/roman_piu)