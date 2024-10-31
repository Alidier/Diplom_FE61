interface FilterProps {
  filter: string;
  handleChangeFilter: (f: string) => void;
}

export default function Filter({ filter, handleChangeFilter }: FilterProps) {
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    handleChangeFilter(event.target.value);
  };

  return (
    <select value={filter} name="filter" onChange={onChange}>
      <option value="all">All</option>
      <option value="hasJob">has job</option>
      <option value="noJob">no job</option>
    </select>
  );
}
