import { useEffect, useState } from "react";
import { INotif } from "../../entities/notification";

export type SortType = 'desc' | 'asc'; 

export const useFilters = (arr: INotif[]) => {
    const [groupId, setGroupId] = useState(1);
    const [sort, setSort] = useState<SortType>('desc'); 
    const [filteredArr, setFilteredArr] = useState<INotif[]>([]);    
    const [initializedSort, setInitializedSort] = useState(false);

    // Функция для фильтрации массива по groupId
    const filterArray = (data: INotif[], id: number) => {
        return data.filter(el => el.tags.some(({id: tagId}) => id === 1 || tagId === id));
    };

    // Функция для сортировки массива по sort
    const sortArray = (data: INotif[], order: SortType) => {
        if (order === 'asc') {
            return [...data].sort((a, b) => new Date(a.time || 0).getTime() - new Date(b.time || 0).getTime());
        } else {
            return [...data].sort((a, b) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime());
        }
    };

    useEffect(() => {
        // Фильтрация массива по groupId
        let filteredData = filterArray(arr, groupId);
        
        // Если сортировка уже была инициализирована, применяем её
        if (initializedSort) {
            filteredData = sortArray(filteredData, sort);
        }

        setFilteredArr(filteredData);
    }, [groupId, arr, initializedSort, sort]);

    useEffect(() => {
        if (!initializedSort) {
            setInitializedSort(true);
            return;
        }

        // Сортировка массива при изменении сортировки
        setFilteredArr(prev => sortArray(prev, sort));
    }, [sort]);

    return { filteredArr, setGroupId, setSort };
};