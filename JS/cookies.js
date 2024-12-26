document.addEventListener('DOMContentLoaded', function () {
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieModal = document.getElementById('cookieSettingsModal');
    const overlay = document.getElementById('modalOverlay');
    const acceptAllButton = document.getElementById('acceptAllCookies');
    const declineAllButton = document.getElementById('declineAllCookies');
    const openSettingsButton = document.getElementById('openCookieSettings');
    const closeSettingsButton = document.getElementById('closeCookieSettings');
    const saveSettingsButton = document.getElementById('saveCookieSettings');
    const cookieForm = document.getElementById('cookieSettingsForm');
    const analyticsScript = document.getElementById('analyticsScript');

    const cookieExpirationDays = 365;
    let tempPreferences = {};

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEq = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEq) === 0) return c.substring(nameEq.length);
        }
        return "";
    }

    function showBanner() {
        cookieBanner.style.display = 'block';
    }

    function hideBanner() {
        cookieBanner.style.display = 'none';
    }

    function showModal() {
        saveTempPreferences();
        cookieModal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    function hideModal() {
        cookieModal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    function saveTempPreferences() {
        tempPreferences = {};
        Array.from(cookieForm.elements).forEach((input) => {
            if (!input.disabled) {
                tempPreferences[input.name] = input.checked;
            }
        });
    }

    function restoreTempPreferences() {
        Array.from(cookieForm.elements).forEach((input) => {
            if (tempPreferences[input.name] !== undefined) {
                input.checked = tempPreferences[input.name];
            }
        });
    }

    function savePreferences() {
        const preferences = {};
        Array.from(cookieForm.elements).forEach((input) => {
            if (!input.disabled) {
                preferences[input.name] = input.checked;
            }
        });
        setCookie('cookiePreferences', JSON.stringify(preferences), cookieExpirationDays);
        applyPreferences();
    }

    function loadPreferences() {
        const preferences = JSON.parse(getCookie('cookiePreferences')) || {};
        Array.from(cookieForm.elements).forEach((input) => {
            if (preferences[input.name] !== undefined) {
                input.checked = preferences[input.name];
            }
        });
    }

    function applyPreferences() {
        const preferences = JSON.parse(getCookie('cookiePreferences')) || {};
     
        if (preferences.analytics) {
            loadAnalyticsScript();
        }
        if (preferences.analytics) {
            if (analyticsScript && analyticsScript.getAttribute('data-active') === 'false') {
                gtag('js', new Date());
                gtag('config', 'UA-21776671-2');
          
                analyticsScript.setAttribute('data-active', 'true');
            }
        } else {
            if (analyticsScript) {
                analyticsScript.setAttribute('data-active', 'false');
                loadAnalyticsScript();
            }
        }
    }

    function hasAcceptedCookies() {
        const cookieAccepted = getCookie('cookiesAccepted') === 'true';
        const preferencesExist = getCookie('cookiePreferences') !== "";
        return cookieAccepted && preferencesExist;
    }

    function checkBannerState() {
        if (!hasAcceptedCookies()) {
            showBanner();
        } else {
            loadPreferences();
            applyPreferences();
            hideBanner();
        }
    }

    // Verificação inicial
    checkBannerState();

    acceptAllButton.addEventListener('click', function () {
        const preferences = { essential: true, analytics: true, marketing: true };
        setCookie('cookiePreferences', JSON.stringify(preferences), cookieExpirationDays);
        setCookie('cookiesAccepted', 'true', cookieExpirationDays);
        hideBanner();
        applyPreferences();
    });

    declineAllButton.addEventListener('click', function () {
        const preferences = { essential: true, analytics: false, marketing: false };
        setCookie('cookiePreferences', JSON.stringify(preferences), cookieExpirationDays);
        setCookie('cookiesAccepted', 'false', cookieExpirationDays);
        hideBanner();
        applyPreferences();
    });

    openSettingsButton.addEventListener('click', showModal);
    closeSettingsButton.addEventListener('click', function () {
        restoreTempPreferences();
        hideModal();
    });

    saveSettingsButton.addEventListener('click', function () {
        savePreferences();
        setCookie('cookiesAccepted', 'true', cookieExpirationDays); 
        hideModal(); 
        checkBannerState();
    });

    loadPreferences();
});

function loadAnalyticsScript() {
    if (!document.getElementById('analyticsScriptTag')) {
        const script = document.createElement('script');
        script.id = 'analyticsScriptTag';
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-21776671-2';
        document.head.appendChild(script);

        script.onload = function () {
   
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'UA-21776671-2');
        };
    }
}
