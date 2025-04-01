import styled from "styled-components";

// Main container
export const Container = styled.div`
  text-align: center;
  padding: 20px;
  margin-bottom: 50px;
  padding-top: 40px; /* Add space above the gallery */
`;

// Horizontal Tabs Container
export const TabContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px;
  margin-bottom: 20px;
`;

export const TabButton = styled.button`
  background: ${props => (props.isActive ? "#1e3d58" : "transparent")};
  color: ${props => (props.isActive ? "#fff" : "#b0b0b0")};
  border: 2px solid ${props => (props.isActive ? "#fff" : "#1e3d58")}; /* White border on active */
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s, border 0.3s;

  &:hover {
    background: #1e3d58;
    color: #fff;
    border: 2px solid #fff; /* White border on hover */
  }
`;


// Albums grid container
export const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const AlbumCard = styled.a`
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

export const AlbumImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const AlbumOverlay = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  width: 100%;
  text-align: center;
  padding: 10px;
  font-size: 1rem;
`;
