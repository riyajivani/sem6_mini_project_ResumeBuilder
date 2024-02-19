import { React, useState, Fragment, useEffect, useRef } from 'react'
import { PropagateLoader } from 'react-spinners'
import { FcUpload } from "react-icons/fc";
import { toast } from 'react-toastify'
import axios from 'axios';

const CreateTemplates = () => {

  let [imageAsset, setImageAsset] = useState({
    title: "",
    isImageLoading: false,
    url: ""
  })
  const [count, setCount] = useState(0);
  const titleInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImageAsset((prevRec) => ({ ...prevRec, [name]: value }));
  }

  // handle image file changes
  const handleFileSelect = async (e) => {
    setImageAsset(imageAsset = { ...imageAsset, isImageLoading: true });

    const file = e.target.files[0];

    if (file && isAllowed(file)) {
      toast(`${file.name} uploaded`);
      console.log(file)
      let url = URL.createObjectURL(file);
      // console.log(url);
      setImageAsset(imageAsset = { ...imageAsset, isImageLoading: false, url: url });

    }
    else {
      toast.info('Invalid file format');
    }

  }

  // give permission to specified file type
  const isAllowed = (file) => {
    const allowdTypes = ["image/jpeg", "image/jpg", "image/png"]
    return allowdTypes.includes(file.type)
  }

  const PushToDb = async () => {
    console.log(imageAsset);
    try {
      let res = await axios.post("http://localhost:8080/addtemplate", {
        name: imageAsset.title,
        url: imageAsset.url
      })

      console.log(res);
      toast("successfully pushed");
      setCount(res.data + 1);
      setImageAsset(imageAsset = { ...imageAsset, title: "", url: "" });
      titleInputRef.current.focus();

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
          <p className='text-base text-txtLight uppercase font-semibold'>TempID :{""}</p>
          <p className='text-lg text-txtDark capitalize font-bold ml-1'> {count}</p>
        </div>

        {/* template title */}
        <input type='text' name='title' placeholder='Template Title' value={imageAsset.title} onChange={handleInputChange} ref={titleInputRef}
          className='w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus-within:text-txtDark focus:shadow-md outline-none' />

        {/* file uploader section */}
        <div className='w-full bg-gray-100 backdrop-blur-md rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex item-center justify-center'>

          {imageAsset.isImageLoading

            ? <Fragment>
              <div className='flex flex-col items-center justify-center gap-5'>
                <PropagateLoader color='#9b36d6' size={10} />
              </div>
            </Fragment>

            : <Fragment>

              {!imageAsset?.url

                ?
                <Fragment>
                  <label className='w-full cursor-pointer h-full'>
                    <div className='flex flex-col items-center justify-center h-full w-full'>
                      <div className='flex items-center justify-center cursor-pointer flex-col gap-4'>
                        <FcUpload className='text-2xl bg-purple-200' />
                        <p className='text-lg text-txtLight'>Click to Upload</p>
                      </div>
                    </div>

                    {/* onclick upload file we have to open window for upload file */}
                    <input type='file' className='w-0 h-0' accept='.jpeg, .jpg, .png' onChange={handleFileSelect} />

                  </label>
                </Fragment>
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

        <button type='button' className='w-full bg-blue-700 text-white rounded-md py-3' onClick={PushToDb}>
          Save</button>
      </div>


      {/* right container */}
      <div className='col-span-12 lg:col-span-8 2xl:col-span-9 px-2 w-full flex-1 py-4'>2</div>

    </div>
  )
}

export default CreateTemplates