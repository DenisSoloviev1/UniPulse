import { useEffect, useState } from "react";
import { INotif } from "../../entities/notification";

export type sortType = 'desc' | 'asc'; 

export const useFilters = (arr: INotif[]) => {
    const [groupId, setGroupId] = useState(1);
    const [sort, setSort] = useState<sortType>('desc'); 
    const [filteredArr, setFilteredArr] = useState<INotif[]>([]);

    useEffect(() => {
        setFilteredArr( arr.filter(el => el.tags.some(({id}) => groupId === 1 || id === groupId)));
    }, [groupId, arr]);

    useEffect(() => {
        setFilteredArr(prev => prev.slice().reverse());
    }, [sort])


    // const s1 = (value: sortType) => {};

    return { filteredArr, setGroupId, setSort };
};
