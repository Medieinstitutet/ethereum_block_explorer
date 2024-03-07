export const getBlockAmount = async () => {
  try {
    const getBlockNumber = await window.ethereum.request({
      "method": "eth_blockNumber",
      "params": []
    });
  
    console.log(Number(getBlockNumber));
  
    return getBlockNumber;
  } catch(err) {
    console.log(err);
  }
}