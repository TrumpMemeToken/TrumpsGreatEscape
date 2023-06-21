import { ethers, BigNumber } from "ethers";

const ERR_NO_WALLET = "No wallet found or permission denied";

declare global {
    var balance: number;
    var hasNFT: boolean;
    var selectedAddress: string;
    var provider: ethers.providers.Web3Provider;
    var signer: ethers.providers.JsonRpcSigner;
    var noWallet: boolean;
    var chainId: number;
    var changeEvent: number;
    var adReturn: string;
    var totalTokensStaked: number;
    var allowance: number;
    var leavePenalty: number;
    var spawnLocation: number;
    interface Window {
        ethereum: import('ethers').providers.ExternalProvider;
    }
}

const tokenContract   = "0x7c84d7e3829e004a49204d650883697bc7f06748";

export function init() {

    if( window.ethereum === undefined) {
        globalThis.noWallet = true;
        console.log("No wallet installed");
        return;
    }

    globalThis.provider = new ethers.providers.Web3Provider(window.ethereum);
    globalThis.balance = 0;
    globalThis.adReturn = "game-start";
    globalThis.selectedAddress = "0x000000000000000000000000000000000000dead";
    
    (window.ethereum as any).on( 'accountsChanged', function(accounts) {
      if( accounts.length > 0 ) {
        getCurrentAccount();
        globalThis.changeEvent ++;
      }
    });

    (window.ethereum as any).on( 'network', (newNet,oldNet) => {
      if(newNet.chainId == 1) {
        getCurrentAccount();
        globalThis.changeEvent ++;
      }
    });

    (window.ethereum as any).on( 'disconnect', (code,reason) => {
      if( globalThis.provider && globalThis.provider.close )
          globalThis.provider.close();
    });

}

export async function requestAccounts() {
  try { 
    await globalThis.provider.send("eth_requestAccounts", []);
  
    globalThis.signer = globalThis.provider.getSigner();
    
    globalThis.selectedAddress = await globalThis.signer.getAddress();
    
    globalThis.noWallet = false;
  }
  catch(e) {
    globalThis.noWallet = true;
    console.log(e);
  }
  
}

export async function disconnectAccount() {
  if( globalThis.noWallet ) {
    return;
 }

 if( globalThis.provider && globalThis.provider.close )
     globalThis.provider.close();
}

export async function getCurrentAccount() {
    if( globalThis.noWallet ) {
       return;
    }

    const { chainId } = await provider.getNetwork();

    globalThis.chainId = chainId;

    if(globalThis.chainId != 1) {
      console.log("Wallet is not connected with Ethereum: ", chainId);
      return;
    }

    await globalThis.provider.send("eth_requestAccounts", []);

    globalThis.signer = globalThis.provider.getSigner();
    // save the currently connected address
    globalThis.selectedAddress = await globalThis.signer.getAddress();
    
    const abi = [
        "function balanceOf(address account) external view returns (uint256)",
    ];
    
    // save the current balance
    const contract = new ethers.Contract(tokenContract, abi , globalThis.signer );     
    globalThis.balance = await contract.balanceOf( globalThis.selectedAddress );
    
}

export function isNotEligible(): boolean {
    return globalThis.noWallet || (globalThis.balance == 0 && !globalThis.hasNFT );
}
