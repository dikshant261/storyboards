import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './i18n.jsx';
createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(StrictMode, null, /*#__PURE__*/React.createElement(App, null)));