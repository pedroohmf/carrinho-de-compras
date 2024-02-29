import { useCart } from "@/hooks/useCart";
import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from "react-icons/md";

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
            <tbody key={item.id}>
            <tr data-testid="product">
            <td className="p-[12px] border-b-[1px] border-b-[#eee]">
                <img className="h-[100px]" src={item.image} alt={item.title} />
            </td>
            <td className="p-[12px] border-b-[1px] border-b-[#eee] text-left">
                <strong className=" text-[#333] block">{item.title}</strong>
                <span className="block mt-[5px] text-[18px] font-bold text-black">R$ {item.price}</span>
            </td>
            <td className="p-[12px] border-b-[1px] border-b-[#eee]">
                <div className="flex items-center">
                    <button 
                        className="bg-none border-0 p-[6px]"
                        type='button' 
                        data-testid="decrement-product" 
                        title='Diminuir a quantidade de produto'
                        disabled={item.amount <= 1}
                        onClick={()=> handleProductDecrement(item)}
                    >
                        <MdRemoveCircleOutline size={20} className="text-[#7159c1] hover:text-[#7159c1]/60" />
                    </button>
                    <input 
                        className="border-[1px] border-[#ddd] rounded-[4px] text-[#666] p-[6px] w-[50px] text-center"
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