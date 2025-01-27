import RainbowProvider from '@/utils/rainbow/rainbowKit';
import { ReactNode } from 'react';
import { GlobalContextProvider } from './mainContext/mainContextProvider';

export default function Providers({children}:{children:ReactNode}){
    return(
        <GlobalContextProvider>
            <RainbowProvider>
                {children}
            </RainbowProvider>
        </GlobalContextProvider>
    )

}