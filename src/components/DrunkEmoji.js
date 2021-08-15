import React from 'react';
import styled from 'styled-components';

const EmojiContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Emoji = styled.span`
  font-size: 5em;
`;

const DrunkEmoji = () => (
  <EmojiContainer>
    <Emoji>🥴</Emoji>
  </EmojiContainer>
);

export default DrunkEmoji;
