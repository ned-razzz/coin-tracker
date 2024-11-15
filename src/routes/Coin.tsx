import { useParams } from "react-router-dom";
import { styled } from "styled-components";

export const Coin = () => {
  const { coinId } = useParams<{ coinId: string }>();
  return (
    <div>
      <h2>Coin: {coinId}</h2>
    </div>
  );
};
