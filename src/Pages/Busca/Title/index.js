import React from 'react';

import { ContainerTitle } from './styles';

function Title({ title }) {
  return (
    <ContainerTitle>
      <h1>
        {title}
        <div className='separador' />
      </h1>
    </ContainerTitle>
  );
}

export default Title;
