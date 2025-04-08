import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TabContainer,
  TabButton,
  GalleryContainer,
  AlbumCard,
  AlbumImg,
  AlbumOverlay,
} from "./GalleryStyles";
import "./gallery.css";

const albums = [
  { year: "2017", albums: [{ title: "WCC 2017", imgSrc: "/img/wcc2017.jpg", link: "https://photos.app.goo.gl/NYrHfun6TWP3v8nW7" }] },
  { year: "2018", albums: [{ title: "WCC 2018", imgSrc: "/img/wcc2018.jpg", link: "https://photos.app.goo.gl/1GDgfP7EWv8NDAPj7" }] },
  { year: "2019", albums: [{ title: "WCC 2019", imgSrc: "/img/wcc2019.jpg", link: "https://photos.app.goo.gl/PUqR7i2wqTDaCENk7" }] },
  { year: "2020", albums: [{ title: "WCC 2020", imgSrc: "/img/wcc2020.jpg", link: "https://photos.app.goo.gl/WpFE2wXGpZY7ScmH8" }] },
  { year: "2021", albums: [{ title: "WCC 2021", imgSrc: "/img/wcc2021.jpg", link: "https://photos.app.goo.gl/4cR9MS4jb6T3e84V8" }] },
  { year: "2022", albums: [{ title: "WCC 2022", imgSrc: "/img/wcc2022.jpg", link: "https://photos.app.goo.gl/YauW5uUGGX4XU5sh6" }] },
  { year: "2023", albums: [{ title: "WCC 2023", imgSrc: "/img/wcc2023.jpg", link: "https://photos.app.goo.gl/PxygRZ8VuGkyAPtYA" }] },
  { year: "2024", albums: [{ title: "WCC 2024 Party", imgSrc: "/img/wcc2024party.jpg", link: "https://photos.app.goo.gl/T9KArYTZAfNZeUCW8" }] },
];
 
function Gallery() {
  const [activeYear, setActiveYear] = useState("2017");

  const handleYearChange = (year) => {
    setActiveYear(year);
  };

  const selectedYearAlbums = albums.find((album) => album.year === activeYear)?.albums || [];

  return (
    <Container>
      <h2>📚 Gallery Albums</h2>

      {/* Horizontal Tabs for Year Selection */}
      <TabContainer>
        {albums.map((album) => (
          <TabButton key={album.year} onClick={() => handleYearChange(album.year)} isActive={activeYear === album.year}>
            {album.year}
          </TabButton>
        ))}
      </TabContainer>

      {/* Display the selected year's albums */}
      <GalleryContainer>
        {selectedYearAlbums.map((album, index) => (
          <AlbumCard key={index} href={album.link} target="_blank" rel="noopener noreferrer">
            <AlbumImg src={album.imgSrc} alt={album.title} />
            <AlbumOverlay>{album.title}</AlbumOverlay>
          </AlbumCard>
        ))}
      </GalleryContainer>
    </Container>
  );
}

export default Gallery;
