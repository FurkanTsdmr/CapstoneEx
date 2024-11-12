import { useEffect,useState } from 'react'
import './App.css'
import axios from 'axios'

/**
 * GET:Bir kaynaktan o veriyi almak için kullanıyorum.
 * 
 * POST:Yeni bir kaynak olusturmak için kullanılır.Ge
 * genellikle form veya kullanıcı girdilerinde kullanılır.
 * 
 * PUT:Var olan bir kaynagı güncellemek için kullanılır.
 * 
 * Delete:Değeri silmek için  kullanılır.
 * 
 */

function App() {

  const [authors,setAuthor] = useState([]);
  const [loading,setLoading] = useState(true);
  const [newAuthor,setNewAuthor] = useState({
      "name": "string",
      "birthDate": "2024-11-12",
      "country": "string"
    })

  useEffect(() =>{
    axios.get("http://localhost:8080/api/v1/authors").then((res) =>{
      setAuthor(res.data);
      setLoading(false);
    })
  },[])
  console.log(authors)


  if(loading){
    return <div>Loading.</div>
  }


  const handleAddAuthors =()=>{
    axios.post("http://localhost:8080/api/v1/authors",newAuthor).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
      
    })
  }

  const handleNewAuthorsChange =(e)=>{
    const {name,value} = e.target;
    setNewAuthor((prev) =>({
      ...prev,
      [name]:value,
    }))
  }

  return (
    <>
    <input type="text" 
    placeholder='Name'
    name='name'
    value={newAuthor.name}
    onChange={handleNewAuthorsChange}
    />
    <br />

    <input type="text"
    placeholder='birthDate' 
    name='birthDate'
    value={newAuthor.birthDate}
    onChange={handleNewAuthorsChange}
    />
<br />
    <input type="text" 
    placeholder='country'
    name='country'
    value={newAuthor.country}
    onChange={handleNewAuthorsChange}
    />
<br />

    <button onClick={handleAddAuthors}>Gönder</button>
      <h1>Authors</h1>
      {authors.map((author,index)=>(
        <div key={index}>
          <p>
            {index + 1 } - {author.id} {author.name}
          </p>
        </div>
      ))}
      
      
    </>
  )
}

export default App
