export async function getBalance(account) {
  
  if (typeof ethereum !== undefined) {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      
      const balance = await ethereum.request({ method: 'eth_getBalance', params : [account, 'latest']})
      
      const parseBalance = parseInt(balance) / Math.pow(10, 18);      
      return parseBalance;
    } catch(err) {
      console.log(err);
    }
  } else {
    console.log('No ethereum');
  }
}
