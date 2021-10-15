import React, { useState } from 'react';
import { MemoryRouter, Switch, Route, Redirect } from "react-router-dom";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import { One } from './one';
import { Two } from './two';

import { 
    givenWeOpenTheFirstStep, 
    whenWeContinueToNextStep,
    thenWeSeeTheSecondStep,
} from './steps'

describe('Two steps journey', ()=>{

    it('can be told as a story', ()=>{
        givenWeOpenTheFirstStep();
        whenWeContinueToNextStep();

        thenWeSeeTheSecondStep();  
    });
});