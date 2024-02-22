// export const web3 = new Web3('http://127.0.0.1:8545/');

class Transaction {
  constructor(from, to, value) {
    this.from = from,
    this.to = to,
    this.value = value
  }
}

const ethAddress = document.querySelector('#ethAddress');
const getBalanceBtn = document.querySelector('#getBalanceBtn');
const displayBalance = document.querySelector('#displayBalance');

const fromAddressInput = document.querySelector('#fromAddress');
const toAddressInput = document.querySelector('#toAddress');
const valueInput = document.querySelector('#value');

const sendTransactionBtn = document.querySelector('#sendEth');
const displayBlocks = document.querySelector('#displayBlocks');

function initApp() {
  console.log(web3);
}

let acccounts;

export async function getBalance(account) {
  
  if (typeof ethereum !== undefined) {
    try {
      acccounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      const balance = await ethereum.request({ method: 'eth_getBalance', params : [account, 'latest']})
      
      const parseBalance = parseInt(balance) / Math.pow(10, 18);
      if(displayBalance) displayBalance.innerHTML = `${parseBalance} ETH`;
      
      return parseBalance;
    } catch(err) {
      console.log(err);
    }
  } else {
    console.log('No ethereum');
  }
}

async function sendEthTransaction(from, to, amount) {
  const transaction = new Transaction(from, to, amount);

  try {
    // const blockAmount = Number(await web3.eth.getBlockNumber());
    // const sendTrx = await web3.eth.sendTransaction(transaction);
    await ethereum.request({ method: 'eth_sendTransaction', params: [transaction]});

    const getAllBlocks = await window.ethereum.request({
      "method": "eth_blockNumber",
      "params": []
    });

    console.log(Number(getAllBlocks));

    if(displayBlocks) displayBlocks.innerHTML = `Amount of blocks when tranaction was made: ${Number(getAllBlocks)} `;
    
    // console.log('sendTrx', sendTrx);
    // console.log('blockAmount', blockAmount);
  } catch(err) {
    console.log(err);
  }

  console.log(transaction);
  return transaction;
}

getBalanceBtn?.addEventListener('click', async () => {
  const account = ethAddress?.value;
  await getBalance(account);
});

sendTransactionBtn?.addEventListener('click', async () => {
  const fromAddress = fromAddressInput.value;
  const toAddress = toAddressInput.value;

  const parsedAmount = parseFloat(valueInput.value) * Math.pow(10, 18);
  const amount = Number(parsedAmount).toString(16);

  await sendEthTransaction(fromAddress, toAddress, amount);
});

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', initApp);
