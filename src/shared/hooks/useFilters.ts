import { useEffect, useState } from "react";
import { INotif } from "../../entities/notification";

export const useFilters = (arr: INotif[]) => {
    const [groupId, setGroupId] = useState(1);
    const [sort, setSort] = useState(1);
    const [filteredArr, setFilteredArr] = useState<INotif[]>([]);

    useEffect(() => {
        setFilteredArr( arr.filter(el => el.tags.some(({id}) => groupId === 1 || id === groupId)));
    }, [groupId, arr]);

    useEffect(() => {
        setFilteredArr(prev => prev.slice().reverse());
    }, [ sort ])
    // дописать что бы коректно работало не только при первом переключении 

    return { filteredArr, setGroupId, setSort };
};
