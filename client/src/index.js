import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
class HelloWebComponent extends HTMLElement {
  connectedCallback() {
    const appContainer = document.createElement('div');
    this.appendChild(appContainer);
    ReactDOM.render(<App />, appContainer);
  }
}
customElements.define('customchat-bot', HelloWebComponent);
reportWebVitals();