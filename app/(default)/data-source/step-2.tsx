"use client"
import React, { useState } from 'react';
import Twitter from './twitter';
import Notion from './notion';
import Local from './local';


export default function Step2({selectedButton}: {selectedButton: string}) {
    return (
        <>
        {
            selectedButton == 'twitter' ? 
            <Twitter /> 
            : selectedButton == 'notion' ? 
            <Notion /> 
            : <Local />
        }
        </>
    )
}