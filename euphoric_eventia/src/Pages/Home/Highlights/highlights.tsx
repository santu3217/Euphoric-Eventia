import React from 'react';
import styled from 'styled-components';
import img from '../../../images/image1.png'; // Ensure this path is correct

// styled component for div
const StyledDiv = styled.div`
  background-color: "#261f59";
  display: flex;
  justify-content: center; // Center horizontally
  align-items: flex-start; // Align to the top
  padding-top: 0px; // Increased top padding to push the image down
  height: calc(80vh - 50px); // Adjust height to maintain the overall height including padding
  width: 100%;
  overflow: hidden;
`;

// styled component for image
const StyledImg = styled.img`
  width: 100%; // Image will fill the width of StyledDiv
  height: 100%; // Image height will be the same as StyledDiv
  object-fit: cover; // Image will cover the available space without stretching
  border-radius: 0px; // Adjust if you want rounded corners
`;

export const Highlights: React.FC = () => {
    return (
        <StyledDiv>
            <StyledImg
                src={img}
                alt="Highlight Image"
            />
        </StyledDiv>
    );
};