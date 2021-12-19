import { createContext, useState } from "react";
export const GuestCtx = createContext(null);
export default ({children}) => {
    const [ctxAssets, setCtxAssets] = useState([{id: 'btc', amount: 0.01, initialUSDT: 400, trades: 0}]);
    const [guestUSDT, setUSDT] = useState(1000);
    return (
        <GuestCtx.Provider value={{ctxAssets, guestUSDT, setCtxAssets, setUSDT}} >
            {children}
        </GuestCtx.Provider>
    );
}