import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { InitialState } from './types/invoice';
import { INITIAL_STATE_ID, readInitialState } from './utils/initialState';
import './index.css';

const root = document.getElementById('root')!;
const serverState = document.getElementById(INITIAL_STATE_ID)?.textContent;

if (serverState) {
  // The worker rendered this page: hydrate with the exact state it used.
  const initial = JSON.parse(serverState) as InitialState;
  hydrateRoot(
    root,
    <StrictMode>
      <App initial={initial} />
    </StrictMode>,
  );
} else {
  // `vite dev` serves index.html without the worker.
  createRoot(root).render(
    <StrictMode>
      <App initial={readInitialState(window.location.search)} />
    </StrictMode>,
  );
}
