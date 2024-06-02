import { React, useState, Fragment, useEffect, useRef } from 'react'
import { PropagateLoader } from 'react-spinners'
// import { FcUpload } from "react-icons/fc";
import { toast } from 'react-toastify'
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'
// import MainSpinner from '../component/MainSpinner'
const dburl = process.env.REACT_APP_URL

const CreateTemplates = () => {

  let [imageAsset, setImageAsset] = useState({
    title: "",
    isImageLoading: false,
    url: ""
  })
  const titleInputRef = useRef(null);
  const [template, setTemplate] = useState([]);
  const [preview, setPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImageAsset((prevRec) => ({ ...prevRec, [name]: value }));
  }

  const PushToDb = async () => {

    try {
      let res = await axios.post(`${dburl}/addtemplate`, {
        name: imageAsset.title,
        url: imageAsset.url
      })

      console.log(res);
      toast("successfully pushed");
      setImageAsset(imageAsset = { ...imageAsset, title: "", url: "" });
      titleInputRef.current.focus();

    } catch (e) {
      console.log(e);
    }
  }

  const fetchTemplate = async () => {
    let response = await axios.get(`${dburl}/gettemplate`);
    setTemplate(response.data)
  }

  useEffect(() => { fetchTemplate() }, [])

  const handleDelete = async (id) => {
    try {
      let response = await axios.delete(`${dburl}/deletetemplate/${id}`);
      console.log(response.data);
      toast("successfully deleted");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12'>

      {/* left container */}

      <div className='col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-start flex-col gap-4 px-2'>
        <div className='w-full'>
          <p className='text-lg text-txtPrimary'>Create New Template</p>
        </div>

        {/* template id section */}
        <div className='w-full flex items-center justify-end'>
          <p className='text-base text-txtLight uppercase font-semibold'>TempID :</p>
          <p className='text-lg text-txtDark capitalize font-bold ml-1'>{template.length > 0 ? `${template.length + 1}` : "1"}</p>
        </div>

        {/* template title and image url from github*/}
        <input type='text' name='title' placeholder='Template Title' value={imageAsset.title} onChange={handleInputChange} ref={titleInputRef}
          className='w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus-within:text-txtDark focus:shadow-md outline-none' />

        <input type='text' name='url' placeholder='copy image link from github' value={imageAsset.url} onChange={handleInputChange} ref={titleInputRef}
          className='w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus-within:text-txtDark focus:shadow-md outline-none' />

        {/* preview */}
        <div className='w-full bg-gray-100 backdrop-blur-md rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex item-center justify-center'>

          {imageAsset.isImageLoading

            ? <Fragment>
              <div className='flex flex-col items-center justify-center gap-5'>
                <PropagateLoader color='#9b36d6' size={10} />
              </div>
            </Fragment>

            : <Fragment>

              {!preview
                ? <></>
                :
                <Fragment>
                  <div className='relative w-full h-full overflow-hidden rounded-md'>
                    <img src={imageAsset?.url} className='w-full h-full object-cover' loading='lazy' alt="" />
                  </div>
                </Fragment>
              }

            </Fragment>
          }
        </div>

        <button type='button' className='w-fit bg-purple-400 text-white rounded-md py-3 px-3' disabled={imageAsset?.url <= 0} onClick={() => { setPreview(!preview); }}>
          {preview === true ? "Hide" : "Show"} Previw</button>

        <button type='button' className='w-full bg-purple-700 text-white rounded-md py-3' disabled={imageAsset?.title <= 0 || imageAsset?.url <= 0} onClick={PushToDb}>
          Save</button>
      </div>


      {/* right container */}
      <div className='col-span-12 lg:col-span-8 2xl:col-span-9 px-2 w-full flex-1 py-4'>
        <Fragment>
          {template.length > 0
            ?
            <Fragment>
              <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:griap-4d-cols-4 gap-4'>
                {template.map((temp) => (
                  <div key={temp?.templateId} className='w-full h-[500px] rounded-md overflow-hidden relative'>
                    <img alt='' src={temp?.url} className='w-full h-full object-fill' />
                    <div className='absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer' onClick={() => handleDelete(temp?.templateId)}>
                      <FaTrash className='text-sm text-white' />
                    </div>
                  </div>
                ))}
              </div>
            </Fragment>

            :
            <Fragment>
              <div className='w-full h-full flex flex-col gap-6 items-center justify-center'>
                <PropagateLoader color='#9b36d6' speedMultiplier={2} />
                <p className='text-xl tracking-wider capitalize text-txtPrimary'>No data</p>
              </div>
            </Fragment>
          }
        </Fragment>
      </div>

    </div >
  )
}

export default CreateTemplates