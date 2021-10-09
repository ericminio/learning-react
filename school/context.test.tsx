import React, { useContext } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'

describe('Context', ()=>{

  it('can provide value to child component', ()=>{
    const CustomContext = React.createContext();

    function Message() {
      const message = useContext(CustomContext);
      return <div>${message}</div>
    }
    function CustomContextProvider() {
      return (
        <>
          <CustomContext.Provider value="hello">
            <Message />
          </CustomContext.Provider>
        </>
      )
    }
    render(<CustomContextProvider><Message /></CustomContextProvider>);

    expect(screen.getByText(/hello/)).toBeInTheDocument();
  });
});