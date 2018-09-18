// @flow
import React, { Fragment } from "react";
import styled from "styled-components";

import Fetch from "./Fetch";
import api from "./api";

import type { RenderProps, BreedsResponse } from "./models";

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.h1`
  color: #5353fd;
`;

const SearchWrapper = styled.div``;

const SearchInput = styled.input.attrs({ type: "search" })`
  width: 300px;
  height: 30px;
  text-indent: 10px;
  border: 0;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  box-shadow: 2px 2px 1px 1px #ddd;
`;

const Grid3x4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 10px;
`;

const BreedButton = styled.button.attrs({ type: "button" })`
  width: 100%;
  background-color: #ddd;
  border: 0;
  color: #222;
  height: 30px;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }
`;

type Props = {};

type State = {};

export default class extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <HeaderLayout>
          <Header>Dogs!</Header>
          <SearchWrapper>
            <SearchInput placeholder="Search" />
          </SearchWrapper>
        </HeaderLayout>
        <Fetch url={api.all}>
          {({ loading, error, data }: RenderProps<BreedsResponse>) => {
            if (loading) return <div>Loading...</div>;

            if (error)
              return (
                <div>
                  <div>Sorry, there was an error :(</div>
                  <div>{error}</div>
                </div>
              );

            if (data) {
              return (
                <Grid3x4>
                  {Object.keys(data.message)
                    .slice(0, 12)
                    .map(breed => {
                      if (data.message[breed].length) {
                        return (
                          <Fragment>
                            {data.message[breed].map(variant => {
                              return (
                                <div>
                                  <BreedButton>
                                    {variant} {breed}
                                  </BreedButton>
                                </div>
                              );
                            })}
                          </Fragment>
                        );
                      }
                      return (
                        <div>
                          <BreedButton>{breed}</BreedButton>
                        </div>
                      );
                    })}
                </Grid3x4>
              );
            }
          }}
        </Fetch>
      </div>
    );
  }
}
