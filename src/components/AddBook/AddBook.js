import React, { useEffect, useRef, useState } from 'react'
import './AddBook.css'
import { useHistory } from "react-router-dom";
const AddBook = () => {
    const divStyle = {
        height: '200px',
        width: '60%',
        margin : "auto",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        border: '2px solid gray',
        backgroundColor: 'lightgray',
      };

    const [formData, setFormData] = useState({
        bookId : 0,
        bookTitle: '',
        bookSerialNumber: '',
        bookQuantity: null,
        bookImageLink : '',
        bookPrice: null,
        bookYear: null,
        authorID: 1,
        categoryID: 1,
    });
    const history = useHistory();
    const refInput = useRef();
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    function handleChange (e) {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            setPreviewSource(file);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreviewSource(reader.result);
        };
      };

    useEffect(() => {
        if (imageFile) {
          previewFile(imageFile)
        }
    }, [imageFile]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormData({...formData, file: imageFile});
        
        const formToSend = new FormData();
        formToSend.append("BookTitle",formData.bookTitle)
        formToSend.append("BookSerialNumber",formData.bookSerialNumber)
        formToSend.append("BookQuantity",formData.bookQuantity)
        formToSend.append("BookPrice",formData.bookPrice)
        formToSend.append("BookYear",formData.bookYear)
        formToSend.append("AuthorID",formData.authorID)    
        formToSend.append("CategoryID",formData.categoryID)
        formToSend.append("BookImageLink",formData.bookImageLink)
 
        console.log('Form Data:', formData, imageFile);
        // const boundary = '----WebKitFormBoundary' + Math.random().toString(16).substring(2);
        // const headers = {
        //     'Content-Type' : 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        // }

        // const res = await fetch('http://localhost:5121/api/books/CreateBook', {
        //     method: 'POST',
        //     body: formToSend,
        //     headers: headers,
        // });

        const res = await fetch('http://localhost:5121/api/books/CreateBook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })

        const result = await res.json();
        console.log(result)
        history.push('/');
        window.location.reload() 
    };

  return (
    <div className='d-flex justify-content-center align-content-center w-100 h-100'>
        
      <form onSubmit={handleSubmit} className="container" style={{marginTop : "7rem"}}>
            <h1>Book Entry Form</h1>

            <div className="mb-3 d-flex flex-column gap-1" >
                
                {/* <label htmlFor="bookTitle" className="">Book Title</label> */}
                <p className='fs-5' style={{marginBottom : "-3px"}}>Book Title</p>
                <input
                    type="text"
                    className="form-control "
                    id="bookTitle"
                    name="bookTitle"
                    placeholder='Enter title'
                    value={formData.bookTitle}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
            <p className='fs-5' style={{marginBottom : "-3px"}}>Book Serial Number</p>
                {/* <label htmlFor="bookSerialNumber" className="form-label">Book Serial Number</label> */}
                <input
                    type="text"
                    className="form-control"
                    id="bookSerialNumber"
                    name="bookSerialNumber"
                    placeholder='Enter serial number'
                    value={formData.bookSerialNumber}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
            <p className='fs-5' style={{marginBottom : "-3px"}}>Quantity</p>
                {/* <label htmlFor="bookQuantity" className="form-label">Quantity</label> */}
                <input
                    type="number"
                    className="form-control"
                    id="bookQuantity"
                    name="bookQuantity"
                    placeholder='Enter book quantity'
                    value={formData.bookQuantity}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
            <p className='fs-5' style={{marginBottom : "-3px"}}>Price</p>

                {/* <label htmlFor="bookPrice" className="form-label">Price</label> */}
                <input
                    type="number"
                    className="form-control"
                    id="bookPrice"
                    name="bookPrice"
                    placeholder='Enter book price'
                    value={formData.bookPrice}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
            <p className='fs-5' style={{marginBottom : "-3px"}}>Year of Publication</p>

                {/* <label htmlFor="bookYear" className="form-label">Year of Publication</label> */}
                <input
                    type="number"
                    className="form-control"
                    id="bookYear"
                    name="bookYear"
                    placeholder='Enter book year'
                    value={formData.bookYear}
                    onChange={handleInputChange}
                />
            </div>
            {/* <div className="mb-3">
                <label htmlFor="authorID" className="form-label">Author ID</label>
                <input
                    type="number"
                    className="form-control"
                    id="authorID"
                    name="authorID"
                    value={formData.authorID || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="categoryID" className="form-label">Category ID</label>
                <input
                    type="number"
                    className="form-control"
                    id="categoryID"
                    name="categoryID"
                    value={formData.categoryID || ''}
                    onChange={handleInputChange}
                />
            </div> */}
            {/* <div className="mb-3"> */}

            <div className="mb-3">
            <p className='fs-5' style={{marginBottom : "-3px"}}>Enter Book Image URL</p>

                {/* <label htmlFor="bookImageLink" className="form-label">Enter Book Image URL</label> */}
                <input
                    type="text"
                    className="form-control"
                    id="bookImageLink"
                    name="bookImageLink"
                    placeholder='Enter image url'
                    value={formData.bookImageLink}
                    onChange={handleInputChange}
                />
            </div>

            {/* <div style={divStyle} onClick={() => {refInput.current.click()}}>
                {
                    previewSource ? <img src={previewSource} className='aspect-square object-cover w-70 md:w-100 rounded-full' />
                    : <p>Upload Book Image</p>
                }
            </div> */}

            {/* <div className='flex flex-row gap-3'>
            <input type='file' ref={refInput} accept='image/*' style={{ display: 'none' }} onChange={handleChange} />

            </div>
            </div> */}
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default AddBook