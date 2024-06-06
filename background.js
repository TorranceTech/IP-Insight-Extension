var defaultSettings = {
  reload: true,
  notification: true,
  dataTypes: ["cache"]
};

function checkStoredSettings(storedSettings) {
  if (!storedSettings.notification || !storedSettings.reload || !storedSettings.dataTypes) {
    browser.storage.local.set(defaultSettings);
  }
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);

function clearCache(storedSettings) {
  const reload = storedSettings.reload;
  const notification = storedSettings.notification;

  function getTypes(selectedTypes) {
    var dataTypes = {};
    for (var item of selectedTypes) {
      dataTypes[item] = true;
    }
    return dataTypes;
  }

  const dataTypes = getTypes(storedSettings.dataTypes);

  function onCleared() {
    if (reload) {
      browser.tabs.reload();
    }

    if (notification) {
      var dataTypesString = Object.keys(dataTypes).join(", ");
      browser.notifications.create({
        "type": "basic",
        "title": "Clear Data",
        "message": `Cleared ${dataTypesString}`,
        "iconUrl": browser.runtime.getURL('/icons/icon-48.png')
      }).then(function() {});
    }
  }

  console.log('Data types to clear:', dataTypes);
  browser.browsingData.remove({}, dataTypes).then(onCleared, onError);
}

function onError(error) {
  console.error(error);
}

browser.runtime.onMessage.addListener((message) => {
  if (message.type === 'clearCache') {
    const gettingStoredSettings = browser.storage.local.get();
    gettingStoredSettings.then(clearCache, onError);
  }
});
