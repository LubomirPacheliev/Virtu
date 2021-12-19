import { createContext } from "react";
export const GuestCtx = createContext(null);
export default ({children}) => {
    const ctxAssets = [{id: 'btc', amount: 0.01, initialUSDT: 400, trades: 0}];
    const guestUSDT = 1000;
    return (
        <GuestCtx.Provider value={{ctxAssets, guestUSDT}} >
            {children}
        </GuestCtx.Provider>
    );
}