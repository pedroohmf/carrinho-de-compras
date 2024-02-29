'use client';

import { api } from "@/services/api";
import { Product, Stock } from "@/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { toast } from "react-toastify";

interface CartProviderProps {
    children: ReactNode;
}

export interface UpdateProductAmountType {
    productId: number;
    amount: number;
}

interface CartProduct extends Product {
    amount: number;
}

interface CartContextData {
    cart: CartProduct[];
    addProduct: (productId: number) => Promise<void>;
    removeProduct: (productId: number) => void;
    updateProductAmount: ({productId, amount}: UpdateProductAmountType) => void;
}

const CartContext = createContext<CartContextData>( {} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
    const [ cart, setCart ] = useState<CartProduct[]>(()=> {

        if (typeof window !== 'undefined' && window.localStorage) {
        const storagedCart = localStorage.getItem('@RocketShoes:cart');
        if (storagedCart ) {
          return JSON.parse(storagedCart);
        }
    }
        return [];

    });

    const prevCartRef = useRef<Product[]>();

    useEffect(() => {
        prevCartRef.current = cart;
    });

    const cartPreviousValue = prevCartRef.current ?? cart;

    useEffect(()=> {

        if(cartPreviousValue !== cart) {
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));
        }

    }, [cart, cartPreviousValue]);
    
    const addProduct = async (productId: number) => {
        try {
            const cartUpdate = [...cart];                                                    //?_Criando uma cópia do carrinho (cart)
            const productExist =  cartUpdate.find( p => p.id === productId);                //?__Verificando se o item (passado pelo parâmetro "productId") existe na cópia do carrinho

            const stock = await api.get<Stock>(`/stock/${productId}`);                    //?____Pegando o stock do item (passado pelo parâmetro "productId")
            const stockAmount = stock.data.amount;                                       //?_____Pegando a quantidade de estoque do item
            const amountCurrent = productExist ? productExist.amount : 0;               //?______Se o producto existir, retorno a quantidade do produto "productExist.amount", caso contrário, retorna 0  
            const amount = amountCurrent + 1;                                          //?_______Adicionando mais um no amount do item no carrinho
            
            if(amount > stockAmount) {
                toast.error('Quantidade solicitada fora de estoque!');              //>_________Exibindo o erro caso o amount do item seja maior que a quantidade disponível em estoque
                return;                                                            //>__________Encerrando
            }

            if(productExist) {                                                  //>____________Verificando se o produto existe, caso não exista, retornaria -1        [LN:48] .find
                productExist.amount = amount;                                  //>_____________Adicionando mais um no amount do item existente
            } else {                                                          //>______________Caso retornar -1, (produto nao existe no cartUpdate)
                const product = await api.get(`/products/${productId}`);     //>_______________Pegando a lista de produtos na api
                const newProduct = {
                    ...product.data, //! Clonando a lista de produtos
                    amount: 1        //! 
                }
                cartUpdate.push(newProduct);                            //!                    Adicionando o novo produto no cartUpdate
            }
            setCart(cartUpdate);                                      //!                      Inserindo o valor do cartUpdate na state cart
        } catch {
            toast.error('Erro na adição do produto!');
        }
    };

    const removeProduct = (productId: number) => {
        try {
            const cartUpdated = [...cart];                                          //! Criando uma cópia do que tem no cart
            const productIndex = cartUpdated.findIndex( p => p.id === productId);  //!  Pegando o indíce do primeiro elemento com o id igual ao clicado "productId", retorna -1 caso não seja encontrado 
            if(productIndex >= 0) {                                               //!   Verificando se tem o item no carrinho
                cartUpdated.splice(productIndex, 1);                             //!    Removendo o item na cópia do cart no indice "proudctIndex" 
                setCart(cartUpdated);                                           //!     Setando o cart com as modificações da cópia do cart
            } else {                                                           
                throw Error();                                                //!       Saindo do try e indo pro catch
            }
        } catch {
            toast.error('Erro na remoção do produto!');
        }
    }
    
    const updateProductAmount = async ( {productId, amount}: UpdateProductAmountType) => {     //! Recebendo o ID e o AMOUNT do item a fazer o update
        try {
            if(amount <= 0) {                                                                //!   Verificando se o AMOUNT é menor ou igual á 0
                return;                                                                     //!    Saindo da função
            }

            const stock = await api.get(`/stock/${productId}`);                           //!      Pegando o Stock no id "productId"
            const stockAmount = stock.data.amount;                                       //!       Pegando a quantidade de stock do item
            if(amount > stockAmount) {                                                  //!        Verificando se o AMOUNT passado no parâmetro é maior que a quantidade disponível no stock do item
                toast.error('Quantidade solicitada fora de estoque!');                 //!         Exibindo o erro caso for maior que a quantidade disponível no stock do item
                return;                                                               //!          Saindo da função
            } 

            const cartUpdated = [...cart];                                         //!             Criando um cópia do cart
            const productExist = cartUpdated.find( p => p.id === productId);      //!              Pegando na copia do cart o item com o id igual ao "productId", caso não tenha, retorna -1

            if(productExist) {                                                  //!                Verificando se o produto existe  
                productExist.amount =  amount;                                 //!                 Modificando o amount do item com o valor do AMOUNT passado por parâmetro
                setCart(cartUpdated);                                         //!                  Setando a state cart com a cópia modificada do cart 
            } else {                                                         //!                   Caso o produto não exista
                throw Error();                                              //!                    Saindo do try e caindo no catch
            }
        } catch {
            toast.error('Erro na alteração da quantidade do produto!');                          
        }
    };
    return (
        <CartContext.Provider
            value={{ cart, addProduct, removeProduct, updateProductAmount }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextData {
    const context = useContext(CartContext);
    return context;
}