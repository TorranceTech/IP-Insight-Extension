// options.js
document.getElementById('settings-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let reload = document.getElementById('reload').checked;
    let notification = document.getElementById('notification').checked;
    browser.storage.local.set({ reload, notification });
    alert('Settings saved!');
});

// popup.js
document.addEventListener('DOMContentLoaded', () => {
    // Buscar configurações salvadas e ajustar o estado da UI com base nelas
    browser.storage.local.get(['reload', 'notification']).then(settings => {
        document.getElementById('reload').checked = settings.reload;
        document.getElementById('notification').checked = settings.notification;
    });

    // Restante do script...
});
