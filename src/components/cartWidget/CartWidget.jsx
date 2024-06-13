import { BsCart4 } from "react-icons/bs";

const CartWidget = ({onClick}) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
         <BsCart4 color="blue" size={32} />
        
    </div>
  )
}

export default CartWidget