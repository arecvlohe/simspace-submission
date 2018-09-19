// @flow
import React from "react";
import styled, { keyframes } from "styled-components";
import LazyLoad from "react-lazyload";
import { get, set } from "./store";

import { media, Loading } from "./theme";
import api from "./api";

import type { BreedImagesResponse } from "./models";

const Container = styled.div`
  margin-top: 20px;
`;

const show = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Image = styled.img.attrs({ src: props => props.url })`
  max-height: 300px;
  max-width: 300px;
  border: 3px solid #222;
  padding: 10px;
  animation: ${show} 1.5s forwards;

  ${media.tablet`

    max-width: 250px;
  `};
`;

const Grid4Across = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 10px;

  padding: 20px;
  border-radius: 3px;

  ${media.tablet`
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    justify-items: center;
  `};
`;

type Props = {
  breed?: string
};

type State = {
  loading: boolean,
  error: any,
  data: BreedImagesResponse
};

export default class extends React.Component<Props, State> {
  state = {
    loading: false,
    error: undefined,
    data: undefined
  };

  componentDidMount() {
    if (this.props.breed) {
      this.fetch();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.breed !== this.props.breed) {
      this.fetch();
    }
  }

  fetch() {
    const cache = get(this.props.breed || "");

    if (cache) {
      this.setState({ data: cache });
    } else {
      this.setState({ loading: true });
      fetch(api.breed(this.props.breed || ""))
        .then(response => response.json())
        .then(data => {
          this.props && this.props.breed && set(this.props.breed, data);
          this.setState({ data, loading: false });
        })
        .catch(error => this.setState({ error, loading: false }));
    }
  }

  render() {
    const { loading, error, data } = this.state;

    if (loading)
      return (
        <Container>
          <Loading h="500px">
            <h3>Loading...</h3>
          </Loading>
        </Container>
      );

    if (error) return <div>Sorry, there was an error :(</div>;

    if (data) {
      return (
        <Grid4Across>
          {data.message.map((url, index) => {
            return (
              <LazyLoad key={url} height={300}>
                <Image key={index} url={url} />
              </LazyLoad>
            );
          })}
        </Grid4Across>
      );
    }

    return null;
  }
}
