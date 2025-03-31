// src/components/GalleryStyles.js
import styled, { keyframes } from "styled-components";

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

// Main container
export const Container = styled.div`
  text-align: center;
  background: linear-gradient(135deg, #0c0f13, #183857);
   padding: 20px;
  margin-bottom: 50px;
`;

export const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 2rem;
  margin-bottom: 50px;
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