import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next'; // Import initReactI18next
import AppView from './app/AppView.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import '../src/components/themes/style.css';
import { ApolloProvider } from '@apollo/client';
import { getGraphQLClient } from './services/graphQLClient.js';
import translations_en from './Translations/en.json';

// Initialize i18next with initReactI18next
i18next
  .use(initReactI18next) // Use initReactI18next
  .init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: 'en', // language to use
    resources: {
      en: {
        translations: translations_en, // 'common' is our custom namespace
      },
    },
  });

const client = getGraphQLClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppView />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
