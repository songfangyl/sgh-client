import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;
export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then(response => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  async function bookViewing() {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time for booking.");
      return;
    }

    try {
      const response = await axios.post("/api/bookings", {
        products: cartProducts,
        date: selectedDate,
        time: selectedTime,
      });

      if (response.status === 201) {
        alert(`Booking confirmed for ${selectedDate} at ${selectedTime}.`);
        setIsSuccess(true);
        clearCart();
      } else {
        alert("Failed to book a viewing. Please try again.");
      }
    } catch (error) {
      console.error("Error booking:", error);
      alert("An error occurred. Please try again.");
    }
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Booking Confirmed!</h1>
              <p>We will contact you to confirm the appointment.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => removeProduct(product._id)}>-</Button>
                        {cartProducts.filter(id => id === product._id).length}
                        <Button onClick={() => addProduct(product._id)}>+</Button>
                      </td>
                      <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Book a Viewing</h2>
              <Input type="date" value={selectedDate} onChange={ev => setSelectedDate(ev.target.value)} />
              <Input type="time" value={selectedTime} onChange={ev => setSelectedTime(ev.target.value)} />
              <Button black block onClick={bookViewing}>Confirm Booking</Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
