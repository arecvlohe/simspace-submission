// @flow
import React from "react";
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

const Grid4x3 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  min-height: 110px;
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

const getBreedName = breed =>
  breed.variant ? `${breed.variant} ${breed.breed}` : breed.breed;

type Props = {};

type State = {
  search: string
};

export default class extends React.Component<Props, State> {
  state = {
    search: ""
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <div>
        <HeaderLayout>
          <Header>Dogs!</Header>
          <SearchWrapper>
            <SearchInput
              placeholder="Search"
              value={this.state.search}
              onChange={this.handleChange}
            />
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
              const filterAndSortBreeds = Object.keys(data.message)
                .reduce((acc, breed) => {
                  if (data.message[breed].length) {
                    data.message[breed].forEach(variant => {
                      acc.push({ breed, variant });
                    });
                  }

                  acc.push({ breed, variant: undefined });

                  return acc;
                }, [])
                .filter(({ breed, variant }) => {
                  return `${variant || ""} ${breed}`
                    .trim()
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase().trim());
                })
                .sort((a, b) => {
                  const breedA = getBreedName(a);
                  const breedB = getBreedName(b);

                  return breedA < breedB ? -1 : 1;
                })
                .slice(0, 12);

              return (
                <Grid4x3>
                  {filterAndSortBreeds.length < 1 ? (
                    <div>No breeds found</div>
                  ) : (
                    filterAndSortBreeds.map(({ breed, variant }) => {
                      return (
                        <div key={`${breed}-${variant || ""}`}>
                          <BreedLink
                            to={variant ? `${breed}-${variant}` : breed}
                          >
                            {variant} {breed}
                          </BreedLink>
                        </div>
                      );
                    })
                  )}
                </Grid4x3>
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
