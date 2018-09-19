// @flow
import React from "react";
import styled from "styled-components";
import type { Node } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

type Props = {
  children: Node
};

type State = {
  hasError: boolean
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <h1>
            Something went wrong.{" "}
            <span role="img" aria-label="sad face">
              😞
            </span>
          </h1>
        </Container>
      );
    }
    return this.props.children;
  }
}
