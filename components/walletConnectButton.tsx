"use client"

import { fetchFrostBal } from '@/utils/handlers/fetchFrostBal';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const WalletConnectButton = () => {

  const[frost, setFrost] = useState<number>(0);

  const{address} = useAccount();

  useEffect(()=>{

    const fetch = async () => {
      const bal = await fetchFrostBal(address as string);
      setFrost(bal as number);
    }

    if(address){
      fetch();
    }
  },[address])

  return (
    <div className='max-md:w-full max-md:flex max-md:justify-center'>
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className='bg-icePurp text-white rounded-full hover:-translate-y-1 duration-200 px-4 h-10 font-bold'>
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className='bg-red-500 text-white rounded-full hover:-translate-y-1 duration-200 px-4 h-10 font-bold'>
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 0 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className=' rounded-full'
                  >
                    {/* {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 38,
                          height: 38,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 0,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 38, height: 38 }}
                          />
                        )}
                      </div>
                    )} */}
                    {/* {chain.name} */}
                  </button>
                  <button title='Click to view address' onClick={openAccountModal} type="button" className='bg-white flex items-center justify-center border-2 h-10 border-icePurp text-icePurp font-bold rounded-full px-3 py-1 transform transition duration-300 ease-in-out hover:-translate-y-1 '>
                    {account.displayName} | {frost ? frost.toLocaleString() : <div className='h-6 w-10 mx-2 rounded-lg bg-icePurp/30 animate-pulse'></div>} $FROST
                    {/* {account.displayBalance
                      ? ` ${account.displayBalance.slice(0,account.displayBalance.length-5)} $POL`
                      : ''} */}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
    </div>
  );
};