import React from 'react';
import type {Column, IdType} from 'react-table';
import CircularProgress from "@material-ui/core/CircularProgress";

import {Table} from './Table';
import {makeData} from './utils';
import {Invitee} from "../../types/invitee";
import {EditableCheckboxCell, EditableTextCell} from "./Table/EditableCell";

const columns: Column<Invitee>[] = [
  {
    Header: 'Name',
    accessor: 'name',
    aggregate: 'count',
    minWidth: 50,
    Cell: EditableTextCell,
  },
  {
    Header: 'Group Name',
    accessor: (d) => d.edges.Party?.name,
    aggregate: 'uniqueCount',
    filter: 'fuzzyText',
    minWidth: 50,
    Cell: EditableTextCell,
  },
  {
    Header: 'Plus One',
    accessor: (d) => d.plus_one_name || "",
    minWidth: 50,
    Cell: EditableTextCell,
  },
  {
    Header: 'Email',
    accessor: 'email',
    minWidth: 50,
    Cell: EditableTextCell,
  },
  {
    Header: 'RSVP',
    accessor: "rsvp_response",
    width: 80,
    minWidth: 80,
    align: "right",
    Cell: EditableCheckboxCell,
  },
];

interface Props {

}

interface State {
  data: Invitee[];
  loading: boolean;
}

export default class App extends React.Component<Props, State> {
  state: State = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });

    makeData(20).then((data) => {
      this.setState({
        data: data,
        loading: false,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <CircularProgress/>
      );
    }

    return (
      <Table<Invitee>
        name={'guest-list'}
        columns={columns}
        data={this.state.data}
        onAdd={() => () => null}
        onEdit={() => () => null}
        onDelete={() => () => null}
        updateData={(rowIndex: number, columnId: IdType<Invitee>, value) => {
          this.setState({
            data: this.state.data.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...this.state.data[rowIndex],
                  [columnId]: value,
                }
              }
              return row
            }),
          });
        }}
      />
    );
  }
}
