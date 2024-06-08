// Define as configurações padrão
var defaultSettings = {
  reload: true,
  notification: true,
  dataTypes: ["cache"]
};

// Função para verificar e atualizar as configurações armazenadas
function checkStoredSettings(storedSettings) {
  const updatedSettings = {...defaultSettings, ...storedSettings};
  browser.storage.local.set(updatedSettings);
}

// Inicia o processo de verificação das configurações armazenadas
browser.storage.local.get().then(checkStoredSettings, onError);

// Função para limpar os dados de navegação com base nas configurações
function clearCache(storedSettings) {
    const dataTypes = {};
    for (let type of storedSettings.dataTypes) {
        dataTypes[type] = true;
    }

    console.log('Data types to clear:', dataTypes);

    browser.browsingData.remove({}, dataTypes).then(() => {
        if (storedSettings.reload) {
            browser.tabs.reload();
        }
        if (storedSettings.notification) {
            browser.notifications.create({
                "type": "basic",
                "title": "Clear Data",
                "message": `Cleared: ${Object.keys(dataTypes).join(", ")}`,
                "iconUrl": browser.runtime.getURL('/icons/icon-48.png')
            });
        }
    }).catch(onError);
}

// Função para lidar com erros
function onError(error) {
  console.error('Error:', error);
}

// Listener para mensagens enviadas para limpar dados
browser.runtime.onMessage.addListener((message) => {
  if (message.type === 'clearCache') {
    browser.storage.local.get().then(clearCache, onError);
  }
});

