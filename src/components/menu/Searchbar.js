import React, { useRef } from 'react';

const Searchbar = ({groups, setSearch}) => {
    const ref = useRef();
    const search = ref => {
        const input = ref.current;
        const searchSymbol = input.value.toUpperCase();
        const regex = new RegExp(searchSymbol);
        const filteredGroups = groups.map(group => group.filter(innerGroup => regex.test(innerGroup.s)));
        const resultGroup = filteredGroups.filter(group => group.length > 0).join();
        return resultGroup;
    }
    return <input type="text" name="search" id="search" ref={ref} onChange={() => search(ref)} />;
}
 
export default Searchbar;