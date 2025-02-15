import { useContext, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { CartContext } from "@/components/CartContext";
import styled from "styled-components";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";

const PageWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  padding: 20px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #007bff;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const LoanCalculator = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 15px;
    font-size: 1.2rem;
  }

  label {
    display: block;
    margin-top: 10px;
    font-size: 0.9rem;
    color: #555;
  }

  input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    display: block;
  }

  button {
    margin-top: 15px;
    width: 100%;
  }
`;

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addProduct } = useContext(CartContext);

  // 1️⃣ Use SWR to fetch the product from our new API route
  const { data: product, error, isLoading } = useSWR(
    id ? `/api/product/${id}` : null,
    fetcher
  );

  // States for loan calculator
  const [downPayment, setDownPayment] = useState(0);
  const [years, setYears] = useState(1);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateLoan = () => {
    if (!product) return; // Safety check in case product isn't loaded yet
    const loanAmount = product.price - downPayment;
    const interestRate = 0.1;
    const monthlyRate = interestRate / 12;
    const months = years * 12;
    const payment =
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -months));
    setMonthlyPayment(payment.toFixed(2));
  };

  // 2️⃣ Render loading/error states before showing product
  return (
    <>
      <Header />
      <Center>
        <PageWrapper>
          <BackButton onClick={() => router.back()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </BackButton>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-60">
              {/* Animated spinner */}
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 mt-4 text-lg animate-fade-in">Loading product details...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-lg mx-auto shadow-md mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-red-600 mb-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              <p className="font-semibold text-lg">Oops! Something went wrong.</p>
              <p className="text-sm text-gray-600">Failed to load product. Please try again.</p>
              <button 
                onClick={() => mutate()} // Retry fetching data
                className="mt-3 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* Product Content (only if we have `product`) */}
          {product && !isLoading && !error && (
            <ColWrapper>
              <WhiteBox>
                <ProductImages images={product.images} />
              </WhiteBox>
              <div>
                <Title>{product.title}</Title>
                <p>{product.description}</p>
                <PriceRow>
                  <Price>
                    RM<big>{product.price}</big>
                  </Price>
                  <Button primary onClick={() => addProduct(product._id)}>
                    <CartIcon /> Add to cart
                  </Button>
                </PriceRow>
                <LoanCalculator>
                  <h3>Loan Calculator</h3>
                  <label>Down Payment</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={downPayment}
                    onChange={(e) =>
                      setDownPayment(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />
                  <label>Loan Duration (years)</label>
                  <input
                    type="number"
                    placeholder="Enter years"
                    value={years}
                    onChange={(e) =>
                      setYears(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />
                  <Button onClick={calculateLoan}>Calculate</Button>
                  {monthlyPayment && (
                    <p>
                      <strong>Monthly Payment:</strong> RM{monthlyPayment}
                    </p>
                  )}
                </LoanCalculator>
              </div>
            </ColWrapper>
          )}
        </PageWrapper>
      </Center>
    </>
  );
}
