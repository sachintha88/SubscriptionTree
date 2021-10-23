import React, {ReactElement, useCallback} from "react";

type Props = {
    onChange: (id: number) => void,
    label: string,
    id: number,
    checkedStatus: boolean
}

export default function CheckBoxPair({ onChange, label, id, checkedStatus } : Props) : ReactElement {
  const onInputChange = useCallback(() => onChange(id), [onChange, id]);

  return (
    <label className={"check_box_pair"}>
      <input type="checkbox" onChange={onInputChange} checked={checkedStatus} data-testid="checkBox"/>
      {label}
    </label>
  );
}
