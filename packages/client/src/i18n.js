import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import config from "./infrastructure/config";

import Backend from 'i18next-xhr-backend';

//import Backend from 'i18next-locize-backend';
//import LocizeEditor from 'locize-editor';

i18n
    .use(Backend)
    .use(LanguageDetector)
    // .use(LocizeEditor)
    .init({
        fallbackLng: 'en',

        // have a common namespace used around the full app
        ns: ['common'],
        defaultNS: 'common',

        debug: !config.isProduction,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        react: {
            wait: true
        },
/*
        saveMissing: true,
        referenceLng: 'en',
        editor: {
            enabled: true,
        },
        appendNamespaceToCIMode: true,
        backend: {
            projectId: '420c620b-618b-4133-bb28-72c42f4fbe2f',
            apiKey: '6c9a887f-5140-49dc-9063-44d7b860349e',
            referenceLng: 'en'
        }
*/
    });


export default i18n;