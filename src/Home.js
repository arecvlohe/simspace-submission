// @flow
import React, { Fragment } from "react";
import styled from "styled-components";
import { Router, Link } from "@reach/router";

import Fetch from "./Fetch";
import Images from "./Images";
import api from "./api";

import type { RenderProps, BreedsResponse } from "./models";

const isActive = ({ isCurrent }) => {
  return isCurrent
    ? {
        style: {
          background: "rgb(181,126,255)",
          // eslint-disable-next-line no-dupe-keys
          background:
            "linear-gradient(90deg, rgba(181,126,255,1) 0%, rgba(97,88,255,1) 50%)"
        }
      }
    : null;
};

const ActiveLink = ({ className, ...props }) => (
  <Link className={className} getProps={isActive} {...props} />
);

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

const BreedLink = styled(ActiveLink)`
  width: 100%;
  display: flex;
  background-color: #ddd;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  border: 0;
  color: #222;
  height: 30px;
  border-radius: 3px;

  &.active {
    color: red;
  }

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
                                <div key={variant}>
                                  <BreedLink to={`${breed}-${variant}`}>
                                    {variant} {breed}
                                  </BreedLink>
                                </div>
                              );
                            })}
                          </Fragment>
                        );
                      }
                      return (
                        <div key={breed}>
                          <BreedLink to={breed}>{breed}</BreedLink>
                        </div>
                      );
                    })}
                </Grid3x4>
              );
            }
          }}
        </Fetch>
        <Router>
          <Images path=":breed" />
        </Router>
      </div>
    );
  }
}
