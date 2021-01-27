import React, {CSSProperties} from "react";
import type {CellProps, UseUpdateTableOptions} from "react-table";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";

import {Invitee} from "../../types/invitee";
import {grey} from "@material-ui/core/colors";

export interface EditableTextCellProps<D extends Record<string, unknown>, V = any>
  extends CellProps<D, V>,
    UseUpdateTableOptions<D> {
}

export const EditableTextCell = (props: EditableTextCellProps<Invitee>) => {
  const [value, setValue] = React.useState(props.value);

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(props.value)
  }, [props.value]);

  let style: CSSProperties = {};
  if (value === null) {
    style.color = grey["50"];
  }

  return (
    <Input
      disableUnderline
      fullWidth
      inputProps={{
        style: {padding: 2},
      }}
      value={value}
      placeholder={"<null>"}
      style={style}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => props.updateData(props.row.index, props.column.id, value)}
    />
  )
}

export interface EditableCheckboxCellProps<D extends Record<string, unknown>, V = any>
  extends CellProps<D, V>,
    UseUpdateTableOptions<D> {
}

export const EditableCheckboxCell = (props: EditableCheckboxCellProps<Invitee>) => {
  const [value, setValue] = React.useState(props.value as boolean);

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(props.value)
  }, [props.value]);

  return (
    <Checkbox
      style={{padding: 0}}
      checked={value}
      onChange={(e, c) => setValue(c)}
      onBlur={() => props.updateData(props.row.index, props.column.id, value)}
    />
  )
}
