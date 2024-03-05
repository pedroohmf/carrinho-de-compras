import { useCart } from "@/hooks/useCart";

import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from "react-icons/md";


interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    amount: number;
}


const Table = () => {
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
    <table className="w-full">
       <thead >
            <tr className="hidden lg:grid grid-cols-[20%_30%_20%_20%_10%]">
                <th className="text-[#999] text-left "aria-label="product image" />
                <th className="text-[#999] text-left ">PRODUTO</th>
                <th className="text-[#999] text-left flex justify-center">QTD</th>
                <th className="text-[#999] text-left flex justify-center">SUBTOTAL</th>
                <th className="text-[#999] text-left "aria-label='delete icon' />
            </tr>
            </thead>
            
            {cart.map( item => (
                <tbody key={item.id} className="">
                    <tr data-testid="product" className="grid grid-cols-[45%_45%_10%] pb-6 mb-6 border-b-[1px] border-b-[#ddd] lg:grid lg:grid-cols-[20%_30%_20%_20%_10%]">
                        <td className="">
                            <img className="w-[75px] min-w-[75px] h-[75px] min-h-[75px] flex justify-center items-center lg:w-[100px] lg:h-[100px]" src={item.image} alt={item.title} />
                        </td>
                        <td className="text-black flex flex-col justify-center content-start text-left">  
                            <strong className="text-left text-[#61605a]">{item.title}</strong>
                            <span className="hidden lg:block font-bold text-[16px]">R$ {item.price}</span>
                        </td>
                        <td className="flex justify-center items-baseline lg:order-last"> 
                            <button 
                                className="absolut top-0 right-0"
                                type="button"
                                data-testid="remove-product"
                                title='Remover produto'
                                onClick={() => handleRemoveProduct(item.id)}
                            >
                                <MdDelete size={20} className="text-[#7159c1] hover:text-[#7159c1]/60" />
                            </button>
                        </td>

                        <td className="py-[15px] flex flex-row justify-center items-center"> 
                            <div className="flex justify-center items-center">
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
                                    className="border-[1px] border-[#ddd] rounded-[4px] w-[50px] text-center text-[#666] p-[6px] mr-[3px]"
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
                        <td className="py-[15px] flex justify-center items-center"> 
                            <strong className=" text-[#333] block ">R$ {item.price * item.amount} </strong>
                        </td>
                      
                    </tr>
            </tbody>
        ))}
    </table>
  );
};
      
export default Table;