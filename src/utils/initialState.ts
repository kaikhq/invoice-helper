import { InitialState } from '../types/invoice';
import { getTaiwanDate } from './dateUtils';

export const INITIAL_STATE_ID = 'initial-state';

// Reads the URL prefill parameters, keeping only what the inputs would accept.
export const readInitialState = (search: string, buyer = ''): InitialState => {
  const params = new URLSearchParams(search);
  return {
    today: getTaiwanDate(),
    uniformNumber: (params.get('uniformNumber') ?? '').replace(/\D/g, '').slice(0, 8),
    amount: (params.get('amount') ?? '').replace(/\D/g, ''),
    itemName: params.get('itemName') ?? '',
    buyer,
  };
};

// JSON for an inline <script>; escaping "<" keeps "</script>" in a value inert.
export const serializeInitialState = (state: InitialState): string =>
  JSON.stringify(state).replace(/</g, '\\u003c');
