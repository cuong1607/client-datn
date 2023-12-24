import { Image } from "antd";

type GalleryProductType = {
  images: any[];
};

const Gallery = ({ images }: GalleryProductType) => {
  const featImage = images?.[0]?.path;
  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images?.map((image) => (
          <div key={image?.id} className="product-gallery__thumb">
            {/* <img src={image?.path} alt="" /> */}
            <Image src={image?.path}/>
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        {/* <img src={featImage || ""} alt="" /> */}
        <Image src={featImage || ''}/>
      </div>
    </section>
  );
};

export default Gallery;
