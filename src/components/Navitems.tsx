"use client"

import { PRODUCT_CATEGORIES } from "@/config"
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"


const Navitems = () => {
    const [activeIndex, setactiveIndex] = useState<null | number>(null)
    const isAnyOpen = activeIndex!== null
    useEffect (()=>{
      const handler =(e: KeyboardEvent)=>{
        if(e.key === "Escape"){
          setactiveIndex(null)
        }
      }
      document.addEventListener("keydown", handler)
      return()=>{
        document.removeEventListener("keydown", handler)
      }
    },[])
    const navRef = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(navRef, () => setactiveIndex(null))
    return (
    <div className="flex gap-4 h-full"  ref={navRef}>
      {PRODUCT_CATEGORIES.map((category,i)=>{
        const handleOpen = () =>{
          if(activeIndex === i){
            setactiveIndex(null)
          } else {
            setactiveIndex(i)
          }
        }
        const isOpen = i === activeIndex
        return(
          <NavItem  key={i}  category={category} handleOpen={handleOpen} isOpen={isOpen}  isAnyOpen={isAnyOpen} />
        )
      })}</div>
  )
}

export default Navitems