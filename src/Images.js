// @flow
import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";

import api from "./api";

import type { BreedImagesResponse } from "./models";

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Image = styled.img.attrs({ src: props => props.url })`
  max-height: 300px;
  max-width: 300px;
`;

const Grid4Across = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  background-color: #ddd;
  padding: 20px;
  border-radius: 3px;
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
    this.setState({ loading: true });
    fetch(api.breed(this.props.breed || ""))
      .then(response => response.json())
      .then(data => this.setState({ data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    const { loading, error, data } = this.state;

    if (loading) return <Loading>Loading...</Loading>;

    if (error) return <div>Sorry, there was an error :(</div>;

    if (data) {
      return (
        <Grid4Across>
          {data.message.map((url, index) => {
            return (
              <LazyLoad height={300}>
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
