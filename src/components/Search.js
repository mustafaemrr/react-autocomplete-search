import {useEffect, useState, useRef} from 'react'
import './Search.css';

const data = [];

function Search() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const searchRef = useRef();

  const isTyping = search.replace(/\s+/, '').length > 0;

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    }
  }, []);

  const handleClickOutSide = (e) => {
    if(searchRef.current && !searchRef.current.contains(e.target)){
      setSearch('');
    }
  }

  useEffect(() => {
    if(isTyping){
      const filteredResult = data.filter(item => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
      setResult(filteredResult.length > 0 ? filteredResult : false);
    } else {
      setResult([]);
    }
    
    fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(data => setResult(data.results))
  }, [search])

  return (
    <>
      <div className="search" ref={searchRef}>
        <input type="text" value={search} className={isTyping ? 'typing' : null} placeholder="Bir şeyler ara..." onChange={(e) => setSearch(e.target.value)} />
        {isTyping && (
          <div className="search-result">
            {result && result.map(item=> (
              <div key={item.id} className="search-result-item">
                {
                  item.poster_path && (
                    <img className="search-result-item-img" src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="" />
                  )
                }
                <div>
                <div className="search-result-item-title">
                  {item.title}
                </div>
                <div className="search-result-item-imdb">
                  &#11088; {item.vote_average}
                </div>
                </div>
              </div>
            ))}

            {!result && (
              <div className="result-not-found">
                '{search}' ile ilgili bir şey bulamadık...
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Search
