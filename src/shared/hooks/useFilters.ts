import { useEffect, useState } from "react";
import { INotif } from "../../entities/notification";

export type sortType = 'desc' | 'asc'; 

export const useFilters = (arr: INotif[]) => {
    const [groupId, setGroupId] = useState(1);
    const [sort, setSort] = useState<sortType>('desc'); 
    const [filteredArr, setFilteredArr] = useState<INotif[]>([]);
    const [initializedSort, setInitializedSort] = useState(false);

    useEffect(() => {
        setFilteredArr( arr.filter(el => el.tags.some(({id}) => groupId === 1 || id === groupId)));
    }, [groupId, arr]);

    useEffect(() => {
        if(!initializedSort) {
            setInitializedSort(true);
            return
        }

        setFilteredArr(prev => prev.slice().reverse());
        
    }, [sort])

    return { filteredArr, setGroupId, setSort };
};
