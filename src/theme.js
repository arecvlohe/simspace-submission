import styled, { css, injectGlobal } from "styled-components";

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export const globalStyles = () => injectGlobal`
  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  }

  a {
    text-decoration: none;
  }
`;

export const Loading = styled.div`
  height: ${props => props.h || "110px"};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #eee;
  border-radius: 5px;
  color: #dfdfdf;
`;
