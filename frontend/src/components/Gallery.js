function Gallery() {
  return (
    <>
      <div style={{marginTop:'15rem',width:'100%',height:'10px'}} className="gallery"></div>

      <div className="container gallery">
        <div className="row">
          <div className="col-md-6 text-center">
            <img alt="about" src="./img/img1.png" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2 className="main-title about-h2">Gallery</h2>
            <p className="main-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              quam purus, ullamcorper id risus eu, consectetur consectetur
              purus. Etiam sagittis in eros ac sollicitudin.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Gallery;
