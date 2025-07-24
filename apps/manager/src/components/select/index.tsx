import type { HTMLAttributes } from "react";

type ValueTypes = string | number;
type HTMLSelectProps = Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'>;

type Props<V extends ValueTypes = ValueTypes> = HTMLSelectProps & {
  value?: V;
  options?: Option<V>[];
  placeholder?: React.ReactNode;
  onChange?: (value: V) => void;
};

type Option<V extends ValueTypes = ValueTypes> = {
  value: V;
  label: React.ReactNode;
};

export function Select<V extends ValueTypes = ValueTypes>({
  value,
  options = [],
  placeholder = '请选择',
  onChange,
  className,
  style,
  ...selectProps
}: Props<V>) {
  const optionNodes: React.ReactNode[] = [
    <option key="please-select" selected={value===undefined}>{placeholder}</option>
  ];
  options.forEach(({value: v, label}) => {
    optionNodes.push(
      <option key={`option-${v}`} value={v} selected={value === v}>{label}</option>
    );
  });

  const classNames = ["amc-select", className].join(" ");

  return (
    <select
      onChange={(event) => {
        const value = event.currentTarget.value as V;
        if (onChange !== undefined) {
          onChange(value);
        }
      }}
      className={classNames}
      style={style}
      {...selectProps}
    >
      { optionNodes }
    </select>
  );
}