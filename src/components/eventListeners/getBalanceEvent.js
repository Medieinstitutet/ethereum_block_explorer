import { getBalance } from "../ethereum/getBalance.js";

export const getBalanceEvent = async (getBalanceBtn, ethAddress, displayBalance) => {
  getBalanceBtn.addEventListener('click', async () => {
    const account = ethAddress.value;
    const balance = await getBalance(account);
    
    console.log(balance);
    if(displayBalance) displayBalance.innerHTML = `${balance} ETH`;
  });
}