import { expect, test } from 'vitest';

let web3;
if (typeof window !== 'undefined') {
    web3 = (window).ethereum;
} else {
    console.error('Error: ethereum is not available.');
    web3 = null;
}

async function getBalance(account) {
  const balance = await web3.eth.getBalance(account);
  const fromWei = await web3.utils.fromWei(balance, 'ether')
  
  console.log(balance);
  return fromWei;
}

test('should be type of object', () => {
  expect(getBalance('0x143BC0b89403a4DD6A3Db15Bd5090F4a19C4be1C')).toBeTypeOf('object');
});


