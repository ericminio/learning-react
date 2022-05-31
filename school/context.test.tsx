import React, { useContext } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'

describe('Context', () => {

  it('can provide value to child component', () => {
    const CustomContext = React.createContext();

    function Message() {
      const message = useContext(CustomContext);
      return <div>${message}</div>
    }
    function CustomContextProvider({ children }: React.PropsWithChildren) {
      return (
        <>
          <CustomContext.Provider value="hello">
            {children}
          </CustomContext.Provider>
        </>
      )
    }
    render(
      <CustomContextProvider>
        <Message />
      </CustomContextProvider>
    );

    expect(screen.getByText(/hello/)).toBeInTheDocument();
  });
  it('can be nested', () => {
    const CustomContextOne = React.createContext();
    const CustomContextTwo = React.createContext();

    function Message() {
      const one = useContext(CustomContextOne);
      const two = useContext(CustomContextTwo);
      return <><div>${one}</div><div>${two}</div></>
    }
    function CustomContextOneProvider({ children }: React.PropsWithChildren) {
      return (
        <>
          <CustomContextOne.Provider value="hello">
            {children}
          </CustomContextOne.Provider>
        </>
      )
    }
    function CustomContextTwoProvider({ children }: React.PropsWithChildren) {
      return (
        <>
          <CustomContextTwo.Provider value="world">
            {children}
          </CustomContextTwo.Provider>
        </>
      )
    }
    render(
      <CustomContextOneProvider>
        <CustomContextTwoProvider>
          <Message />
        </CustomContextTwoProvider>
      </CustomContextOneProvider>
    );

    expect(screen.getByText(/hello/)).toBeInTheDocument();
    expect(screen.getByText(/world/)).toBeInTheDocument();
  });
});