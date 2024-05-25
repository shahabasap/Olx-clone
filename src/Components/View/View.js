import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { FirebaseContext } from '../../store/Context';
import { doc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function View() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const { db } = useContext(FirebaseContext);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const docRef = doc(db, 'products', productId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setProductData(snap.data());
        } else {
          console.log('No such product!');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProductDetails();
  }, [productId]);

  // Fetch user details
  useEffect(() => {

    const fetchDetails = async () => {
      if (productData?.userId) {
        const fetchUserDetails = async () => {
        try {
          const userIdHere = productData.userId;
          console.log("User ID:", userIdHere);

          const usersCollection = collection(db, 'users');
          const q = query(usersCollection, where('id', '==', userIdHere));
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
      

        } catch (error) {
          console.log("Error fetching user details:", error.message);
        }}
        fetchUserDetails()

      }
    };
    fetchDetails()

  }, [productData,db]);

  useEffect(()=>{
        console.log("userData",userDetails);
  },[userDetails])



  return (
    <div className="viewParentDiv">
       {productData && <div className="imageShowDiv">
        <img
          src={productData.url}
          alt="Product"
        />
      </div>}
      <div className="rightSection">
        {productData && (
          <div className="productDetails">
            <p>&#x20B9; {productData.price} </p>
            <span>{productData.name}</span>
            <p>{productData.category}</p>
            <span>{new Date(productData.createdAt).toDateString()}</span>
          </div>
        )}
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.name}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
