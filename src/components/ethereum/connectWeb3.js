const connectButton = document.querySelector('#connect');

async function connect() {
  try {
    if(typeof window.ethereum !== undefined) {
      console.log('Connected to ethereum');
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      console.log(accounts);
    } else {
      console.log('you must have metamask to connect');
    }
  } catch(err) {
    console.log(err);
  }
}

connectButton.addEventListener('click', connect);