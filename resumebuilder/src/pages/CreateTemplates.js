import { React, useState, Fragment, useEffect } from 'react'
import { PropagateLoader } from 'react-spinners'
import { FcUpload } from "react-icons/fc";
import { toast } from 'react-toastify'
import { initialTags } from '../utils/helper'

const CreateTemplates = () => {

  const [formData, setformData] = useState({
    title: "",
    imageURL: null,
  })

  let [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    url: ""
  })

  const [selectedTags, setSelectedTags] = useState([]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prevRec) => ({ ...prevRec, [name]: value }));
  }

  // handle image file changes
  const handleFileSelect = async (e) => {
    setImageAsset(imageAsset = { ...imageAsset, isImageLoading: true });

    const file = e.target.files[0];

    if (file && isAllowed(file)) {
      toast(`${file.name} uploaded`);
      console.log(file)
      let url = URL.createObjectURL(file);
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

  const handleSelectedTags = (tag) => {
    //check if the tag is selected or not
    if (selectedTags.includes(tag)) {
      // if selected then remove it
      setSelectedTags(selectedTags.filter(selected => selected !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const PushToDb = async () => {
    toast("successfully pusheds");
    // const id = `${Date.now()}`

    // const _doc = {
    //   id: id,
    //   title: formData.title,
    //   imageURL: imageAsset.url,
    //   tags: selectedTags,
    //   name: 'Template1'
    // }
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
          <p className='text-sm text-txtDark capitalize font-bold'>Template1</p>
        </div>

        {/* template title */}
        <input type='text' name='title' placeholder='Template Title' value={formData.title} onChange={handleInputChange}
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

        {/* tags */}
        <div className='w-full flex items-center flex-wrap gap-2'>
          {initialTags.map((tag, i) => (
            <div className={`border border-gray-300 px-2 py-1 rounded-md cursor-pointer ${selectedTags.includes(tag) ? "bg-blue-500 text-white" : ""}`} key={i} onClick={() => handleSelectedTags(tag)}>
              <p className='text-s'>{tag}</p>
            </div>
          ))}
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