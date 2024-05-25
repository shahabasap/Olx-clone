import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


function Posts() {
  const { db } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);

  const navigate=useNavigate()
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const productCollection = collection(db, 'products');
        const snapshot = await getDocs(productCollection);
        const allPosts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(allPosts);
        
      } catch (err) {
        console.log("hie",err.message);
      }
    };

    fetchPosts();
  }, [db]);



  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products?.map((product) => (
            <div className="card" key={product.id}  onClick={()=>{
              navigate(`/view/${product.id}`)
            }}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="YAMAHA R15V3" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
