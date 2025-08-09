import { useEffect, useState } from "react"
import axios from 'axios'
const App = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [data, setData] = useState([]);
  const handleSubmit = async () => {
    if (url === '') {
      alert('Enter valid Url !!!')
      return;
    }
    try {
      const response = await axios.post('https://url-shortner-1tow.onrender.com/api', { url });
      if (response.data.success) {
        setShortUrl(response.data.id)
        getUrls();

      }
    } catch (error) {
      console.log("Error")
    }

  }
  const getUrls = async () => {
    
    try {
      const response = await axios.get('https://url-shortner-1tow.onrender.com/api/urls');
      if (response.data.success) {
        setData(response.data.result)
        console.log(response.data.result)

      }
    } catch (error) {
      console.log("Error")
    }

  }

  useEffect(() => {
    getUrls();
  }, [])
  


  const openUrl = async (shortId) => {

    try {
      window.open(`https://url-shortner-1tow.onrender.com/api/${shortId}`, "_blank");
      getUrls();

    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="w-full h-screen flex flex-col py-20 gap-10 items-center">
      <div className="max-w-md w-full shadow-2xl flex flex-col gap-5 py-5 justify-center items-center">
        <h2 className="font-bold text-2xl ">Url Shortner</h2>
        <input className="px-5 py-2 border border-gray-700 w-full max-w-sm" placeholder="Enter Url" name="url" value={url} onChange={e => setUrl(e.target.value)} type="text" required />
        <button onClick={handleSubmit} className="bg-blue-400 text-white px-5 py-2 rounded-md  max-w-sm w-full">Submit</button>
        <p className="hover:underline hover:text-blue-500 cursor-pointer" onClick={() => openUrl(shortUrl)}>{shortUrl}</p>
      </div>
      <div className="max-w-md w-full">
        <table className="w-full border-collapse bg-white shadow-2xl">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Url</th>
              <th className="px-4 py-2 border">Visited</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((url, index)=>(
                <tr key={index}>
                  <td  onClick={()=>openUrl(url.shortId)} className="px-4 py-2 border hover:underline hover:text-blue-500 cursor-pointer">{url.shortId}</td>
                  <td className="px-4 py-2 border">{url.visitHistory.length}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
