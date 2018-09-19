// @flow
import React from "react";
import styled from "styled-components";
import { Router, Link } from "@reach/router";
import Hotkeys from "react-hot-keys";

import Fetch from "./Fetch";
import Images from "./Images";
import api from "./api";
import { media, Loading } from "./theme";

import type { RenderProps, BreedsResponse } from "./models";

const isActive = ({ isCurrent }) => {
  return isCurrent
    ? {
        style: {
          background: "rgb(181,126,255)",
          // eslint-disable-next-line no-dupe-keys
          background:
            "linear-gradient(90deg, rgba(181,126,255,1) 0%, rgba(97,88,255,1) 50%)",
          color: "#fff"
        }
      }
    : null;
};

const ActiveLink = ({ className, ...props }) => (
  <Link className={className} getProps={isActive} {...props} />
);

const Container = styled.section`
  padding: 20px;
`;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.tablet`
    padding-bottom: 20px;
    flex-direction: column;
  `};
`;

const Header = styled.h1`
  a {
    color: #5353fd;
  }
`;

const SearchWrapper = styled.div`
  ${media.tablet`
    width: 100%;
  `};
`;

const SearchInput = styled.input.attrs({ type: "search" })`
  width: 350px;
  height: 40px;
  text-indent: 10px;
  border: 0;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  box-shadow: 1px 1px 1px 1px #ddd;
  border-radius: 3px;

  &:active,
  &:focus {
    outline: none;
    box-shadow: 2px 2px 2px 2px #ddd;
  }

  ${media.tablet`
    width: 100%;
  `};
`;

const Grid4x3 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  min-height: 140px;

  ${media.tablet`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${media.phone`
    grid-template-columns: repeat(1, 1fr);
  `};
`;

const BreedLink = styled(ActiveLink)`
  width: 100%;
  display: flex;
  background-color: #ddd;
  justify-content: center;
  align-items: center;
  border: 0;
  color: #222;
  height: 40px;
  border-radius: 3px;

  &.active {
    color: red;
  }

  &:hover {
    cursor: pointer;
  }
`;

const NoSearchResultsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
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

  input: any;

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
  };

  handleKeyUp = (
    keyName: string,
    e: SyntheticKeyboardEvent<KeyboardEvent>,
    handle: () => mixed
  ) => {
    this.input.focus();
  };

  render() {
    return (
      <Hotkeys keyName="/" onKeyUp={this.handleKeyUp}>
        <Container>
          <HeaderLayout>
            <Header>
              <Link to="/">Dogs!</Link>
            </Header>
            <SearchWrapper>
              <SearchInput
                innerRef={el => (this.input = el)}
                placeholder="Search"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </SearchWrapper>
          </HeaderLayout>
          <Fetch url={api.all}>
            {({ loading, error, data }: RenderProps<BreedsResponse>) => {
              if (loading)
                return (
                  <Loading>
                    <h3>Loading...</h3>
                  </Loading>
                );

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
                      <NoSearchResultsWrapper>
                        <h2>No breed matches found.</h2>
                      </NoSearchResultsWrapper>
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
        </Container>
      </Hotkeys>
    );
  }
}
