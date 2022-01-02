import './Search.css';

function Search() {
  return (
    <>
      <div className="search">
        <input type="text" placeholder="Bir şeyler ara..." />
          <div className="search-result">
              <div className="search-result-item">

              </div>
              <div className="result-not-found">
                '....' ile ilgili bir şey bulamadık...
              </div>
          </div>
      </div>
    </>
  )
}

export default Search
