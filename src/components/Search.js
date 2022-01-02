import {useEffect, useState, useRef} from 'react'
import './Search.css';

const data = [
  {
    id: 1,
    title: 'Test 1'
  },
  {
    id: 2,
    title: 'Test 2'
  },
  {
    id: 3,
    title: 'Test 3'
  },
  {
    id: 4,
    title: 'Test 4'
  }
];

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
  }, [search])

  return (
    <>
      <div className="search" ref={searchRef}>
        <input type="text" value={search} className={isTyping ? 'typing' : null} placeholder="Bir şeyler ara..." onChange={(e) => setSearch(e.target.value)} />
        {isTyping && (
          <div className="search-result">
            {result && result.map(item=> (
              <div key={item.id} className="search-result-item">
                {item.title}
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
