// src/components/Gallery.js
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  GalleryContainer,
  AlbumCard,
  AlbumImg,
  AlbumOverlay,
} from "./GalleryStyles";
import "./gallery.css";

// Album data
const albums = [
  {
    title: "WCC 2017",
    imgSrc: "/img/wcc2017.jpg",
    link: "https://photos.app.goo.gl/NYrHfun6TWP3v8nW7",
  },
  {
    title: "WCC 2018",
    imgSrc: "/img/wcc2018.jpg",
    link: "https://photos.app.goo.gl/1GDgfP7EWv8NDAPj7",
  },
  {
    title: "WCC 2019",
    imgSrc: "/img/wcc2019.jpg",
    link: "https://photos.app.goo.gl/PUqR7i2wqTDaCENk7",
  },
  {
    title: "WCC 2020",
    imgSrc: "/img/wcc2020.jpg",
    link: "https://photos.app.goo.gl/WpFE2wXGpZY7ScmH8",
  },
  {
    title: "WCC 2021",
    imgSrc: "/img/wcc2021.jpg",
    link: "https://photos.app.goo.gl/4cR9MS4jb6T3e84V8",
  },
  {
    title: "WCC 2022",
    imgSrc: "/img/wcc2022.jpg",
    link: "https://photos.app.goo.gl/YauW5uUGGX4XU5sh6",
  },
  {
    title: "WCC 2023",
    imgSrc: "/img/wcc2023.jpg",
    link: "https://photos.app.goo.gl/PxygRZ8VuGkyAPtYA",
  },
  {
    title: "WCC 2024 Party",
    imgSrc: "/img/wcc2024party.jpg",
    link: "https://photos.app.goo.gl/T9KArYTZAfNZeUCW8",
  },
];

function Gallery() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file)); // Preview before uploading
    }
  };

  // Upload the image
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("/api/upload", formData);
      if (res.status === 200) {
        alert("Image uploaded successfully!");
        setImage(null);
        setFileName("");
        setPreviewUrl("");
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert("Failed to upload the image.");
    }
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold text-center mb-6">📚 Gallery Albums</h1>
      <GalleryContainer>
        {albums.map((album, index) => (
          <AlbumCard
            key={index}
            href={album.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AlbumImg src={album.imgSrc} alt={album.title} />
            <AlbumOverlay>{album.title}</AlbumOverlay>
          </AlbumCard>
        ))}
      </GalleryContainer>
    </Container>
  );
}

export default Gallery;
