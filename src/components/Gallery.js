import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

// Keyframe for fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const Container = styled.div`
  text-align: center;
  margin-top: 5rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  color: #444;
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 2rem;
`;

const AlbumCard = styled.a`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const AlbumImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const AlbumOverlay = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  width: 100%;
  text-align: center;
  padding: 10px;
  font-size: 1rem;
`;

const UploadContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
  position: relative;
`;

const FileInputLabel = styled.label`
  background-color: #4caf50;
  color: white;
  padding: 12px 25px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: inline-block;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileName = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: #333;
  animation: ${fadeIn} 0.5s ease-out;
`;

const UploadButton = styled.button`
  margin-top: 15px;
  padding: 12px 25px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1976d2;
    transform: translateY(-3px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const PictureContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const PictureOfDay = styled.img`
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PreviewImg = styled.img`
  width: 100%;
  max-width: 300px;
  margin-top: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
`;

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
  const [uploadedImageUrl, setUploadedImageUrl] = useState("/img/wcc2017.jpg");
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  // Fetch the Picture of the Day with cache-busting
  useEffect(() => {
    setUploadedImageUrl(`/img/wcc2017.jpg?timestamp=${new Date().getTime()}`);
  }, []);

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
        alert("Kava of the Week updated successfully!");
        setUploadedImageUrl(`/img/picture-of-the-day.jpg?timestamp=${new Date().getTime()}`);
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert("Failed to upload the image.");
    }
  };

  return (
    <Container>
      <Title>Gallery</Title>

      {/* Picture of the Day Section */}
      <SectionTitle>📸 Kava of the Week</SectionTitle>
      <PictureContainer>
        <PictureOfDay src={uploadedImageUrl} alt="Kava of the Week" />
      </PictureContainer>

      {/* Upload Section */}
      <UploadContainer>
        <h3>Upload Latest Kava of the Week</h3>
        {previewUrl && <PreviewImg src={previewUrl} alt="Preview" />}
        <div> 
        <FileInputLabel htmlFor="fileInput">Choose File</FileInputLabel>
        <HiddenInput
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {fileName && <FileName>📂 {fileName}</FileName>}
        <UploadButton onClick={handleUpload}>Upload</UploadButton>
        </div>
      </UploadContainer>

      {/* Albums Section */}
      <SectionTitle>📚 Gallery Albums</SectionTitle>
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
