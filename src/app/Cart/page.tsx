'use client';

import React from 'react';
import THeader from '@/components/THeader/page';
import TBody from '@/components/TBody/page';
import Header from '@/components/Header/page';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/util/format';

const Cart = (): JSX.Element => {
    const { cart } = useCart();
    const total = formatPrice(
        cart.reduce((sumTotal, product) => {
            return sumTotal + product.price * product.amount
        }, 0)
    )

    return (
        <>
            <Header />
            <div className='p-[30px] bg-white rounded-[4px]'>
                <table className='w-full '>
                    <THeader className='' />
                    <TBody />
                </table>

                <footer className='mt-[30px] flex justify-between items-center'>
                    <button type="button" className='bg-[#7159c1] text-white border-0 rounded-[4px] py-[12px] px-[20px] font-bold uppercase hover:bg-[#7159c1]/60'>Finalizar pedido</button>
                    <div className='flex items-baseline'>
                    <span className='text-zinc-700 font-bold'>TOTAL</span>
                    <strong className='text-[28px] ml-[5px] text-black'>{total}</strong>
                    </div>
                </footer>
            </div>
        </>
       
    );
};

export default Cart;