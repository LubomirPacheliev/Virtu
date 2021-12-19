import { createContext } from "react";
export const GuestCtx = createContext(null);
export default ({children}) => {
    const ctxAssets = [];
    const guestUSDT = 1000;
    return (
        <GuestCtx.Provider value={{ctxAssets, guestUSDT}} >
            {children}
        </GuestCtx.Provider>
    );
}