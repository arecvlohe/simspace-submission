// @flow
import React from "react";
import "whatwg-fetch";

import type { Node } from "react";

type Props = {
  url: string,
  children: ({
    loading: boolean,
    error: any,
    data: any,
    fetch: () => mixed
  }) => Node
};

type State = {
  loading: boolean,
  error: any,
  data: any
};

export default class extends React.Component<Props, State> {
  state = {
    loading: false,
    error: undefined,
    data: undefined
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.fetch();
  }

  fetch() {
    fetch(this.props.url, { method: "GET" })
      .then(response => response.json())
      .then(data => this.setState({ data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    return (
      <div>{this.props.children({ ...this.state, fetch: this.fetch })}</div>
    );
  }
}
