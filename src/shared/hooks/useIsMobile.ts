import { useEffect, useState } from "react"

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(() => {
                if(window.innerWidth <= 600) {
                    return true
                }
                else return false;
            })
        }
        window.addEventListener('resize', handleResize)

        return () =>{
            window.removeEventListener('resize', handleResize)
        }
    },[])


    return { isMobile }
}