const web3 = new Web3(window.ethereum);

const getBalanceInput: HTMLInputElement | null = document.querySelector('#ethAddress');
const getBalanceBtn: HTMLButtonElement | null = document.querySelector('#getBalanceBtn');
const displayBalance: HTMLParagraphElement | null = document.querySelector('#displayBalance');

const valueInput: HTMLInputElement | null = document.querySelector('#value');
const fromAddressInput: HTMLInputElement | null = document.querySelector('#fromAddress');
const toAddressInput: HTMLInputElement | null = document.querySelector('#toAddress');
const sendTransactionBtn: HTMLButtonElement | null = document.querySelector('#sendEth');
const displayBlocks: HTMLParagraphElement | null = document.querySelector('#displayBlocks');
const transactionList: HTMLParagraphElement | null = document.querySelector('#transactions');

function initApp() {
  console.log(web3);
}

async function getBalance() {
  const accountBalance = getBalanceInput ? getBalanceInput.value : '';
  
  const balance = await web3.eth.getBalance(accountBalance);
  if(displayBalance) displayBalance.innerHTML = `${web3.utils.fromWei(balance, 'ether')} ETH`;
}


async function sendEthTransaction() {
  try {
    const blockAmount = Number(await web3.eth.getBlockNumber());
    const sendTrx = await web3.eth.sendTransaction({
      from: fromAddressInput ? fromAddressInput.value : '',
      to: toAddressInput ? toAddressInput.value : '',
      value: Number(web3.utils.toWei(valueInput ? valueInput.value: '', 'ether')),
      gas: web3.eth.estimateGas()
    });

    if(displayBlocks) displayBlocks.innerHTML = `Amount of blocks when tranaction was made: ${blockAmount.toString()} `;
    
    console.log('sendTrx', sendTrx);
    console.log('blockAmount', blockAmount);
  } catch(err) {
    console.log(err);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
if(getBalanceBtn) getBalanceBtn.addEventListener('click', getBalance);
if(sendTransactionBtn) sendTransactionBtn.addEventListener('click', sendEthTransaction);