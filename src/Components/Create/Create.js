import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageError, setImageError] = useState('');
  const { storage, db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError('Name is required');
      return;
    }
    if (!category.trim()) {
      setCategoryError('Category is required');
      return;
    }
    if (!price) {
      setPriceError('Price is required');
      return;
    }
    if (!image) {
      setImageError('Image is required');
      return;
    }
    const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    const refImage = ref(storage, `/Product/${image.name}_${currentTime}`);
    const uploadImage = uploadBytesResumable(refImage, image);

    uploadImage.on("state_changed", (snapshot) => {
      // Progress monitoring if needed
    }, (err) => {
      console.error(err.message);
      alert(err.message);
    }, () => {
      getDownloadURL(uploadImage.snapshot.ref).then((url) => {
        const productCollection = collection(db, 'products');
        addDoc(productCollection, {
          name,
          category,
          price,
          url,
          userId: user.uid,
          date: new Date().toDateString(),
        }).then(() => {
          navigate('/');
        }).catch((err) => {
          console.error('Error adding product to Firestore:', err.message);
          alert('Cannot add product details to Firestore');
        });
      }).catch((err) => {
        console.error('Error getting image URL:', err.message);
        alert('Cannot get image URL');
      });
    });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setNameError(''); }}
            name="name"
          />
          <br />
          {nameError && <small className="error">{nameError}</small>}
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => { setCategory(e.target.value); setCategoryError(''); }}
            name="category"
          />
          <br />
          {categoryError && <small className="error">{categoryError}</small>}
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => { setPrice(e.target.value); setPriceError(''); }}
            name="price"
          />
          <br />
          {priceError && <small className="error">{priceError}</small>}
          <br />
          <br />
          <input type="file" onChange={(e) => { setImage(e.target.files[0]); setImageError(''); }} />
          <br />
          {imageError && <small className="error">{imageError}</small>}
          <br />
          <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
