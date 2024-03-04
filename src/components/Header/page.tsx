import Link from "next/link"
import Image from "next/image";
import { MdShoppingBasket } from "react-icons/md";
import { useCart } from "@/hooks/useCart";
import { Suspense } from "react";
import { Product } from "@/types";

const Header = () => {
    const { cart } = useCart();

    const productsAmount = cart.length;

    return (
        <header className="cel:flex cel:flex-colflex justify-between items-center my-[50px]">
             <Link href="/" >
               <Image width={276} src={'/logo.svg'} height={36} alt="Rocketseat" />
            </Link>
            <Link href="/Cart" className="flex items-center text-decoration-none cel:flex cel:flex-row cel:justify-end cel:gap-1 cel:pt-[25px]">
                <div className="text-right mr-[10px] cel:mr-[2px]">
                    <strong className="block text-white">Meu Carrinho</strong>
                    <span className="text-[12px] text-[#999]" data-testid="cart-size">
                        <Suspense fallback="Carregando carrinho" >
                            {productsAmount === 1 ? `${productsAmount} item` : `${productsAmount} itens`}
                        </Suspense>
                    </span>
                </div>
                <MdShoppingBasket size={36} color="#fff" />
            </Link>
        </header>
    )
}

export default Header;