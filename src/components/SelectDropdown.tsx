import { useState } from "react";

interface Props {
  className?: string;
  fieldName?: string;
  fieldNameWidth?: number;
  options: any;
  value?: string;
  onChange: (newValue: string) => void;
}

export function SelectDropdown({
  className = undefined,
  fieldName = undefined,
  fieldNameWidth = 100,
  options = {},
  value = undefined,
  onChange = (newValue) => console.log(`选项修改为${newValue}`),
}: Props) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  // @ts-ignore
  const current: string = options[value];

  const keys = Object.keys(options);
  const items = keys.map(key => {
    const active = (key == value) ? "is-active" : undefined;
    return <li
      key={key}
      className={active}
      onClick={() => onChange(key)}
    >
      { options[key] }
    </li>
  });

  let classNames = "select-dropdown";
  if (className != undefined) {
    classNames += " " + className;
  }

  let dropdownClassNames = "dropdown";
  dropdownClassNames += (open) ? " is-open" : "";

  return <>
    <div className={classNames} onClick={toggle} style={{
      width: "100%"
    }}>
      <span style={{
        width: fieldNameWidth,
      }}>{fieldName}</span>

      <div className={dropdownClassNames}>
        <p className="dropdown-selected-item">
          <span>{current}</span>
          <svg>
            <use href="/images/sprite.svg#arrow"></use>
          </svg>
        </p>
        <div className="dropdown-list-wrapper">
          <ul className="dropdown-list">
            { items }
          </ul>
        </div>
      </div>
    </div>
  </>;
}