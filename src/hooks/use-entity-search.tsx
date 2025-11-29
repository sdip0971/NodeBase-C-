import {useEffect, useState} from "react"
import { pagination } from "@/config/constants"

interface UseEntitySearchProps<T extends {
    search : string,
    page : number
}> {
    params:T,
    setParams : (params:T)=>void,
    debounceMs?:number
}
export function useEntitySearch<T extends {
    search:string,
    page:number
} >({
    params,
    setParams,
    debounceMs =500
} : UseEntitySearchProps<T>){
    const [localSearch,setLocalSearch] = useState(params.search)
    useEffect(()=>{
        if(localSearch === "" && params.search !== ""){
            setParams({
                ...params,
                search : "",
                page : pagination.Default_Page
            })
            return;
        }
        const timer = window.setTimeout(()=>{
            if(localSearch !== params.search){
                setParams({
                    ...params,
                    search : localSearch,
                    page:pagination.Default_Page
                })
                return; 
            }
        }, debounceMs)
        return () => {
            clearTimeout(timer)
        }
    },[localSearch, params.search, setParams, debounceMs])

    useEffect(()=>{
        setLocalSearch(params.search)
    },[params.search]);
    return {
        searchValue : localSearch,
        onSearchChange : setLocalSearch
    };
};