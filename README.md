
# IP Insight Extension

IP Insight Extension is a simple tool that displays your IP address and the IP address of the sites you visit. Additionally, the extension allows you to clear browsing data such as cache, cookies, history, form data, local storage, and Indexed DB. With a dark mode for easier viewing and a PayPal donation button to support development, IP Insight Extension is an essential addition to your browser.

![Screenshot 2024-06-06 at 6 30 46 AM](https://github.com/TorranceTech/IP-Insight-Extension/assets/170806445/4bce82ea-565b-4270-8691-916272545ed8)
![Screenshot 2024-06-06 at 6 29 54 AM](https://github.com/TorranceTech/IP-Insight-Extension/assets/170806445/09cdde87-89e0-4e38-a3a5-ad5c057382bc)

## Features

- Displays your public IP address.
- Displays the IP address of the sites you visit, including resolving CNAMEs.
- Options to clear cache, cookies, history, form data, local storage, and Indexed DB.
- Dark mode for comfortable viewing, with preferences saved.
- PayPal donation button to support development.

## API Keys

This extension uses the following public APIs:
- **IPinfo**: [Get your free API key](https://ipinfo.io/signup)
- **Abstract API**: [Get your free API key](https://app.abstractapi.com/signup)
- **Google DNS**: No API key required

To use this extension, you will need to create a `.env` file in the root of the project directory with the following content:

```
PRIMARY_API_KEY=your_ipinfo_api_key
BACKUP_API_KEY=your_abstractapi_key
```

## Installation

### Add the Extension to Firefox

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/torrancetech/IP-Insight-Extension.git
   ```

2. **Install Dependencies:**
   ```bash
   cd IP-Insight-Extension
   npm install
   ```

3. **Create a `.env` File:**
   - Create a `.env` file in the root directory and add your API keys.

4. **Build the Extension:**
   ```bash
   npx webpack --config webpack.config.js
   ```

5. **Load the Extension:**
   - Open Firefox and go to `about:debugging`.
   - Click on `This Firefox`.
   - Click on `Load Temporary Add-on` and select the `manifest.json` file from the `dist` directory.

### Install Via Firefox Add-ons
Go to the Firefox add-ons page and search for "IP Insight Extension" or click the link below to install directly.

Install IP Insight Extension <!-- Add the add-on link when available -->

## Changelog

Version 1.2.4
- Fixed the issue with displaying the visited site's IP address.
- Added logic to resolve CNAMEs.
- User interface improvements and bug fixes.
- Integrated environment variables using Webpack.

## Support

If you encounter any issues or have suggestions, please open an issue on the GitHub repository.

### Donations

If you find this extension useful, consider making a donation to support ongoing development.

- Donate via PayPal

### Adding Localization

To support multiple languages, create a `_locales` folder in your project directory. Inside `_locales`, create a folder for each language using the language code (e.g., `en` for English, `es` for Spanish). Inside each language folder, create a `messages.json` file.

![Screenshot 2024-06-06 at 6 19 14 AM](https://github.com/TorranceTech/IP-Insight-Extension/assets/170806445/de926c24-332a-439f-81a7-12e273d8ce7c)
```

### Atualize o README no GitHub

1. **Abra o README.md no seu editor de texto preferido e substitua o conteúdo pelo acima.**
2. **Adicione e comite o arquivo atualizado:**

```bash
git add README.md
git commit -m "Update README.md with installation and usage instructions in English"
git push origin main
```

