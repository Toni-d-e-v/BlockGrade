import React, { useState, useEffect } from 'react';

export function SimpleHeader({ children }) {
        return (
            <header className='flex flex-col gap-5 justify-center pt-10 w-full'>
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight md:text-5xl text-foreground text-center">BlockGrade&nbsp;- E&#8209;Diploma</h1>
                {children} 
            </header>
        );
    }
    