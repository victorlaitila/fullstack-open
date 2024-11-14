const PersonFilter = ({searchQuery, handleSearchQueryChange}) => {
  return (
    <div>
      Filter shown with <input value={searchQuery} onChange={handleSearchQueryChange} />
    </div>
  )
}

export default PersonFilter
