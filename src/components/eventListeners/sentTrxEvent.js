import { sendEthTransaction } from "../ethereum/sendEthTransaction.js";
import { getBlockAmount } from "../ethereum/getBlockAmount.js";

export const sendTrxEvent = async (sendTransactionBtn, fromAddressInput, toAddressInput, valueInput, displayBlocks) => {
  sendTransactionBtn.addEventListener('click', async () => {
    const fromAddress = fromAddressInput.value;
    const toAddress = toAddressInput.value;
  
    const parsedAmount = parseFloat(valueInput.value) * Math.pow(10, 18);
    const amount = Number(parsedAmount).toString(16);
  
    const sentTrx = await sendEthTransaction(fromAddress, toAddress, amount);
    if(sentTrx) displayBlocks.innerHTML = `Amount of blocks when tranaction was made: ${Number(await getBlockAmount())} `;
  });
}