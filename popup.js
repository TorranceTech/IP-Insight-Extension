document.addEventListener('DOMContentLoaded', () => {
    function fetchIP(url, elementId, backupUrl = null, isUserIP = false) {
        console.log(`Fetching IP from: ${url}`);
        fetch(url)
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) throw new Error('Response not OK');
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data);
                let ip;
                if (isUserIP) {
                    ip = data.ip;
                } else if (data.Answer && data.Answer.length > 0) {
                    const answer = data.Answer[0];
                    if (answer.type === 1) {
                        ip = answer.data;
                    } else if (answer.type === 5) {
                        console.log(`Resolving CNAME: ${answer.data}`);
                        const cnameUrl = `https://dns.google/resolve?name=${answer.data}&type=A`;
                        return fetch(cnameUrl)
                            .then(cnameResponse => {
                                if (!cnameResponse.ok) throw new Error('CNAME Response not OK');
                                return cnameResponse.json();
                            })
                            .then(cnameData => {
                                console.log('CNAME API Response:', cnameData);
                                if (cnameData.Answer && cnameData.Answer.length > 0) {
                                    ip = cnameData.Answer[0].data;
                                    document.getElementById(elementId).textContent = `IP: ${ip}`;
                                } else {
                                    throw new Error('CNAME IP not found');
                                }
                            });
                    }
                }
                if (ip) {
                    document.getElementById(elementId).textContent = `IP: ${ip}`;
                } else {
                    throw new Error('IP not found');
                }
            })
            .catch(error => {
                console.error('Error fetching IP:', error);
                if (backupUrl) {
                    console.log(`Trying backup URL: ${backupUrl}`);
                    fetchIP(backupUrl, elementId, isUserIP);
                } else {
                    document.getElementById(elementId).textContent = 'Failed to load IP';
                }
            });
    }

    const primaryAPI = 'https://ipinfo.io/json?token=709d1e6ff8b4dd';
    const backupAPI = 'https://ipgeolocation.abstractapi.com/v1/?api_key=580fefff964843d29ace169cf28648ff';

    fetchIP(primaryAPI, 'ip', backupAPI, true);

    function fetchSiteIP() {
        browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
            if (tabs[0] && tabs[0].url) {
                const url = new URL(tabs[0].url);
                const apiUrl = `https://dns.google/resolve?name=${url.hostname}&type=A`;

                console.log(`Fetching site IP for: ${url.hostname}`);
                console.log(`DNS API URL: ${apiUrl}`);

                fetchIP(apiUrl, 'site-ip');
            } else {
                console.error('No active tab found or tab URL is not available');
                document.getElementById('site-ip').textContent = 'Failed to get site IP';
            }
        }).catch(error => {
            console.error('Error querying tabs:', error);
            document.getElementById('site-ip').textContent = 'Failed to get site IP';
        });
    }

    fetchSiteIP();

    function storeSettings() {
        const dataTypes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.name);
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
        const isDarkMode = document.body.classList.toggle('dark-mode');
        document.documentElement.classList.toggle('dark-mode', isDarkMode);
        browser.storage.local.set({ darkMode: isDarkMode });
    });

    browser.storage.local.get('darkMode').then(data => {
        if (data.darkMode) {
            document.body.classList.add('dark-mode');
            document.documentElement.classList.add('dark-mode');
        }
    });

    let allChecked = false;
    document.getElementById('toggleSelect').addEventListener('click', () => {
        allChecked = !allChecked;
        document.querySelectorAll('.checkbox-container input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = allChecked;
        });
    });
});
