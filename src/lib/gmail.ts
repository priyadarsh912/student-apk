export const GAPI_scripts = {
    gapi: 'https://apis.google.com/js/api.js',
    gis: 'https://accounts.google.com/gsi/client',
};

export interface GmailMessage {
    id: string;
    threadId: string;
    snippet: string;
    payload?: {
        headers: { name: string; value: string }[];
        body?: { data: string };
        parts?: { body: { data: string }; mimeType: string }[];
    };
}

export interface GmailConfig {
    clientId: string;
    apiKey: string;
}

// Simplified variables - rely on window checks
let gapiLoadPromise: Promise<void> | null = null;

export const loadGoogleScripts = () => {
    if (gapiLoadPromise) return gapiLoadPromise;

    gapiLoadPromise = new Promise<void>((resolve, reject) => {
        let gapiLoaded = !!window.gapi;
        let gisLoaded = !!window.google;

        if (gapiLoaded && gisLoaded) {
            resolve();
            return;
        }

        const checkResolve = () => {
            if (gapiLoaded && gisLoaded) resolve();
        };

        if (!gapiLoaded) {
            const script1 = document.createElement('script');
            script1.src = GAPI_scripts.gapi;
            script1.async = true;
            script1.defer = true;
            script1.onload = () => {
                gapiLoaded = true;
                checkResolve();
            };
            script1.onerror = (e) => {
                console.error("Failed to load gapi script", e);
                reject(e);
            };
            document.body.appendChild(script1);
        }

        if (!gisLoaded) {
            const script2 = document.createElement('script');
            script2.src = GAPI_scripts.gis;
            script2.async = true;
            script2.defer = true;
            script2.onload = () => {
                gisLoaded = true;
                checkResolve();
            };
            script2.onerror = (e) => {
                console.error("Failed to load gis script", e);
                reject(e);
            };
            document.body.appendChild(script2);
        }
    });
    return gapiLoadPromise;
};

export const initializeGapiClient = async (config: GmailConfig) => {
    if (!window.gapi) {
        throw new Error("GAPI not loaded");
    }

    await new Promise<void>((resolve, reject) => {
        window.gapi.load('client', { callback: resolve, onerror: reject });
    });

    try {
        await window.gapi.client.init({
            apiKey: config.apiKey,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
        });
    } catch (error) {
        console.error("GAPI Init Error details:", error);
        throw error;
    }
};

export const getAccessToken = (config: GmailConfig): Promise<string> => {
    return new Promise((resolve, reject) => {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: config.clientId,
            scope: 'https://www.googleapis.com/auth/gmail.readonly',
            redirect_uri: window.location.origin,
            ux_mode: 'popup',
            callback: (resp: any) => {
                if (resp.error) {
                    reject(resp);
                    return;
                }
                resolve(resp.access_token);
            },
        });
        tokenClient.requestAccessToken({ prompt: '' });
    });
};

export const listMessages = async (count: number = 5) => {
    if (!window.gapi?.client?.gmail) {
        throw new Error("Gmail API not loaded. Please refresh the page.");
    }
    const response = await window.gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'maxResults': count,
    });
    return response.result.messages || [];
};

export const getMessage = async (messageId: string) => {
    if (!window.gapi?.client?.gmail) {
        throw new Error("Gmail API not loaded");
    }
    const response = await window.gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': messageId,
    });
    return response.result;
};

// Types for window
declare global {
    interface Window {
        gapi: any;
        google: any;
    }
}
