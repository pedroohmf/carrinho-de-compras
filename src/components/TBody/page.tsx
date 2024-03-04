import { useCart } from "@/hooks/useCart";
import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from "react-icons/md";
import dynamic from 'next/dynamic';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    amount: number;
}

const TBody = () => {
    const { cart, updateProductAmount, removeProduct }  = useCart();

    function handleProductIncrement(product: Product) {
        updateProductAmount({productId: product.id, amount: product.amount + 1})
    }

    function handleProductDecrement(product: Product) {
        updateProductAmount({productId: product.id, amount: product.amount - 1})
    }

    function handleRemoveProduct(productId: number) {
        removeProduct(productId);
    }

    return (
        cart.map( item => (
            <tbody key={item.id} className="">
            <tr data-testid="product" className="cel:grid cel:grid-cols-2 cel:grid-rows-3 cel:gap-[5px] cel:justify-center cel:items-center">
            <td className="cel:max-w-[100px] cel:col-span-1 cel:row-span- p-[12px] cel:p-[8px] lg:border-b-[1px] border-b-[#eee] w-[80px] h-[80px] flex justify-center items-center">
                <img className="cel:h-[50px] lg:h-[100px] h-[100px] w-[100px]" src={item.image} alt={item.title} />
            </td>
            <td className="p-[12px] cel:p-[6px] border-b-[1px] border-b-[#eee] text-left">  
                <strong className=" text-[#333] block">{item.title}</strong>
                <span className="block cel:hidden cel:text-[15px] cel:mt-[3px] mt-[5px] text-[18px] font-bold text-black">R$ {item.price}</span>
            </td>
            <td className="p-[12px] cel:p-[8px] border-b-[1px] border-b-[#eee]"> 
                <div className="flex items-center cel:flex-col">
                    <button 
                        className="bg-none border-0 p-[6px] cel:p-[4px]"
                        type='button' 
                        data-testid="decrement-product" 
                        title='Diminuir a quantidade de produto'
                        disabled={item.amount <= 1}
                        onClick={()=> handleProductDecrement(item)}
                    >
                        <MdRemoveCircleOutline size={20} className="text-[#7159c1] hover:text-[#7159c1]/60" />
                    </button>
                    <input 
                        className="border-[1px] border-[#ddd] rounded-[4px] text-[#666] p-[6px] cel:-p[6px] lg:w-[50px] cel:w-[40px] text-center"
                        type="text" 
                        data-testid="product-amount" 
                        readOnly 
                        value={item.amount}
                        title='Quantidade de produto'
                    />
                    <button 
                        type="button"
                        data-testid="increment-product"
                        title='Adicionar mais um produto'
                        onClick={() => handleProductIncrement(item)}
                    >
                        <MdAddCircleOutline size={20} className="text-[#7159c1] hover:text-[#7159c1]/60"  />
                    </button>
                </div>
            </td>
            <td className="p-[12px] border-b-[1px] border-b-[#eee]"> 
                <strong className=" text-[#333] block ">R$ {item.price}</strong>
            </td>
            <td className="p-[12px] border-b-[1px] border-b-[#eee]"> 
                <button 
                    type="button"
                    data-testid="remove-product"
                    title='Remover produto'
                    onClick={() => handleRemoveProduct(item.id)}
                >
                    <MdDelete size={20} className="text-[#7159c1] hover:text-[#7159c1]/60" />
                </button>
            </td>
            </tr>
        </tbody>
        ) )

    )};

export default TBody;