const web3 = new Web3(window.ethereum);

interface Transaction {
  from: string;
  to: string;
  value: number;
  gas: string;
}

const ethAddress: HTMLInputElement | null = document.querySelector('#ethAddress');
const getBalanceBtn: HTMLButtonElement | null = document.querySelector('#getBalanceBtn');
const displayBalance: HTMLParagraphElement | null = document.querySelector('#displayBalance');

const fromAddressInput: HTMLInputElement | null = document.querySelector('#fromAddress');
const toAddressInput: HTMLInputElement | null = document.querySelector('#toAddress');
const valueInput: HTMLInputElement | null = document.querySelector('#value');

const sendTransactionBtn: HTMLButtonElement | null = document.querySelector('#sendEth');
const displayBlocks: HTMLParagraphElement | null = document.querySelector('#displayBlocks');

function initApp() {
  console.log(web3);
}

async function getBalance(account: string): Promise<number> {
  const balance: number = await web3.eth.getBalance(account);

  try {
    if(displayBalance) displayBalance.innerHTML = `${web3.utils.fromWei(balance, 'ether')} ETH`;
  } catch(err) {
    console.log(err);
  }
  
  console.log(balance);
  return balance;
}

async function sendEthTransaction(to: string, from: string, amount: number): Promise<Transaction> {
  const tranaction: Transaction = {
    from: from,
    to: to,
    value: amount,
    gas: await web3.eth.estimateGas()
  }

  try {
    const blockAmount = Number(await web3.eth.getBlockNumber());
    const sendTrx = await web3.eth.sendTransaction(tranaction);

    if(displayBlocks) displayBlocks.innerHTML = `Amount of blocks when tranaction was made: ${blockAmount.toString()} `;
    
    console.log('sendTrx', sendTrx);
    console.log('blockAmount', blockAmount);
  } catch(err) {
    console.log(err);
  }

  console.log(tranaction);
  return tranaction;
}

getBalanceBtn?.addEventListener('click', async () => {
  const account: string | undefined = ethAddress?.value as string;
  await getBalance(account);
});

sendTransactionBtn?.addEventListener('click', async () => {
  const amount: number = Number(web3.utils.toWei(valueInput?.value, 'ether'));
  const toAddress: string | undefined = toAddressInput?.value as string;
  const fromAddress: string | undefined = fromAddressInput?.value as string;

  await sendEthTransaction(toAddress, fromAddress, amount);
});

document.addEventListener('DOMContentLoaded', initApp);
