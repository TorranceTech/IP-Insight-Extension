document.addEventListener('DOMContentLoaded', () => {
    function fetchIP(url, elementId) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.getElementById(elementId).textContent = data.ip;
            })
            .catch(error => console.error('Error fetching IP:', error));
    }

    // Fetch user IP
    fetchIP('https://ipinfo.io/json?token=87872f50d91b97', 'ip');

    // Fetch site IP from storage
    browser.storage.local.get('siteIP').then(result => {
        if (result.siteIP) {
            document.getElementById('site-ip').textContent = result.siteIP;
        } else {
            document.getElementById('site-ip').textContent = 'Loading...';
        }
    });

    function storeSettings() {
        const dataTypes = [];
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            dataTypes.push(checkbox.name);
        });
        browser.storage.local.set({ dataTypes: dataTypes });
    }

    function clearData() {
        browser.runtime.sendMessage({ type: 'clearCache' });
    }

    document.getElementById('clearSelected').addEventListener('click', () => {
        storeSettings();
        clearData();
    });

    document.getElementById('toggleDarkMode').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.documentElement.classList.toggle('dark-mode');
    });

    let allChecked = false;
    document.getElementById('toggleSelect').addEventListener('click', () => {
        allChecked = !allChecked;
        document.querySelectorAll('.checkbox-container input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = allChecked;
        });
    });
});
