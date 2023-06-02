import React, { useState, useContext } from 'react';
import PlanetContext from '../context/PlanetsContext';

export default function Filters() {
  const {
    setActiveFilters,
    activeFilters,
  } = useContext(PlanetContext);
  const [filterState, setFilterState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const columnFilters = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const checkColumns = (option) => !activeFilters.find(({ column }) => column === option);

  return (
    <div className="filters-div">
      <div>
        <select
          data-testid="column-filter"
          value={ filterState.column }
          onChange={ ({ target }) => setFilterState({
            ...filterState, column: target.value }) }
        >
          {
            columnFilters
              .filter(checkColumns)
              .map((filter) => (
                <option key={ filter } value={ filter }>{filter}</option>
              ))
          }
        </select>
      </div>
      <div>
        <select
          data-testid="comparison-filter"
          value={ filterState.comparison }
          onChange={ ({ target }) => setFilterState({
            ...filterState, comparison: target.value }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </div>
      <div>
        <label htmlFor="value-filter">
          <input
            type="number"
            data-testid="value-filter"
            value={ filterState.value }
            onChange={ ({ target }) => setFilterState({
              ...filterState, value: target.value }) }
            id="value-filter"
          />
        </label>
      </div>
      <button
        data-testid="button-filter"
        onClick={ () => {
          setActiveFilters([...activeFilters, filterState]);
          setFilterState({
            column: 'population',
            comparison: 'maior que',
            value: 0,
          });
        } }
      >
        Filtrar
      </button>
      <div>
        {
          activeFilters.map(({ column, comparison, value }, index) => (
            <div key={ index }>
              <p>{`${column} ${comparison} ${value}`}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
