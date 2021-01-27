import React from "react";
import type {Column, IdType} from "react-table";
import {withSignOut} from "react-auth-kit";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "../data/axios";
import {Table} from "./GuestList/Table";
import {Invitee} from "../types/invitee";
import {EditableCheckboxCell, EditableTextCell} from "./GuestList/EditableCell";
import {ErrorResponse, AllInviteesResponse} from "../types/responses";
import Typography from "@material-ui/core/Typography";

const columns: Column<Invitee>[] = [
  {
    Header: "Name",
    accessor: "name",
    aggregate: "count",
    minWidth: 50,
    Cell: EditableTextCell,
  },
  {
    Header: "Group Name",
    accessor: (d) => d.edges.Party?.name,
    aggregate: "uniqueCount",
    filter: "fuzzyText",
    minWidth: 50,
    Cell: EditableTextCell,
  },
  {
    Header: "Plus One",
    accessor: (d) => d.plus_one_name || null,
    minWidth: 50,
    Cell: EditableTextCell,
  },
  {
    Header: "Email",
    accessor: "email",
    minWidth: 50,
    Cell: EditableTextCell,
  },
  {
    Header: "RSVP",
    accessor: (d) => d.rsvp_response || false,
    width: 80,
    minWidth: 80,
    align: "right",
    Cell: EditableCheckboxCell,
  },
];

interface Props {
  signOut(): boolean;
}

interface State {
  invitees: Invitee[];
  loading: boolean;
  error?: string;
}

class App extends React.Component<Props, State> {
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
    axios.get<ErrorResponse | AllInviteesResponse>("/api/admin/v1/parties")
      .then((response) => {
        let err: string | null = null;
        if (response.status !== 200) {
          switch (response.status) {
            case 403:
              this.props.signOut();
              err = "Not authorized."
              break;
            default:
              err = "Unknown error occurred."
          }
        } else if ("error" in response.data) {
          err = response.data.error;
        }

        if (err !== null) {
          this.setState({
            loading: false,
            error: err,
          });
          return;
        }

        const data = response.data as AllInviteesResponse;

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
      .catch((reason) => {
        console.error(reason);

        this.setState({
          error: reason,
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
        name={"guest-list"}
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

export default withSignOut(App);
