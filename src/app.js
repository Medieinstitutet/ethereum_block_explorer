import { getBalanceEvent } from "./components/eventListeners/getBalanceEvent.js";
import { sendTrxEvent } from "./components/eventListeners/sentTrxEvent.js";

const getBalanceBtn = document.querySelector('#getBalanceBtn');
const ethAddress = document.querySelector('#ethAddress');
const displayBalance = document.querySelector('#displayBalance');

const sendTransactionBtn = document.querySelector('#sendEth');

const fromAddressInput = document.querySelector('#fromAddress');
const toAddressInput = document.querySelector('#toAddress');
const valueInput = document.querySelector('#value');

const displayBlocks = document.querySelector('#displayBlocks');

const initApp = async () => {
  await getBalanceEvent(getBalanceBtn, ethAddress, displayBalance);
  await sendTrxEvent(sendTransactionBtn, fromAddressInput, toAddressInput, valueInput, displayBlocks);
}

document.addEventListener('DOMContentLoaded', initApp);