import dynamic from "next/dynamic";
import { tv, VariantProps } from "tailwind-variants";
import { ComponentProps } from "react";

const th = tv({
    base: 'text-[#999] text-left p-[12px]',
    variants:{
      
    }
  })
export type thProps = ComponentProps<'th'> & VariantProps<typeof th> & {

}

const THeader = ( {className }: thProps) => {
    return (
        
            <thead >
            <tr className="cel:hidden lg:flex lg:justify-between">
                <th className="text-[#999] text-left "aria-label="product image" />
                <th className="text-[#999] text-left ">PRODUTO</th>
                <th className="text-[#999] text-left ">QTD</th>
                <th className="text-[#999] text-left ">SUBTOTAL</th>
                <th className="text-[#999] text-left "aria-label='delete icon' />
            </tr>
            </thead>
        
        
    )
}
export default THeader;
// export default dynamic(() => Promise.resolve(THeader), { ssr: false });