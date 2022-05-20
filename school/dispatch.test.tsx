import React, { useReducer, useContext, useMemo, useEffect } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

describe('dispatch', ()=>{

  it('can be shared to simulate eda', ()=>{
    const CustomContext = React.createContext(undefined);
    function CustomContextProvider({children}) {
      const initial = { message:'hello world' };
      const reducer = (state)=> {
        return { message:'hi world' };
      }
      const [state, dispatch] = useReducer(reducer, initial);
      const contextValue = useMemo(() => ({ state, dispatch}), [state, dispatch])
      return (
        <>
          <CustomContext.Provider value={contextValue}>      
            {children}      
          </CustomContext.Provider>
        </>
      )
    }

    function Source() {      
      const { state, dispatch } = useContext(CustomContext);

      return (
        <div>
          <button onClick={ ()=> { dispatch(); }}>change</button>
        </div>
      )
    }
    function Target() {
      const { state } = useContext(CustomContext);

      return (
        <div>
          <div>${state.message}</div>
        </div>
      )
    }
    render(<>
      <CustomContextProvider>
        <Source /> 
        <Target />
      </CustomContextProvider>
    </>);
    userEvent.click(screen.getByText('change'));

    expect(screen.getByText(/hi world/)).toBeInTheDocument();
  });

  it('can be called from test', ()=>{
    const CustomContext = React.createContext(undefined);
    function CustomContextProvider({children}) {
      const initial = { message:'hello world' };
      const reducer = (state)=> {
        return { message:'hi world' };
      }
      const [state, dispatch] = useReducer(reducer, initial);
      const contextValue = useMemo(() => ({ state, dispatch}), [state, dispatch])
      return (
        <>
          <CustomContext.Provider value={contextValue}>      
            {children}      
          </CustomContext.Provider>
        </>
      )
    }

    function Source({children}: React.PropsWithChildren) {
      const { dispatch } = useContext(CustomContext);
      
      useEffect(() => { dispatch() }, [dispatch]);

      return (<>{children}</>)
    }
    function Target() {
      const { state } = useContext(CustomContext);

      return (
        <div>
          <div>${state.message}</div>
        </div>
      )
    }
    render(<>
      <CustomContextProvider>
        <Source>
          <Target />
        </Source>
      </CustomContextProvider>
    </>);
    

    expect(screen.getByText(/hi world/)).toBeInTheDocument();
  });
});