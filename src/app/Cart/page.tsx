'use client';

import React from 'react';
import THeader from '@/components/THeader/page';
import TBody from '@/components/TBody/page';
import Header from '@/components/Header/page';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/util/format';
import Table from '@/components/Table/page';

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
                <Table />
                <footer className='mt-[30px] flex justify-between items-center'>
                    <button type="button" className='bg-[#7159c1] text-white border-0 rounded-[4px] lg:py-[12px] lg:px-[20px] font-bold uppercase hover:bg-[#7159c1]/60 cel:text-[8px] cel:py-[8px] cel:px-[10px]'>Finalizar pedido</button>
                    <div className='flex items-baseline'>
                    <span className='text-zinc-700 font-bold cel:text-[12px] ml-[2px]'>TOTAL</span>
                    <strong className='text-[28px] ml-[5px] text-black cel:text-[13px]'>{total}</strong>
                    </div>
                </footer>
            </div>
        </>
       
    );
};

export default Cart;