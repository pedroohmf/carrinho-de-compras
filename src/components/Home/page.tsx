'use client';

import { useCart } from "@/hooks/useCart";
import { api } from "@/services/api";
import { Product } from "@/types";
import { formatPrice } from "@/util/format";
import { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";

interface ProductPriceFormated extends Product {
  priceFormatted: string;
}
interface CartItemsAmount {
  [key: number]: number;
}

const Home = () => {
  const { cart, addProduct } = useCart();
  const [ products, setProducts] = useState<ProductPriceFormated[]>([]);

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = {...sumAmount};
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount)

  useEffect(()=> {
    async function loadProducts() {
      const response = await api.get<Product[]>(`/products/${products}`); //! Pegando a lista de produtos
      const data = response.data.map( product => ({
        ...product,                                    //! Clonando o proprio produto
        priceFormatted: formatPrice(product.price)    //? Formatando o preço do produto
      }));
      setProducts(data);                            //! Setando os produtos com preço formatado
    }
    loadProducts();                               //! Iniciando a função
  }, [])
  
  function handleAddProduct (id: number) {
    addProduct(id);
  }

  return (
    <div>
      <ul className="cel:grid grid-cols-1 cel:mx-1 cel:justify-center cel:gap-[20px] lg:grid lg:grid-cols-3 lg:gap-[20px] list-none">
        {products.map(item => (
          <li key={item.id} className="lg:flex lg:flex-col cel:flex cel:flex-col cel:justify-center cel:items-center bg-white rounded-[4px] p-[20px] cel:p-[10px]">
          <img className="cel:self-center lg:max-w-[250px] cel:max-w-[180px] cel:min-w-[180px] cel:w-[180px]" src={item.image} alt={item.title} />
          <strong className="text-[16px] leading-[20px] mt-[5px] text-[#333] max-w-full cel:text-[14px]">{item.title}</strong>
          <span className="text-[21px] font-bold mx-[5px] my-[20px] text-black cel:text-[20px]">R$ {item.price}</span>
          <button
          className="bg-[#7159c1] text-white border-0 rounded-[4px] overflow-hidden mt-auto flex items-center hover:bg-[#7159c1]/60 cel:min-w-full"
          type="button"
          data-testid="add-product-button"
          onClick={() => handleAddProduct(item.id)}
        >
          <div data-testid="cart-product-quantity" className="flex items-center p-[12px] bg-black/10">
            <MdAddShoppingCart size={16} color="#FFF" className="mr-[5px]"/>
            {cartItemsAmount[item.id] || 0}
          </div>

          <span className="flex-1 text-center font-bold cel:text-[11px] cel:px-[7px] lg:text-[13px]">ADICIONAR AO CARRINHO</span>
        </button>
        </li>
        ))}
      </ul>
    </div>
  );
};
      
export default Home;