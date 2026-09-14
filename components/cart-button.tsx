"use client";
import type { CartItem } from "@/types"; import { useRouter } from "next/navigation";
export function AddToCart({item}:{item:CartItem}){const router=useRouter();function add(){const current:CartItem[]=JSON.parse(localStorage.getItem("vanta-cart")||"[]");if(!current.some(x=>x.domain===item.domain)){localStorage.setItem("vanta-cart",JSON.stringify([...current,item]))}router.push("/cart")}return <button onClick={add} className="button">Add to cart</button>}
