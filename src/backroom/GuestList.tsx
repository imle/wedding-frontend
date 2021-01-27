import React from 'react';
import type {Column, IdType} from 'react-table';
import CircularProgress from "@material-ui/core/CircularProgress";

import {Table} from './GuestList/Table';
import {makeData} from './GuestList/utils';
import {Invitee} from "../types/invitee";
import {EditableCheckboxCell, EditableTextCell} from "./GuestList/EditableCell";
import {APIHost} from "../data/api";
import {ErrorResponse, AllInviteesResponse} from "../types/responses";

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
  invitees: Invitee[];
  loading: boolean;
  error?: string;
}

export default class App extends React.Component<Props, State> {
  state: State = {
    invitees: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.getInvitees();
  }

  getInvitees = () => {
    fetch(`//${APIHost}/api/admin/v1/invitees/`)
      .then((response) => {
        if (response.status !== 200) throw response.status;

        return response.json()
      })
      .then((data: ErrorResponse | AllInviteesResponse) => {
        if ("error" in data) throw data;

        return data;
      })
      .then((data: AllInviteesResponse) => {
        let invitees: Invitee[] = [];
        data.parties.forEach((p) => p.edges.Invitees?.forEach((i) => {
          i.edges.Party = p;
          invitees.push(i);
        }));

        this.setState({
          invitees: invitees,
          loading: false,
        });
      })
      .catch((reason: number | ErrorResponse) => {
        let err: string;
        if (typeof reason === "number") {
          switch (reason) {
            case 404:
              err = "No guests found with that code."
              break;
            default:
              err = "Unknown error occurred."
          }
        } else {
          err = reason.error;
        }

        this.setState({
          error: err,
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
        data={this.state.invitees}
        onAdd={() => () => null}
        onEdit={() => () => null}
        onDelete={() => () => null}
        updateData={(rowIndex: number, columnId: IdType<Invitee>, value) => {
          this.setState({
            invitees: this.state.invitees.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...this.state.invitees[rowIndex],
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
