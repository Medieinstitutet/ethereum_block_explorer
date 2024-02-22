import { getBalance } from '../src/services/getBalance.js';
import { expect,test } from 'vitest';

test('getBalance function returns a balance greater than 0', async () => {
  // Mock the ethereum object
  global.ethereum = {
    request: async (params) => {
      if (params.method === 'eth_requestAccounts') {
        return ['0xAccount123'];
      } else if (params.method === 'eth_getBalance') {
        return '0x123'; // Mock balance response
      }
    }
  };

  // Call the getBalance function with a mock account address
  const balance = await getBalance('0xAccount123');

  // Assert that the balance is greater than 0
  expect(balance).toBeGreaterThan(0);
});